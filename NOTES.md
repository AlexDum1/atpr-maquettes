# NOTES — Décisions, hypothèses et questions pour l'association

Journal de production des 3 maquettes (session Claude Code, 9 juillet 2026).

## Décisions prises (autonomie prévue par le brief)

1. **Arborescence des fichiers fournis** : le brief mentionnait `assets/logos/` (4 JPG) et `contenu/Idees_Site.pdf` ; en réalité le dossier contenait un seul JPG (logo maison) et « Idées Site.pdf ». Les 4 variantes de logo étaient **embarquées dans le PDF** (images 2000×2000) : elles ont été extraites, recadrées et nettoyées vers `assets/logos/`.
2. **Palette** : échantillonnée programmatiquement sur les logos — voir `ANALYSE.md`. Les 4 couleurs de marque étant trop claires pour du texte (contraste < 3:1), des dérivés foncés accessibles ont été créés pour tous les textes.
3. **Coquille dans le logo « lettres »** : le sous-titre du logo extrait de la page 1 du PDF écrit « Psych**so**somatique relationnelle ». Cette variante n'est pas utilisée dans les maquettes. → à corriger si cette version est retenue.
4. **FFP2 → FF2P** : le PDF écrit une fois « FFP2 » ; le brief et les autres occurrences confirment **FF2P** (Fédération Française de Psychothérapie et Psychanalyse). FF2P retenu partout.
5. **Agenda / Annuaire pilotés par les données** : fichiers partagés `data/agenda.json` et `data/annuaire.json` (données 100 % fictives, marquées [EXEMPLE]), rendus en JS par chemins relatifs (`../data/…`) — préfiguration de l'édition simplifiée phase 2 (Astro + Decap CMS).
6. **Dates fictives de l'agenda** : positionnées sur la saison 2026-2027 pour être réalistes, toutes marquées [EXEMPLE].
7. **Transpositions éditoriales** : les textes du PDF à la première personne (pratique d'une thérapeute) ont été transposés en voix institutionnelle — détail complet en Annexe A de `contenu/corpus.md`, **à faire valider par l'association**. La mention personnelle « formée par le Dr Pierre Boquel au CRESMEP » n'a pas été généralisée à l'association (fait individuel) — voir corpus.
8. **Logos JPG → PNG nettoyés** : fond blanc recadré ; versions `-alpha` (blanc rendu transparent) utilisables sur fonds clairs uniquement. **Une version SVG est nécessaire pour la phase 2.**

## Questions pour l'association

- Quel logo officiel retenir (maison / lettres / cercle aquarelle / fleur) ? (La maquette 3 propose en plus un pictogramme redessiné — piste créative.)
- Coordonnées de contact et modalités d'adhésion ?
- Édition simplifiée actée pour Agenda/Annuaire (phase 2 : Astro + Decap CMS sur Netlify) — qui seront les 1-3 personnes du bureau habilitées à modifier le contenu ?
- Liste réelle des thérapeutes pour l'Annuaire (nom, ville, contact, accord RGPD de chacun) ?
- Mentions légales : responsable de publication, siège social, hébergeur ?
- Nom de domaine souhaité ?
- Historique de l'association (date de création, lien éventuel avec le CRESMEP / Dr Boquel) à confirmer pour la page Côté Pro.

## Session du 9 juillet 2026 (reprise) — maquette 1 terminée

9. **Maquette 1 complète (7/7 pages)** : `cote-pro.html`, `agenda.html`, `annuaire.html`, `articles.html`, `contact.html` intégrées depuis le corpus (sans reformulation), boucle de critique ui-designer (2 passes), audit accessibilité et QA (PASS global, toutes pages < 135 Ko).
10. **Correctifs d'accessibilité transverses** (bénéficient aussi à l'Accueil et à La PSR) : `--vert-sombre` assombri `#3E7E6B` → `#37705F` (contraste AA sur bande lavande) ; hiérarchie des titres générés en JS corrigée (mois/régions en h3, événements/fiches en h4) ; liens « Contacter » de l'annuaire explicités pour lecteurs d'écran ; bouton du formulaire de démonstration en `aria-disabled` (atteignable au clavier) avec envoi bloqué en JS ; bordures de champs renforcées (3,7:1).
11. **Outil de capture corrigé** (`outils/screenshot.mjs`) : la capture pleine page redémarrait les animations CSS, rendant les dessins au trait invisibles sur les captures — les tracés sont désormais figés à leur état final avant capture. À savoir pour les maquettes 2 et 3.
12. **Page Articles** : les 3 articles complets vivent sur une seule page (ancres + sommaire en rangées), pas de pages détail séparées — choix aligné sur le brief (« pages plus légères ») ; à découper en pages individuelles en phase 2 si besoin.

## Session du 10 juillet 2026 — maquette 2 terminée

13. **Maquette 2 « Aquarelle » complète (7/7 pages)** : les 5 pages secondaires (`agenda`, `annuaire`, `articles`, `contact`, `cote-pro`) sont passées par la boucle de critique du directeur artistique (~30 correctifs appliqués), puis audit accessibilité WCAG 2.1 AA et QA — **PASS global**, toutes pages < 140 Ko hors fonts, zéro erreur console, zéro chemin absolu.
14. **Principaux correctifs design** : composant lettrine harmonisé depuis l'Accueil (articles, côté-pro) ; colonnes droites mortes occupées (fleur au trait, pétales, encart sticky) ; annuaire compacté (entêtes de région pleine largeur, cartes alternées) ; note de maquette de l'agenda dé-emphasée et repositionnée ; contact posé sur bande lavande avec vague d'entrée, bouton « Envoyer » au style standard (toujours aria-disabled) ; squiggles variés entre sections ; fins de page raccordées à la vague footer. La deuxième passe de validation DA a été sautée à la demande d'Alexis.
15. **Correctifs accessibilité M2** : `--c-ocre-texte` #8A6410 → #855F0E (4,79:1 sur jaune pâle) ; `overflow-x: clip` sur html/body (le scroll horizontal réel causé par les lavis décoratifs n'était pas neutralisé par `hidden`) ; cibles tactiles footer et sommaire PSR mobile élargies. Deux tolérances documentées : cibles desktop < 44 px (AAA, le AA 24 px est respecté) et bordure `.btn--contour` à 2,69:1 (texte du bouton à 7,4:1).
16. **Nouvel outil** : `outils/audit-m2.mjs` (audit Playwright réutilisable : poids, hiérarchie de titres rendue en JS, landmarks, focus, reduced-motion, débordements) — utilisable pour la maquette 3.

## Session du 10 juillet 2026 (suite) — maquette 3 terminée

17. **Maquette 3 « Carte blanche » complète (7/7 pages)** : les 5 pages secondaires (`cote-pro`, `agenda`, `annuaire`, `articles`, `contact`) intégrées depuis le corpus, dans le système éditorial du STYLE-GUIDE (aside sticky + colonne principale, encarts « à fournir/à valider » entre filet ocre, lignes de revue). Audit accessibilité (audit-m3.mjs) et QA (qa-check.mjs) : **PASS global**, toutes pages 58–70 Ko hors fonts, zéro erreur console, zéro chemin absolu, menu mobile OK.
18. **Correctifs de la boucle DA (2 passes)** : bouton `.bouton--inverse` illisible sur bande aubergine (la règle `.bande-aubergine a` écrasait sa couleur — règle de restauration ajoutée) ; e-mails de l'annuaire coupés lettre à lettre (`word-break: break-all` → `overflow-wrap: anywhere` + colonne contact élargie 3fr→4fr) ; points orphelins après les badges [À FOURNIR] (agenda, contact) repositionnés avant le badge.
19. **Formulaire de démonstration M3** : bouton `aria-disabled` + note « envoi désactivé », soumission bloquée en JS (vérifié : Entrée dans un champ et clic forcé ne naviguent pas). Bordures de champs `#6E678A` (≈ 4,8:1 sur ivoire). Le bouton inactif est exempté des exigences de contraste (WCAG 1.4.3, composant inactif) — même tolérance que M1.
20. **Nouvel outil** : `outils/audit-m3.mjs` (déclinaison de l'audit M2 pour la M3).

**Les 3 maquettes sont désormais complètes (7/7 pages chacune), validées accessibilité + QA.** Reste (hors périmètre de cette session) : validation d'Alexis puis publication GitHub Pages (PAUSE prévue par le brief).

*(Ce fichier est mis à jour au fil de la session.)*

## Session du 10 juillet 2026 (assemblage) — SITE PUBLIÉ ✅

21. **Assemblage final** : bandeau inter-pistes « Piste X/3 — Nom · ← Voir les autres pistes » ajouté sur les 21 pages (style neutre identique, nom de piste masqué < 480 px, lien retour toujours accessible) ; index comparatif racine inchangé ; zéro chemin absolu ; QA locale et en ligne PASS (outil `outils/test-assemblage.mjs`).
22. **Dépôt GitHub** : https://github.com/AlexDum1/atpr-maquettes (public). Exclus du dépôt : `Idées Site.pdf`, JPG source, `captures/`, `node_modules/`, `.claude/`.
23. **URL FINALE (à transmettre à l'association)** : **https://alexdum1.github.io/atpr-maquettes/**
    Vérifié en ligne le 10 juillet 2026 : index comparatif, 7 pages de la maquette 2 (QA PASS complet, JSON chargés, menu mobile), pages 1 et 3 + les deux JSON répondent 200.

## Session « Version 3 » (21 juillet 2026) — passage maquette → projet

24. **Direction retenue** : la piste 3 « Carte blanche » sert de base, **éclaircie**. Nouveau dossier
    auto-portant `version-3/` (7 pages + `styles.css` + `script.js` + `STYLE-GUIDE.md` + `data/`). Les
    3 maquettes initiales restent en archive. Le site devient le **projet réel** de l'association
    (cible : `psychosomatique-relationnelle.fr`) : retrait du bandeau inter-piste, du bandeau « Piste
    créative » et de la mention de pied de page correspondante.
25. **Palette claire (référence couleur)** consignée dans `version-3/STYLE-GUIDE.md` §2 : mauve `#74658E`,
    vert-bleu `#73C0A8`, bleu `#819EB8`, orangé `#F5BD46` (couleurs du logo). L'aubergine sombre
    `#423A5A` et les bandes inversées foncées sont remplacées par du mauve clair (texte ivoire ≥ 4,78:1) ;
    boutons en orangé (texte encre 6,86:1). Tous les jetons de texte revérifiés WCAG AA.
26. **Logo** : la proposition SVG « main » a été **abandonnée** à la demande d'Alexis (risque d'un logo
    inventé présenté comme officiel). Header/footer en **wordmark seul + placeholder** (`.marque__placeholder`,
    cadre pointillé « logo ») ; favicon = PNG existant ; pictogramme « maison habitée » et filigranes
    retirés. Le logo définitif (image001.png fourni par l'association) sera intégré ensuite — l'échange est
    trivial (voir `version-3/STYLE-GUIDE.md` §4). *NB : une image `cid:` d'e-mail n'est pas récupérable ;
    déposer le fichier dans `assets/logos/`.*
27. **Accueil** : ajout d'une citation de **Sami-Ali** (`[À valider]` libellé/source), section
    « Pourquoi consulter&nbsp;? » (4 raisons fournies) à la place de « Pour qui&nbsp;? » (déplacé sur La PSR).
28. **La PSR** : fusion des ex-titres 4 et 5 (« À qui s'adresse&nbsp;? » + « Quand indiquée&nbsp;? ») ;
    nouvelle section **« Les médiations »** (rêve, corporelle, artistique, marche — transposées en voix
    institutionnelle, une phrase source tronquée marquée `[À compléter]`) ; **fondements** enrichis, auteurs
    mis en avant (Sami-Ali, Roussillon, **Green**, Winnicott, Anzieu, **Marty** — Green/Marty `[À valider]`) ;
    dé-duplication FF2P (retirée de l'encart « Le saviez-vous&nbsp;? »). Séance et différence
    psychanalyse/PSR conservées.
29. **Annuaire** : schéma enrichi (`version-3/data/annuaire.json` : prénom, nom, ville, **département**,
    adresse, **photo**, **spécialité**, **liens** site + réseaux). Rendu `initAnnuaire` refait :
    regroupement **par département d'Occitanie** puis « Autres régions » ; **photos uniformisées** (avatar
    initiales à défaut). Données `[EXEMPLE]` recentrées sur l'Occitanie.
30. **Chemins de données** : `version-3` étant auto-portant, les `fetch` pointent vers `./data/…`
    (et non `../data/…`) ; `agenda.json` copié dans `version-3/data/`.
31. **Articles** conservés ; **Côté Pro / Agenda / Contact** portés sur la palette claire + logo « main »,
    sans chrome « piste ». Carte « Version 3 — direction retenue » ajoutée à l'index comparatif racine.
32. **À valider par l'asso** (récap `STYLE-GUIDE.md` §9) : citation Sami-Ali, phrase médiation corporelle
    tronquée, descripteurs Green/Marty, fichiers logo définitifs, données réelles annuaire + RGPD,
    mentions légales / coordonnées / adhésion, nom de domaine.
