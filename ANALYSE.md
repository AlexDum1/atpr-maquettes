# ANALYSE — Identité graphique A.T.P.R. / Maison de la Psychosomatique Relationnelle

Analyse produite par échantillonnage programmatique des fichiers fournis (JPG logo maison + 4 images 2000×2000 extraites du PDF « Idées Site.pdf »).

## 1. Palette finale (échantillonnée sur les logos)

Valeurs exactes mesurées (couleur dominante par famille de teinte, logo « lettres » — le plus net) :

| Rôle | Hex mesuré | Source |
|---|---|---|
| Violet (lettre A) — **couleur principale** | `#A295C1` | logo lettres / contour maison `#A397BF` |
| Vert d'eau (lettre T) — secondaire | `#74BFA8` | logo lettres / toit maison `#75C0A9` |
| Bleu-gris (lettre P) — tertiaire | `#7F9EBA` | logo lettres |
| Jaune ocre (lettre R) — accent | `#F5BD46` | logo lettres / fleur `#F8BF54` |
| Pastels aquarelle (fonds) | `#CAA4F9` / `#C5EBD6` / `#FDE9AC` | logo cercle aquarelle |
| Sauge/violet doux (fleur) | `#7CA593` / `#948EB4` | logo fleur |

### Custom properties (socle commun)

```css
:root {
  /* Couleurs de marque (mesurées) — usage décoratif et grands aplats uniquement */
  --atpr-violet: #A295C1;
  --atpr-vert: #74BFA8;
  --atpr-bleu: #7F9EBA;
  --atpr-jaune: #F5BD46;
  /* Pastels aquarelle (fonds de sections, lavis) */
  --atpr-lavande: #CAA4F9;
  --atpr-vert-pale: #C5EBD6;
  --atpr-jaune-pale: #FDE9AC;
  /* Dérivés accessibles pour le TEXTE (ratios sur ivoire #FBFAF7) */
  --atpr-encre: #423C52;        /* 10.1:1 — texte courant */
  --atpr-violet-fonce: #57506B; /*  7.3:1 — titres */
  --atpr-vert-sombre: #3E7E6B;  /*  4.6:1 — liens/accents texte */
  --atpr-bleu-sombre: #47677F;  /*  5.7:1 */
  --atpr-ocre-texte: #8A6410;   /*  5.1:1 */
  /* Neutres */
  --atpr-ivoire: #FBFAF7;
  --atpr-gris-doux: #EFEDF3;
}
```

### ⚠️ Règle de contraste (mesurée, WCAG 2.1 AA)

Les 4 couleurs de marque sont **trop claires pour du texte sur fond clair** (violet `#A295C1` : 2,65:1). Elles servent aux éléments graphiques, fonds et grands aplats ; **tout texte utilise les dérivés foncés ci-dessus**. Texte encre `#423C52` sur bouton jaune `#F5BD46` : 6,1:1 ✓.

## 2. Inventaire des logos

Fichiers nettoyés dans `assets/logos/` (recadrage automatique du fond blanc, marge 4 %) ; versions `-alpha` (blanc → transparent, utilisables sur fonds clairs uniquement) ; versions `-560` redimensionnées pour le web.

| Fichier | Contenu | Usage recommandé |
|---|---|---|
| `logo-maison[-alpha][-560].png` | Maison 2 contours (violet + toit vert), halo de points ocre, titre « Maison de la Psychosomatique Relationnelle », A.T.P.R. colorée | **Logo primaire** des maquettes 1 et 2 |
| `logo-lettres[-alpha][-560].png` | A.T.P.R. lettres colorées + sous-titre | ⚠️ contient une **coquille : « Psychsosomatique »** — ne pas utiliser tel quel |
| `logo-lettres-eclat[-alpha][-560].png` | A.T.P.R. + éclat vert 3 traits | élément secondaire possible |
| `logo-cercle-aquarelle[-alpha][-560].png` | cercle lavis violet/vert/jaune, A.T.P.R | inspiration maquette 2 ; favicon possible |
| `logo-fleur[-alpha][-560].png` | fleur/lotus 6 pétales + A.T.P.R. | inspiration pictogrammes ; `favicon-64.png` en dérive |

Les originaux ne sont fournis qu'en JPG/PNG matriciels : **une version SVG vectorielle est indispensable en phase 2** (netteté, poids, recoloration).

## 3. Contenus manquants (à fournir par l'association)

- Coordonnées de contact (adresse, e-mail, téléphone) et modalités d'adhésion (montant, bulletin)
- Liste réelle des thérapeutes (nom, ville, modalités, contact) **avec accord RGPD individuel**
- Dates réelles de supervision/intervision/événements
- Historique de l'association (date de création, fondateurs) et composition du bureau
- Mentions légales : responsable de publication, siège social, hébergeur
- Validation du logo officiel (4 variantes existent) et correction de la coquille du logo « lettres »
