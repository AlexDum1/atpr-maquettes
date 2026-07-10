# STYLE-GUIDE — Maquette 3 « Carte blanche » · La maison habitée

Guide d'intégration pour toutes les pages de la maquette. Source des textes : `../contenu/corpus.md` (à utiliser sans reformuler ; convertir les espaces avant `: ; ? !` et dans les guillemets « » en `&nbsp;`). Palette mesurée : `../ANALYSE.md`.

---

## 1. Le parti pris

**Thèse.** Proposition d'évolution d'identité : *la maison habitée*. Un pictogramme original — une maison d'un seul trait dont l'intérieur s'enroule en spirale (l'intériorité, le dedans psychique) — porte une identité éditoriale de revue clinique contemporaine : grands titres Fraunces, filets ocre en structure, bandes aubergine inversées. Douceur du soin conservée : aucun noir pur, aucune couleur saturée, mouvements quasi absents.

**Marquage obligatoire** : chaque page porte le bandeau `p.bandeau-piste` (tout en haut, avant le header) **et** la mention `p.site-footer__mention-piste` dans le footer : « Piste créative — proposition d'évolution de l'identité ». Ne jamais l'omettre.

## 2. Raisonnement palette (psychologie des couleurs du soin)

| Jeton | Hex | Rôle | Justification |
|---|---|---|---|
| `--cb-aubergine` | `#423A5A` | Ancre (bandes, boutons, titres) | Évolution du violet mémoriel A.T.P.R. (`#A295C1`) vers la profondeur : le violet assombri dit l'**intériorité** et le sérieux clinique sans la froideur d'un bleu corporate ni la dureté d'un noir. C'est la couleur du dedans — le sujet même de la PSR. |
| `--cb-ivoire` | `#F6F4EE` | Fond papier | Blanc chaud, calme, jamais clinique-hôpital. Évoque le papier d'une revue — matière, lenteur de lecture. |
| `--cb-sauge` | `#8FAE9B` | Végétal, décor seulement | Le vert d'eau du logo, désaturé vers la sauge : apaisement, croissance, régulation. En médecine des couleurs, le vert doux abaisse l'activation — il accompagne, il ne stimule pas. |
| `--cb-ocre` | `#C99937` | **Filets 1 px uniquement** | Le jaune du logo réduit à un fil de lumière : la chaleur en très petite dose, comme un liseré doré de reliure. Jamais en aplat, jamais en texte (dérivé `--cb-ocre-texte #8A6410` pour les badges). |

Ratios de contraste mesurés (WCAG 2.1 AA) — **le texte n'utilise que ces dérivés** :

- `--cb-encre #3A3450` sur ivoire : 10,7:1 (corps)
- `--cb-titre #423A5A` sur ivoire : 9,6:1 (titres)
- `--cb-sauge-texte #4C6E5D` sur ivoire : 5,2:1 · sur `--cb-ivoire-2` : 4,8:1 · sur `--cb-sauge-pale` : 4,6:1
- `--cb-ocre-texte #8A6410` sur ivoire : 4,9:1 (badges uniquement)
- `--cb-ivoire-texte #F6F4EE` sur aubergine : 9,6:1
- `--cb-lavande-texte #CFC9DE` sur aubergine : 6,6:1 · sur `--cb-aubergine-profond` : 8,2:1
- `--cb-sauge-claire #AEC7B9` sur aubergine : 5,9:1 (eyebrows et numéros sur bande inversée)
- Badge ocre clair `#E9CE93` sur aubergine-profond : 8,6:1

Les couleurs de marque pures (`--cb-sauge`, `--cb-ocre`, aubergine en aplat décoratif) sont réservées aux éléments graphiques.

## 3. Typographie

- **Display : Fraunces** (Google Fonts, axe optique 9..144, graisses variables 340–560). Réglage signature : `font-variation-settings: "opsz" 22–42` (optical size volontairement bas = dessin « soft », chaleureux). Italiques expressives sur **un** mot choisi par grand titre (`<em>`).
- **Corps : Albert Sans** 400/500 (600 pour les libellés).
- Chargement (dans chaque `<head>`, uniquement ces familles) :

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,340..560;1,9..144,340..560&display=swap">
```

- Échelle : jetons `--fs-200` → `--fs-950` (voir `styles.css` §1). H1 des pages internes : `--fs-800`. H1 de l'accueil seulement : `--fs-950`.
- Typographie française : `&nbsp;` avant `: ; ? !` et à l'intérieur des « ». Pas de veuve sur les titres clés (`text-wrap: balance` est posé sur h1–h4 ; au besoin, composer les lignes avec des `<span class="hero__ligne">`).

## 4. Le pictogramme « maison habitée » (signature)

Un seul trait continu : les deux pentes du toit, les murs, puis le trait rentre et s'enroule en spirale au centre. Ne jamais utiliser les logos JPG/PNG fournis dans cette maquette — c'est le picto SVG qui porte l'identité.

Code de référence (le `path` est LE dessin officiel, ne pas le redessiner) :

```html
<svg class="marque__picto" viewBox="0 0 64 64" fill="none" stroke="currentColor"
     stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
     aria-hidden="true" focusable="false">
  <path d="M11 55 V26.6 L32 9.5 53 26.6 V55 C51.4 55.3 47.3 55.1 43.2 53.4 C35.2 50.1 30.9 43 33.3 37.2 C35.3 32.4 42 31 45.6 35 C48.8 38.6 47.5 44.3 42.8 45.6 C39.2 46.6 36 44.2 36.5 41.2 C36.9 38.9 39.2 37.9 40.6 39.1"/>
</svg>
```

Usages et épaisseurs de trait :
- **Header/footer** (44 px) : `stroke-width="2.2"`, couleur `currentColor` (aubergine dans le header, sauge-claire dans le footer). Un seul `<path>` continu.
- **Filigrane deux tons** (grands formats, classes `filigrane` + `hero__filigrane` ou `trois-phrases__glyphe`) : le path officiel est **scindé en deux** au point `43.2 53.4` — `.filigrane__enveloppe` (toit + murs, discret) et `.filigrane__spirale` (l'intériorité, légèrement rehaussée en sauge). Chaque path porte `vector-effect="non-scaling-stroke"` avec `stroke-width="1.5"` : le trait reste fin et **crisp** quelle que soit la taille (jamais de trait scalé épais/flou). Géométrie inchangée — ne pas redessiner. Opacités de référence : enveloppe 0,14–0,17 (aubergine sur ivoire) ou 0,12 (ivoire sur aubergine) ; spirale 0,5–0,6 (sauge) ou 0,5 (sauge-claire sur aubergine). Réservé à l'accueil (les pages internes restent typographiques).
- **Glyphe de section** (72–96 px, ex. `bande-ff2p__glyphe`) : `stroke-width="1.6"`, couleur `--cb-sauge-texte`. Aussi utilisable en micro-glyphe de fin d'article.

## 5. Header — markup exact (copier tel quel)

L'état actif se gère **uniquement** en déplaçant `aria-current="page"` sur l'entrée de la page courante (le CSS stylise `[aria-current="page"]` : graisse 600 + filet ocre). Ne pas ajouter de classe « active ».

```html
<a class="skip-link" href="#contenu">Aller au contenu</a>

<p class="bandeau-piste">Piste créative — proposition d’évolution de l’identité</p>

<header class="site-header">
  <div class="conteneur site-header__inner">
    <a class="marque" href="index.html">
      <svg class="marque__picto" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <path d="M11 55 V26.6 L32 9.5 53 26.6 V55 C51.4 55.3 47.3 55.1 43.2 53.4 C35.2 50.1 30.9 43 33.3 37.2 C35.3 32.4 42 31 45.6 35 C48.8 38.6 47.5 44.3 42.8 45.6 C39.2 46.6 36 44.2 36.5 41.2 C36.9 38.9 39.2 37.9 40.6 39.1"/>
      </svg>
      <span class="marque__wordmark">Maison de la<br>Psychosomatique Relationnelle
        <small>A.T.P.R.</small>
      </span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-principale">
      <span class="nav-toggle__label">Menu</span>
      <span class="nav-toggle__icone" aria-hidden="true"></span>
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
  <!-- contenu de page ; UN SEUL h1 -->
</main>
```

## 6. Footer — markup exact (copier tel quel)

```html
<footer class="site-footer">
  <div class="conteneur">
    <div class="site-footer__haut">
      <a class="marque" href="index.html">
        <svg class="marque__picto" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M11 55 V26.6 L32 9.5 53 26.6 V55 C51.4 55.3 47.3 55.1 43.2 53.4 C35.2 50.1 30.9 43 33.3 37.2 C35.3 32.4 42 31 45.6 35 C48.8 38.6 47.5 44.3 42.8 45.6 C39.2 46.6 36 44.2 36.5 41.2 C36.9 38.9 39.2 37.9 40.6 39.1"/>
        </svg>
        <span class="marque__wordmark">Maison de la<br>Psychosomatique Relationnelle
          <small>A.T.P.R.</small>
        </span>
      </a>
      <nav class="nav-secondaire" aria-label="Navigation secondaire">
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
    <div class="site-footer__bas">
      <p>La psychosomatique relationnelle est reconnue par la FF2P (Fédération Française de Psychothérapie et Psychanalyse). Site porté par l’A.T.P.R. — Association de Thérapeutes en Psychosomatique Relationnelle.</p>
      <p>Mentions légales <span class="badge-note">À fournir par l’asso</span></p>
      <p class="site-footer__mention-piste">Piste créative — proposition d’évolution de l’identité.</p>
    </div>
  </div>
</footer>

<script src="script.js" defer></script>
```

## 7. Gabarit `<head>` des pages internes

`title` et meta description : **reprendre exactement l'Annexe B du corpus** (une entrée par page). Favicon commun :

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><!-- Annexe B --></title>
<meta name="description" content="<!-- Annexe B, avec &nbsp; avant : ; ? ! -->">
<link rel="icon" type="image/png" href="../assets/logos/favicon-64.png">
<!-- fonts (voir §3) puis : -->
<link rel="stylesheet" href="styles.css">
```

Chemins **relatifs uniquement** (jamais de `/…`). `<html lang="fr">`.

## 8. Inventaire des composants

| Classe | Usage |
|---|---|
| `.conteneur` | Gabarit centré 1200 px, padding latéral 24/40 px. Toujours le premier enfant d'une section. |
| `.grille-12` | Grille 12 colonnes à partir de 1024 px (block en dessous). Positionner les enfants avec `grid-column` par section. |
| `.section` | Section neutre sur ivoire, `padding-block` 64 → 96 px. |
| `.bande-aubergine` | Section inversée (fond aubergine, texte ivoire). Alterner avec l'ivoire pour le rythme ; jamais deux bandes aubergine qui se suivent. |
| `.eyebrow` | Sur-titre en petites capitales précédé d'un filet ocre. Un par section, avant le `h2` (ou le `h1` d'une page interne). |
| `.bouton` / `.bouton--inverse` | Action principale (aubergine plein) / action sur fond aubergine. Maximum un `.bouton` par écran. |
| `.lien-filet` | Lien éditorial : filet ocre 28 px qui s'étend au survol. Action secondaire, flèche `<span class="fleche">→</span>` optionnelle. |
| `.badge-note` | Placeholder `[EXEMPLE]` / `[À FOURNIR PAR L'ASSO : …]` en badge discret ocre. Toujours utiliser ce badge, jamais les crochets bruts. |
| `.badge` + `.badge--supervision/--intervision/--evenement/--presentiel/--visio` | Pastilles type & modalité (Agenda, Annuaire) — générées par `script.js`. |
| `.etat-chargement` | État « Chargement… » discret des rendus JS. |
| `.liste-cta` / `.cta-ligne` | Appels à l'action « lignes de revue » : titre Fraunces + description + flèche, hairline entre lignes, filet ocre qui balaie au survol. |
| `.bloc-public` | Bloc éditorial entre filets ocre, numéro de marge auto `01–04` (compteur CSS, style revue), décalé de 88 px par `margin-left` un rang sur deux (≥ 1024 px) — le filet suit le décalage (escalier). |
| `.phrase` / `.phrase__numero` | Items en escalier de la bande « trois phrases » (numéros romains italiques) : marges 0 / 18 % / 36 % (≥ 1024 px), progression franche vers le glyphe du coin droit. |
| `.bande-ff2p` / `__glyphe` / `__texte` | Bande de reconnaissance FF2P sur `--cb-ivoire-2`, entre filets ocre, glyphe maison en marge. |
| `.sommaire` (+ `.sommaire--lateral`) | Sommaire numéroté de la page « La PSR » : hairline à gauche, entrée active soulignée d'un filet ocre 2 px (scroll-spy via `aria-current="true"`, géré par `script.js`). En desktop : `.sommaire--lateral` sticky dans une colonne de `.grille-12` ; en mobile : bloc compact en tête de page. |
| `.groupe-mois` / `.evenement` | Agenda : groupe par mois (titre italique sous filet ocre) puis lignes date + badges + corps. |
| `.groupe-region` / `.fiche-therapeute` | Annuaire : groupe par région puis fiches en 3 colonnes (identité / badges / contact). |
| `.marge-note` | Petit repère de marge en capitales (chiffres, références, style revue). |
| `.sr-only` | Texte pour lecteurs d'écran. |

## 9. Rythme vertical & règles de composition

- Échelle d'espacement : `--e-1` 8 · `--e-2` 16 · `--e-3` 24 · `--e-4` 40 · `--e-5` 64 · `--e-6` 96 · `--e-7` 160 px. **Aucune valeur hors échelle.**
- Sections courantes : `padding-block: var(--e-5)` mobile → `var(--e-6)` desktop. Le hero de l'accueil est le seul à descendre à `--e-7` (respiration exceptionnelle).
- **La respiration est inégale mais voulue** : varier la mise en page d'une section à l'autre (bande inversée → colonne sticky + liste → bande filets → lignes de revue). Jamais deux sections de même construction qui se suivent, jamais de rangée de cartes identiques.
- Structure par **filets, pas par boîtes** : hairlines ocre (`var(--filet-ocre)`) ou aubergine translucide (`rgba(66,58,90,.14/.22)`) ; pas de cartes ombrées, pas de border-radius décoratif (2 px max sur boutons/badges, 999 px sur pastilles).
- Colonne de lecture : `--mesure: 65ch` (posée sur `p`). Ledes et descriptions plus étroites (46–58 ch).
- Asymétrie maîtrisée : contenus décalés via `grid-column` (ex. hero decale 4/11, texte FF2P 4/11, liste publics 5/13) — pas de centrage systématique.

## 10. Comportements (`script.js`)

Tous les modules s'exécutent conditionnellement (aucune erreur si le conteneur est absent) :

- **Menu mobile** : `.nav-toggle` bascule `aria-expanded` + classe `est-ouverte` sur `#nav-principale` ; fermeture par Échap (focus rendu au bouton) et clic extérieur.
- **Scroll-spy** : activé si `.sommaire` présent — `aria-current="true"` + `.est-active` sur l'entrée visible (IntersectionObserver).
- **Agenda** : `<div id="agenda-liste"></div>` → fetch `../data/agenda.json`, tri par date croissante, regroupement par mois (`Intl.DateTimeFormat` fr-FR), badges type/modalité, marqueurs `[EXEMPLE]` convertis en `.badge-note`, états chargement/erreur/vide.
- **Annuaire** : `<div id="annuaire-liste"></div>` → fetch `../data/annuaire.json`, regroupement par région (alphabétique) puis tri par nom, badges modalités, contact `mailto:`.
- Sur `agenda.html` et `annuaire.html`, prévoir le fallback :

```html
<noscript><p>Le contenu de cette page nécessite JavaScript. Les dates et l’annuaire
sont également disponibles auprès de l’association (page Contact).</p></noscript>
```

## 11. Accessibilité & mouvement (rappels bloquants)

- Un seul `h1` par page ; hiérarchie sans saut ; landmarks (`header`, `nav`, `main`, `footer`).
- Skip-link premier élément focusable ; `:focus-visible` outline 2 px (ivoire sur fonds aubergine — déjà géré).
- Texte : uniquement les dérivés du §2. Les 4 couleurs de marque = décor.
- `prefers-reduced-motion: reduce` neutralise **toutes** les animations/transitions (règle globale en fin de `styles.css`) — toute nouvelle animation doit rester couverte.
- Cibles tactiles ≥ 44 px (nav, boutons — padding déjà calibré).
- Poids : < 300 Ko par page hors fonts. Illustrations en SVG inline uniquement ; aucun logo JPG/PNG dans cette maquette (favicon excepté).
