# STYLE-GUIDE — Version 3 · Site A.T.P.R. (projet)

Guide d'intégration du site **Version 3**, direction retenue (base éditoriale « Carte blanche »
éclaircie). Source des textes : `../contenu/corpus.md` (à utiliser sans reformuler ; espaces avant
`: ; ? !` et dans les guillemets « » en `&nbsp;`). Ce document tient lieu de **référence couleur**.

---

## 1. Le parti pris

Identité éditoriale « revue clinique » douce : grands titres Fraunces, filets fins, respiration inégale
mais voulue. **Couleurs claires** inspirées du logo (voir §2), **logo à motif « main »** (le soin qui
accueille — plus de maison/pictogramme immobilier). Aucun noir pur, aucune couleur saturée agressive,
mouvements quasi absents. Ce n'est plus une maquette mais le projet réel : **pas de bandeau « piste »**,
seulement des placeholders `[À fournir]` honnêtes pour les données réelles manquantes.

## 2. Référence couleur (palette du logo)

Couleurs de marque fournies par l'association (décor & aplats — **jamais** pour le texte) :

| Rôle | Couleur | Hex | Jeton CSS |
|---|---|---|---|
| Mauve — ancre : bandes claires-inversées, marque, focus | mauve | `#74658E` | `--cb-aubergine` |
| Vert-bleu — accent végétal, décor | vert bleu | `#73C0A8` | `--cb-sauge` |
| Bleu — tertiaire, washes & décor | bleu | `#819EB8` | `--cb-bleu` |
| Orangé — filets 1 px + **fond des boutons/CTA** | orangé | `#F5BD46` | `--cb-ocre` |
| Ivoire — fond papier | — | `#F6F4EE` | `--cb-ivoire` |

Dérivés foncés **seuls autorisés pour le TEXTE** (contrastes WCAG 2.1 AA vérifiés) :

| Jeton | Hex | Contraste |
|---|---|---|
| `--cb-encre` (corps sur ivoire) | `#3A3450` | 10,7:1 |
| `--cb-titre` (titres, mauve profond, sur ivoire) | `#5A4D72` | 6,97:1 |
| `--cb-sauge-texte` (liens/accents vert-bleu sur ivoire) | `#27735F` | ≥ 4,7:1 |
| `--cb-ocre-texte` (badges) | `#8A6410` | 4,9:1 |
| `--cb-ivoire-texte` (texte sur mauve/footer) | `#F6F4EE` | ≥ 4,8:1 |
| `--cb-lavande-texte` (secondaire, footer mauve profond) | `#D8D2E4` | 6,6:1 |

Règles :
- **Bandes claires-inversées** (`.bande-aubergine`) = fond mauve `#74658E` + texte ivoire (≥ 4,78:1).
  Ne **jamais** poser du texte blanc sur le bleu `#819EB8` (trop clair, ~3:1).
- **Boutons** (`.bouton`) = fond orangé `#F5BD46` + texte encre (6,86:1). Hover : `--cb-ocre-fonce` `#E0A52A`.
- Vert-bleu `#73C0A8` et bleu `#819EB8` = **décor uniquement**.
- Filets fins (hairlines) = orangé `#F5BD46` (`--filet-ocre`).

## 3. Typographie (inchangée)

- **Display : Fraunces** (axe optique 9..144, graisses 340–560, `font-variation-settings: "opsz"` bas).
  Italiques expressives sur **un** mot par grand titre (`<em>`).
- **Corps : Albert Sans** 400/500 (600 pour les libellés).
- Chargement (Google Fonts) dans chaque `<head>` :
  `Albert+Sans:wght@400;500;600` + `Fraunces:ital,opsz,wght@0,9..144,340..560;1,9..144,340..560`.
- Échelle `--fs-200` → `--fs-950`. Typo française (`&nbsp;` avant `: ; ? !` et dans « »).

## 4. Le logo « main » (signature — proposition à valider)

Fichier : `../assets/logos/logo-main.svg`. Motif : **deux mains en coupe qui accueillent la fleur**
(côté humain/relationnel ; écho de l'identité aquarelle ; aucune maison). Couleurs de la palette.
- **Header/footer** (`.marque__picto`, 44 px) : mains en `currentColor` (mauve dans le header,
  vert-bleu clair dans le footer) + fleur en couleurs fixes.
- **Filigrane** (accueil) : mains (`.filigrane__enveloppe`, faibles) + fleur (`.filigrane__spirale`).
- **Favicon** : `logo-main.svg` (SVG) avec repli PNG `favicon-64.png`.
- Le wordmark garde **« Maison de la Psychosomatique Relationnelle »** — seul le symbole change.
- ⚠️ **Proposition remplaçable** par les fichiers logo définitifs de l'association.

## 5. Header / footer

Markup identique sur toutes les pages (copier tel quel). État actif via `aria-current="page"` sur
l'entrée courante. 7 entrées de nav (Accueil, La PSR, Côté Pro, Agenda, Annuaire, Articles, Contact) +
menu mobile accessible (`aria-expanded`, Échap, clic extérieur). Skip-link premier élément focusable.
Footer : rappel logo, nav secondaire, mention FF2P (une seule fois), Mentions légales `[À fournir]`.

## 6. Composants clés

| Classe | Usage |
|---|---|
| `.conteneur` / `.grille-12` | Gabarit 1200 px / grille 12 col ≥ 1024 px |
| `.eyebrow` | Sur-titre petites capitales + filet orangé |
| `.bouton` / `.bouton--inverse` | CTA orangé / action sur bande mauve |
| `.lien-filet` | Lien éditorial (filet orangé qui s'étend) |
| `.bande-aubergine` | Bande claire-inversée mauve (texte ivoire) |
| `.citation-bande` / `.citation` | Pull-quote (bande bleu pâle) — accueil |
| `.bloc-public` | Blocs numérotés en marge (accueil « Pourquoi consulter ? ») |
| `.mediations` | Liste des médiations (page La PSR) |
| `.auteurs` | Pastilles des auteurs de référence (fondements) |
| `.annuaire-region` / `.fiche` | Annuaire : groupes par département + fiches (avatar, liens…) |
| `.badge-note` | Placeholder `[Exemple]` / `[À fournir]` (jamais de crochets bruts) |

## 7. Données (rendu JS)

- **Chemins relatifs internes au dossier** : `./data/agenda.json` et `./data/annuaire.json`
  (le site est auto-portant). Fallback `<noscript>` et états chargement/erreur/vide prévus.
- **Annuaire** (`initAnnuaire`) : regroupement **par département d'Occitanie**, puis « Autres régions » ;
  fiche = photo uniformisée (avatar initiales si absente), prénom + nom, ville + département, spécialité,
  modalités, adresse, liens (site + réseaux), contact `mailto:`. Schéma : voir `data/annuaire.json`.
- **Agenda** (`initAgenda`) : tri par date, regroupement par mois, badges type/modalité.

## 8. Accessibilité & mouvement

- Un seul `h1` par page ; hiérarchie sans saut ; landmarks. Texte = dérivés du §2 uniquement.
- `prefers-reduced-motion: reduce` neutralise toutes les animations (règle globale).
- Cibles tactiles ≥ 44 px. Poids < 300 Ko/page hors fonts. SVG inline ; aucune dépendance JS externe.

## 9. Points à valider par l'association

- **Citation Sami-Ali** (accueil) : libellé exact + source à confirmer.
- **Médiations** (La PSR) : formulations adaptées d'un texte de praticienne ; une phrase du document
  source est **interrompue** (médiation corporelle) → à compléter.
- **Auteurs Green & Marty** (fondements) : ajoutés à la demande ; descripteurs à valider.
- **Logo « main »** : proposition SVG, à remplacer par les fichiers définitifs.
- **Annuaire** : données réelles (Occitanie) + photos + accords RGPD.
- **Mentions légales, coordonnées, adhésion** : `[À fournir par l'asso]`.
- **Nom de domaine cible** : `psychosomatique-relationnelle.fr`.
