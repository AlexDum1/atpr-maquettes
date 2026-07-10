// Audit complémentaire maquette 2 : poids par page (hors fonts), erreurs console,
// hiérarchie de titres rendue (JS inclus), landmarks, h1 unique, alt, ordre de
// tabulation / focus visible, menu mobile clavier, reduced-motion, breakpoints.
import { chromium } from 'playwright';

const base = 'http://localhost:8080/maquette-3-carte-blanche';
const pages = ['index.html', 'psr.html', 'cote-pro.html', 'agenda.html', 'annuaire.html', 'articles.html', 'contact.html'];
const browser = await chromium.launch();

for (const p of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));
  let poids = 0;
  page.on('response', async r => {
    const u = r.url();
    if (u.includes('fonts.googleapis') || u.includes('fonts.gstatic')) return;
    try { const b = await r.body(); poids += b.length; } catch {}
  });
  await page.goto(`${base}/${p}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const audit = await page.evaluate(() => {
    const out = {};
    out.h1 = document.querySelectorAll('h1').length;
    // hiérarchie sans saut
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(h => h.offsetParent !== null || h.closest('details'));
    let prev = 0, sauts = [];
    for (const h of hs) {
      const n = +h.tagName[1];
      if (prev && n > prev + 1) sauts.push(`${h.tagName} après h${prev}: "${h.textContent.trim().slice(0, 40)}"`);
      prev = n;
    }
    out.sauts = sauts;
    out.landmarks = {
      header: document.querySelectorAll('body > header').length,
      main: document.querySelectorAll('main').length,
      footer: document.querySelectorAll('body > footer').length,
      nav: document.querySelectorAll('nav').length,
    };
    out.imgsSansAlt = [...document.querySelectorAll('img:not([alt])')].map(i => i.src);
    out.svgNonMasques = [...document.querySelectorAll('svg')].filter(s => !s.closest('[aria-hidden="true"]') && s.getAttribute('aria-hidden') !== 'true' && !s.getAttribute('role') && !s.getAttribute('aria-label')).length;
    out.hrefDiese = [...document.querySelectorAll('a[href="#"]')].length;
    out.inputsSansLabel = [...document.querySelectorAll('input,select,textarea')].filter(el => {
      if (el.type === 'hidden') return false;
      return !el.labels || el.labels.length === 0;
    }).map(el => el.id || el.name);
    // cibles < 24px (liens de nav et boutons uniquement, hors liens dans la prose)
    out.petitesCibles = [...document.querySelectorAll('nav a, button, .btn')].filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.height < 24 || r.width < 24);
    }).map(el => el.textContent.trim().slice(0, 25));
    return out;
  });

  // focus visible sur les 5 premiers éléments tabbables
  const focusInfo = [];
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
    const f = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      return { t: (el.textContent || el.alt || el.tagName).trim().slice(0, 30), outline: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 };
    });
    if (f) focusInfo.push(f);
  }

  console.log(`\n=== ${p} — ${(poids / 1024).toFixed(0)} Ko (hors fonts)${errors.length ? ' — CONSOLE: ' + errors.join(' | ') : ''}`);
  console.log(JSON.stringify(audit));
  console.log('tab order:', focusInfo.map(f => `${f.t}${f.outline ? '' : ' [PAS DE FOCUS VISIBLE]'}`).join(' → '));
  await page.close();
}

// ---- menu mobile au clavier + reduced motion + breakpoints ----
const m = await browser.newPage({ viewport: { width: 375, height: 812 } });
await m.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
await m.keyboard.press('Tab'); // skip-link
const skip = await m.evaluate(() => { const el = document.activeElement; const r = el.getBoundingClientRect(); return { txt: el.textContent, visible: r.top >= 0 }; });
console.log('\nskip-link focus:', JSON.stringify(skip));
await m.keyboard.press('Tab'); await m.keyboard.press('Tab'); // logo puis bouton Menu
const surMenu = await m.evaluate(() => document.activeElement.className);
await m.keyboard.press('Enter');
await m.waitForTimeout(300);
const ouvert = await m.evaluate(() => document.querySelector('.nav-toggle').getAttribute('aria-expanded'));
await m.keyboard.press('Tab');
const dansNav = await m.evaluate(() => !!document.activeElement.closest('.nav-principale'));
await m.keyboard.press('Escape');
await m.waitForTimeout(200);
const apresEchap = await m.evaluate(() => ({ exp: document.querySelector('.nav-toggle').getAttribute('aria-expanded'), focus: document.activeElement.className }));
console.log('menu clavier:', JSON.stringify({ surMenu, ouvertApresEnter: ouvert, tabEntreDansNav: dansNav, apresEchap }));

// hauteur cibles nav mobile ouverte
await m.evaluate(() => document.querySelector('.nav-toggle').click());
await m.waitForTimeout(200);
const cibles = await m.evaluate(() => [...document.querySelectorAll('.nav-principale a')].map(a => Math.round(a.getBoundingClientRect().height)));
console.log('hauteur liens nav mobile:', cibles.join(','));
// débordement horizontal 375
for (const p of pages) {
  await m.goto(`${base}/${p}`, { waitUntil: 'networkidle' });
  const over = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (over > 1) console.log(`DEBORDEMENT 375px sur ${p}: +${over}px`);
}
await m.close();

// reduced motion : les blocs data-reveal restent visibles, transitions neutralisées
const rm = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await rm.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
await rm.mouse.wheel(0, 400); await rm.waitForTimeout(300);
const rmOk = await rm.evaluate(() => [...document.querySelectorAll('[data-reveal]')].every(el => getComputedStyle(el).opacity === '1'));
console.log('reduced-motion, tout visible:', rmOk);
await rm.close();

// débordement horizontal 768 / 1440
for (const w of [768, 1440]) {
  const v = await browser.newPage({ viewport: { width: w, height: 900 } });
  for (const p of pages) {
    await v.goto(`${base}/${p}`, { waitUntil: 'networkidle' });
    const over = await v.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (over > 1) console.log(`DEBORDEMENT ${w}px sur ${p}: +${over}px`);
  }
  await v.close();
}
console.log('fin audit');
await browser.close();
