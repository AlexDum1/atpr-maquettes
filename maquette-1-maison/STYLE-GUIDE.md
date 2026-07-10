# STYLE-GUIDE — Maquette 1 « La Maison »

Guide d'intégration pour les 6 pages restantes (`psr.html`, `cote-pro.html`, `agenda.html`, `annuaire.html`, `articles.html`, `contact.html`). Référence : `DIRECTIONS-ARTISTIQUES.md` (section « La Maison »), `ANALYSE.md` (contrastes), `contenu/corpus.md` (textes, à reprendre SANS reformuler, insécables compris).

**Thèse DA** : le trait fin qui construit un abri. Trois signatures à faire vivre sur chaque page :
1. le **fil vertical** qui relie les sections (desktop), ponctué de **chevrons de toit** à chaque titre ;
2. les **chevrons** comme système de repères (eyebrows, puces, flèches) — jamais d'icônes ni d'emojis ;
3. la **trame de points ocre** en coin de section (halftone du logo), opacité ≤ 0,35, avec parcimonie (1 à 2 par page).

---

## 1. Squelette de page (copiable)

Chaque page reprend EXACTEMENT ce squelette. Seuls changent : `<title>`, `<meta name="description">` (Annexe B du corpus), l'attribut `aria-current="page"` dans la nav, et le contenu de `<main>`.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><!-- Annexe B du corpus, ≤ 60 caractères --></title>
  <meta name="description" content="<!-- Annexe B du corpus, ≤ 155 caractères -->">
  <link rel="icon" type="image/png" href="../assets/logos/favicon-64.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip-link" href="#contenu">Aller au contenu</a>

  <!-- HEADER : voir §2, copier tel quel -->

  <main id="contenu">
    <!-- sections de la page -->
  </main>

  <!-- FOOTER : voir §3, copier tel quel -->

  <script src="script.js"></script>
</body>
</html>
```

Titles/descriptions par page : reprendre **l'Annexe B** de `contenu/corpus.md` à l'identique (avec ses espaces insécables).

Contraintes dures : chemins relatifs uniquement (jamais de `/` initial) ; un seul `h1` par page ; hiérarchie de titres sans saut ; aucune lib externe ni CDN hors Google Fonts.

## 2. Header (markup exact, copiable tel quel)

Un seul changement autorisé d'une page à l'autre : déplacer `aria-current="page"` sur l'entrée de la page courante (le soulignement vert de l'état actif est stylé via cet attribut — **ne pas** utiliser de classe `.active`).

```html
<header class="site-header">
  <div class="conteneur site-header-inner">
    <a class="logo" href="index.html">
      <img src="../assets/logos/logo-maison-alpha-560.png" alt="Maison de la Psychosomatique Relationnelle — A.T.P.R." width="560" height="198">
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-principale">
      <span class="nav-toggle-barres" aria-hidden="true"></span>
      <span class="nav-toggle-label">Menu</span>
    </button>
    <nav id="nav-principale" class="nav-principale" aria-label="Navigation principale">
      <ul>
        <li><a href="index.html">Accueil</a></li>
        <li><a href="psr.html">La PSR</a></li>
        <li><a href="cote-pro.html">Côté Pro</a></li>
        <li><a href="agenda.html">Agenda</a></li>
        <li><a href="annuaire.html">Annuaire</a></li>
        <li><a href="articles.html">Articles</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>
```

Exemple : sur `agenda.html`, écrire `<li><a href="agenda.html" aria-current="page">Agenda</a></li>`.

Le menu mobile (ouverture/fermeture, `aria-expanded`, Échap, clic extérieur) est déjà géré par `script.js` (`initMenu`) — rien à ajouter.

## 3. Footer (markup exact, copiable tel quel)

Identique sur toutes les pages, aucun changement (pas d'état actif dans la nav secondaire).

**Respiration avant le footer** : le footer n'a PAS de `margin-top`. C'est la **dernière section** de chaque page qui gère l'espace en portant `section--basse` (padding-bottom 96 px). Ne pas rajouter d'espaceur.

```html
<footer class="site-footer">
  <div class="conteneur footer-grille">
    <div class="footer-identite">
      <svg class="footer-maison" width="44" height="42" viewBox="0 0 44 42" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 18 V38 H36 V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 20 22 4 40 20" stroke="#74BFA8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 38 V30 Q22 27 26 30 V38" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <p class="footer-nom">Maison de la Psychosomatique Relationnelle</p>
      <p class="footer-asso">Site porté par l'A.T.P.R. — Association de Thérapeutes en Psychosomatique Relationnelle.</p>
    </div>
    <nav class="footer-nav" aria-label="Navigation secondaire">
      <p class="footer-nav-titre">Explorer</p>
      <ul>
        <li><a href="index.html">Accueil</a></li>
        <li><a href="psr.html">La PSR</a></li>
        <li><a href="cote-pro.html">Côté Pro</a></li>
        <li><a href="agenda.html">Agenda</a></li>
        <li><a href="annuaire.html">Annuaire</a></li>
        <li><a href="articles.html">Articles</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
    <div class="footer-mentions">
      <p>La psychosomatique relationnelle est une discipline reconnue par la FF2P (Fédération Française de Psychothérapie et Psychanalyse).</p>
      <p>Mentions légales — <span class="badge-maquette badge-maquette--long">À fournir par l'asso&nbsp;: responsable de publication, siège social, hébergeur</span></p>
    </div>
  </div>
  <div class="conteneur">
    <p class="footer-basline">Maquette de démonstration — les contenus marqués «&nbsp;Exemple&nbsp;» sont fictifs.</p>
  </div>
</footer>
```

## 4. Sections : structure, fil vertical, espacement

### Structure type d'une section

```html
<section class="section section--fil" aria-labelledby="titre-xxx">
  <div class="conteneur">
    <div class="section-tete">
      <span class="fil-chevron" aria-hidden="true"><svg class="chevron" width="16" height="10" viewBox="0 0 14 9" focusable="false"><path d="M1 8 7 2l6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <h2 id="titre-xxx">Titre de section</h2>
    </div>
    <!-- contenu -->
  </div>
</section>
```

### Le fil vertical (signature n° 1)

- `section--fil` sur chaque section « reliée » ; le trait 1 px court dans la marge gauche (desktop ≥ 64rem uniquement, invisible en mobile).
- `section--fil-debut` sur la **première** section reliée de la page (le fil démarre en retrait, pas au ras du bord).
- `section--fil-fin` sur la **dernière** (le fil s'estompe en dégradé).
- Le hero ne porte PAS le fil : il commence à la première section de contenu.
- Le `fil-chevron` (chevron de toit posé sur le fil) accompagne CHAQUE `section-tete`. Son fond est géré automatiquement selon `section--bande` ou non.

### Rythme vertical

Le padding vertical vit sur le `.conteneur` (jamais sur la section — sinon le fil se coupe) :

- section standard : `padding-block: var(--s-5)` (64 px) — automatique ;
- respiration ample avant : ajouter `section--haute` (96 px en haut) ;
- respiration ample après : ajouter `section--basse` (96 px en bas).

Alterner les fonds pour le rythme : ivoire (défaut) / bande lavande pâle (`section--bande`). **Jamais deux mises en page identiques d'affilée** : varier grille, quinconce, liste, bloc au trait.

### Trame de points ocre (signature n° 3)

En coin de section, `currentColor` jaune, jamais plus de 2 par page. L'`id` du `pattern` doit être **unique par page** (suffixer : `trame-coin-agenda`…) :

```html
<svg class="coin-trame" aria-hidden="true" focusable="false" viewBox="0 0 208 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="trame-coin-UNIQUE" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="2.5" cy="2.5" r="2" fill="currentColor" fill-opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="208" height="128" fill="url(#trame-coin-UNIQUE)"/>
</svg>
```

Variante haut de section : ajouter `coin-trame--haut` (masquée < 640 px). À placer en enfant direct du `.conteneur` (position absolue).

## 5. Inventaire des composants

| Classe | Usage |
|---|---|
| `.conteneur` | Gabarit centré 1140 px, padding latéral. Obligatoire dans chaque section. |
| `.skip-link` | Lien d'évitement, premier enfant de `<body>`. |
| `.eyebrow` | Surtitre chevron + petites capitales (hero, têtes de page). Contient un `svg.chevron` puis un `<span>`. |
| `.chevron` | Le chevron de toit SVG (`viewBox="0 0 14 9"`). Puce, eyebrow, flèche (rotation 90° pour « vers la droite »). Toujours `aria-hidden="true" focusable="false"` quand décoratif. |
| `.btn .btn--jaune` | CTA principal — le jaune est STRICTEMENT réservé à ce bouton. Radius asymétrique « pente de toit ». Max 1–2 par page. |
| `.btn .btn--fantome` | Bouton secondaire au trait violet. |
| `.lien-anime` | Lien texte avec soulignement animé gauche → droite. |
| `.badge-maquette` | Placeholder `[EXEMPLE]` / `[À FOURNIR PAR L'ASSO : …]` en badge discret ocre. Variante `--long` pour texte multi-mots. |
| `.carte-trait` | Carte au trait : bordure 1 px, fond transparent, remplissage lavande + trait vert au hover. Radius asymétrique alterné (`:nth-child`). |
| `.quinconce` + `.jalon` | Rangées en quinconce reliées au fil (desktop) : chaque `.carte-trait.jalon` alterne gauche/droite, un connecteur horizontal (`::before`) la raccroche au fil, et son `.jalon-num` (`<span class="jalon-num" aria-hidden="true">01</span>`, premier enfant) est posé sur le trait supérieur. Fond du numéro = fond de section (ivoire par défaut — adapter si `section--bande`). PAS de grille de cartes symétrique. |
| `.phrases` / `.phrase` | Liste « entonnoir » : chaque phrase décalée d'un cran vers la droite et traversant la bande en diagonale (desktop), puce chevron. |
| `.section--citation` + `.citation` | Bande citation pleine largeur (fond blanc, filets haut/bas) : `<figure class="citation">` avec grand chevron, `<blockquote>` en Poppins 300 centré, `<figcaption>` d'attribution. Citations VERBATIM du corpus uniquement — jamais de texte inventé. |
| `.bloc-ff2p` | Bloc au trait sur fond blanc avec `.pignon` (chevron posé sur le bord supérieur) et `.ff2p-phrase` (phrase d'accroche). Réutilisable pour tout encart institutionnel (« Le saviez-vous ? » de la page PSR). ⚠️ Le fond du `.pignon` est un dégradé moitié lavande / moitié blanc calé sur le trait — si le bloc est posé sur un fond ivoire (hors `section--bande`), adapter la moitié haute du dégradé. |
| `.rangees-cta` / `.rangee-cta` | Rangées d'appel à l'action séparées par des filets, flèche chevron à droite. Contient `h3` + `p` + `.fleche`. |
| `.coin-trame` (`--haut`) | Trame de points ocre en coin de section. |
| `.section-tete` | Tête de section : `.fil-chevron` + `h2` (+ `.eyebrow` éventuel avant le h2). |
| `.etat-chargement` | Message discret « Chargement… » / erreurs des rendus JS. |
| `.badge` + `--supervision` / `--intervision` / `--evenement` / `--modalite` | Badges des pages Agenda/Annuaire (générés par `script.js`). |
| `.sommaire-psr` | Barre sticky de chips sous le header (page PSR uniquement), voir §7. |

## 6. Agenda & Annuaire (rendu JS — prêt dans `script.js`)

Les fonctions existent, exécution conditionnelle : il suffit de poser le conteneur avec le bon `id`. Chargement depuis `../data/agenda.json` / `../data/annuaire.json` (relatif), tri par date croissante, dates longues en français, regroupement par mois (agenda) / par région (annuaire), badges type + modalité, préfixe `[EXEMPLE]` transformé en `.badge-maquette`.

**`agenda.html`** — dans une section :

```html
<div id="agenda-liste" aria-live="polite">
  <noscript><p>L'agenda nécessite JavaScript. Les dates de supervision, d'intervision et d'événements sont publiées ici&nbsp;; contactez l'association pour les recevoir par e-mail.</p></noscript>
</div>
```

**`annuaire.html`** — idem avec `id="annuaire-liste"` et un noscript équivalent (« L'annuaire nécessite JavaScript… »).

Ne JAMAIS coder d'événement ni de fiche en dur dans le HTML. Les chapeaux de page et notes de maquette viennent du corpus (sections Agenda / Annuaire, avec la note RGPD de l'annuaire).

## 7. Page « La PSR » : sommaire sticky (obligatoire)

Barre de chips sticky sous le header, ancres stables. Le scroll-spy (`initSommaire`) est déjà dans `script.js` : il pose `.est-actif` + `aria-current="true"` sur le chip visible.

```html
<nav class="sommaire-psr" aria-label="Sommaire de la page">
  <div class="conteneur">
    <ul>
      <li><a href="#definition"><svg class="chevron" width="12" height="8" viewBox="0 0 14 9" aria-hidden="true" focusable="false"><path d="M1 8 7 2l6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Qu'est-ce que c'est&nbsp;?</a></li>
      <!-- … même motif pour chaque ancre -->
    </ul>
  </div>
</nav>
```

Ancres imposées (DIRECTIONS-ARTISTIQUES.md) : `#definition`, `#pas` (= « ce que ce n'est pas »), `#seance`, `#publics`, `#indications`, `#fondements`, `#psychanalyse`, `#reconnaissance`. Poser chaque `id` sur la `<section>` correspondante et prévoir `scroll-margin-top: 8.5rem` (header + sommaire sticky) — à ajouter dans le CSS si besoin :
`.sommaire-psr ~ .section[id], main [id] { scroll-margin-top: 8.5rem; }`

## 8. Consignes DA transverses (rappels bloquants)

- **Couleurs texte** : uniquement `--encre` (courant), `--violet-fonce` (titres), `--vert-sombre` (liens/accents), `--ocre-texte` (badges). Les 4 couleurs de marque (`--violet`, `--vert`, `--jaune`, `--lavande`) sont réservées au décor. Sur fond encre (footer) : ivoire, `#C9C3D6`, `#B9AED2` minimum.
- **Jaune = CTA uniquement.** Pas de titres jaunes, pas de fonds jaunes pleins (seul `--jaune-pale` sert aux badges).
- **Typo** : Poppins 300 pour les très grands titres (h1), 500/600 en dessous ; Nunito Sans pour le corps. Ne pas introduire d'autre famille.
- **Typographie française** : espaces insécables avant `: ; ? !` et à l'intérieur des « » (`&nbsp;` ou U+00A0 — le corpus les contient déjà, les conserver).
- **Placeholders** : tout `[EXEMPLE]` / `[À FOURNIR PAR L'ASSO : …]` du corpus s'affiche en `.badge-maquette` (texte réécrit sans crochets, ex. « À fournir par l'asso&nbsp;: adresse postale »).
- **Animations** : 150–250 ms (`var(--duree) var(--courbe)`), `prefers-reduced-motion` est géré globalement en fin de `styles.css` — toute NOUVELLE animation doit y être neutralisée aussi (le reset générique couvre transitions/animations CSS ; pour un dessin SVG type `.trait-anime`, ajouter la règle d'annulation explicite).
- **Focus visibles** : ne jamais supprimer l'`outline` (`:focus-visible` global déjà stylé).
- **Formulaire contact** : bouton d'envoi `disabled` + mention « Formulaire de démonstration — envoi désactivé » (corpus, section Contact) ; labels explicites reliés (`for`/`id`), case de consentement obligatoire.
- **Poids** : < 300 Ko/page hors fonts (Accueil actuel : ~109 Ko). Logos uniquement en `-560.png`, illustrations en SVG inline.
- **Asymétrie maîtrisée** : chaque section change de mise en page ; débordements intentionnels autorisés (ex. `margin-right` négatif du hero) mais `overflow-x` doit rester propre (le `body` est déjà en `overflow-x: hidden`).

## 9. Boucle visuelle (obligatoire avant de rendre une page)

```bash
cd "/Users/alexisdumas/Documents/04 - CLAUDE/ATPR" \
  && node outils/screenshot.mjs http://localhost:8080/maquette-1-maison/<page>.html captures/m1-<page>-v1 slices
```

Lire chaque PNG (desktop ET mobile), lister 3–5 défauts concrets, corriger, re-capturer (`-v1b`). Préfixe de captures réservé à cette maquette : `m1-`.
