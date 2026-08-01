const CARD_VERSION = "0.3.2";

console.info(
  "%c PLUVIOMETER-CARD %c v" + CARD_VERSION + " ",
  "color:white;background:#1c6ea4;font-weight:700;",
  "color:#1c6ea4;background:white;font-weight:700;"
);

const PV_LANGNAMES = { en: "English", fr: "Français", de: "Deutsch", es: "Español", it: "Italiano", nl: "Nederlands" };

const PV_T = {
  en: { entity: "Rain sensor", name: "Name", label: "Subtitle", max: "Daily precipitation maximum (full gauge)", decimals: "Decimals",
    color: "Water color (hex)", secondary: "Secondary entity (e.g. rain rate)", language: "Language", auto: "Auto",
    unavailable: "Unavailable", bracket: "Show mounting bracket",
    notCumul: "This sensor does not look like a daily total.", createBtn: "Create the daily total sensor",
    creating: "Creating…", created: "Created and selected: ", createError: "Creation failed: ",
    dailySuffix: "daily total", totalSuffix: "total",
    hist: "Last 24 h", noData: "No data", histOpt: "Show the 24 h history button",
    bucketOpt: "24 h chart bars", bucketHour: "Per hour", bucketHalf: "Per half-hour",
    glassOpt: "Gauge color", glassClear: "Clear", glassGreen: "Bottle green", glassAmber: "Amber", glassSmoked: "Smoked",
    secName: "Secondary entity display name",
    battOpt: "Battery entity", battDisp: "Battery display", battIcon: "Icon", battPct: "Percentage", battBoth: "Both",
    connOpt: "Connectivity entity" },
  fr: { entity: "Capteur de pluie", name: "Nom", label: "Sous-titre", max: "Maximum de précipitations par jour (jauge pleine)", decimals: "Décimales",
    color: "Couleur de l'eau (hex)", secondary: "Entité secondaire (ex. intensité)", language: "Langue", auto: "Auto",
    unavailable: "Indisponible", bracket: "Afficher le collier de fixation",
    notCumul: "Ce capteur ne semble pas être un cumul journalier.", createBtn: "Créer le capteur de cumul journalier",
    creating: "Création…", created: "Créé et sélectionné : ", createError: "Échec de la création : ",
    dailySuffix: "cumul du jour", totalSuffix: "total",
    hist: "Dernières 24 h", noData: "Aucune donnée", histOpt: "Afficher le bouton tracé 24 h",
    bucketOpt: "Barres du tracé 24 h", bucketHour: "Par heure", bucketHalf: "Par demi-heure",
    glassOpt: "Couleur du pluviomètre", glassClear: "Transparent", glassGreen: "Vert bouteille", glassAmber: "Ambré", glassSmoked: "Fumé",
    secName: "Nom affiché de l'entité secondaire",
    battOpt: "Entité batterie", battDisp: "Affichage batterie", battIcon: "Icône", battPct: "Pourcentage", battBoth: "Les deux",
    connOpt: "Entité connectivité" },
  de: { entity: "Regensensor", name: "Name", label: "Untertitel", max: "Tagesmaximum Niederschlag (volle Skala)", decimals: "Dezimalstellen",
    color: "Wasserfarbe (Hex)", secondary: "Sekundäre Entität (z. B. Regenrate)", language: "Sprache", auto: "Auto",
    unavailable: "Nicht verfügbar", bracket: "Halterung anzeigen",
    notCumul: "Dieser Sensor scheint keine Tagessumme zu sein.", createBtn: "Tagessummen-Sensor erstellen",
    creating: "Wird erstellt…", created: "Erstellt und ausgewählt: ", createError: "Fehlgeschlagen: ",
    dailySuffix: "Tagessumme", totalSuffix: "gesamt",
    hist: "Letzte 24 h", noData: "Keine Daten", histOpt: "24-h-Verlauf-Button anzeigen",
    bucketOpt: "Balken 24-h-Diagramm", bucketHour: "Pro Stunde", bucketHalf: "Pro halbe Stunde",
    glassOpt: "Farbe des Regenmessers", glassClear: "Transparent", glassGreen: "Flaschengrün", glassAmber: "Bernstein", glassSmoked: "Rauchglas",
    secName: "Anzeigename der sekundären Entität",
    battOpt: "Batterie-Entität", battDisp: "Batterieanzeige", battIcon: "Symbol", battPct: "Prozent", battBoth: "Beides",
    connOpt: "Konnektivitäts-Entität" },
  es: { entity: "Sensor de lluvia", name: "Nombre", label: "Subtítulo", max: "Máximo diario de precipitación (escala completa)", decimals: "Decimales",
    color: "Color del agua (hex)", secondary: "Entidad secundaria (p. ej. intensidad)", language: "Idioma", auto: "Auto",
    unavailable: "No disponible", bracket: "Mostrar el soporte",
    notCumul: "Este sensor no parece un total diario.", createBtn: "Crear el sensor de total diario",
    creating: "Creando…", created: "Creado y seleccionado: ", createError: "Error al crear: ",
    dailySuffix: "total diario", totalSuffix: "total",
    hist: "Últimas 24 h", noData: "Sin datos", histOpt: "Mostrar el botón de historial 24 h",
    bucketOpt: "Barras del gráfico 24 h", bucketHour: "Por hora", bucketHalf: "Por media hora",
    glassOpt: "Color del pluviómetro", glassClear: "Transparente", glassGreen: "Verde botella", glassAmber: "Ámbar", glassSmoked: "Ahumado",
    secName: "Nombre mostrado de la entidad secundaria",
    battOpt: "Entidad de batería", battDisp: "Visualización de batería", battIcon: "Icono", battPct: "Porcentaje", battBoth: "Ambos",
    connOpt: "Entidad de conectividad" },
  it: { entity: "Sensore pioggia", name: "Nome", label: "Sottotitolo", max: "Massimo giornaliero di pioggia (scala piena)", decimals: "Decimali",
    color: "Colore dell'acqua (hex)", secondary: "Entità secondaria (es. intensità)", language: "Lingua", auto: "Auto",
    unavailable: "Non disponibile", bracket: "Mostra la staffa",
    notCumul: "Questo sensore non sembra un totale giornaliero.", createBtn: "Crea il sensore del totale giornaliero",
    creating: "Creazione…", created: "Creato e selezionato: ", createError: "Creazione fallita: ",
    dailySuffix: "totale giornaliero", totalSuffix: "totale",
    hist: "Ultime 24 h", noData: "Nessun dato", histOpt: "Mostra il pulsante storico 24 h",
    bucketOpt: "Barre del grafico 24 h", bucketHour: "Ogni ora", bucketHalf: "Ogni mezz'ora",
    glassOpt: "Colore del pluviometro", glassClear: "Trasparente", glassGreen: "Verde bottiglia", glassAmber: "Ambra", glassSmoked: "Fumé",
    secName: "Nome visualizzato dell'entità secondaria",
    battOpt: "Entità batteria", battDisp: "Visualizzazione batteria", battIcon: "Icona", battPct: "Percentuale", battBoth: "Entrambi",
    connOpt: "Entità connettività" },
  nl: { entity: "Regensensor", name: "Naam", label: "Ondertitel", max: "Dagelijks neerslagmaximum (volle schaal)", decimals: "Decimalen",
    color: "Waterkleur (hex)", secondary: "Secundaire entiteit (bijv. regenintensiteit)", language: "Taal", auto: "Auto",
    unavailable: "Niet beschikbaar", bracket: "Beugel tonen",
    notCumul: "Deze sensor lijkt geen dagtotaal te zijn.", createBtn: "Dagtotaal-sensor aanmaken",
    creating: "Aanmaken…", created: "Aangemaakt en geselecteerd: ", createError: "Aanmaken mislukt: ",
    dailySuffix: "dagtotaal", totalSuffix: "totaal",
    hist: "Afgelopen 24 u", noData: "Geen gegevens", histOpt: "Toon de 24 u-geschiedenisknop",
    bucketOpt: "Balken 24 u-grafiek", bucketHour: "Per uur", bucketHalf: "Per half uur",
    glassOpt: "Kleur van de regenmeter", glassClear: "Transparant", glassGreen: "Flesgroen", glassAmber: "Amber", glassSmoked: "Rookglas",
    secName: "Weergavenaam secundaire entiteit",
    battOpt: "Batterij-entiteit", battDisp: "Batterijweergave", battIcon: "Pictogram", battPct: "Percentage", battBoth: "Beide",
    connOpt: "Connectiviteits-entiteit" },
};

function pvSlugify(s) {
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function pvLangCode(hass, config) {
  const l = (config && config.language) || (hass && (hass.locale ? hass.locale.language : hass.language)) || "en";
  const s = String(l).substring(0, 2).toLowerCase();
  return PV_T[s] ? s : "en";
}
function pvT(hass, config) { return PV_T[pvLangCode(hass, config)]; }

function pvNiceStep(max) {
  const target = max / 4;
  const candidates = [0.25, 0.5, 1, 2, 2.5, 5, 10, 20, 25, 50, 100, 200, 500];
  for (const c of candidates) if (c >= target) return c;
  return Math.ceil(target);
}

function pvFmt(n, decimals) {
  if (n == null || isNaN(n)) return "—";
  return n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

const PV_GLASS = {
  clear: { fill: "rgba(150, 185, 178, 0.14)", stroke: "#7f9494" },
  bottle_green: { fill: "rgba(13, 96, 56, 0.40)", stroke: "#1e6f4b" },
  amber: { fill: "rgba(176, 108, 22, 0.38)", stroke: "#96601a" },
  smoked: { fill: "rgba(60, 60, 60, 0.36)", stroke: "#5c5c5c" },
};

function pvAlpha(color, a) {
  const m = /^#([0-9a-f]{6})$/i.exec(color);
  if (!m) return color;
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

function pvGlassColors(v) {
  if (!v || PV_GLASS[v]) return PV_GLASS[v || "clear"];
  return { fill: pvAlpha(v, 0.24), stroke: v };
}

const PV_DROP = "M0 -7 C2.8 -3 5 0.5 5 3.2 A5 5 0 1 1 -5 3.2 C-5 0.5 -2.8 -3 0 -7 Z";

const PV_SCALE_TOP = 95;
const PV_SCALE_BOTTOM = 252;

class PluviometerCard extends HTMLElement {
  static getConfigElement() { return document.createElement("pluviometer-card-editor"); }

  static getStubConfig(hass) {
    const ids = Object.keys(hass.states).filter((e) => e.startsWith("sensor."));
    const byClass = ids.filter((e) => hass.states[e].attributes.device_class === "precipitation");
    const total = byClass.find((e) => hass.states[e].attributes.state_class === "total_increasing");
    const entity = total || byClass[0] || ids.find((e) => hass.states[e].attributes.unit_of_measurement === "mm") || "";
    return { entity: entity, max_level: 40 };
  }

  setConfig(config) {
    if (!config || !config.entity) throw new Error("Please define an entity (sensor)");
    let max = parseFloat(config.max_level);
    if (!(max > 0)) max = 40;
    let dec = parseInt(config.decimals, 10);
    if (!(dec >= 0 && dec <= 3)) dec = 1;
    this._config = { ...config, max_level: max, decimals: dec, water_color: config.water_color || "#3d9bd9" };
    this._built = false;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._built) { this._build(); this._built = true; }
    this._update();
  }

  getCardSize() { return 4; }

  _ticks() {
    const max = this._config.max_level;
    const major = pvNiceStep(max);
    const minor = major / 5;
    const px = (v) => PV_SCALE_BOTTOM - (v / max) * (PV_SCALE_BOTTOM - PV_SCALE_TOP);
    let out = "";
    for (let v = 0; v <= max + 1e-9; v += minor) {
      const isMajor = Math.abs(v / major - Math.round(v / major)) < 1e-6;
      if (v < 1e-9 && !isMajor) continue;
      const y = px(v).toFixed(1);
      const len = isMajor ? 13 : 7;
      out += `<line x1="64" y1="${y}" x2="${64 + len}" y2="${y}" class="pv-tick${isMajor ? " pv-tick-major" : ""}"/>`;
      if (isMajor && v > 1e-9) {
        const label = major < 1 ? v.toFixed(2).replace(/\.?0+$/, "") : Math.round(v);
        out += `<text x="${64 + len + 2}" y="${(px(v) + 3).toFixed(1)}" class="pv-tick-label">${label}</text>`;
      }
    }
    return out;
  }

  _build() {
    this.innerHTML = "";
    const c = this._config;
    const g = pvGlassColors(c.glass_color);
    const card = document.createElement("ha-card");
    card.style.setProperty("--pv-glass-fill", g.fill);
    card.style.setProperty("--pv-glass-stroke", g.stroke);
    card.innerHTML = `
      <style>
        .pv-wrap { display: flex; align-items: center; gap: 4px; padding: 12px 16px; cursor: pointer; }
        .pv-gauge { flex: none; width: 118px; position: relative; z-index: 1; }
        .pv-gauge svg { display: block; width: 100%; height: auto; overflow: visible; }
        .pv-info { flex: 1; min-width: 0; padding-left: 4px; }
        .pv-name { font-size: 1em; font-weight: 500; color: var(--primary-text-color);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pv-value { font-size: 2.1em; font-weight: 700; color: var(--primary-text-color); line-height: 1.2; }
        .pv-unit { font-size: 0.5em; font-weight: 400; color: var(--secondary-text-color); margin-left: 2px; }
        .pv-label { font-size: 0.85em; color: var(--secondary-text-color); }
        .pv-secondary { font-size: 0.85em; color: var(--secondary-text-color); margin-top: 6px; }
        .pv-glass { fill: var(--pv-glass-fill); stroke: var(--pv-glass-stroke); stroke-width: 2.5; }
        .pv-glass-inner { fill: var(--pv-glass-fill); stroke: var(--pv-glass-stroke); stroke-width: 1; opacity: 0.6; }
        .pv-water { transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1); }
        .pv-bracket { fill: var(--pv-bracket-color, #3a3a3a); opacity: 0.4; }
        .pv-bracket-edge { fill: var(--pv-bracket-color, #3a3a3a); opacity: 0.4; stroke: var(--pv-bracket-edge-color, #4a4a4a); stroke-width: 1; }
        .pv-tick { stroke: var(--secondary-text-color); stroke-width: 1; opacity: 0.55; }
        .pv-tick-major { stroke-width: 1.6; opacity: 0.8; }
        .pv-tick-label { font-size: 9.5px; fill: var(--secondary-text-color); font-family: inherit; }
        .pv-unavailable .pv-gauge, .pv-unavailable .pv-value { opacity: 0.4; }
        .pv-hist-toggle { display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 2px 0 10px; cursor: pointer; color: var(--secondary-text-color);
          font-size: 0.85em; user-select: none; }
        .pv-hist-toggle svg { transition: transform 0.3s; }
        .pv-hist-toggle.pv-open svg { transform: rotate(180deg); }
        .pv-hist { overflow: hidden; max-height: 0; transition: max-height 0.35s ease; padding: 0 16px; }
        .pv-hist.pv-open { max-height: 220px; padding-bottom: 14px; }
        .pv-hist-status { text-align: center; color: var(--secondary-text-color); font-size: 0.85em; padding: 10px 0; }
        .pv-hist-grid { stroke: var(--divider-color, #e0e0e0); stroke-width: 1; }
        .pv-hist-axis { font-size: 10px; fill: var(--secondary-text-color); }
        ha-card { position: relative; }
        .pv-corner { position: absolute; top: 10px; display: flex; align-items: center; gap: 5px;
          font-size: 0.9em; color: var(--secondary-text-color); z-index: 2; }
        .pv-corner[hidden] { display: none !important; }
        .pv-batt { right: 12px; }
        .pv-conn { left: 12px; }
        .pv-conn.pv-off { color: var(--error-color, #db4437); }
        .pv-drip { opacity: 0; }
        .pv-drip-r1 { animation: pv-drip-r1 2.9s linear infinite; }
        .pv-drip-r2 { animation: pv-drip-r2 3.7s linear infinite; animation-delay: 1.3s; }
        .pv-drip-r3 { animation: pv-drip-r3 3.2s linear infinite; animation-delay: 2.4s; }
        .pv-drip-r4 { animation: pv-drip-r4 3.9s linear infinite; animation-delay: 0.9s; }
        .pv-drip-r5 { animation: pv-drip-r5 4.4s linear infinite; animation-delay: 3.1s; }
        .pv-drip-r6 { animation: pv-drip-r6 3.0s linear infinite; animation-delay: 1.8s; }
        .pv-drip-r7 { animation: pv-drip-r7 3.5s linear infinite; animation-delay: 2.9s; }
        .pv-drip-r8 { animation: pv-drip-r8 4.1s linear infinite; animation-delay: 0.4s; }
        @keyframes pv-drip-r1 {
          0% { transform: translate(0, 0) rotate(-58deg) scale(1); opacity: 0; }
          7% { opacity: 0.85; }
          45% { transform: translate(36px, 20px) rotate(-45deg) scale(1); opacity: 0.85; }
          74% { transform: translate(60px, 69px) rotate(-15deg) scale(1); opacity: 0.85; }
          80% { transform: translate(60px, 69px) rotate(0deg) scale(1.7, 0.4); opacity: 0.75; }
          100% { transform: translate(60px, 69px) rotate(0deg) scale(2.4, 0.12); opacity: 0; }
        }
        @keyframes pv-drip-r2 {
          0% { transform: translate(0, 0) rotate(-58deg) scale(1); opacity: 0; }
          7% { opacity: 0.8; }
          45% { transform: translate(70px, 40px) rotate(-45deg) scale(1); opacity: 0.8; }
          74% { transform: translate(122px, 88px) rotate(-15deg) scale(1); opacity: 0.8; }
          80% { transform: translate(122px, 88px) rotate(0deg) scale(1.7, 0.4); opacity: 0.7; }
          100% { transform: translate(122px, 88px) rotate(0deg) scale(2.4, 0.12); opacity: 0; }
        }
        @keyframes pv-drip-r3 {
          0% { transform: translate(0, 0) rotate(-58deg) scale(1); opacity: 0; }
          7% { opacity: 0.8; }
          45% { transform: translate(78px, 42px) rotate(-45deg) scale(1); opacity: 0.8; }
          74% { transform: translate(133px, 78px) rotate(-15deg) scale(1); opacity: 0.8; }
          80% { transform: translate(133px, 78px) rotate(0deg) scale(1.7, 0.4); opacity: 0.7; }
          100% { transform: translate(133px, 78px) rotate(0deg) scale(2.4, 0.12); opacity: 0; }
        }
        @keyframes pv-drip-r4 {
          0% { transform: translate(0, 0) rotate(-58deg) scale(1); opacity: 0; }
          7% { opacity: 0.8; }
          45% { transform: translate(40px, 22px) rotate(-45deg) scale(1); opacity: 0.8; }
          75% { transform: translate(70px, 140px) rotate(-12deg) scale(1); opacity: 0.8; }
          92% { transform: translate(90px, 259px) rotate(0deg) scale(1); opacity: 0.8; }
          96% { transform: translate(90px, 259px) rotate(0deg) scale(1.6, 0.35); opacity: 0.7; }
          100% { transform: translate(90px, 259px) rotate(0deg) scale(2, 0.18); opacity: 0; }
        }
        @keyframes pv-drip-r5 {
          0% { transform: translate(0, 0) rotate(-62deg) scale(1); opacity: 0; }
          7% { opacity: 0.8; }
          45% { transform: translate(120px, 45px) rotate(-45deg) scale(1); opacity: 0.8; }
          75% { transform: translate(210px, 190px) rotate(-12deg) scale(1); opacity: 0.8; }
          92% { transform: translate(258px, 357px) rotate(0deg) scale(1); opacity: 0.8; }
          96% { transform: translate(258px, 357px) rotate(0deg) scale(1.6, 0.35); opacity: 0.7; }
          100% { transform: translate(258px, 357px) rotate(0deg) scale(2, 0.18); opacity: 0; }
        }
        @keyframes pv-drip-r6 {
          0% { transform: translate(0, 0) rotate(-58deg) scale(1); opacity: 0; }
          7% { opacity: 0.8; }
          45% { transform: translate(85px, 38px) rotate(-45deg) scale(1); opacity: 0.8; }
          74% { transform: translate(167px, 87px) rotate(-15deg) scale(1); opacity: 0.8; }
          80% { transform: translate(167px, 87px) rotate(0deg) scale(1.7, 0.4); opacity: 0.7; }
          100% { transform: translate(167px, 87px) rotate(0deg) scale(2.4, 0.12); opacity: 0; }
        }
        @keyframes pv-drip-r7 {
          0% { transform: translate(0, 0) rotate(-52deg) scale(1); opacity: 0; }
          7% { opacity: 0.8; }
          45% { transform: translate(30px, 20px) rotate(-40deg) scale(1); opacity: 0.8; }
          75% { transform: translate(28px, 150px) rotate(-8deg) scale(1); opacity: 0.8; }
          92% { transform: translate(23px, 247px) rotate(0deg) scale(1); opacity: 0.8; }
          96% { transform: translate(23px, 247px) rotate(0deg) scale(1.6, 0.35); opacity: 0.7; }
          100% { transform: translate(23px, 247px) rotate(0deg) scale(2, 0.18); opacity: 0; }
        }
        @keyframes pv-drip-r8 {
          0% { transform: translate(0, 0) rotate(-60deg) scale(1); opacity: 0; }
          7% { opacity: 0.8; }
          45% { transform: translate(75px, 40px) rotate(-45deg) scale(1); opacity: 0.8; }
          75% { transform: translate(110px, 220px) rotate(-10deg) scale(1); opacity: 0.8; }
          92% { transform: translate(127px, 337px) rotate(0deg) scale(1); opacity: 0.8; }
          96% { transform: translate(127px, 337px) rotate(0deg) scale(1.6, 0.35); opacity: 0.7; }
          100% { transform: translate(127px, 337px) rotate(0deg) scale(2, 0.18); opacity: 0; }
        }
        .pv-puddle { transform-origin: 180px 259px; animation: pv-puddle 2.8s ease-in-out infinite alternate; }
        @keyframes pv-puddle {
          0% { transform: scale(1, 1); }
          100% { transform: scale(1.02, 1.1); }
        }

      </style>
      <div class="pv-corner pv-conn" id="pv-conn" hidden>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
          <path d="M3.5 9.5 A 12 12 0 0 1 20.5 9.5"/>
          <path d="M6.5 12.7 A 8 8 0 0 1 17.5 12.7"/>
          <path d="M9.4 15.8 A 4.2 4.2 0 0 1 14.6 15.8"/>
          <circle cx="12" cy="18.6" r="1.5" fill="currentColor" stroke="none"/>
          <line id="pv-conn-off" x1="4" y1="3.5" x2="20.5" y2="20" style="display:none;"/>
        </svg>
      </div>
      <div class="pv-corner pv-batt" id="pv-batt" hidden>
        <svg width="28" height="16" viewBox="0 0 24 14" id="pv-batt-icon">
          <rect x="1" y="2" width="19" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/>
          <rect x="21" y="5" width="2.4" height="4" rx="1" fill="currentColor"/>
          <rect id="pv-batt-fill" x="3" y="4" width="15" height="6" rx="1" fill="currentColor"/>
        </svg>
        <span id="pv-batt-pct"></span>
      </div>
      <div class="pv-wrap" id="pv-wrap">
        <div class="pv-gauge">
        <svg viewBox="0 0 160 272" xmlns="http://www.w3.org/2000/svg" role="img">
          <defs>
            <clipPath id="pv-clip-${this._uid()}">
              <path d="M60.5 84 L64.5 254 Q64.6 256 67 256 L83 256 Q85.4 256 85.5 254 L89.5 84 Z"/>
            </clipPath>
          </defs>
          <g clip-path="url(#pv-clip-${this._uid()})">
            <g class="pv-water" id="pv-water">
              <rect id="pv-water-rect" x="55" y="${PV_SCALE_TOP}" width="40" height="${PV_SCALE_BOTTOM - PV_SCALE_TOP + 12}" fill="${c.water_color}" opacity="0.78"/>
              <ellipse id="pv-water-top" cx="75" cy="${PV_SCALE_TOP}" rx="14" ry="2.6" fill="${c.water_color}" opacity="0.95"/>
            </g>
          </g>
          <g id="pv-overflow" style="display:none;">
            <path d="M39 20 Q43 60 60 79 L90 79 Q107 60 111 20 Z" fill="${c.water_color}" opacity="0.7"/>
            <path d="M60 78 L90 78 L89.2 97 L60.8 97 Z" fill="${c.water_color}" opacity="0.78"/>
            <ellipse cx="75" cy="20" rx="36" ry="6" fill="${c.water_color}" opacity="0.85"/>
            <g class="pv-puddle">
              <path d="M16 260 C6 255 18 249 34 251 C42 246 62 246 70 250 C80 245 102 246 110 251 C130 246 155 248 165 253 C185 247 215 248 228 253 C250 248 285 249 297 255 C318 251 345 255 340 261 C350 265 330 269 310 267 C290 271 255 271 240 267 C220 271 185 271 170 266 C150 270 120 271 105 267 C88 271 60 270 48 265 C30 268 8 266 16 260 Z" fill="${c.water_color}" stroke="rgba(0,0,0,0.4)" stroke-width="2" opacity="0.9"/>
              <path d="M40 255 C60 250 90 250 100 254 C90 257 60 257 40 255 Z" fill="#ffffff" opacity="0.28"/>
              <path d="M150 256 C180 251 220 252 235 256 C215 259 170 259 150 256 Z" fill="#ffffff" opacity="0.25"/>
              <path d="M270 258 C290 254 315 255 325 259 C310 261 285 261 270 258 Z" fill="#ffffff" opacity="0.22"/>
            </g>

            <g transform="translate(121 15)"><path class="pv-drip pv-drip-r1" d="${PV_DROP}" fill="${c.water_color}"/></g>
            <g transform="translate(117 21) scale(0.72)"><path class="pv-drip pv-drip-r2" d="${PV_DROP}" fill="${c.water_color}"/></g>
            <g transform="translate(119 18) scale(0.85)"><path class="pv-drip pv-drip-r3" d="${PV_DROP}" fill="${c.water_color}"/></g>
            <g transform="translate(119 17) scale(0.9)"><path class="pv-drip pv-drip-r4" d="${PV_DROP}" fill="${c.water_color}"/></g>
            <g transform="translate(122 20) scale(0.65)"><path class="pv-drip pv-drip-r5" d="${PV_DROP}" fill="${c.water_color}"/></g>
            <g transform="translate(120 16) scale(0.78)"><path class="pv-drip pv-drip-r6" d="${PV_DROP}" fill="${c.water_color}"/></g>
            <g transform="translate(118 17) scale(0.95)"><path class="pv-drip pv-drip-r7" d="${PV_DROP}" fill="${c.water_color}"/></g>
            <g transform="translate(121 19) scale(0.7)"><path class="pv-drip pv-drip-r8" d="${PV_DROP}" fill="${c.water_color}"/></g>

          </g>
          <path class="pv-glass" d="M31 16 Q36 62 57 80 L58 84 L92 84 L93 80 Q114 62 119 16"/>
          <ellipse class="pv-glass" cx="75" cy="15" rx="44" ry="8.5"/>
          <ellipse class="pv-glass-inner" cx="75" cy="17" rx="37" ry="6.5"/>
          <path class="pv-glass" d="M58 84 L62.5 253 Q62.7 258 68 258 L82 258 Q87.3 258 87.5 253 L92 84 Z" fill="none"/>
          <line x1="58" y1="84" x2="92" y2="84" stroke="var(--pv-glass-stroke)" stroke-width="2"/>
          ${c.show_bracket === false ? "" : `
          <rect class="pv-bracket-edge" x="50" y="138" width="50" height="17" rx="3"/>
          <rect class="pv-bracket" x="97" y="142" width="10" height="9"/>
          <path class="pv-bracket-edge" d="M107 140 Q124 132 130 130 L130 163 Q124 161 107 153 Z"/>`}
          <g id="pv-ticks">${this._ticks()}</g>
        </svg>
        </div>
        <div class="pv-info">
          <div class="pv-name" id="pv-name"></div>
          <div class="pv-value"><span id="pv-value">—</span><span class="pv-unit" id="pv-unit"></span></div>
          <div class="pv-label" id="pv-label"></div>
          <div class="pv-secondary" id="pv-secondary" hidden></div>
        </div>
      </div>
      ${c.show_history ? `
      <div class="pv-hist-toggle" id="pv-hist-toggle">
        <svg width="15" height="15" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span id="pv-hist-label"></span>
      </div>
      <div class="pv-hist" id="pv-hist"><div id="pv-hist-body"></div></div>` : ""}
    `;
    this.appendChild(card);
    this._el = {};
    for (const id of ["pv-wrap", "pv-water", "pv-water-rect", "pv-water-top", "pv-name", "pv-value", "pv-unit", "pv-label", "pv-secondary", "pv-hist-toggle", "pv-hist", "pv-hist-label", "pv-hist-body", "pv-conn", "pv-conn-off", "pv-batt", "pv-batt-fill", "pv-batt-pct", "pv-overflow"]) {
      this._el[id] = card.querySelector("#" + id);
    }
    this._el["pv-wrap"].addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("hass-more-info", {
        detail: { entityId: this._config.entity }, bubbles: true, composed: true,
      }));
    });
    if (this._el["pv-hist-toggle"]) {
      this._el["pv-hist-toggle"].addEventListener("click", (e) => {
        e.stopPropagation();
        this._toggleHist();
      });
    }
  }

  _toggleHist() {
    this._histOpen = !this._histOpen;
    this._el["pv-hist-toggle"].classList.toggle("pv-open", this._histOpen);
    this._el["pv-hist"].classList.toggle("pv-open", this._histOpen);
    if (this._histOpen && (!this._histAt || Date.now() - this._histAt > 300000)) this._loadHist();
  }

  async _loadHist() {
    const t = pvT(this._hass, this._config);
    const body = this._el["pv-hist-body"];
    if (!body.innerHTML) body.innerHTML = `<div class="pv-hist-status">…</div>`;
    try {
      const start = new Date(Date.now() - 25 * 3600 * 1000).toISOString();
      const url = `history/period/${start}?filter_entity_id=${this._config.entity}&minimal_response&no_attributes`;
      const res = await this._hass.callApi("GET", url);
      const raw = (res && res[0]) || [];
      const pts = raw
        .map((s) => ({ t: new Date(s.last_changed || s.last_updated).getTime(), v: parseFloat(s.state) }))
        .filter((p) => !isNaN(p.v) && !isNaN(p.t));
      this._histAt = Date.now();
      body.innerHTML = pts.length ? this._histSvg(pts) : `<div class="pv-hist-status">${t.noData}</div>`;
    } catch (e) {
      body.innerHTML = `<div class="pv-hist-status">${t.noData}</div>`;
    }
  }

  _histSvg(pts) {
    const W = 480, H = 150, L = 34, R = 8, T = 10, B = 20;
    const half = this._config.history_bucket === "half_hour";
    const size = (half ? 1800 : 3600) * 1000;
    const end = Math.ceil(Date.now() / size) * size;
    const start = end - 24 * 3600 * 1000;
    const N = Math.round((24 * 3600 * 1000) / size);
    const bars = new Array(N).fill(0);
    for (let i = 1; i < pts.length; i++) {
      const delta = pts[i].v - pts[i - 1].v;
      if (delta > 0 && pts[i].t >= start && pts[i].t < end) {
        bars[Math.min(N - 1, Math.floor((pts[i].t - start) / size))] += delta;
      }
    }
    const vmax0 = Math.max(...bars, 0);
    const vmax = Math.max(5, Math.ceil(vmax0 / 5) * 5);
    const y = (v) => T + (1 - v / vmax) * (H - T - B);
    const slot = (W - L - R) / N;
    const bw = slot * 0.72;
    const fmtV = (v) => (v % 1 === 0 ? v : v.toFixed(1));
    const unit = this._config.unit ||
      (this._hass.states[this._config.entity] && this._hass.states[this._config.entity].attributes.unit_of_measurement) || "mm";
    const fmtH = (t) => {
      const d = new Date(t);
      return d.getHours() + (half && d.getMinutes() ? "h30" : "h");
    };
    let grid = "";
    for (const f of [0, 0.5, 1]) {
      const gy = y(vmax * f).toFixed(1);
      grid += `<line class="pv-hist-grid" x1="${L}" y1="${gy}" x2="${W - R}" y2="${gy}"/>`;
      grid += `<text class="pv-hist-axis" x="${L - 4}" y="${(+gy + 3.5).toFixed(1)}" text-anchor="end">${fmtV(vmax * f)}</text>`;
    }
    for (let k = 0; k <= 4; k++) {
      const tk = start + k * 6 * 3600 * 1000;
      const tx = (L + (k / 4) * (W - L - R)).toFixed(1);
      grid += `<text class="pv-hist-axis" x="${tx}" y="${H - 6}" text-anchor="${k === 0 ? "start" : k === 4 ? "end" : "middle"}">${fmtH(tk)}</text>`;
    }
    const col = this._config.water_color;
    let rects = "";
    for (let k = 0; k < N; k++) {
      if (bars[k] <= 0) continue;
      const bx = (L + k * slot + (slot - bw) / 2).toFixed(1);
      const by = y(bars[k]);
      const bh = Math.max(y(0) - by, 1.5);
      const label = `${fmtH(start + k * size)}–${fmtH(start + (k + 1) * size)} : ${pvFmt(bars[k], 1)} ${unit}`;
      rects += `<rect x="${bx}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="1.5" fill="${col}" opacity="0.85"><title>${label}</title></rect>`;
    }
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto;" xmlns="http://www.w3.org/2000/svg">
      ${grid}${rects}
    </svg>`;
  }

  _uid() {
    if (!this.__uid) this.__uid = Math.random().toString(36).slice(2, 8);
    return this.__uid;
  }

  _update() {
    if (!this._hass || !this._built) return;
    const c = this._config;
    const t = pvT(this._hass, c);
    const st = this._hass.states[c.entity];
    const wrap = this._el["pv-wrap"];

    const name = c.name || (st && st.attributes.friendly_name) || c.entity;
    this._el["pv-name"].textContent = name;
    this._el["pv-label"].textContent = c.label || "";
    if (this._el["pv-hist-label"]) {
      this._el["pv-hist-label"].textContent = t.hist;
      if (this._histOpen && this._histAt && Date.now() - this._histAt > 600000) this._loadHist();
    }

    if (!st || st.state === "unavailable" || st.state === "unknown" || isNaN(parseFloat(st.state))) {
      wrap.classList.add("pv-unavailable");
      this._el["pv-value"].textContent = "—";
      this._el["pv-unit"].textContent = "";
      if (!c.label) this._el["pv-label"].textContent = t.unavailable;
      this._setLevel(0);
      this._el["pv-overflow"].style.display = "none";
      this._updateCorners();
      return;
    }
    wrap.classList.remove("pv-unavailable");

    const value = parseFloat(st.state);
    const unit = c.unit || st.attributes.unit_of_measurement || "mm";
    this._el["pv-value"].textContent = pvFmt(value, c.decimals);
    this._el["pv-unit"].textContent = " " + unit;
    this._setLevel(Math.max(0, Math.min(1, value / c.max_level)));
    this._el["pv-overflow"].style.display = value > c.max_level ? "" : "none";
    this._updateCorners();

    const sec = this._el["pv-secondary"];
    if (c.secondary_entity && this._hass.states[c.secondary_entity]) {
      const s2 = this._hass.states[c.secondary_entity];
      const u2 = s2.attributes.unit_of_measurement || "";
      const n2 = parseFloat(s2.state);
      sec.hidden = false;
      sec.textContent = (c.secondary_name || s2.attributes.friendly_name || c.secondary_entity) + " : " +
        (isNaN(n2) ? s2.state : pvFmt(n2, c.decimals)) + (u2 ? " " + u2 : "");
    } else {
      sec.hidden = true;
    }
  }

  _updateCorners() {
    const c = this._config;
    const conn = this._el["pv-conn"];
    const cst = c.connectivity_entity && this._hass.states[c.connectivity_entity];
    if (cst) {
      conn.hidden = false;
      const stt = String(cst.state).toLowerCase();
      const ok = !["off", "unavailable", "unknown", "disconnected", "not_home", "none"].includes(stt);
      conn.classList.toggle("pv-off", !ok);
      this._el["pv-conn-off"].style.display = ok ? "none" : "";
      conn.title = (cst.attributes.friendly_name || c.connectivity_entity) + " : " + cst.state;
    } else {
      conn.hidden = true;
    }
    const batt = this._el["pv-batt"];
    const bst = c.battery_entity && this._hass.states[c.battery_entity];
    const lvl = bst ? parseFloat(bst.state) : NaN;
    if (bst && !isNaN(lvl)) {
      batt.hidden = false;
      const mode = c.battery_display || "both";
      batt.querySelector("svg").style.display = mode === "percent" ? "none" : "";
      const pct = this._el["pv-batt-pct"];
      pct.style.display = mode === "icon" ? "none" : "";
      pct.textContent = Math.round(lvl) + "%";
      const fill = this._el["pv-batt-fill"];
      const w = Math.max(0.8, 15 * Math.max(0, Math.min(100, lvl)) / 100);
      fill.setAttribute("width", w.toFixed(1));
      fill.setAttribute("fill", lvl <= 15 ? "var(--error-color, #db4437)" :
        lvl <= 40 ? "var(--warning-color, #f0a025)" : "var(--success-color, #43a047)");
      batt.title = (bst.attributes.friendly_name || c.battery_entity) + " : " + Math.round(lvl) + "%";
    } else {
      batt.hidden = true;
    }
  }

  _setLevel(frac) {
    const travel = PV_SCALE_BOTTOM - PV_SCALE_TOP;
    const g = this._el["pv-water"];
    g.style.transform = `translateY(${((1 - frac) * travel).toFixed(1)}px)`;
    g.style.opacity = frac > 0 ? "1" : "0";
  }
}

class PluviometerCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    this._render();
  }
  set hass(hass) { this._hass = hass; this._render(); }

  _render() {
    if (!this._hass || !this._config) return;
    const c = this._config;
    const t = pvT(this._hass, c);
    if (!this._form) {
      this.innerHTML = "";
      this._form = document.createElement("ha-form");
      this._form.computeLabel = (s) => s.label || s.name;
      this._form.addEventListener("value-changed", (ev) => {
        const v = ev.detail.value;
        const out = { type: "custom:pluviometer-card", entity: v.entity };
        if (v.name) out.name = v.name;
        if (v.label) out.label = v.label;
        if (v.max_level != null && v.max_level !== "" && parseFloat(v.max_level) !== 40) out.max_level = parseFloat(v.max_level);
        if (v.decimals != null && v.decimals !== "" && parseInt(v.decimals, 10) !== 1) out.decimals = parseInt(v.decimals, 10);
        if (v.water_color && v.water_color !== "#3d9bd9") out.water_color = v.water_color;
        if (v.show_bracket === false) out.show_bracket = false;
        if (v.show_history) out.show_history = true;
        if (v.history_bucket && v.history_bucket !== "hour") out.history_bucket = v.history_bucket;
        if (v.glass_color && v.glass_color !== "clear") out.glass_color = v.glass_color;
        if (v.secondary_name) out.secondary_name = v.secondary_name;
        if (v.battery_entity) out.battery_entity = v.battery_entity;
        if (v.battery_display && v.battery_display !== "both") out.battery_display = v.battery_display;
        if (v.connectivity_entity) out.connectivity_entity = v.connectivity_entity;
        if (v.secondary_entity) out.secondary_entity = v.secondary_entity;
        if (v.language) out.language = v.language;
        this._config = out;
        this._render();
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: out }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }

    this._form.hass = this._hass;
    this._form.data = {
      entity: c.entity || "",
      name: c.name || "",
      label: c.label || "",
      max_level: c.max_level != null ? c.max_level : 40,
      decimals: c.decimals != null ? c.decimals : 1,
      water_color: c.water_color || "#3d9bd9",
      show_bracket: c.show_bracket !== false,
      show_history: c.show_history === true,
      history_bucket: c.history_bucket || "hour",
      glass_color: c.glass_color || "clear",
      secondary_entity: c.secondary_entity || "",
      secondary_name: c.secondary_name || "",
      battery_entity: c.battery_entity || "",
      battery_display: c.battery_display || "both",
      connectivity_entity: c.connectivity_entity || "",
      language: c.language || "",
    };
    this._form.schema = [
      { name: "entity", label: t.entity, selector: { entity: { domain: "sensor" } } },
      { name: "name", label: t.name, selector: { text: {} } },
      { name: "label", label: t.label, selector: { text: {} } },
      { name: "max_level", label: t.max, selector: { number: { mode: "box", step: "any", min: 0 } } },
      { name: "decimals", label: t.decimals, selector: { number: { mode: "box", step: 1, min: 0, max: 3 } } },
      { name: "water_color", label: t.color, selector: { text: {} } },
      { name: "show_bracket", label: t.bracket, selector: { boolean: {} } },
      { name: "show_history", label: t.histOpt, selector: { boolean: {} } },
      { name: "history_bucket", label: t.bucketOpt, selector: { select: { mode: "dropdown", options: [
        { value: "hour", label: t.bucketHour },
        { value: "half_hour", label: t.bucketHalf },
      ] } } },
      { name: "glass_color", label: t.glassOpt, selector: { select: { mode: "dropdown", options: [
        { value: "clear", label: t.glassClear },
        { value: "bottle_green", label: t.glassGreen },
        { value: "amber", label: t.glassAmber },
        { value: "smoked", label: t.glassSmoked },
      ] } } },
      { name: "secondary_entity", label: t.secondary, selector: { entity: { domain: "sensor" } } },
      { name: "secondary_name", label: t.secName, selector: { text: {} } },
      { name: "battery_entity", label: t.battOpt, selector: { entity: { domain: "sensor" } } },
      { name: "battery_display", label: t.battDisp, selector: { select: { mode: "dropdown", options: [
        { value: "both", label: t.battBoth },
        { value: "icon", label: t.battIcon },
        { value: "percent", label: t.battPct },
      ] } } },
      { name: "connectivity_entity", label: t.connOpt, selector: { entity: { domain: ["binary_sensor", "sensor"] } } },
      { name: "language", label: t.language, selector: { select: { mode: "dropdown", options: [{ value: "", label: t.auto }].concat(Object.keys(PV_LANGNAMES).map((l) => ({ value: l, label: PV_LANGNAMES[l] }))) } } },
    ];
    this._renderHelperBox(t);
  }

  _renderHelperBox(t) {
    if (!this._helperBox) {
      this._helperBox = document.createElement("div");
      this._helperBox.style.cssText = "margin-bottom:12px;padding:12px 14px;border:1px solid var(--divider-color);border-radius:8px;font-size:0.9em;color:var(--secondary-text-color);";
      this.insertBefore(this._helperBox, this._form || null);
    }
    const c = this._config;
    const st = c.entity && this._hass.states[c.entity];
    const status = this._helperStatus;
    const needs = st && st.attributes.state_class !== "total_increasing";
    if (!needs && !status) { this._helperBox.hidden = true; return; }
    this._helperBox.hidden = false;
    let html = "";
    if (needs && !(status && status.ok)) html += `<div style="margin-bottom:8px;">💧 ${t.notCumul}</div>`;
    if (status) {
      html += `<div style="margin-bottom:8px;${status.ok ? "color:var(--success-color, #0f9d58);" : status.busy ? "" : "color:var(--error-color, #db4437);"}">${status.msg}</div>`;
    }
    if (needs && !(status && (status.busy || status.ok))) {
      html += `<button id="pv-create-daily" style="cursor:pointer;padding:8px 14px;border:none;border-radius:6px;background:var(--primary-color);color:var(--text-primary-color, #fff);font:inherit;">${t.createBtn}</button>`;
    }
    this._helperBox.innerHTML = html;
    const btn = this._helperBox.querySelector("#pv-create-daily");
    if (btn) btn.addEventListener("click", () => this._createDaily());
  }

  async _createDaily() {
    const c = this._config;
    const t = pvT(this._hass, c);
    const st = this._hass.states[c.entity];
    const base = (st && st.attributes.friendly_name) || c.entity.split(".")[1];
    this._helperStatus = { busy: true, msg: t.creating };
    this._renderHelperBox(t);
    try {
      let source = c.entity;
      const unit = (st && st.attributes.unit_of_measurement) || "";
      if (/\/h$/i.test(unit)) {
        const nameTotal = base + " " + t.totalSuffix;
        await this._flowCreate("integration", {
          name: nameTotal, source: source, method: "left", round: 2, unit_prefix: "none", unit_time: "h",
        });
        source = "sensor." + pvSlugify(nameTotal);
        await new Promise((r) => setTimeout(r, 2500));
      }
      const nameDaily = base + " " + t.dailySuffix;
      await this._flowCreate("utility_meter", {
        name: nameDaily, source: source, cycle: "daily", offset: 0,
        net_consumption: false, delta_values: false, periodically_resetting: true, tariffs: [],
      });
      const newId = "sensor." + pvSlugify(nameDaily);
      this._helperStatus = { busy: false, ok: true, msg: t.created + newId };
      this._config = { ...this._config, entity: newId };
      this._render();
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true }));
    } catch (e) {
      this._helperStatus = { busy: false, msg: t.createError + (e && e.message ? e.message : e) };
      this._renderHelperBox(t);
    }
  }

  async _flowCreate(handler, values) {
    const flow = await this._hass.callApi("POST", "config/config_entries/flow", {
      handler: handler, show_advanced_options: true,
    });
    const data = {};
    for (const f of flow.data_schema || []) {
      if (values[f.name] !== undefined) data[f.name] = values[f.name];
      else if (f.default !== undefined) data[f.name] = f.default;
    }
    const res = await this._hass.callApi("POST", "config/config_entries/flow/" + flow.flow_id, data);
    if (res.type === "form" && res.errors && Object.keys(res.errors).length) {
      throw new Error(handler + ": " + JSON.stringify(res.errors));
    }
    if (res.type !== "create_entry") {
      throw new Error(handler + ": unexpected flow step (" + (res.step_id || res.type) + ")");
    }
    return res;
  }
}

customElements.define("pluviometer-card", PluviometerCard);
customElements.define("pluviometer-card-editor", PluviometerCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "pluviometer-card",
  name: "Pluviometer Card",
  description: "A rain gauge that fills up like the real thing: funnel, graduated tube and mounting bracket. Works with any precipitation sensor.",
  preview: true,
  documentationURL: "https://github.com/ADNPolymerase/ha-pluviometer-card",
});
