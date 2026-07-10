// Capture d'écran d'une page en desktop (1440) et mobile (375).
// Usage : node outils/screenshot.mjs <url> <prefixe-sortie> [slices]
//   ex. node outils/screenshot.mjs http://localhost:8080/maquette-1-maison/index.html captures/m1-accueil
// Produit : <prefixe>-desktop.png / <prefixe>-mobile.png (pleine page)
//           <prefixe>-desktop-fold.png / <prefixe>-mobile-fold.png (au-dessus de la ligne de flottaison)
//           avec "slices" : tranches d'une hauteur d'écran (max 8) pour examiner les longues pages.
import { chromium } from 'playwright';

const [, , url, prefix, mode] = process.argv;
if (!url || !prefix) {
  console.error('Usage: node outils/screenshot.mjs <url> <prefixe-sortie> [slices]');
  process.exit(1);
}

const viewports = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 375, height: 812 },
];

const browser = await chromium.launch();
for (const { label, width, height } of viewports) {
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('requestfailed', (req) => errors.push(`REQUEST FAILED: ${req.url()}`));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  /* Fige les dessins au trait à leur état final : la capture fullPage
     re-rend la page et redémarre les animations CSS, ce qui rendait
     les tracés invisibles sur les captures suivantes. */
  await page.addStyleTag({
    content: '.trait-anime { animation: none !important; stroke-dashoffset: 0 !important; }',
  });
  await page.screenshot({ path: `${prefix}-${label}.png`, fullPage: true });
  await page.screenshot({ path: `${prefix}-${label}-fold.png`, fullPage: false });
  if (mode === 'slices') {
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    const n = Math.min(8, Math.ceil(total / height));
    for (let i = 0; i < n; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), i * height);
      await page.waitForTimeout(350);
      await page.screenshot({ path: `${prefix}-${label}-slice${i + 1}.png`, fullPage: false });
    }
  }
  if (errors.length) console.log(`[${label}] erreurs console/réseau :\n  - ${errors.join('\n  - ')}`);
  else console.log(`[${label}] aucune erreur console`);
  await page.close();
}
await browser.close();
console.log('captures ok →', prefix);
