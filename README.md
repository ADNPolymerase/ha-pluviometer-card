# Pluviometer Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-pluviometer-card?sort=semver)](https://github.com/ADNPolymerase/ha-pluviometer-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-pluviometer-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-pluviometer-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-pluviometer-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

Multilingual (6 languages: EN, FR, DE, ES, IT, NL — auto-detected from Home Assistant).

A Lovelace card that draws a **real garden rain gauge** — funnel, graduated tube and mounting
bracket — and fills it with water as the rain falls. Works with any precipitation sensor
(Netatmo, weather integrations, DIY…), in mm or inches.

> 🇫🇷 [Lire en français](README.fr.md)

![Pluviometer Card](https://raw.githubusercontent.com/ADNPolymerase/ha-pluviometer-card/main/docs/screenshot.png)

## Features

- Faithful rain-gauge look: flared funnel, graduated tube, mounting bracket, animated water level.
- **Auto graduations**: tick marks and labels adapt to the scale you choose (`max_level` = daily maximum).
- Semi-transparent bracket so graduations stay readable — or hide it with `show_bracket: false`.
- **No daily total sensor? One click fixes it**: if the selected sensor isn't a daily cumulative, the editor offers a button that creates the needed helpers for you (a daily utility meter — plus an integration sensor first when your source is a rate in mm/h).
- **Collapsible 24 h history**: enable `show_history` and the card gets a discreet button that expands a 24 h chart of hourly (or half-hourly) rain bars, drawn with the water color from the HA history API. The y-scale is a multiple of 5: minimum 5, rounded up to the next 5 above the biggest bar.
- **Battery and connectivity** in the card corners: pick a battery entity (icon with colored level, percentage, or both) and a connectivity entity (wifi icon, red and crossed when offline).
- **Overflow easter egg**: when the daily total exceeds `max_level`, the funnel fills up, drops fly out and splash on the card title and into a cartoon puddle spreading below the gauge.
- **Gauge color**: clear, bottle green, amber or smoked glass (`glass_color`) — or any custom color in YAML.
- Unit read from the entity (mm, in…), configurable decimals and water color.
- Optional subtitle (e.g. "today") and secondary entity (e.g. rain rate mm/h).
- Native HA editor (entity picker) + full YAML control. Tap opens more-info.

## Installation (HACS)

1. HACS → three dots → **Custom repositories**
2. Add `https://github.com/ADNPolymerase/ha-pluviometer-card` with category **Dashboard**
3. Install **Pluviometer Card**, then hard-refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)

Manual alternative: copy `pluviometer-card.js` from the [latest release](https://github.com/ADNPolymerase/ha-pluviometer-card/releases) to `config/www/`, then add `/local/pluviometer-card.js` as a JavaScript-module resource.

## Usage

Add the card from the dashboard UI (search "Pluviometer") — a precipitation sensor is auto-detected.
Or in YAML:

```yaml
type: custom:pluviometer-card
entity: sensor.rain_gauge_precipitation_today
name: Rain gauge
label: today
max_level: 20            # gauge scale, in the entity's unit (default 40)
decimals: 1
water_color: "#3d9bd9"
secondary_entity: sensor.rain_gauge_precipitation   # optional, e.g. rain rate
```

| Option | Default | Description |
|---|---|---|
| `entity` | **required** | Any numeric sensor (precipitation recommended) |
| `name` | friendly name | Title shown next to the gauge |
| `label` | — | Subtitle under the value (e.g. "today") |
| `max_level` | `40` | Daily precipitation maximum (full gauge), in the entity's unit |
| `decimals` | `1` | Decimals for the displayed value |
| `water_color` | `#3d9bd9` | Water fill color |
| `show_bracket` | `true` | Show the mounting bracket (semi-transparent) |
| `show_history` | `false` | Adds the collapsible 24 h history button |
| `history_bucket` | `hour` | 24 h chart bars: `hour` or `half_hour` |
| `glass_color` | `clear` | Gauge tint: `clear`, `bottle_green`, `amber`, `smoked` or a hex color |
| `secondary_name` | friendly name | Display name for the secondary entity |
| `battery_entity` | — | Battery sensor shown top-right |
| `battery_display` | `both` | `icon`, `percent` or `both` |
| `connectivity_entity` | — | Connectivity sensor shown top-left |
| `unit` | entity unit | Unit override |
| `secondary_entity` | — | Extra sensor shown under the value |
| `language` | auto | `en`, `fr`, `de`, `es`, `it`, `nl` |

## License

MIT — see [LICENSE](LICENSE).
