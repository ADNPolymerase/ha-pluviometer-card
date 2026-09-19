# Pluviometer Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-blue.svg)](https://github.com/hacs/default)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-pluviometer-card?sort=semver)](https://github.com/ADNPolymerase/ha-pluviometer-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-pluviometer-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-pluviometer-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-pluviometer-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

Multilingual (13 languages: EN, FR, DE, ES, IT, NL, PT, SV, NO, DA, PL, HU, RU), detected from Home Assistant or chosen per card.

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
- **Battery in any format**: percentage by default, or switch `battery_type` to `other` for sensors that report something else, such as the cell voltage on an Ecowitt WH40. The reading is then shown with its own unit, and giving `battery_min` / `battery_max` turns it back into a proper level gauge.
- **Gauge color**: clear, bottle green, amber or smoked glass (`glass_color`) — or any custom color in YAML.
- Unit read from the entity (mm, in…), configurable decimals and water color.
- **As many secondary entities as you like**, one line each under the value, for the extra rain sensors a station such as an Ecowitt exposes. A single one can carry its own display name and unit, so a sensor reporting mm shows as `mm/h` without touching the entity.
- Optional subtitle, e.g. "today".
- Native HA editor, grouped into collapsible panels, with entity pickers filtered to what makes sense (rain, battery, connectivity device classes). Full YAML control too, which accepts any entity. Tap opens more-info.

## Installation (HACS)

Available directly in HACS — no custom repository needed.

1. Open **HACS**, search for **Pluviometer Card** and install it
2. Hard-refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)

As a custom repository: HACS → three dots → **Custom repositories** → add `https://github.com/ADNPolymerase/ha-pluviometer-card` with category **Dashboard**.

Manual alternative: copy `pluviometer-card.js` from the [latest release](https://github.com/ADNPolymerase/ha-pluviometer-card/releases) to `config/www/`, then add `/local/pluviometer-card.js` as a JavaScript-module resource.

## Usage

Add the card from the dashboard UI (search "Pluviometer") — a precipitation sensor is auto-detected.
Or in YAML:

```yaml
type: custom:pluviometer-card
entity: sensor.rain_gauge_precipitation_today
name: Rain gauge
label: today
max_level: 20            # daily maximum, in the entity's unit (default 40)
show_history: true       # adds the 24 h chart button
history_expanded: true   # and keeps it permanently visible
secondary_entity: sensor.rain_gauge_precipitation
secondary_name: Rain rate
secondary_unit: mm/h     # shown as mm/h without touching the entity
battery_entity: sensor.rain_gauge_battery
connectivity_entity: binary_sensor.rain_gauge_connectivity
```

Several secondary entities, one line each. Plain ids are enough; the object form
adds a name and a unit per line, which the visual editor preserves but cannot set:

```yaml
secondary_entity:
  - sensor.rain_event
  - sensor.rain_weekly
  - entity: sensor.rain_piezo_rate
    name: Rain rate
    unit: mm/h
```

| Option | Default | Description |
|---|---|---|
| `entity` | **required** | Any numeric sensor (precipitation recommended) |
| `name` | friendly name | Title shown next to the gauge |
| `label` | — | Subtitle under the value (e.g. "today") |
| `unit` | entity unit | Displayed unit, overrides the entity's |
| `decimals` | `1` | Decimals for the displayed value |
| `max_level` | `40` | Daily precipitation maximum (full gauge), in the entity's unit |
| `water_color` | `#3d9bd9` | Water fill color |
| `glass_color` | `clear` | Gauge tint: `clear`, `bottle_green`, `amber`, `smoked` or a hex color |
| `show_bracket` | `true` | Show the mounting bracket (semi-transparent) |
| `show_history` | `false` | Adds the collapsible 24 h history button |
| `history_expanded` | `false` | Keep that chart permanently visible, no button to click |
| `history_bucket` | `hour` | 24 h chart bars: `hour` or `half_hour` |
| `secondary_entity` | — | Extra sensor under the value. A list gives one line per entity |
| `secondary_name` | friendly name | Display name, single secondary entity only |
| `secondary_unit` | entity unit | Displayed unit, single secondary entity only |
| `battery_entity` | — | Battery sensor shown top-right |
| `battery_type` | `percent` | `percent`, or `other` for a sensor that is not a percentage |
| `battery_min` | — | Value meaning empty, in the sensor's unit (`other` only) |
| `battery_max` | — | Value meaning full, in the sensor's unit (`other` only) |
| `battery_display` | `both` | `icon`, `percent` or `both` |
| `connectivity_entity` | — | Connectivity sensor shown top-left |
| `language` | same as HA | Card language, whatever Home Assistant uses: `en`, `fr`, `de`, `es`, `it`, `nl`, `pt`, `sv`, `no`, `da`, `pl`, `hu`, `ru` |

## License

MIT — see [LICENSE](LICENSE).
