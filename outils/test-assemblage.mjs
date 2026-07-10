// Test d'assemblage : index comparatif -> chaque maquette -> retour via bandeau,
// erreurs console, JSON chargés, rendu 375px de l'index et du bandeau.
import { chromium } from 'playwright';

const base = 'http://localhost:8080';
const browser = await chromium.launch();
let fails = 0;
const ko = (msg) => { fails++; console.log(`FAIL ${msg}`); };

for (const vp of [{ w: 1440, h: 900, nom: 'desktop' }, { w: 375, h: 812, nom: 'mobile' }]) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('response', (r) => { if (r.status() >= 400) errs.push(`HTTP ${r.status()} ${r.url()}`); });

  // 1. index comparatif
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  const cartes = await page.$$('.cartes a[href]');
  if (cartes.length !== 3) ko(`index ${vp.nom} : ${cartes.length} carte(s) au lieu de 3`);
  const scrollX = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (scrollX > 1) ko(`index ${vp.nom} : débordement horizontal de ${scrollX}px`);

  // 2. parcours : carte -> maquette -> agenda -> retour bandeau
  for (let i = 0; i < 3; i++) {
    await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
    const href = await page.$$eval('.cartes a[href]', (as, idx) => as[idx].getAttribute('href'), i);
    await page.click(`.cartes li:nth-child(${i + 1}) a`);
    await page.waitForLoadState('networkidle');
    const bandeau = await page.$('.pistes-nav a');
    if (!bandeau) { ko(`${href} ${vp.nom} : bandeau absent`); continue; }
    const visible = await bandeau.isVisible();
    if (!visible) ko(`${href} ${vp.nom} : lien retour du bandeau non visible`);
    // page interne agenda (JSON)
    const agendaUrl = new URL('agenda.html', page.url()).href;
    await page.goto(agendaUrl, { waitUntil: 'networkidle' });
    const contenuAgenda = await page.evaluate(() => document.body.innerText.includes('EXEMPLE'));
    if (!contenuAgenda) ko(`${agendaUrl} ${vp.nom} : données agenda non rendues`);
    // retour via le bandeau
    await page.click('.pistes-nav a');
    await page.waitForLoadState('networkidle');
    if (!page.url().endsWith('/index.html') || page.url().includes('maquette')) ko(`${vp.nom} : retour bandeau depuis ${agendaUrl} -> ${page.url()}`);
  }

  if (errs.length) ko(`${vp.nom} : erreurs console/réseau :\n  - ${[...new Set(errs)].join('\n  - ')}`);

  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `captures/assemblage-index-${vp.nom}.png`, fullPage: true });
  await page.goto(`${base}/maquette-2-aquarelle/index.html`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `captures/assemblage-bandeau-m2-${vp.nom}.png` });
  await page.close();
}

await browser.close();
console.log(fails === 0 ? 'ASSEMBLAGE : PASS' : `ASSEMBLAGE : ${fails} échec(s)`);
process.exit(fails === 0 ? 0 : 1);
