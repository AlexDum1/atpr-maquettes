// QA automatique d'une maquette : parcourt les 7 pages, vérifie erreurs console,
// requêtes 404, liens internes cassés, chemins absolus, et teste le menu mobile.
// Usage : node outils/qa-check.mjs http://localhost:8080/maquette-1-maison
import { chromium } from 'playwright';

const [, , baseUrl] = process.argv;
if (!baseUrl) { console.error('Usage: node outils/qa-check.mjs <base-url-maquette>'); process.exit(1); }
const base = baseUrl.replace(/\/$/, '');
const pages = ['index.html', 'psr.html', 'cote-pro.html', 'agenda.html', 'annuaire.html', 'articles.html', 'contact.html'];

const browser = await chromium.launch();
let fails = 0;
for (const p of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const issues = [];
  page.on('console', (m) => { if (m.type() === 'error') issues.push(`console: ${m.text()}`); });
  page.on('response', (r) => { if (r.status() >= 400) issues.push(`HTTP ${r.status()}: ${r.url()}`); });
  const resp = await page.goto(`${base}/${p}`, { waitUntil: 'networkidle' });
  if (!resp || resp.status() >= 400) issues.push(`page inaccessible (${resp && resp.status()})`);
  await page.waitForTimeout(500);

  // liens internes + chemins absolus
  const links = await page.evaluate(() => Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href')));
  for (const href of links) {
    if (href.startsWith('/')) issues.push(`chemin absolu interdit: ${href}`);
    if (href === '#') issues.push('href="#" oublié');
  }
  const assets = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[src], link[href]')).map(el => el.getAttribute('src') || el.getAttribute('href')));
  for (const a of assets) if (a && a.startsWith('/') && !a.startsWith('//')) issues.push(`asset en chemin absolu: ${a}`);

  // liens internes -> HEAD
  const internal = [...new Set(links.filter(h => h && !h.startsWith('http') && !h.startsWith('#') && !h.startsWith('mailto')))];
  for (const href of internal) {
    const target = new URL(href, `${base}/${p}`).href.split('#')[0];
    const r = await page.request.head(target).catch(() => null);
    if (!r || r.status() >= 400) issues.push(`lien cassé: ${href}`);
  }

  if (issues.length) { fails++; console.log(`FAIL ${p}\n  - ${[...new Set(issues)].join('\n  - ')}`); }
  else console.log(`PASS ${p}`);
  await page.close();
}

// menu mobile sur l'accueil
const m = await browser.newPage({ viewport: { width: 375, height: 812 } });
await m.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
const toggle = await m.$('[aria-expanded]');
if (!toggle) { console.log('FAIL menu mobile : aucun bouton [aria-expanded] trouvé'); fails++; }
else {
  await toggle.click();
  await m.waitForTimeout(400);
  const expanded = await toggle.getAttribute('aria-expanded');
  console.log(expanded === 'true' ? 'PASS menu mobile (ouverture ok)' : 'FAIL menu mobile : aria-expanded reste false');
  if (expanded !== 'true') fails++;
}
await m.close();
await browser.close();
console.log(fails === 0 ? '\nQA GLOBALE : PASS' : `\nQA GLOBALE : ${fails} page(s) en échec`);
