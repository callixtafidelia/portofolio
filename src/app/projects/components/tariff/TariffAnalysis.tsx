"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { ArrowLeft, Github, Users, Wrench, UserCircle } from "lucide-react"
import { meta } from "./data"
import { Cell, CodeCell, PageHeadline } from "@/components/case-study/primitives"
import OpenerChart from "./OpenerChart"
import ModelBakeoff from "./ModelBakeoff"
import RevealChart from "./RevealChart"
import CorrelationReveal from "./CorrelationReveal"
import SectorBars from "./SectorBars"
import CompanyCorrelations from "./CompanyCorrelations"
import USChoropleth from "./USChoropleth"

export default function TariffAnalysis() {
  const [, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 1024)
    c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c)
  }, [])

  return (
    <>
      <style jsx global>{`
        body { margin: 0; padding: 0; background: #0a0e1a; overflow-x: hidden; }
        body::before {
          content: ''; position: fixed; inset: 0; z-index: -1;
          background:
            radial-gradient(circle at 15% 85%, rgba(102,126,234,0.12) 0%, transparent 50%),
            radial-gradient(circle at 85% 15%, rgba(192,132,252,0.10) 0%, transparent 50%);
          animation: backgroundShift 20s ease-in-out infinite;
        }
        @keyframes backgroundShift { 0%,100%{opacity:1} 50%{opacity:0.7} }
        .glow-card {
          position: relative; background: rgba(15,23,42,0.6); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s ease;
        }
        .glow-card:hover { border-color: rgba(102,126,234,0.25); }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(15,23,42,0.5); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(135deg,#667eea,#764ba2); border-radius: 4px; }
      `}</style>

      <div className="flex h-screen overflow-hidden bg-[#0a0e1a] text-white">
        <Sidebar active="projects" onToggle={setCollapsed} />
        <main className="flex-1 overflow-y-auto py-8 relative z-10" style={{ marginLeft: isMobile ? 0 : "40px" }}>
          <div className={`max-w-4xl mx-auto ${isMobile ? "px-4" : "px-6"}`}>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link href="/projects" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-all hover:translate-x-1 group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Projects</span>
              </Link>
            </motion.div>

            {/* Title */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-8">
              <p className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-indigo-400/80 mb-4">
                Interactive Notebook · Google Trends · R + Python
              </p>
              <PageHeadline className={isMobile ? "text-3xl" : "text-5xl"}>{meta.title}</PageHeadline>
              <p className={`text-gray-300 leading-relaxed mt-4 ${isMobile ? "text-base" : "text-lg"}`}>{meta.subtitle}</p>
            </motion.div>

            {/* OPENER */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-6">
              <OpenerChart />
            </motion.div>

            {/* meta line */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-24 text-xs text-gray-400 border-y border-white/10 py-4">
              <span className="flex items-center gap-1.5"><UserCircle size={14} className="text-indigo-400" /><span className="text-gray-500">Role</span> {meta.role}</span>
              <span className="flex items-center gap-1.5"><Users size={14} className="text-indigo-400" /><span className="text-gray-500">Team</span> {meta.team}</span>
              <span className="flex items-center gap-1.5"><Wrench size={14} className="text-indigo-400" /><span className="text-gray-500">Tools</span> {meta.tools}</span>
              <a href={meta.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-indigo-300 hover:text-indigo-200">
                <Github size={14} /> GitHub
              </a>
            </motion.div>

            {/* CELL 1 */}
            <Cell index="01" kicker="the model bake-off" title="What counts as normal?">
              <p className="text-gray-300 leading-relaxed mb-2">
                To know if post-election search interest was actually <em>unusual</em>, we first had to define what
                “expected” even looked like. So we raced five forecasting models against each other — ARIMA/SARIMA,
                simple exponential smoothing, Holt’s Trend, Holt’s Winter, and a plain linear model — and scored each on
                how badly it missed (MSPE and MAPE).
              </p>
              <CodeCell lang="r" code={CODE.bakeoff} caption="analysis.Rmd · model fitting & ranking" />
              <ModelBakeoff />
              <div className="mt-6 rounded-2xl border border-purple-400/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-5 sm:p-6">
                <p className="playfair-italic text-lg sm:text-xl leading-snug text-white/95">
                  The two series didn’t agree on a winner. <span className="text-indigo-300">SARIMA</span> won for Stock —
                  a noisy series with a past the model could learn from. <span className="text-purple-300">Holt’s Winter</span>
                  {" "}won for Tariff — a series that was flat until it suddenly wasn’t. One market the model could predict;
                  one topic that broke it.
                </p>
              </div>
            </Cell>

            {/* CELL 2 */}
            <Cell index="02" kicker="the reveal" title="Reality vs. the forecast">
              <p className="text-gray-300 leading-relaxed mb-2">
                With a baseline defined, we could finally measure how far reality outran expectation. We forecast the
                post-election window from each series’ best model, then asked a simple question: how much higher did
                attention actually go?
              </p>
              <CodeCell lang="r" code={CODE.forecast} caption="analysis.Rmd · forecast vs. observed" />
              <RevealChart />
            </Cell>

            {/* CELL 3 */}
            <Cell index="03" kicker="the correlation shift" title="Did they actually become linked?">
              <p className="text-gray-300 leading-relaxed mb-2">
                Rising together isn’t the same as being connected. So we checked whether tariff attention and stock
                attention genuinely moved as one — correlating the two monthly series before and after the election.
              </p>
              <CodeCell lang="r" code={CODE.cor} caption="analysis.Rmd · Pearson correlation, pre/post" />
              <CorrelationReveal />
            </Cell>

            {/* CELL 4 */}
            <Cell index="04" kicker="the sectors" title="Not evenly — where it landed">
              <p className="text-gray-300 leading-relaxed mb-6">
                The shift didn’t land evenly. It concentrated exactly where people already picture global supply chains —
                chips, sneakers, cars — and barely touched heavy industrials.
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                <SectorBars />
                <CompanyCorrelations />
              </div>
            </Cell>

            {/* CELL 5 */}
            <Cell index="05" kicker="the map" title="Everywhere, but not equally">
              <p className="text-gray-300 leading-relaxed mb-2">
                Finally: was this a national mood, or a regional one? We pulled state-level Google Trends through SerpApi
                and mapped the change across all 50 states and DC.
              </p>
              <CodeCell lang="python" code={CODE.serpapi} caption="getapi.py · state-level Google Trends pull" />
              <USChoropleth />
            </Cell>

            {/* CELL 6 */}
            <Cell index="06" kicker="honesty" title="What we can and can’t say">
              <div className="grid sm:grid-cols-2 gap-4">
                {LIMITS.map((l) => (
                  <div key={l.t} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
                    <h4 className="text-sm font-semibold text-gray-200 mb-1.5">{l.t}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{l.d}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border-l-2 border-indigo-500/50 bg-indigo-500/5 p-5">
                <p className="font-mono-accent text-[11px] uppercase tracking-widest text-indigo-400/80 mb-1.5">Next step</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Test alternative event windows, and add real tariff-announcement dates as separate event markers — so
                  we can separate the election itself from the policy shocks that followed it.
                </p>
              </div>
            </Cell>

            <div className="h-16" />
          </div>
        </main>
      </div>
    </>
  )
}

const LIMITS = [
  { t: "RSV is relative, not absolute", d: "Google Trends measures share of attention, not the raw number of searches — it captures shifts in interest, not volume." },
  { t: "Correlation isn’t causation", d: "Tariff and stock searches moved together after Nov 2024, but that doesn’t prove tariff attention drove stock attention." },
  { t: "Company search is contaminated", d: "Firm-level searches also spike on earnings, product launches, and unrelated news — not just tariff talk." },
  { t: "The cutoff was our choice", d: "The pre/post split is researcher-defined. A different event window could shift the magnitude of every effect above." },
]

const CODE = {
  bakeoff: `library(fable); library(fabletools); library(tsibble)

# Fit five candidate models to the monthly RSV series
fits <- rsv_ts |>
  model(
    sarima      = ARIMA(RSV),
    ses         = ETS(RSV ~ error("A") + trend("N") + season("N")),
    holt_trend  = ETS(RSV ~ error("A") + trend("A") + season("N")),
    holt_winter = ETS(RSV ~ error("A") + trend("A") + season("A")),
    linear      = TSLM(RSV ~ trend())
  )

# Rank by out-of-sample error
accuracy(fits) |>
  mutate(MSPE = RMSE^2) |>
  select(.model, MSPE, MAPE) |>
  arrange(MSPE)`,
  forecast: `best <- fits |> select(sarima)      # Stock: SARIMA(0,1,0)(0,1,0)[12]
fc   <- best |> forecast(h = "15 months")

# % by which reality outran the forecast
excess <- fc |>
  as_tibble() |>
  left_join(observed, by = "month") |>
  summarise(pct = mean((RSV - .mean) / .mean) * 100)
excess   # Stock: +8.36%   |   Tariff (Holt-Winter): +55.12%`,
  cor: `pre  <- filter(monthly, month <  "2024-11-01")
post <- filter(monthly, month >= "2024-11-01")

cor.test(pre$tariff,  pre$stock)    # r = 0.02,  not significant
cor.test(post$tariff, post$stock)   # r = 0.81,  p = 0.0015`,
  serpapi: `from serpapi import GoogleSearch
import pandas as pd

def state_rsv(term, geo):
    params = {
        "engine": "google_trends",
        "q": term,
        "geo": geo,                  # e.g. "US-TX"
        "data_type": "TIMESERIES",
        "api_key": API_KEY,
    }
    data = GoogleSearch(params).get_dict()
    return pd.DataFrame(data["interest_over_time"]["timeline_data"])

rows = []
for st in US_STATES:                 # 50 states + DC
    for term in ("tariff", "stock"):
        rows.append(state_rsv(term, f"US-{st}").assign(state=st, term=term))`,
}
