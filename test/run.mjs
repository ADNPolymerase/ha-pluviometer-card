/**
 * pluviometer-card — behaviour tests.  Run with:  node test/run.mjs
 *
 * The card folds a history of cumulative readings into per-hour rain bars.
 * That arithmetic is the kind that stays plausible while being wrong: a bar
 * off by one slot, a midnight reset counted as 12 mm of rain, an empty answer
 * drawn as a flat chart. Everything below pins those down.
 *
 * TZ is forced to UTC and the clock frozen so bucket labels are identical here
 * and on CI; the timezone section moves TZ on purpose. Numbers are compared
 * after normalising the decimal separator, because the card formats through
 * toLocaleString and the machine locale is not ours to choose.
 *
 * Point the suite at another build to check it still catches regressions:
 *   git show v0.4.0:dist/pluviometer-card.js > /tmp/old.js
 *   PLUVIO_CARD=/tmp/old.js node test/run.mjs
 */
process.env.TZ = 'UTC';

import { fileURLToPath } from 'node:url';
import { dirname, join, isAbsolute } from 'node:path';
import { loadCard, freezeClock, check, contains, report } from './harness.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const TARGET = process.env.PLUVIO_CARD
  ? (isAbsolute(process.env.PLUVIO_CARD)
      ? process.env.PLUVIO_CARD
      : join(process.cwd(), process.env.PLUVIO_CARD))
  : join(HERE, '..', 'dist', 'pluviometer-card.js');

const registry = await loadCard(TARGET);
const Card   = registry.get('pluviometer-card');
const Editor = registry.get('pluviometer-card-editor');

const HOUR = 3600 * 1000;
const RAIN = 'sensor.rain';

// 10:20Z sits inside an hour and inside a half-hour, so the window has to be
// rounded UP to 11:00Z. Freezing on a round hour would have hidden that.
freezeClock('2026-08-12T10:20:00Z');
const WIN_END   = Date.UTC(2026, 7, 12, 11);      // hourly buckets
const WIN_START = WIN_END - 24 * HOUR;

/** Locale-proof: the card formats numbers through toLocaleString. */
const norm = s => String(s).replace(/[  ]/g, ' ').replace(',', '.');

/**
 * The card writes into nodes it looked up once in _build(). The harness hands
 * out inert nodes, so tests build the same map by hand and read it back — this
 * exercises the real _update()/_updateCorners() without needing a DOM.
 */
const EL_IDS = ['pv-wrap', 'pv-water', 'pv-water-rect', 'pv-water-top', 'pv-name',
  'pv-value', 'pv-unit', 'pv-label', 'pv-secondary', 'pv-hist-toggle', 'pv-hist',
  'pv-hist-label', 'pv-hist-body', 'pv-conn', 'pv-conn-off', 'pv-batt',
  'pv-batt-fill', 'pv-batt-pct', 'pv-overflow'];

function stub() {
  const kids = {};
  const n = {
    textContent: '', innerHTML: '', hidden: false, title: '', style: {},
    classList: { _set: new Set(),
      add(c) { this._set.add(c); }, remove(c) { this._set.delete(c); },
      toggle(c, on) { on ? this._set.add(c) : this._set.delete(c); },
      contains(c) { return this._set.has(c); } },
    setAttribute(k, v) { n[k] = v; }, getAttribute(k) { return n[k]; },
    addEventListener() {},
    // memoised, so the node the card wrote into is the node the test reads
    querySelector(sel) { return (kids[sel] ||= stub()); },
  };
  return n;
}

/** A card wired to a hass state, already rendered. */
function makeCard(config, states, hassExtra = {}) {
  const c = Object.create(Card.prototype);
  c.setConfig({ entity: RAIN, ...config });
  c._built = true;
  c._el = Object.fromEntries(EL_IDS.map(id => [id, stub()]));
  c._hass = { language: 'fr', states, ...hassExtra };
  c._update();
  return c;
}

const rainState = (v, attrs = {}) => ({
  [RAIN]: { state: String(v),
    attributes: { friendly_name: 'Pluviomètre', unit_of_measurement: 'mm',
      device_class: 'precipitation', ...attrs } },
});

/** Bare instance for the pure history helpers — no DOM needed at all. */
function histInstance(config = {}) {
  const inst = Object.create(Card.prototype);
  inst.setConfig({ entity: RAIN, ...config });
  inst._hass = { language: 'fr', states: rainState(0) };
  return inst;
}
const chart = (config, points) => histInstance(config)._histSvg(points);

/** Rain totals per bar, read back out of the <title> the card writes. */
function barsOf(svg) {
  const out = [];
  const re = /<title>([^<]*?) : ([\d.,  ]+)\s/g;
  let m;
  while ((m = re.exec(svg))) out.push({ label: m[1], mm: parseFloat(norm(m[2])) });
  return out;
}
const totalOf = svg => barsOf(svg).reduce((s, b) => s + b.mm, 0);
/** The y-scale the card chose: gridlines are drawn 0, half, full. */
function scaleOf(svg) {
  const vals = [...svg.matchAll(/text-anchor="end">([\d.,  ]+)<\/text>/g)]
    .map(m => parseFloat(norm(m[1])));
  return Math.max(...vals);
}

/** History points, offsets in hours from the window start. */
const pts = pairs => pairs.map(([h, v]) => ({ t: WIN_START + h * HOUR, v }));

// ── Bucketing ────────────────────────────────────────────────────────────────
// A reading is rain accumulated since the previous one, so the delta belongs to
// the bar of the LATER point. Off by one here shifts every shower by an hour.

{
  const bars = barsOf(chart({}, pts([[0, 0], [3, 2], [4, 5]])));
  check('deux averses → deux barres', bars.length, 2);
  check('delta porté par la barre du point le plus récent', bars[0].label, '14h–15h');
  check('première barre = 2 mm', bars[0].mm, 2);
  check('seconde barre = 3 mm (5 − 2)', bars[1].mm, 3);
}

check('relevés multiples dans la même heure → une seule barre',
  barsOf(chart({}, pts([[0, 0], [3.1, 1], [3.4, 2], [3.9, 3]]))).length, 1);

// ── Window boundaries ────────────────────────────────────────────────────────
// start is inclusive, end exclusive. A point on the wrong side of either edge
// is a bar that appears or vanishes for no visible reason.

check('point exactement au début de fenêtre → compté',
  totalOf(chart({}, [{ t: WIN_START - HOUR, v: 0 }, { t: WIN_START, v: 4 }])), 4);

check('point exactement à la fin de fenêtre → exclu',
  totalOf(chart({}, [{ t: WIN_END - HOUR, v: 0 }, { t: WIN_END, v: 4 }])), 0);

check('point entièrement antérieur à la fenêtre → exclu',
  totalOf(chart({}, [{ t: WIN_START - 3 * HOUR, v: 0 }, { t: WIN_START - HOUR, v: 9 }])), 0);

check('pluie tombée avant la fenêtre mais relevée dedans → comptée en entier',
  totalOf(chart({}, [{ t: WIN_START - 5 * HOUR, v: 0 }, { t: WIN_START + HOUR, v: 7 }])), 7);

check('dernière barre = heure écoulée avant maintenant',
  barsOf(chart({}, [{ t: WIN_END - 2 * HOUR, v: 0 }, { t: WIN_END - 1, v: 3 }])).at(-1).label,
  '10h–11h');

// ── Counter resets ───────────────────────────────────────────────────────────
// A daily total drops to 0 at midnight. Counting that drop as rain would be
// silent and huge; dropping the reading after it would lose real rain.

{
  const svg = chart({}, pts([[0, 0], [5, 8], [12, 12], [13, 0], [14, 3]]));
  check('remise à zéro : la chute n\'est pas comptée', totalOf(svg), 15);
  check('remise à zéro : la pluie d\'après est bien comptée',
    barsOf(svg).some(b => b.mm === 3), true);
}

{
  // Reset and the rain right after it inside the SAME hour. Netting the drop
  // against the rain would cancel the bar out instead of showing 3 mm, and a
  // bar that never gets drawn is invisible in every other assertion here.
  const svg = chart({}, [
    { t: WIN_START + 13 * HOUR +  5 * 60000, v: 12 },
    { t: WIN_START + 13 * HOUR + 20 * 60000, v: 0 },
    { t: WIN_START + 13 * HOUR + 40 * 60000, v: 3 },
  ]);
  check('remise à zéro dans l\'heure : la barre montre bien la pluie d\'après', totalOf(svg), 3);
  check('remise à zéro dans l\'heure : la barre existe', barsOf(svg).length, 1);
}

check('valeur qui ne bouge pas → aucune barre',
  barsOf(chart({}, pts([[0, 5], [6, 5], [12, 5]]))).length, 0);

check('capteur qui ne fait que décroître → aucune barre',
  barsOf(chart({}, pts([[0, 9], [6, 6], [12, 3]]))).length, 0);

check('un seul relevé → rien à comparer, aucune barre',
  barsOf(chart({}, pts([[4, 7]]))).length, 0);

// ── Y scale ──────────────────────────────────────────────────────────────────

check('échelle plancher à 5 même sans pluie', scaleOf(chart({}, pts([[0, 0], [2, 0.4]]))), 5);
check('échelle arrondie au multiple de 5 supérieur', scaleOf(chart({}, pts([[0, 0], [2, 6.2]]))), 10);
check('échelle exacte sur un multiple de 5', scaleOf(chart({}, pts([[0, 0], [2, 10]]))), 10);

// ── Half-hour buckets ────────────────────────────────────────────────────────

{
  const svg = chart({ history_bucket: 'half_hour' }, [
    { t: WIN_START + 2 * HOUR, v: 0 },
    { t: WIN_START + 2 * HOUR + 10 * 60000, v: 1 },
    { t: WIN_START + 2 * HOUR + 40 * 60000, v: 3 },
  ]);
  const bars = barsOf(svg);
  check('demi-heure : deux barres distinctes', bars.length, 2);
  check('demi-heure : libellé de la première moitié', bars[0].label, '13h–13h30');
  check('demi-heure : libellé de la seconde moitié', bars[1].label, '13h30–14h');
  check('demi-heure : total conservé', totalOf(svg), 3);
}

check('même pluie, heure ou demi-heure : total identique',
  totalOf(chart({ history_bucket: 'half_hour' }, pts([[0, 0], [5, 8], [14, 11]]))),
  totalOf(chart({}, pts([[0, 0], [5, 8], [14, 11]]))));

// ── Empty and broken history ─────────────────────────────────────────────────
// _loadHist owns the only callApi of the card. Every failure mode must land on
// the "no data" message rather than an empty chart or a thrown error.

async function loadWith(apiResult) {
  const inst = Object.create(Card.prototype);
  inst.setConfig({ entity: RAIN, show_history: true });
  inst._hass = {
    language: 'fr', states: rainState(0),
    callApi: async () => (typeof apiResult === 'function' ? apiResult() : apiResult),
  };
  inst._el = { 'pv-hist-body': stub() };
  await inst._loadHist();
  return inst._el['pv-hist-body'].innerHTML;
}

contains('historique vide → message "aucune donnée"', await loadWith([[]]), 'Aucune donnée');
contains('réponse sans série → message', await loadWith([]), 'Aucune donnée');
contains('réponse nulle → message', await loadWith(null), 'Aucune donnée');
contains('API en erreur → message, pas d\'exception',
  await loadWith(() => { throw new Error('boom'); }), 'Aucune donnée');
contains('états non numériques → message',
  await loadWith([[{ state: 'unavailable', last_changed: new Date(WIN_END - HOUR).toISOString() },
                   { state: 'unknown', last_changed: new Date(WIN_END - HOUR).toISOString() }]]),
  'Aucune donnée');
contains('historique exploitable → un graphe',
  await loadWith([[
    { state: '0', last_changed: new Date(WIN_START + HOUR).toISOString() },
    { state: '4', last_changed: new Date(WIN_START + 2 * HOUR).toISOString() },
  ]]), '<svg');

{
  const inst = Object.create(Card.prototype);
  inst.setConfig({ entity: RAIN, show_history: true });
  let seen = null;
  inst._hass = { language: 'fr', states: rainState(0),
    callApi: async (method, url) => { seen = { method, url }; return [[]]; } };
  inst._el = { 'pv-hist-body': stub() };
  await inst._loadHist();
  check('historique demandé en GET', seen.method, 'GET');
  contains('historique demandé pour la bonne entité', seen.url, `filter_entity_id=${RAIN}`);
  contains('fenêtre demandée plus large que 24 h', seen.url,
    new Date(Date.now() - 25 * HOUR).toISOString());
}

// ── Timezones ────────────────────────────────────────────────────────────────
// Buckets are cut on UTC hours while labels print in local time. On a whole-hour
// offset the two agree; on a half-hour offset (India) they cannot, and the label
// is the local hour the bucket opens in. Pinned so a change is a decision.

function labelUnder(tz) {
  process.env.TZ = tz;
  const label = barsOf(chart({},
    [{ t: WIN_START + 2 * HOUR, v: 0 }, { t: WIN_START + 3 * HOUR, v: 2 }]))[0].label;
  process.env.TZ = 'UTC';
  return label;
}

check('UTC : barre 14h–15h', labelUnder('UTC'), '14h–15h');
check('Paris (UTC+2 en été) : même barre à 16h–17h', labelUnder('Europe/Paris'), '16h–17h');
check('New York (UTC−4 en été) : même barre à 10h–11h', labelUnder('America/New_York'), '10h–11h');
check('Inde (UTC+5:30) : découpe UTC, libellé local → 19h–20h', labelUnder('Asia/Kolkata'), '19h–20h');

check('changer de fuseau ne change pas la pluie totalisée',
  (() => { process.env.TZ = 'Asia/Kolkata';
           const t = totalOf(chart({}, pts([[0, 0], [5, 8], [14, 11]])));
           process.env.TZ = 'UTC'; return t; })(),
  totalOf(chart({}, pts([[0, 0], [5, 8], [14, 11]]))));

// ── Value, unit and level ────────────────────────────────────────────────────

{
  const c = makeCard({ max_level: 20 }, rainState(12.6));
  check('valeur affichée', norm(c._el['pv-value'].textContent), '12.6');
  check('unité reprise de l\'entité', c._el['pv-unit'].textContent, ' mm');
  check('niveau d\'eau à 63 %', c._el['pv-water'].style.transform, 'translateY(58.1px)');
  check('pas de débordement sous le maximum', c._el['pv-overflow'].style.display, 'none');
}

check('unité forcée par la config',
  makeCard({ unit: 'in' }, rainState(1.2))._el['pv-unit'].textContent, ' in');
check('nom forcé par la config',
  makeCard({ name: 'Jardin' }, rainState(1))._el['pv-name'].textContent, 'Jardin');
check('sans nom, le friendly_name de l\'entité',
  makeCard({}, rainState(1))._el['pv-name'].textContent, 'Pluviomètre');

check('au-delà du maximum, le débordement s\'affiche',
  makeCard({ max_level: 20 }, rainState(24.8))._el['pv-overflow'].style.display, '');
check('au-delà du maximum, le niveau reste plafonné',
  makeCard({ max_level: 20 }, rainState(24.8))._el['pv-water'].style.transform, 'translateY(0.0px)');
check('cuve vide → niveau au plus bas',
  makeCard({ max_level: 20 }, rainState(0))._el['pv-water'].style.transform, 'translateY(157.0px)');

check('entité indisponible → tiret',
  makeCard({}, { [RAIN]: { state: 'unavailable', attributes: {} } })._el['pv-value'].textContent, '—');
check('entité inconnue → tiret',
  makeCard({}, { [RAIN]: { state: 'unknown', attributes: {} } })._el['pv-value'].textContent, '—');
check('entité absente → tiret', makeCard({}, {})._el['pv-value'].textContent, '—');
check('indisponible → pas de débordement résiduel',
  makeCard({ max_level: 1 }, { [RAIN]: { state: 'unavailable', attributes: {} } })
    ._el['pv-overflow'].style.display, 'none');

// ── Secondary entity ─────────────────────────────────────────────────────────

{
  const states = { ...rainState(12.6),
    'sensor.rate': { state: '3.2',
      attributes: { friendly_name: 'Pluie heure', unit_of_measurement: 'mm' } } };

  check('secondaire : unité de l\'entité par défaut',
    norm(makeCard({ secondary_entity: 'sensor.rate' }, states)._el['pv-secondary'].textContent),
    'Pluie heure : 3.2 mm');

  check('secondaire : unité forcée sans toucher à l\'entité',
    norm(makeCard({ secondary_entity: 'sensor.rate', secondary_name: 'Intensité',
      secondary_unit: 'mm/h' }, states)._el['pv-secondary'].textContent),
    'Intensité : 3.2 mm/h');

  check('secondaire absent → masqué', makeCard({}, states)._el['pv-secondary'].hidden, true);
}

// ── Battery in any unit ──────────────────────────────────────────────────────
// A voltage read as a percentage draws a full cell as nearly empty.

const battState = (v, unit) => ({ ...rainState(5),
  'sensor.batt': { state: String(v), attributes: { unit_of_measurement: unit } } });
const battSvg = c => c._el['pv-batt'].querySelector('svg').style.display;

{
  const c = makeCard({ battery_entity: 'sensor.batt' }, battState(70, '%'));
  check('batterie en % : texte', c._el['pv-batt-pct'].textContent, '70%');
  check('batterie en % : icône visible', battSvg(c), '');
  check('batterie en % : remplissage', c._el['pv-batt-fill'].width, '10.5');
}

{
  const c = makeCard({ battery_entity: 'sensor.batt' }, battState(1.5, 'V'));
  check('tension sans plage : valeur avec son unité', norm(c._el['pv-batt-pct'].textContent), '1.5 V');
  check('tension sans plage : pas de jauge inventée', battSvg(c), 'none');
}

{
  const c = makeCard({ battery_entity: 'sensor.batt', battery_type: 'other',
    battery_min: 1.1, battery_max: 1.6 }, battState(1.5, 'V'));
  check('tension avec plage : valeur avec son unité', norm(c._el['pv-batt-pct'].textContent), '1.5 V');
  check('tension avec plage : icône réaffichée', battSvg(c), '');
  check('tension avec plage : remplissage à 80 %', c._el['pv-batt-fill'].width, '12.0');
}

check('tension sous le minimum → jauge vide, pas négative',
  makeCard({ battery_entity: 'sensor.batt', battery_type: 'other', battery_min: 1.1,
    battery_max: 1.6 }, battState(0.9, 'V'))._el['pv-batt-fill'].width, '0.8');
check('tension au-dessus du maximum → jauge pleine, pas débordante',
  makeCard({ battery_entity: 'sensor.batt', battery_type: 'other', battery_min: 1.1,
    battery_max: 1.6 }, battState(2.0, 'V'))._el['pv-batt-fill'].width, '15.0');
check('batterie non numérique → coin masqué',
  makeCard({ battery_entity: 'sensor.batt' }, battState('unavailable', '%'))._el['pv-batt'].hidden, true);
check('sans entité batterie → coin masqué',
  makeCard({}, rainState(5))._el['pv-batt'].hidden, true);

// ── Connectivity ─────────────────────────────────────────────────────────────

const connState = s => ({ ...rainState(5), 'binary_sensor.conn': { state: s, attributes: {} } });
const connBar = s => makeCard({ connectivity_entity: 'binary_sensor.conn' }, connState(s))
  ._el['pv-conn-off'].style.display;

check('connectivité on → pas de barre rouge', connBar('on'), 'none');
check('connectivité off → barre rouge', connBar('off'), '');
check('connectivité indisponible → traitée comme hors ligne', connBar('unavailable'), '');
check('sans entité de connectivité → coin masqué',
  makeCard({}, connState('on'))._el['pv-conn'].hidden, true);

// ── Editor contract ──────────────────────────────────────────────────────────
// CustomEvent.detail is a readonly accessor: assigning it after construction
// drops the payload silently and every edit made in the editor is lost.

function makeEditor(config) {
  const ed = new Editor();
  const listeners = {};
  ed.insertBefore = node => ed.appendChild(node);   // absent from the harness node
  const create = globalThis.document.createElement;
  globalThis.document.createElement = tag => {
    const n = create(tag);
    n.addEventListener = (type, fn) => { (listeners[type] ||= []).push(fn); };
    return n;
  };
  ed.setConfig(config);
  ed.hass = { language: 'fr', states: rainState(5) };
  globalThis.document.createElement = create;
  return { ed, fire: v => listeners['value-changed'].forEach(fn => fn({ detail: { value: v } })) };
}

{
  const { ed, fire } = makeEditor({ entity: RAIN });
  fire({ entity: 'sensor.other', secondary_unit: 'mm/h', max_level: 20 });
  const ev = ed.events.at(-1);
  check('l\'éditeur émet config-changed', ev?.type, 'config-changed');
  check('config-changed porte un detail non nul', ev?.detail?.config != null, true);
  check('config-changed porte l\'entité éditée', ev?.detail?.config?.entity, 'sensor.other');
  check('config-changed porte les nouvelles options', ev?.detail?.config?.secondary_unit, 'mm/h');
  check('config-changed conserve le type de carte',
    ev?.detail?.config?.type, 'custom:pluviometer-card');
}

{
  const { ed } = makeEditor({ entity: RAIN });
  const names = ed._form.schema.map(f => f.name);
  check('format batterie proposé dans l\'éditeur', names.includes('battery_type'), true);
  check('plage batterie cachée en mode pourcentage', names.includes('battery_min'), false);
  check('unité secondaire proposée dans l\'éditeur', names.includes('secondary_unit'), true);
  check('unité principale proposée dans l\'éditeur', names.includes('unit'), true);
}

{
  const { ed } = makeEditor({ entity: RAIN, battery_type: 'other' });
  const names = ed._form.schema.map(f => f.name);
  check('plage batterie révélée en mode autre unité', names.includes('battery_min'), true);
  check('plage batterie : les deux bornes', names.includes('battery_max'), true);
  const picker = ed._form.schema.find(f => f.name === 'battery_entity');
  check('mode autre unité : sélecteur ouvert à tous les capteurs',
    JSON.stringify(picker.selector.entity.filter), '[{"domain":"sensor"}]');
}

// ── Silent config loss ───────────────────────────────────────────────────────
// HA calls setConfig again after every config-changed the editor emits. If that
// rebuilt the pickers, a freshly created one can emit an empty value-changed
// before it knows its value, and that empty lands on top of the configured
// entity. The card then shows "entity not found" with nobody having touched it.

{
  const { ed } = makeEditor({ entity: RAIN });
  const form = ed._form;
  ed.setConfig({ entity: RAIN });
  ed.setConfig({ entity: RAIN });
  check('le formulaire n\'est pas reconstruit à chaque setConfig', ed._form === form, true);
}

{
  // Pickers initialising: empty values arriving before any user interaction.
  const { ed, fire } = makeEditor({ entity: RAIN, secondary_entity: 'sensor.rate' });
  const before = ed.events.length;
  fire({ entity: '', secondary_entity: '' });
  check('picker qui s\'initialise : l\'entité configurée survit', ed._config.entity, RAIN);
  check('picker qui s\'initialise : l\'entité secondaire survit',
    ed._config.secondary_entity, 'sensor.rate');
  check('picker qui s\'initialise : aucune config sans entité émise',
    ed.events.slice(before).filter(e => e.type === 'config-changed')
      .every(e => !!e.detail?.config?.entity), true);
}

{
  // Once the user has actually touched the form, clearing is deliberate.
  const { ed, fire } = makeEditor({ entity: RAIN, secondary_entity: 'sensor.rate' });
  ed._touched = true;
  fire({ entity: RAIN });
  check('après interaction, effacer le secondaire est accepté',
    ed._config.secondary_entity, undefined);
  check('après interaction, l\'entité principale reste',
    ed._config.entity, RAIN);
}

{
  // The same value coming back is HA echoing, not an edit.
  const { ed, fire } = makeEditor({ entity: RAIN });
  fire({ entity: 'sensor.other' });
  const n = ed.events.length;
  fire({ entity: 'sensor.other' });
  check('écho identique : pas de nouvel événement', ed.events.length, n);
}

report();
