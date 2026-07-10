# BRIEF CLAUDE CODE — Site vitrine A.T.P.R. / Maison de la Psychosomatique Relationnelle
## Phase 1 : Trois maquettes interactives — v2 (fichiers analysés)

---

## 1. Contexte

Création bénévole du site vitrine de l'**A.T.P.R. — Association de Thérapeutes en Psychosomatique Relationnelle**. Titre du site souhaité par l'association : **« Maison de la Psychosomatique Relationnelle »**.

### ⚠️ PRIORITÉ ABSOLUE : L'EXCELLENCE DESIGN

Ces maquettes seront présentées à une association **méfiante vis-à-vis de l'IA**. L'enjeu n'est pas de livrer des pages fonctionnelles : c'est de produire un travail visuel qui impressionne et qui prouve qu'un outil IA peut égaler un designer professionnel. Le design prime sur tout le reste. Si tu dois arbitrer entre couvrir les 7 pages et rendre 4 pages magnifiques, choisis la beauté — Accueil et La PSR doivent être exceptionnelles, sans compromis.

Règles d'or :
1. **Charge tes skills de design avant de commencer** : si un skill `frontend-design` (ou équivalent) est disponible dans ton environnement, lis-le intégralement avant d'écrire la moindre ligne de CSS. Utilise tous les outils à ta disposition.
2. **Boucle de critique visuelle obligatoire** : après chaque page intégrée, prends une capture d'écran réelle (installe Playwright : `npm init -y && npm i -D playwright && npx playwright install chromium --with-deps`, puis script de screenshot en 1440px ET 375px). Examine chaque capture avec un œil de directeur artistique impitoyable : hiérarchie, rythme vertical, alignements, contrastes, densité. Liste 3 à 5 défauts concrets, corrige-les, re-capture. **Minimum 2 itérations par page clé, ne t'arrête que quand tu ne trouves plus de défaut sérieux.**
3. **Interdits absolus (les tics qui trahissent le "site généré par IA")** :
   - Hero centré générique + rangée de 3 cartes identiques avec icônes
   - Emojis en guise d'icônes
   - Dégradés violets/bleus génériques type SaaS
   - Inter/Roboto par défaut, border-radius identique partout, ombres portées floues sur tout
   - Textes lorem ipsum (utilise les vrais contenus fournis)
   - Symétrie systématique : varie les mises en page d'une section à l'autre (asymétrie maîtrisée, images/formes qui débordent de la grille, respiration inégale mais intentionnelle)
4. **Chaque maquette doit avoir un parti pris mémorable** : un détail signature qu'on retient (le trait fin de la maison qui court d'une section à l'autre, une lettrine aquarelle, un sommaire latéral élégant…). Pas de design "correct mais oubliable".

Fichiers fournis dans `./assets/` :
- `logos/` : 4 variantes de logo (maison + titre, lettres A.T.P.R. colorées avec éclat, cercle aquarelle, fleur/lotus)
- `contenu/Idees_Site.pdf` : structure du site + textes de présentation de la PSR

**Objectif : 3 maquettes interactives HTML/CSS/JS, trois directions artistiques distinctes, navigables dans un navigateur.** Pas de PDF, pas d'images statiques.

Le site final (phase 2, hors périmètre) sera un site statique Astro déployé sur Netlify.

---

## 2. Directives Claude Code (autonomie)

- **Autonomie totale** sur : HTML, CSS, JS, structure, choix typographiques, déclinaisons de la palette, mise en page. Enchaîne sans validation intermédiaire.
- **PAUSE obligatoire uniquement pour** : suppression de fichiers fournis dans `./assets/`, changement de périmètre (ex. backend), publication en ligne.
- Question **uniquement** en cas d'ambiguïté bloquante ; sinon décision raisonnable, consignée dans `NOTES.md`.
- En fin de session : `NOTES.md` à jour (décisions, hypothèses, questions pour l'association).

---

## 3. Identité graphique (extraite des fichiers — base imposée)

### Palette (à affiner finement depuis les fichiers logos, valeurs indicatives)
- **Violet** `#9B8BC4` (lettre A) — couleur principale, déclinable en violet foncé `#5D4E8C` pour les textes/titres
- **Vert d'eau** `#63BFA1` (lettre T) — secondaire
- **Bleu-gris** `#7C9EC4` (lettre P) — tertiaire
- **Jaune ocre** `#F0B84B` (lettre R) — accent chaleureux, à doser avec parcimonie
- Neutres : blanc cassé, gris doux

Vérifie les valeurs exactes par échantillonnage des fichiers logos et consigne la palette finale dans `ANALYSE.md` en CSS custom properties.

### Logos
- **Logo primaire pour les maquettes : la version « maison »** (toit vert + contour violet + titre intégré) — c'est la plus aboutie et elle porte le nom du site.
- Les autres variantes (lettres + éclat, cercle aquarelle, fleur) peuvent servir de favicon ou d'éléments graphiques secondaires, mais reste cohérent : une seule identité par maquette.
- Les logos ne sont fournis qu'en JPG : découpe/nettoie-les proprement (fond blanc → utilisable sur fonds clairs uniquement). Note dans `NOTES.md` la nécessité d'une version SVG pour la phase 2.

### Ton visuel imposé par le sujet
Association de thérapeutes, approche humaniste, corps/esprit : les trois directions doivent rester **douces, apaisantes, accueillantes**. Bannis : couleurs saturées agressives, noir pur, angles durs dominants, animations toniques.

---

## 4. Structure du site (définie par l'association — à respecter)

Navigation (7 entrées) :
1. **Accueil** — présentation « en entonnoir » : accroche grand public → la PSR en 3 phrases → les publics concernés → CTA vers les pages détaillées
2. **La PSR** — page pédagogique structurée autour de « **Qu'est-ce que c'est ? / Qu'est-ce que ce n'est pas ?** » (angle éditorial voulu par l'asso). Sous-sections : définition, comment se passe une séance, à qui ça s'adresse, quand est-elle indiquée, fondements théoriques (Winnicott, Bion, Rogers, Sami-Ali, Palo Alto, Anzieu, Roussillon), différence avec la psychanalyse, reconnaissance FF2P
3. **Côté Pro** — présentation de l'ATPR, adhésion (formulaire ou modalités), supervision/intervision
4. **Agenda** — dates de supervision, intervision, événements (contenu vivant : placeholders réalistes marqués fictifs)
5. **Annuaire** — liste des thérapeutes : cartes avec nom, ville, modalités (présentiel/visio), contact (données 100 % fictives et marquées `[EXEMPLE]` en maquette)
6. **Articles** — liste d'articles (2-3 placeholders à partir des textes fournis, ex. « Le corps parlant et parlé »)
7. **Contact** — formulaire (non fonctionnel en maquette, bouton en état « démo ») + coordonnées `[À FOURNIR PAR L'ASSO]`

En maquette : Accueil + La PSR complètes et soignées ; les 5 autres pages présentes mais peuvent être plus légères (structure + contenu partiel), l'important est de montrer la navigation et le système visuel.

---

## 5. Contenu — règles éditoriales impératives

- Le PDF fourni contient des textes riches sur la PSR : **réutilise-les**, c'est la matière officielle.
- **ATTENTION : une partie des textes est rédigée à la première personne** (« ma pratique », « les accompagnements que je propose ») — ce sont des textes de thérapeute individuel. Le subagent `content-editor` doit les **transposer en voix institutionnelle** (« nous », « les thérapeutes de l'association », tournures neutres). Signale cette transposition dans `NOTES.md` pour validation par l'association.
- N'invente JAMAIS de fait : pas de faux noms de thérapeutes présentés comme réels, pas de fausses coordonnées, pas de fausses dates présentées comme vraies. Les placeholders sont explicitement marqués `[EXEMPLE]` ou `[À FOURNIR PAR L'ASSO : …]`.
- Mentions exactes à conserver : reconnaissance par la **FF2P** (Fédération Française de Psychothérapie et Psychanalyse), référentiel Sami-Ali.
- Typographie française : espaces insécables avant : ; ? !, guillemets « ».

---

## 6. Subagents à créer et utiliser

Crée ces fichiers dans `.claude/agents/` avant de commencer, puis délègue :

### `.claude/agents/ui-designer.md`
```markdown
---
name: ui-designer
description: Directeur artistique senior. À utiliser pour définir les directions artistiques, critiquer les captures d'écran de chaque page, et exiger les corrections jusqu'à un niveau professionnel.
tools: Read, Write, Edit, Glob, Grep, Bash
---
Tu es un directeur artistique senior, exigeant, spécialisé en sites vitrines pour le secteur du soin. Ton standard : ce qui sort doit pouvoir figurer dans le portfolio d'un studio de design.
Principes non négociables :
- Douceur et lisibilité : le visiteur type cherche de l'aide ou des informations sur une approche thérapeutique
- Système typographique travaillé : max 2 familles, mais une vraie échelle (tailles, graisses, interlignages, letter-spacing des titres) — jamais les valeurs par défaut
- Palette dérivée des logos ATPR (violet/vert d'eau/bleu-gris/jaune ocre) : 1 dominante + 1 accent par maquette, jamais les 4 couleurs à égalité
- Rythme vertical intentionnel : échelle d'espacement cohérente (ex. 8/16/24/40/64/96px), sections qui respirent inégalement mais volontairement
- Micro-interactions sobres (150-250ms), respect de prefers-reduced-motion
- Mobile-first, breakpoints 640/1024px ; aucun carrousel, aucune bibliothèque externe
Ton rôle central : CRITIQUER LES CAPTURES D'ÉCRAN. Pour chaque capture, liste les défauts précis (alignement, hiérarchie, densité, contraste, banalité) et exige les corrections. Refuse tout pattern "template IA" (hero + 3 cartes, emojis-icônes, dégradés SaaS). Ne valide une page que si tu la mettrais dans ton portfolio.
```

### `.claude/agents/content-editor.md`
```markdown
---
name: content-editor
description: Éditeur de contenu francophone. À utiliser pour transposer, structurer et relire les textes fournis par l'association.
tools: Read, Write, Edit
---
Tu es un rédacteur web francophone senior, spécialisé santé/bien-être.
- Transpose les textes rédigés à la première personne en voix institutionnelle de l'association (« nous », tournures neutres) — signale chaque transposition
- Structure la page « La PSR » autour du format « Qu'est-ce que c'est ? / Qu'est-ce que ce n'est pas ? »
- Phrases courtes, un message par paragraphe, titres scannables
- Ton : chaleureux, professionnel, jamais jargonnant sans explication (définis : alexithymie, médiation corporelle, etc. en une incise simple)
- Conserve les mentions factuelles exactes (FF2P, Sami-Ali) ; n'invente aucun fait
- Typographie française irréprochable (espaces insécables, guillemets « »)
```

### `.claude/agents/accessibility-reviewer.md`
```markdown
---
name: accessibility-reviewer
description: Auditeur accessibilité RGAA/WCAG 2.1 AA. À utiliser en revue de chaque maquette terminée, avant la QA finale.
tools: Read, Grep, Glob, Bash
---
Tu audites des pages HTML selon WCAG 2.1 AA (référentiel RGAA).
Contrôles systématiques :
- Contraste ≥ 4.5:1 (3:1 texte large) — calcule les ratios réels ; attention particulière au jaune ocre et aux pastels sur fond clair
- Navigation clavier complète, focus visible, ordre de tabulation logique
- Landmarks HTML5, un seul h1 par page, hiérarchie de titres sans saut
- alt pertinents, labels de formulaire, cibles tactiles ≥ 44px
- prefers-reduced-motion respecté sur toute animation
Rends un rapport par maquette : non-conformités avec fichier/ligne et correctif.
```

### `.claude/agents/qa-tester.md`
```markdown
---
name: qa-tester
description: Testeur QA front-end. À utiliser en dernière étape sur chaque maquette : liens, responsive, console, cohérence.
tools: Read, Bash, Glob, Grep
---
Tu vérifies des maquettes HTML statiques avant livraison.
Checklist par maquette :
- Tous les liens internes fonctionnent (7 pages + ancres), aucun href="#" oublié
- AUCUN chemin absolu commençant par / (le site sera servi sous un sous-chemin GitHub Pages) : liens et assets exclusivement relatifs
- Aucune erreur console, aucun asset 404 (chemins relatifs)
- Rendu correct à 375px, 768px, 1440px (analyse des breakpoints CSS)
- Menu mobile fonctionnel, boutons « démo » explicitement désactivés
- Cohérence inter-pages : header/footer identiques, espacements constants
- Placeholders bien marqués [EXEMPLE] / [À FOURNIR PAR L'ASSO]
Rapport PASS/FAIL par point, correctifs appliqués ou listés.
```

**Workflow imposé** : Analyse (§3) → installation Playwright + script de capture → `content-editor` (corpus de textes unique, réutilisé par les 3 maquettes) → pour chaque maquette : `ui-designer` (direction artistique) → intégration → **boucle capture/critique/correction (min. 2 itérations sur Accueil et La PSR, desktop + mobile)** → `accessibility-reviewer` → `qa-tester` → corrections → maquette suivante.

---

## 7. Les trois maquettes

Chaque maquette = dossier autonome, `index.html` à la racine, **zéro dépendance externe sauf Google Fonts**. Même contenu et même arborescence (7 pages) pour les trois — seule la direction artistique change.

```
maquette-1-maison/
maquette-2-aquarelle/
maquette-3-carte-blanche/
index.html            ← page comparative (voir §8)
ANALYSE.md
NOTES.md
```

### Direction 1 — « La Maison » (`maquette-1-maison/`)
Inspirée du logo maison : le toit et le trait fin comme motifs graphiques.
- Fond blanc cassé, violet dominant + vert d'eau en accent, jaune réservé aux CTA
- Lignes fines évoquant le contour de la maison (bordures, séparateurs, encadrés au trait)
- Typo : sans-serif humaniste et ronde (ex. Nunito Sans, Poppins Light) — cohérente avec le logo
- Interactions : soulignements animés, cartes au trait qui se remplissent doucement au hover

### Direction 2 — « Aquarelle » (`maquette-2-aquarelle/`)
Inspirée du logo cercle aquarelle et de la fleur : douceur organique.
- Dégradés très doux violet→vert→jaune en arrière-plans de sections (vagues SVG inline, opacité faible)
- Formes arrondies généreuses, pétales/feuilles SVG discrets en ponctuation
- Typo : serif douce pour les titres (ex. Lora, Fraunces light) + sans-serif pour le corps
- Interactions : apparitions au scroll très lentes et sobres (IntersectionObserver + prefers-reduced-motion)

### Direction 3 — « Carte blanche » (`maquette-3-carte-blanche/`)
**Réinterprétation libre de l'identité** : cette maquette est explicitement une PROPOSITION d'évolution, pas une déclinaison. Objectif : montrer à l'association jusqu'où un regard extérieur peut porter leur image — tout en restant reconnaissable.
- **Fil conducteur obligatoire** : garde UN élément identitaire fort (la maison au trait fin OU la fleur/lotus), mais redessine-le en SVG épuré et élégant — un vrai pictogramme de marque, pas le JPG d'origine.
- **Palette repensée** : pars du violet comme ancre (c'est leur couleur mémorielle) mais construis une gamme plus sophistiquée — par exemple aubergine profond + vert sauge + ivoire, avec l'ocre en filet rare ; ou toute autre proposition que tu justifies par la psychologie des couleurs du secteur du soin. Documente le raisonnement dans NOTES.md.
- **Typographie affirmée** : c'est ici que tu peux oser une identité typographique forte (ex. serif contemporaine de caractère type Fraunces/Newsreader en display + sans-serif discrète), avec un vrai travail de composition.
- Mise en page libre : c'est la maquette la plus audacieuse des trois, celle qui doit provoquer le « ah oui, quand même » — sans jamais sacrifier la douceur propre au secteur.
- **Marquage impératif** : bandeau discret ou mention en pied de page « Piste créative — proposition d'évolution de l'identité », pour que l'association comprenne le statut de cette version.

### Exigences communes (non négociables)
- Sur la page « La PSR » (la plus longue) : sommaire ancré ou navigation interne élégante, quelle que soit la direction
- **Agenda et Annuaire pilotés par les données** : dans chaque maquette, ces deux pages sont rendues en JS depuis des fichiers `data/agenda.json` et `data/annuaire.json` (partagés entre les 3 maquettes, données fictives marquées `[EXEMPLE]`). Objectif : préfigurer l'édition simplifiée prévue en phase 2 (Astro + Decap CMS sur Netlify) — le contenu vivant ne doit jamais être codé en dur dans le HTML.
- HTML sémantique, palette en CSS custom properties
- Responsive mobile-first impeccable — la maquette sera montrée sur téléphone
- Performance : < 300 Ko par page hors fonts ; illustrations en SVG inline ou placeholders CSS
- Accessibilité AA validée par le subagent dédié (vigilance : contrastes des pastels et du jaune)
- Aucun framework, aucun CDN JS

---

## 8. Page comparative + publication

1. `index.html` à la racine : titre du projet, 3 cartes cliquables (nom de la direction, mini-description, pastilles de palette), ouvrant chaque maquette.
2. Serveur local pour la revue : `python3 -m http.server 8080` — indique l'URL.
3. **PAUSE avant toute publication — validation explicite d'Alexis requise.** Publication cible : **GitHub Pages**.
   - Prépare le dépôt : `git init`, `.gitignore` (node_modules, captures de travail), commit initial propre
   - **Important — chemins relatifs** : GitHub Pages sert le site sous `/atpr-maquettes/` (sous-chemin, pas racine de domaine). Tous les liens et assets doivent être en chemins relatifs (`./maquette-1-maison/`, `../assets/…`) — jamais de chemins absolus commençant par `/`. Le qa-tester doit vérifier ce point spécifiquement.
   - Après validation de la PAUSE : crée le repo public `atpr-maquettes` et pousse (via `gh repo create atpr-maquettes --public --source=. --push` si gh CLI est configuré, sinon fournis les commandes manuelles)
   - Active Pages : `gh api repos/{owner}/atpr-maquettes/pages -X POST -f "source[branch]=main" -f "source[path]=/"` (ou indique la manip manuelle : Settings → Pages → branche main, dossier /)
   - Vérifie que l'URL finale répond (https://<owner>.github.io/atpr-maquettes/) et le confirme dans NOTES.md

---

## 9. Livrables de fin de session

- [ ] `ANALYSE.md` : palette finale (hex + custom properties), inventaire des logos, contenus manquants
- [ ] 3 maquettes complètes (7 pages chacune), validées accessibilité + QA
- [ ] `index.html` comparatif
- [ ] `NOTES.md` : décisions, transpositions éditoriales à faire valider, questions pour l'association :
  - Quel logo officiel retenir (maison / lettres / aquarelle / fleur) ?
  - Coordonnées de contact et modalités d'adhésion ?
  - Édition simplifiée actée pour Agenda/Annuaire (phase 2 : Astro + Decap CMS sur Netlify) — qui seront les 1-3 personnes du bureau habilitées à modifier le contenu ?
  - Liste réelle des thérapeutes pour l'Annuaire (nom, ville, contact, accord RGPD de chacun) ?
  - Mentions légales : responsable de publication, siège social, hébergeur ?
  - Nom de domaine souhaité ?
- [ ] Serveur local lancé, prêt pour la revue
