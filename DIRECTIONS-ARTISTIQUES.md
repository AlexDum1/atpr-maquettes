# Directions artistiques — cadrage exécutif des 3 maquettes

Document de direction artistique (rôle « ui-designer »). Chaque maquette est un dossier autonome de 7 pages, même contenu (source unique : `contenu/corpus.md`), même arborescence, direction visuelle radicalement distincte. Les valeurs de couleur de marque viennent de `ANALYSE.md` (mesurées sur les logos).

## Règles transverses non négociables

- **Interdits absolus** : hero centré générique + 3 cartes identiques à icônes ; emojis en guise d'icônes ; dégradés violet/bleu type SaaS ; Inter/Roboto ; border-radius uniforme ; ombres floues partout ; symétrie systématique. Chaque section a une mise en page différente de la précédente (asymétrie maîtrisée, débordements intentionnels de la grille, respiration inégale mais voulue).
- **Douceur** : pas de noir pur (`#000`), pas de couleur saturée agressive, pas d'angle dur dominant, pas d'animation tonique. Le visiteur cherche de l'aide ou une formation : tout doit apaiser.
- **Texte** : uniquement les dérivés foncés accessibles (voir ANALYSE.md) ; les 4 couleurs de marque sont réservées aux éléments graphiques et fonds. AA systématique (4,5:1 ; 3:1 texte large).
- **Typo française** : espaces insécables avant `: ; ? !` et dans les guillemets « » ; jamais de veuve sur les titres clés.
- **Interactions** : 150-250 ms, `prefers-reduced-motion` respecté sur TOUTE animation (y compris dessins SVG et reveals). Mobile-first, breakpoints 640/1024 px. Aucune lib externe, aucun CDN JS ; seule dépendance : Google Fonts.
- **Structure commune** : header avec logo + 7 entrées de nav (Accueil, La PSR, Côté Pro, Agenda, Annuaire, Articles, Contact) + menu mobile accessible (`aria-expanded`) ; footer avec rappel logo, nav secondaire, mention FF2P, liens Mentions légales `[À FOURNIR PAR L'ASSO]` ; skip-link ; un seul `h1`/page ; landmarks HTML5.
- **Page « La PSR »** : sommaire interne élégant obligatoire (forme propre à chaque DA) + ancres stables (`#definition`, `#pas`, `#seance`, `#publics`, `#indications`, `#fondements`, `#psychanalyse`, `#reconnaissance`).
- **Agenda/Annuaire** : rendus en JS depuis `../data/agenda.json` et `../data/annuaire.json` (chemins relatifs). Prévoir état « chargement » discret et fallback `<noscript>`.
- **Performance** : < 300 Ko par page hors fonts ; illustrations en SVG inline ; logos via versions `-560.png`.

---

## Maquette 1 — « La Maison » (`maquette-1-maison/`)

**Thèse.** Le logo maison est un *trait qui construit un abri*. Toute la maquette est bâtie sur ce trait fin : il dessine la maison dans le hero, court verticalement le long des sections comme un fil de charpente, et ses chevrons (pente du toit) deviennent le système de repères (puces, eyebrows, flèches de liens).

- **Palette.** Fond ivoire `#FBFAF7` / blanc. Dominante violet (`#A295C1` graphique, `#57506B` titres, `#423C52` texte). Accent vert d'eau `#74BFA8` (fil secondaire, hovers). Jaune `#F5BD46` STRICTEMENT réservé aux CTA. Texture signature : trame de points ocre (halftone du logo) en SVG, coins de sections, opacité ≤ 0,35.
- **Typo.** Display : Poppins (300 pour les très grands titres, 500/600 pour les niveaux inférieurs, letter-spacing -0.5 à -1 %). Corps : Nunito Sans (400/600/700). Échelle claire ~1.25 : 13/16/20/25/31/39/49/61.
- **Signature.** « Le trait qui construit » : dans le hero, une silhouette de maison au trait fin (SVG, stroke 1,5 px violet, toit vert) se dessine au chargement (stroke-dashoffset ~1,2 s, désactivé si reduced-motion). Le trait se prolonge en filet vertical qui relie les sections (marge gauche desktop), ponctué de chevrons de toit à chaque titre de section.
- **Layout.** Hero asymétrique : à gauche eyebrow + H1 + entonnoir + CTA jaune ; à droite la maison au trait sur trame de points. Sections alternées : bloc « la PSR en 3 phrases » sur bande lavande très pâle ; « pour qui ? » en liste décalée (rangées en quinconce reliées par le trait, PAS 3 cartes) ; bande citation ; bloc FF2P au trait.
- **Composants.** Cartes « au trait » : bordure 1 px violet clair, fond transparent, hover = remplissage lavande 6 % + trait vert (200 ms). Liens : soulignement animé de gauche à droite. Boutons : jaune plein (texte encre, 6,1:1) et fantôme violet.
- **Sommaire PSR.** Barre sticky sous le header : chips au trait avec chevron, section active soulignée de vert (scroll-spy léger).

## Maquette 2 — « Aquarelle » (`maquette-2-aquarelle/`)

**Thèse.** Le cercle aquarelle et la fleur parlent de *paysage intérieur* : des lavis très doux qui se répondent, des formes organiques, un rythme lent. La maquette respire comme une séance : lenteur, rondeur, matière.

- **Palette.** Fond blanc chaud `#FDFCFA`. Dominante vert d'eau (`#74BFA8`, lavis `#C5EBD6`, texte accent `#3E7E6B`). Accent violet (lavis `#CAA4F9` à ≤ 25 % d'opacité, titres `#57506B`). Jaune pâle `#FDE9AC` en touche rare (fonds de détail). Texte courant encre `#423C52`.
- **Typo.** Display : Lora (500, italique pour un mot-clé par titre majeur). Corps : Mulish (400/600). Interlignage généreux (1.65 corps, 1.15 titres).
- **Signature.** **Lettrine aquarelle** : la première lettre des grandes sections (Accueil-manifeste, chaque grande partie de La PSR, articles) est une lettrine Lora habillée d'un lavis SVG dégradé violet→vert (radial doux, unique par occurrence — rotation/teinte variées). Ponctuation secondaire : pétales de la fleur redessinés en SVG (contour fin) comme marqueurs de listes et respirations entre sections.
- **Layout.** Hero : grand lavis organique (2 blobs SVG superposés, flous, vert + violet, opacité < 30 %) débordant du cadre en haut à droite ; titre serif sur 2 lignes avec un mot en italique ; entonnoir en colonne étroite. Sections : panneaux arrondis généreux (radius 28 px VARIÉ — certains blocs pleine largeur sans radius), séparateurs en vague SVG basse opacité, images/formes qui chevauchent les frontières de sections.
- **Motion.** Apparitions au scroll très lentes (600-800 ms, translation 12 px max, IntersectionObserver), une seule fois ; rien d'autre ne bouge. Reduced-motion : tout visible d'emblée.
- **Sommaire PSR.** Colonne latérale douce (desktop) : liste verticale reliée par un fil de vague, point aquarelle sur la section active ; mobile : bloc sommaire replié en tête de page (`<details>` stylé).

## Maquette 3 — « Carte blanche » (`maquette-3-carte-blanche/`)

**Thèse.** Proposition d'évolution d'identité : *la maison habitée*. Un pictogramme redessiné — une maison d'un seul trait dont l'intérieur s'enroule en spirale (l'intériorité, le dedans psychique) — porte une identité éditoriale sophistiquée, plus contrastée, digne d'une revue clinique contemporaine, sans perdre la douceur du soin.

- **Palette (repensée, justifiée).** Ancre aubergine profonde `#423A5A` (évolution du violet mémoriel : profondeur, intériorité, sérieux clinique) ; fond ivoire chaud `#F6F4EE` (chaleur calme, papier) ; vert sauge `#8FAE9B` (végétal, apaisement — texte foncé `#4C6E5D`) ; **ocre `#C99937` uniquement en filets** (hairlines, 1 px : le fil de lumière). Sections inversées ivoire-sur-aubergine pour le rythme. Psychologie des couleurs à consigner dans NOTES.md.
- **Typo.** Display : Fraunces (« soft » : optical size bas, 340-560, italiques expressives sur mots choisis, ligatures). Corps : Albert Sans (400/500). Grands titres TRÈS grands (clamp jusqu'à 88 px), colonne de texte étroite (65-70 ch max).
- **Signature.** Le **pictogramme « maison habitée »** : SVG original d'un seul trait (stroke 2 px), toit à deux pentes, le trait descend et s'enroule en spirale douce au centre. Usages : marque du header (picto + wordmark Fraunces « Maison de la Psychosomatique Relationnelle »), filigrane géant très pâle dans le hero (débordant du cadre), micro-glyphe de fin d'article et marqueur de sections. C'est le « ah oui, quand même ».
- **Layout.** Éditorial magazine : grille 12 colonnes asymétrique, hero typographique (pas d'image) — eyebrow ocre filet, H1 Fraunces sur 3 lignes avec un mot italique, lede en colonne décalée, filigrane picto à droite ; bandes pleine largeur aubergine (texte ivoire) alternant avec l'ivoire ; filets ocre horizontaux comme structure (jamais de box génériques) ; chiffres/references en marge (style revue).
- **Motion.** Sobriété extrême : fade discret du hero au chargement, hover = italique + filet ocre qui s'étend. Rien au scroll sauf le sommaire.
- **Sommaire PSR.** Sidebar sticky élégante (desktop) : liste Fraunces numérotée en petites capitales Albert Sans, filet ocre sur l'entrée active ; mobile : sommaire compact en tête.
- **Marquage obligatoire.** Bandeau discret (bord supérieur ou pied de page, sur CHAQUE page) : « Piste créative — proposition d'évolution de l'identité ».

---

## Livrables attendus par maquette (rappel exécution)

7 pages : `index.html` (Accueil), `psr.html`, `cote-pro.html`, `agenda.html`, `annuaire.html`, `articles.html`, `contact.html` + `styles.css` + `script.js` (nav mobile, scroll-spy/reveals selon DA, rendu agenda/annuaire). Accueil et La PSR : niveau portfolio, boucle capture/critique ≥ 2 itérations (desktop + mobile). Placeholders `[EXEMPLE]` / `[À FOURNIR PAR L'ASSO]` visibles mais élégants (badge discret).
