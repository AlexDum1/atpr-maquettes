# ÉTAT — Inventaire avant assemblage & publication (10 juillet 2026)

## Maquettes

| Fichier | M1 Maison | M2 Aquarelle | M3 Carte blanche |
|---|---|---|---|
| index.html | ✅ | ✅ | ✅ |
| psr.html | ✅ | ✅ | ✅ |
| cote-pro.html | ✅ | ✅ | ✅ |
| agenda.html | ✅ | ✅ | ✅ |
| annuaire.html | ✅ | ✅ | ✅ |
| articles.html | ✅ | ✅ | ✅ |
| contact.html | ✅ | ✅ | ✅ |
| styles.css | ✅ | ✅ | ✅ |
| script.js | ✅ | ✅ | ✅ |

## Données partagées

- `data/agenda.json` ✅ — chargé par les 3 maquettes via `../data/agenda.json` (relatif)
- `data/annuaire.json` ✅ — chargé via `../data/annuaire.json` (relatif)

## Racine

- `index.html` (index comparatif, 3 cartes) ✅ — déjà réalisé en session précédente
- `assets/logos/` ✅ (référencés en relatif par les maquettes et l'index)

## Vérifications

- Chemins absolus (`href="/`, `src="/`, `url(/`) : **aucun** ✅
- `fetch()` JSON : tous relatifs ✅

## Manquant / à faire cette session

- [x] Dépôt git (inexistant → initialisé cette session)
- [x] Bandeau de navigation inter-pistes « Piste X/3 » dans les 21 pages
- [x] Test local complet (QA 3×7 pages PASS, parcours index↔maquettes PASS, 375 px OK, zéro erreur console)
- [ ] Publication GitHub Pages (après validation d'Alexis)

**Rien de bloquant. Aucune correction de maquette nécessaire.**
