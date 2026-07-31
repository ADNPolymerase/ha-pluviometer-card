# Pluviometer Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-pluviometer-card?sort=semver)](https://github.com/ADNPolymerase/ha-pluviometer-card/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-pluviometer-card/blob/main/LICENSE)

> 🇬🇧 [Read in English](README.md)

Une card Lovelace qui dessine un **vrai pluviomètre de jardin** — entonnoir, tube gradué et
collier de fixation — et le remplit d'eau au fil de la pluie. Fonctionne avec n'importe quel
capteur de précipitations (Netatmo, intégrations météo, DIY…), en mm ou en pouces.

![Pluviometer Card](https://raw.githubusercontent.com/ADNPolymerase/ha-pluviometer-card/main/docs/screenshot.fr.png)

## Fonctionnalités

- Silhouette fidèle : entonnoir évasé, tube gradué, collier de fixation, niveau d'eau animé.
- **Graduations automatiques** : ticks et labels s'adaptent à l'échelle choisie (`max_level` = maximum par jour).
- Collier semi-transparent pour laisser les graduations lisibles — ou masquable avec `show_bracket: false`.
- **Pas de capteur de cumul journalier ? Un clic suffit** : si le capteur choisi n'est pas un cumul, l'éditeur propose un bouton qui crée les helpers nécessaires (compteur `utility_meter` à cycle journalier — précédé d'un capteur `integration` si la source est une intensité en mm/h).
- **Tracé 24 h dépliable** : avec `show_history`, la card gagne un bouton discret qui déroule un graphique en barres par heure (ou demi-heure) des dernières 24 h, dans la couleur de l'eau, via l'API history de HA. L'échelle s'ajuste à la plus grosse barre (minimum 5).
- **Batterie et connectivité** dans les coins de la card : entité batterie (icône à niveau coloré, pourcentage, ou les deux) et entité connectivité (icône wifi, barrée en rouge si déconnecté).
- **Easter egg débordement** : quand le cumul du jour dépasse `max_level`, l'entonnoir se remplit, des gouttes s'envolent et s'écrasent sur le titre de la card et dans une flaque cartoon qui s'étale sous le pluviomètre.
- **Couleur du pluviomètre** : transparent, vert bouteille, ambré ou fumé (`glass_color`) — ou toute couleur libre en YAML.
- Unité lue sur l'entité (mm, in…), décimales et couleur de l'eau configurables.
- Sous-titre optionnel (ex. « aujourd'hui ») et entité secondaire (ex. intensité mm/h).
- Éditeur natif HA (sélecteur d'entité) + YAML complet. Un tap ouvre le more-info.

## Installation (HACS)

1. HACS → trois points → **Dépôts personnalisés**
2. Ajouter `https://github.com/ADNPolymerase/ha-pluviometer-card` avec la catégorie **Dashboard**
3. Installer **Pluviometer Card**, puis rafraîchir le navigateur (Ctrl+Shift+R / Cmd+Shift+R)

Alternative manuelle : copier `pluviometer-card.js` depuis la [dernière release](https://github.com/ADNPolymerase/ha-pluviometer-card/releases) vers `config/www/`, puis ajouter `/local/pluviometer-card.js` comme ressource JavaScript-module.

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
| `max_level` | `40` | Maximum de précipitations par jour (jauge pleine), dans l'unité de l'entité |
| `decimals` | `1` | Décimales de la valeur affichée |
| `water_color` | `#3d9bd9` | Couleur de l'eau |
| `show_bracket` | `true` | Afficher le collier de fixation (semi-transparent) |
| `show_history` | `false` | Ajoute le bouton du tracé 24 h dépliable |
| `history_bucket` | `hour` | Barres du tracé : `hour` ou `half_hour` |
| `glass_color` | `clear` | Teinte : `clear`, `bottle_green`, `amber`, `smoked` ou couleur hex |
| `secondary_name` | friendly name | Nom affiché de l'entité secondaire |
| `battery_entity` | — | Capteur batterie affiché en haut à droite |
| `battery_display` | `both` | `icon`, `percent` ou `both` |
| `connectivity_entity` | — | Capteur de connectivité affiché en haut à gauche |
| `unit` | unité de l'entité | Forçage de l'unité |
| `secondary_entity` | — | Capteur supplémentaire affiché sous la valeur |
| `language` | auto | `en`, `fr`, `de`, `es`, `it`, `nl` |

## Licence

MIT — voir [LICENSE](LICENSE).
