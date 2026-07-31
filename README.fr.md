# Pluviometer Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/pluviometer-card?sort=semver)](https://github.com/ADNPolymerase/pluviometer-card/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/pluviometer-card/blob/main/LICENSE)

> 🇬🇧 [Read in English](README.md)

Une card Lovelace qui dessine un **vrai pluviomètre de jardin** — entonnoir, tube gradué et
collier de fixation — et le remplit d'eau au fil de la pluie. Fonctionne avec n'importe quel
capteur de précipitations (Netatmo, intégrations météo, DIY…), en mm ou en pouces.

![Pluviometer Card](https://raw.githubusercontent.com/ADNPolymerase/pluviometer-card/main/docs/screenshot.fr.png)

## Fonctionnalités

- Silhouette fidèle : entonnoir évasé, tube gradué, collier noir, niveau d'eau animé.
- **Graduations automatiques** : ticks et labels s'adaptent à l'échelle choisie (`max_level`).
- Unité lue sur l'entité (mm, in…), décimales et couleur de l'eau configurables.
- Sous-titre optionnel (ex. « aujourd'hui ») et entité secondaire (ex. intensité mm/h).
- Éditeur natif HA (sélecteur d'entité) + YAML complet. Un tap ouvre le more-info.

## Installation (HACS)

1. HACS → trois points → **Dépôts personnalisés**
2. Ajouter `https://github.com/ADNPolymerase/pluviometer-card` avec la catégorie **Dashboard**
3. Installer **Pluviometer Card**, puis rafraîchir le navigateur (Ctrl+Shift+R / Cmd+Shift+R)

Alternative manuelle : copier `pluviometer-card.js` depuis la [dernière release](https://github.com/ADNPolymerase/pluviometer-card/releases) vers `config/www/`, puis ajouter `/local/pluviometer-card.js` comme ressource JavaScript-module.

## Utilisation

```yaml
type: custom:pluviometer-card
entity: sensor.pluviometre_precipitation_aujourd_hui
name: Pluviomètre
label: aujourd'hui
max_level: 20            # échelle de la jauge, dans l'unité de l'entité (défaut 40)
decimals: 1
water_color: "#3d9bd9"
secondary_entity: sensor.pluviometre_precipitation   # optionnel, ex. intensité
```

| Option | Défaut | Description |
|---|---|---|
| `entity` | **requis** | Tout capteur numérique (précipitations recommandé) |
| `name` | friendly name | Titre affiché à côté de la jauge |
| `label` | — | Sous-titre sous la valeur (ex. « aujourd'hui ») |
| `max_level` | `40` | Valeur jauge pleine, dans l'unité de l'entité |
| `decimals` | `1` | Décimales de la valeur affichée |
| `water_color` | `#3d9bd9` | Couleur de l'eau |
| `unit` | unité de l'entité | Forçage de l'unité |
| `secondary_entity` | — | Capteur supplémentaire affiché sous la valeur |
| `language` | auto | `en`, `fr`, `de`, `es`, `it`, `nl` |

## Licence

MIT — voir [LICENSE](LICENSE).
