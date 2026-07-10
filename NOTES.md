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
