# STYLE-GUIDE — Maquette 2 « Aquarelle »

Guide d'intégration des pages de la maquette. Le socle (`styles.css`, `script.js`) est complet : **aucune nouvelle page ne doit modifier ces deux fichiers**, elle ne fait que consommer les composants ci-dessous. Textes : uniquement `../contenu/corpus.md` (section correspondant à la page), sans reformuler, en conservant les espaces insécables (U+00A0).

---

## 1. Squelette de page (copiable tel quel)

### `<head>` type

Remplacer `TITLE` et `DESCRIPTION` par les valeurs EXACTES de l'Annexe B du corpus (une paire par page).

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TITLE</title>
  <meta name="description" content="DESCRIPTION">
  <link rel="icon" type="image/png" href="../assets/logos/favicon-64.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Mulish:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
```

Seules familles autorisées : **Lora** (display) et **Mulish** (corps). Chemins **toujours relatifs** (jamais de `/` initial).

### Header (markup exact)

Juste après `<body>`. Une seule adaptation par page : déplacer `aria-current="page"` sur l'entrée de la page courante (voir §5).

```html
  <a class="skip-link" href="#contenu">Aller au contenu</a>

  <header class="site-header">
    <div class="site-header__inner enveloppe">
      <a class="site-header__logo" href="index.html">
        <img src="../assets/logos/logo-maison-alpha-560.png" alt="Maison de la Psychosomatique Relationnelle — A.T.P.R., retour à l'accueil" width="560" height="198">
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-principale">
        <span class="nav-toggle__icone" aria-hidden="true"><span></span><span></span><span></span></span>
        Menu
      </button>
      <nav id="nav-principale" class="nav-principale" aria-label="Navigation principale">
        <ul>
          <li><a href="index.html" aria-current="page">Accueil</a></li>
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

  <main id="contenu">
    <!-- contenu de la page -->
  </main>
```

### Footer (markup exact)

Toujours précédé de sa vague. La couleur de la vague footer est fixe (`--c-footer`) ; si la dernière section de la page a un fond teinté, poser la vague footer *après* la fermeture de cette section, le raccord est assuré par le fond de page.

```html
  <div class="vague vague--footer" aria-hidden="true">
    <svg viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 40 C240 14 480 64 720 38 C960 12 1200 60 1440 32 L1440 70 L0 70 Z" fill="currentColor"/></svg>
  </div>
  <footer class="site-footer">
    <div class="enveloppe">
      <div class="footer__grille">
        <div class="footer__identite">
          <p>Maison de la Psychosomatique Relationnelle</p>
          <p class="footer__asso">Site porté par l'A.T.P.R. — Association de Thérapeutes en Psychosomatique Relationnelle.</p>
        </div>
        <nav class="footer__nav" aria-label="Navigation secondaire">
          <h2>Explorer le site</h2>
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
      <div class="footer__mentions">
        <p>La psychosomatique relationnelle est reconnue par la FF2P (Fédération Française de Psychothérapie et Psychanalyse).</p>
        <p>Mentions légales — <span class="badge-fournir">À fournir par l'asso&nbsp;: responsable de publication, siège social, hébergeur</span></p>
      </div>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

Note : le footer contient un `h2` (« Explorer le site ») — c'est voulu et valide ; il ne compte pas dans la hiérarchie du `main`.

---

## 2. Palette et typographie (rappel des règles dures)

- **Texte** : uniquement les dérivés foncés — `--c-encre` (courant), `--c-violet-fonce` (titres), `--c-vert-sombre` (liens/accents), `--c-ocre-texte` (badges [EXEMPLE]). Les couleurs de marque (`--c-vert`, `--c-violet`, `--c-violet-lavis`, `--c-vert-lavis`, `--c-jaune-pale`) sont réservées au décor (lavis, pétales, fonds, boutons).
- **`--c-vert-sombre` vaut `#38715F`** (et non le `#3E7E6B` d'ANALYSE.md) : le dérivé d'ANALYSE.md tombe sous 4,5:1 sur les fonds teintés (`--c-lavande-voile` : 4,28:1). `#38715F` tient ≥ 5,1:1 sur tous les fonds de la maquette. Ne jamais réintroduire `#3E7E6B` pour du texte.
- **Un mot en italique par grand titre** (`h1`/`h2`) : entourer UN mot-clé de `<em>` — il passe automatiquement en Lora italique vert sombre. Ne pas en abuser (jamais sur les `h3`).
- **Typo française** : `&nbsp;` (ou U+00A0 du corpus) avant `: ; ? !` et à l'intérieur de « ». Le corpus les contient déjà : copier sans « nettoyer ». **Apostrophe typographique `’` (U+2019) partout** dans les textes affichés (le corpus utilise l'apostrophe droite : la convertir à l'intégration — `perl -CSD -i -pe "s/(\p{L})'(\p{L})/\$1\x{2019}\$2/g" <page>.html`).
- **Veuves sur les titres clés** : lier le dernier groupe de mots d'un titre par `&nbsp;` (ex. `La PSR en <em>trois</em>&nbsp;phrases`) pour qu'un mot ne reste jamais seul sur sa ligne.

## 3. Inventaire des composants

| Classe | Usage |
|---|---|
| `.enveloppe` | Conteneur centré (max 74rem). Toute section place son contenu dedans. |
| `.eyebrow` | Sur-titre en petites capitales vert sombre, au-dessus d'un `h2`. |
| `.btn.btn--plein` / `.btn.btn--contour` | Boutons pilule. Plein = action principale (vert, texte encre 4,9:1), contour = secondaire. Max 1 plein par écran. |
| `.badge-exemple` | Pastille jaune pâle « Exemple » — posée automatiquement par `script.js` pour Agenda/Annuaire ; à la main ailleurs (`<span class="badge-exemple">Exemple</span>`). |
| `.badge-fournir` | Badge pointillé violet pour `[À FOURNIR PAR L'ASSO : …]` / `[À VALIDER PAR L'ASSO]`. Texte du badge en clair, sans les crochets. |
| `.lettrine` | Signature DA — voir §6. |
| `.liste-petales` | `<ul>` dont les puces sont des pétales SVG (via `::before`). |
| `.petales-ponctuation` | Trio de pétales décroissants sous un titre de section (aria-hidden). |
| `.petale-respiration` | Trio de pétales centré, respiration entre deux grands blocs. |
| `.panneau-petale` / `.panneau-petale--inverse` | Radius organique asymétrique (40/12) pour un bloc teinté. Ne pas l'appliquer partout : alterner avec des blocs pleine largeur sans radius (variation DA). |
| `.vague` + modificateur | Séparateur de section en vague SVG — voir §4. |
| `.sommaire-psr` (+ `--lateral`) | Sommaire de psr.html : `<details>` stylé en mobile, colonne sticky à gauche en desktop. Lien actif : classe `.est-active` ou `aria-current="true"`. |
| `.etat-chargement` | Paragraphe d'attente/erreur des rendus JS. |
| `.agenda-groupe`, `.agenda-item`, `.badge-type--*`, `.badge-modalite` | Générés par `script.js` (Agenda). Ne pas écrire à la main. |
| `.annuaire-region`, `.fiche-therapeute` | Générés par `script.js` (Annuaire). Ne pas écrire à la main. |
| `[data-reveal]` | Apparition douce au scroll — voir §7. |

## 4. Vagues et enchaînement des fonds

Chaque section a un fond : page (`--c-fond`), lavande (`--c-lavande-voile`) ou vert (`--c-vert-voile`). Entre deux sections de fonds différents, insérer une vague **avant** la section qui s'ouvre :

- la couleur de la vague (`currentColor` du modificateur) = fond de la section **suivante** ;
- le fond du `div.vague` = fond de la section **précédente** (par défaut le fond de page ; sinon `style="background: var(--c-…);"`).

```html
<!-- fond page → section lavande -->
<div class="vague vague--lavande" aria-hidden="true">
  <svg viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 42 C240 12 480 66 720 40 C960 14 1200 58 1440 34 L1440 70 L0 70 Z" fill="currentColor"/></svg>
</div>

<!-- section lavande → fond page -->
<div class="vague vague--fond" aria-hidden="true" style="background: var(--c-lavande-voile);">
  <svg viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 36 C260 62 520 10 760 38 C1000 66 1240 20 1440 44 L1440 70 L0 70 Z" fill="currentColor"/></svg>
</div>
```

**Varier le tracé `d` d'une vague à l'autre** (amplitudes/phases différentes — reprendre ceux d'index.html ou en dessiner de nouveaux, amplitude ≤ 30 sur une hauteur de 70). Jamais deux vagues identiques qui se suivent.

## 5. Nav : état actif

- Sur chaque page, **une seule** entrée porte `aria-current="page"` : celle de la page courante (dans le header uniquement ; le footer n'en porte jamais).
- Le style (soulignement ondulé vert) est automatique via `.nav-principale a[aria-current="page"]`.
- Les pages articles (si des pages de détail sont créées) gardent `aria-current="page"` sur « Articles ».

## 6. Lettrine aquarelle (signature — obligatoire sur les grandes pages)

Première lettre du premier paragraphe d'un grand bloc de texte (Accueil : manifeste ; La PSR : chaque grande partie ; Articles : ouverture). Le `id` du dégradé doit être **unique par occurrence** (`lavis-lettrine-<page>-<n>`), et chaque occurrence varie `rotate(…)` (entre −40 et 40) et l'ordre des deux couleurs (violet→vert ou vert→violet) :

```html
<p><span class="lettrine"><svg class="lettrine__lavis" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs><radialGradient id="lavis-lettrine-psr-1" cx="38%" cy="35%" r="72%"><stop offset="0%" stop-color="#CAA4F9" stop-opacity="0.66"/><stop offset="60%" stop-color="#C5EBD6" stop-opacity="0.8"/><stop offset="100%" stop-color="#C5EBD6" stop-opacity="0"/></radialGradient></defs><path d="M50 4 C74 6 96 24 95 50 C94 78 72 97 47 95 C22 93 4 74 5 48 C6 22 26 2 50 4 Z" fill="url(#lavis-lettrine-psr-1)" transform="rotate(18 50 50)"/></svg><span class="lettrine__char">L</span></span>a suite du paragraphe…</p>
```

Opacités du lavis : **0,66 / 0,8** (les valeurs 0,5/0,55 initiales rendaient la signature invisible en capture — ne pas les baisser).

La lettre affichée dans `.lettrine__char` est la première du mot ; le reste du mot suit la balise `</span></span>` sans espace.

## 7. Apparitions au scroll

- Poser `data-reveal` sur les blocs à faire apparaître (entêtes de section, panneaux) — **jamais** sur le hero ni sur des éléments indispensables à la compréhension immédiate.
- Le mécanisme (dans `script.js`) est robuste : page entièrement visible par défaut ; l'effet ne s'arme qu'au premier geste utilisateur (molette/toucher/clavier) et un défilement rapide ne peut pas « sauter » un bloc. `prefers-reduced-motion` désactive tout.
- Ne rien animer d'autre (DA : « rien d'autre ne bouge »).

## 8. Agenda et Annuaire (pages pilotées par les données)

`script.js` s'exécute conditionnellement : il suffit de poser le conteneur.

```html
<!-- agenda.html -->
<div id="agenda-liste">
  <noscript><p>L'agenda nécessite JavaScript. Les dates sont aussi disponibles auprès de l'association (page Contact).</p></noscript>
</div>

<!-- annuaire.html -->
<div id="annuaire-liste">
  <noscript><p>L'annuaire nécessite JavaScript. Pour obtenir la liste des thérapeutes, utilisez la page Contact.</p></noscript>
</div>
```

- Agenda : tri par date croissante, regroupement par mois (`h3.agenda-groupe__mois`), badges type (supervision/intervision/événement) et modalité, marque `[EXEMPLE]` convertie en badge.
- Annuaire : regroupement par région (tri alphabétique fr), fiches triées par nom, badges modalités, contact `mailto:`.
- Les titres générés sont des `h3`/`h4` : le conteneur doit être précédé d'un `h1` de page (et éventuellement d'un `h2`) pour une hiérarchie sans saut. Prévoir au-dessus du conteneur le chapeau + la « note de maquette » du corpus avec `.badge-fournir`.

## 9. Rythme vertical et mise en page

- Échelle d'espacement : `--e-1` 8 / `--e-2` 16 / `--e-3` 24 / `--e-4` 40 / `--e-5` 64 / `--e-6` 96 px. Sections : `padding-block` entre `--e-5` et `--e-6`, **inégal mais voulu** (une section dense peut respirer moins qu'une bande manifeste).
- **Chaque section change de mise en page** par rapport à la précédente : grille asymétrique 5/7, quinconce (`.pour-qui__grille`), bande pleine largeur, liste d'index (`.chemin`). Ne jamais aligner deux rangées de cartes identiques.
- Largeur de lecture : ~38rem (`--largeur-prose`) pour les colonnes de texte ; ne pas étirer un paragraphe sur toute l'enveloppe.
- Radius : varié par principe (40/12 organique, 22/6 fiches, 999 pilules, 0 bandes pleine largeur). Ne pas introduire un radius uniforme.

## 10. Checklist avant capture d'une nouvelle page

1. `aria-current="page"` déplacé sur la bonne entrée du header.
2. `title` + `meta description` = Annexe B du corpus, à l'identique.
3. Un seul `h1` ; hiérarchie h1→h2→h3 sans saut ; landmarks (`header`, `nav`, `main`, `footer`).
4. Textes = corpus mot à mot, insécables conservés ; placeholders rendus en `.badge-exemple` / `.badge-fournir`.
5. Aucun chemin commençant par `/` ; aucune ressource externe hors Google Fonts.
6. Poids page < 300 Ko hors fonts (logos en `-560.png`, illustrations SVG inline).
7. Capture desktop + mobile (`node outils/screenshot.mjs … captures/m2-<page>-v1 slices`), lecture des PNG, ≥ 2 itérations.
