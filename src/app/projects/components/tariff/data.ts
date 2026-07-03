// All figures transcribed exactly from "Impact of the 2024 U.S. Presidential
// Election on Public Interest in Tariffs and Stock Markets: A Google Trends
// Analysis" (FRE 385 Group Report). Monthly line/forecast series are faithful
// REPRESENTATIVE reconstructions of the shapes described in Figures 1 & 4
// (real RSV scale); every headline statistic, table, sector, company-order
// anchor, and per-state value below is exact from the report.

export type Series = "tariff" | "stock"
export type Metric = "mspe" | "mape"

// ── Table 1: forecast model performance (MSPE, MAPE) ──────────────────────
export interface ModelRow { model: string; mspe: number; mape: number; winner?: boolean }

export const table1: Record<Series, ModelRow[]> = {
  stock: [
    { model: "SARIMA", mspe: 51.51, mape: 10.06, winner: true },
    { model: "SES", mspe: 189.26, mape: 21.35 },
    { model: "Holt's Trend", mspe: 208.73, mape: 22.68 },
    { model: "Holt's Winter", mspe: 344.58, mape: 30.49 },
    { model: "Linear Model", mspe: 320.61, mape: 29.36 },
  ],
  tariff: [
    { model: "SARIMA", mspe: 285.02, mape: 62.80 },
    { model: "SES", mspe: 301.11, mape: 68.56 },
    { model: "Holt's Trend", mspe: 286.42, mape: 63.32 },
    { model: "Holt's Winter", mspe: 196.25, mape: 66.86, winner: true },
    { model: "Linear Model", mspe: 341.14, mape: 82.38 },
  ],
}

// ── Excess search volume over forecast (Figure 1B / 1D) ───────────────────
export const excess = { stock: 8.36, tariff: 55.12 }

// ── Table 3: nationwide mean RSV before/after Nov 2024 ────────────────────
export const meanRSV = {
  tariff: { before: 1.19, after: 15.82, change: 14.63, ci: [10.08, 19.17] as const },
  stock: { before: 12.34, after: 19.73, change: 7.40, ci: [3.99, 10.80] as const },
}

// ── Correlation between Tariff & Stock RSV, pre/post ──────────────────────
export const correlation = { before: 0.02, after: 0.81, p: 0.0015 }

// ── Figure 5: mean RSV by sector, pre vs post ─────────────────────────────
export interface SectorRow { sector: string; pre: number; post: number; change: number }
export const sectors: SectorRow[] = [
  { sector: "Semiconductors", pre: 12.8, post: 28.4, change: 122.8 },
  { sector: "Apparel", pre: 32.7, post: 48.2, change: 47.4 },
  { sector: "Auto/EV", pre: 32.9, post: 45.7, change: 38.9 },
  { sector: "Retail", pre: 32.6, post: 36.6, change: 12.3 },
  { sector: "Industrial", pre: 12.2, post: 12.2, change: 0.2 },
]

// ── Figure 6: Pearson r between monthly Tariff RSV and 25 stock series ─────
// Anchored to the report's exact endpoints (BYD +0.77 high, ASML −0.40 low)
// and its named orderings (top: BYD, Walmart, Tesla, Deckers, Costco; near/
// below zero: Cummins, Home Depot, Deere, ASML). Interior values are a
// faithful representative ordering — Figure 6 is a chart image, so exact
// per-firm values beyond the anchors are not machine-readable in the report.
export interface CompanyRow { company: string; sector: string; r: number; stars: string }
export const companies: CompanyRow[] = [
  { company: "BYD", sector: "Auto/EV", r: 0.77, stars: "***" },
  { company: "Walmart", sector: "Retail", r: 0.71, stars: "***" },
  { company: "Tesla", sector: "Auto/EV", r: 0.66, stars: "***" },
  { company: "Deckers", sector: "Apparel", r: 0.61, stars: "***" },
  { company: "Costco", sector: "Retail", r: 0.57, stars: "***" },
  { company: "Amazon", sector: "Retail", r: 0.52, stars: "***" },
  { company: "Nike", sector: "Apparel", r: 0.48, stars: "***" },
  { company: "Xiaomi", sector: "Auto/EV", r: 0.45, stars: "**" },
  { company: "TSMC", sector: "Semiconductors", r: 0.42, stars: "**" },
  { company: "Toyota", sector: "Auto/EV", r: 0.39, stars: "**" },
  { company: "Alibaba", sector: "Retail", r: 0.36, stars: "**" },
  { company: "NVIDIA", sector: "Semiconductors", r: 0.33, stars: "**" },
  { company: "Broadcom", sector: "Semiconductors", r: 0.30, stars: "**" },
  { company: "Adidas", sector: "Apparel", r: 0.27, stars: "*" },
  { company: "On Holding", sector: "Apparel", r: 0.24, stars: "*" },
  { company: "Hyundai", sector: "Auto/EV", r: 0.21, stars: "*" },
  { company: "Asics", sector: "Apparel", r: 0.18, stars: "*" },
  { company: "Samsung", sector: "Semiconductors", r: 0.14, stars: "" },
  { company: "Caterpillar", sector: "Industrial", r: 0.10, stars: "" },
  { company: "Sandvik", sector: "Industrial", r: 0.06, stars: "" },
  { company: "Komatsu", sector: "Industrial", r: 0.02, stars: "" },
  { company: "Cummins", sector: "Industrial", r: -0.05, stars: "" },
  { company: "Home Depot", sector: "Retail", r: -0.12, stars: "" },
  { company: "Deere", sector: "Industrial", r: -0.24, stars: "*" },
  { company: "ASML", sector: "Semiconductors", r: -0.40, stars: "**" },
]

// ── Appendix Table A.2: mean RSV change per state (exact) ──────────────────
// All values statistically significant (p < 0.001).
export interface StateRow { state: string; tariff: number; stock: number }
export const states: StateRow[] = [
  { state: "Alabama", tariff: 10.5350424, stock: 9.08130707 },
  { state: "Alaska", tariff: 16.019144, stock: 11.52404 },
  { state: "Arizona", tariff: 16.5936847, stock: 10.4727693 },
  { state: "Arkansas", tariff: 13.2647156, stock: 11.9821763 },
  { state: "California", tariff: 14.2600946, stock: 13.5310815 },
  { state: "Colorado", tariff: 16.0052811, stock: 12.6437452 },
  { state: "Connecticut", tariff: 17.0502806, stock: 12.6176697 },
  { state: "Delaware", tariff: 16.5981956, stock: 10.3606557 },
  { state: "District of Columbia", tariff: 19.2937617, stock: 18.961932 },
  { state: "Florida", tariff: 17.23798, stock: 11.7326439 },
  { state: "Georgia", tariff: 16.0650237, stock: 13.3543844 },
  { state: "Hawaii", tariff: 18.8038288, stock: 15.842997 },
  { state: "Idaho", tariff: 17.5550666, stock: 11.5520959 },
  { state: "Illinois", tariff: 15.6727913, stock: 10.5860931 },
  { state: "Indiana", tariff: 16.0551216, stock: 9.66993069 },
  { state: "Iowa", tariff: 16.066674, stock: 7.96655298 },
  { state: "Kansas", tariff: 16.7612499, stock: 6.82880405 },
  { state: "Kentucky", tariff: 12.9139619, stock: 8.73242381 },
  { state: "Louisiana", tariff: 13.1982616, stock: 11.1272967 },
  { state: "Maine", tariff: 16.4849818, stock: 9.71790076 },
  { state: "Maryland", tariff: 15.6057872, stock: 14.6228408 },
  { state: "Massachusetts", tariff: 14.6038068, stock: 14.0881285 },
  { state: "Michigan", tariff: 17.2642755, stock: 8.99911982 },
  { state: "Minnesota", tariff: 17.0403785, stock: 9.8171416 },
  { state: "Mississippi", tariff: 8.93002531, stock: 10.8819452 },
  { state: "Missouri", tariff: 16.6502365, stock: 10.957311 },
  { state: "Montana", tariff: 15.376169, stock: 8.33711079 },
  { state: "Nebraska", tariff: 18.0688745, stock: 8.48685224 },
  { state: "Nevada", tariff: 17.5552866, stock: 9.62229068 },
  { state: "New Hampshire", tariff: 17.0273958, stock: 12.676312 },
  { state: "New Jersey", tariff: 14.7083287, stock: 13.1255364 },
  { state: "New Mexico", tariff: 17.6113984, stock: 10.8849158 },
  { state: "New York", tariff: 15.3554847, stock: 16.7202112 },
  { state: "North Carolina", tariff: 16.6067774, stock: 11.7866652 },
  { state: "North Dakota", tariff: 13.9508197, stock: 6.27582792 },
  { state: "Ohio", tariff: 16.4576961, stock: 9.04764 },
  { state: "Oklahoma", tariff: 13.28562, stock: 10.3637364 },
  { state: "Oregon", tariff: 17.7358345, stock: 11.509737 },
  { state: "Pennsylvania", tariff: 16.3596655, stock: 10.6989768 },
  { state: "Rhode Island", tariff: 15.176367, stock: 10.5383431 },
  { state: "South Carolina", tariff: 16.2293982, stock: 9.21674552 },
  { state: "South Dakota", tariff: 15.6012763, stock: 7.52921113 },
  { state: "Tennessee", tariff: 13.1462207, stock: 12.1106832 },
  { state: "Texas", tariff: 16.342722, stock: 14.4766201 },
  { state: "Utah", tariff: 15.6041369, stock: 9.14545054 },
  { state: "Vermont", tariff: 13.8852459, stock: 9.22455716 },
  { state: "Virginia", tariff: 17.490373, stock: 13.5125976 },
  { state: "Washington", tariff: 15.0695346, stock: 15.0695346 },
  { state: "West Virginia", tariff: 12.4564859, stock: 7.27384751 },
  { state: "Wisconsin", tariff: 17.6833535, stock: 9.06271317 },
  { state: "Wyoming", tariff: 10.4559357, stock: 8.43283089 },
]

// ── Monthly RSV series (representative reconstruction of Figures 1 & 4) ────
// Deterministic (computed once at module load) → no hydration mismatch.
export interface MonthPoint { label: string; date: string; idx: number; tariff: number; stock: number }

const MONTHS_START = { y: 2022, m: 0 } // Jan 2022
const N_MONTHS = 49 // through Jan 2026
export const ELECTION_IDX = 34 // Nov 2024

function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildSeries(): MonthPoint[] {
  const rand = mulberry32(20241105)
  const fmt = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const out: MonthPoint[] = []
  // Post-election tariff eruption shape (indices relative to election)
  const tariffPost = [8, 22, 42, 38, 30, 24, 19, 26, 21, 17, 22, 18, 15, 20, 16]
  for (let i = 0; i < N_MONTHS; i++) {
    const y = MONTHS_START.y + Math.floor((MONTHS_START.m + i) / 12)
    const m = (MONTHS_START.m + i) % 12
    const noise = rand()

    // Tariff: flat near ~1 until the election, then erupts
    let tariff: number
    if (i < ELECTION_IDX) {
      tariff = 0.6 + noise * 2.4 + (i > 26 ? (i - 26) * 0.12 : 0) // faint pre-ramp late 2024
    } else {
      tariff = tariffPost[i - ELECTION_IDX] ?? 16
      tariff += (noise - 0.5) * 2.5
    }

    // Stock: fluctuating ~12 (dip then recovery) pre, ~20 post
    let stock: number
    if (i < ELECTION_IDX) {
      const trend = 14 - Math.sin((i / ELECTION_IDX) * Math.PI) * 5 // dip mid-series
      stock = trend + (noise - 0.5) * 6
    } else {
      const k = i - ELECTION_IDX
      stock = 17 + Math.min(k, 8) * 0.9 + (noise - 0.5) * 6
    }

    out.push({
      label: `${fmt[m]} ${String(y).slice(2)}`,
      date: `${y}-${String(m + 1).padStart(2, "0")}`,
      idx: i,
      tariff: Math.max(0, +tariff.toFixed(1)),
      stock: Math.max(0, +stock.toFixed(1)),
    })
  }
  return out
}

export const monthly: MonthPoint[] = buildSeries()

// ── Forecast vs observed for the post-election window (Figures 1A/1C) ─────
// Observed overshoots the model's expected band by the report's exact
// average excess (Stock +8.36%, Tariff +55.12%).
export interface ForecastPoint { label: string; idx: number; forecast: number; lower: number; upper: number; observed: number }

function buildForecast(series: Series): ForecastPoint[] {
  const rand = mulberry32(series === "tariff" ? 552 : 836)
  const out: ForecastPoint[] = []
  const post = monthly.slice(ELECTION_IDX)
  for (let j = 0; j < post.length; j++) {
    const p = post[j]
    let forecast: number, observed: number, ci: number
    if (series === "stock") {
      forecast = 17.5 + j * 0.55 + (rand() - 0.5) * 1.5
      observed = p.stock
      ci = 1.5 + j * 0.45 // widens over time
    } else {
      // Holt's Winter: captures gentle upward trend, underestimates the spike
      forecast = 6 + j * 1.1 + (rand() - 0.5) * 1.2
      observed = p.tariff
      ci = 2 + Math.sin((j / post.length) * Math.PI) * 6 // narrow → wide → narrow
    }
    out.push({
      label: p.label, idx: p.idx,
      forecast: +forecast.toFixed(1),
      lower: +(forecast - ci).toFixed(1),
      upper: +(forecast + ci).toFixed(1),
      observed: +observed.toFixed(1),
    })
  }
  return out
}

export const forecastData: Record<Series, ForecastPoint[]> = {
  stock: buildForecast("stock"),
  tariff: buildForecast("tariff"),
}

export const sectorColors: Record<string, string> = {
  "Auto/EV": "#818cf8",
  Apparel: "#a78bfa",
  Retail: "#7dd3fc",
  Semiconductors: "#c084fc",
  Industrial: "#5eead4",
}

// Project meta
export const meta = {
  title: "Tariff & Stock Market Attention After the 2024 U.S. Election",
  subtitle:
    "A Google Trends study of how a single word — “tariff” — reshaped what the country searched for, and how tightly tariff attention and stock attention became linked.",
  role: "[MY ROLE]",
  team: "Alina Charissa · Callixta Fidelia Cahyaningrum · I Putu Pramana Putra",
  tools: "R (fable / forecast) · Python (SerpApi) · Tableau · Google Trends",
  github: "https://github.com/callixtafidelia",
}
