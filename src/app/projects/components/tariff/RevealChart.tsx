"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { forecastData, excess, Series } from "./data"
import { Toggle, usePrefersReducedMotion, useInViewOnce } from "./primitives"
import { Eye } from "lucide-react"

export default function RevealChart() {
  const [series, setSeries] = useState<Series>("stock")
  const [revealed, setRevealed] = useState(false)
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInViewOnce()

  const data = forecastData[series]
  const N = data.length
  const yMax = Math.ceil(Math.max(...data.map((d) => Math.max(d.observed, d.upper))) / 10) * 10 + 5
  const x = (i: number) => (i / (N - 1)) * 100
  const y = (v: number) => 100 - (v / yMax) * 94 - 3

  const fLine = data.map((d, i) => `${i ? "L" : "M"} ${x(i).toFixed(2)} ${y(d.forecast).toFixed(2)}`).join(" ")
  const band = `${data.map((d, i) => `${i ? "L" : "M"} ${x(i).toFixed(2)} ${y(d.upper).toFixed(2)}`).join(" ")} ` +
    `${[...data].reverse().map((d, i) => `L ${x(N - 1 - i).toFixed(2)} ${y(d.lower).toFixed(2)}`).join(" ")} Z`
  const oLine = data.map((d, i) => `${i ? "L" : "M"} ${x(i).toFixed(2)} ${y(d.observed).toFixed(2)}`).join(" ")

  // auto-reveal if reduced motion (no button dance needed) once in view
  useEffect(() => { if (reduced && inView) setRevealed(true) }, [reduced, inView])

  return (
    <div ref={ref} className="glow-card rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <Toggle ariaLabel="reveal-series"
          options={[{ value: "stock", label: "Stock" }, { value: "tariff", label: "Tariff" }]}
          value={series} onChange={(v) => { setSeries(v as Series) }} />
        <span className="font-mono-accent text-[11px] uppercase tracking-widest text-gray-500">
          Nov 2024 → Jan 2026
        </span>
      </div>

      <div className="relative w-full h-[280px] sm:h-[340px]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="rev-band" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" y1={g * 100} x2="100" y2={g * 100}
              stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          ))}

          {/* expected band + dashed forecast */}
          <path d={band} fill="url(#rev-band)" />
          <path d={fLine} fill="none" stroke="#94a3b8" strokeWidth="1.6" strokeDasharray="3 2.5"
            vectorEffect="non-scaling-stroke" />

          {/* observed */}
          {revealed && (
            <motion.path key={series} d={oLine} fill="none" stroke="url(#rev-line)" strokeWidth="2.6"
              strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
              initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
          )}
          <linearGradient id="rev-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7dd3fc" /><stop offset="70%" stopColor="#818cf8" /><stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </svg>

        <div className="absolute top-1 left-1.5 text-[10px] font-mono-accent text-gray-500">RSV {yMax}</div>
        <div className="absolute bottom-1 left-1.5 text-[10px] font-mono-accent text-gray-500">Nov ’24</div>
        <div className="absolute bottom-1 right-1.5 text-[10px] font-mono-accent text-gray-500">Jan ’26</div>

        {/* legend */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 text-[10px] font-mono-accent">
          <span className="flex items-center gap-1.5 text-gray-400"><span className="w-4 border-t border-dashed border-slate-400" />expected</span>
          {revealed && <span className="flex items-center gap-1.5 text-indigo-300"><span className="w-4 h-[2px] bg-indigo-400" />observed</span>}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        {!revealed ? (
          <button onClick={() => setRevealed(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 transition-all">
            <Eye size={16} /> Show what actually happened
          </button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-baseline gap-2">
            <span className="text-sm text-gray-400">Observed overshot the forecast by</span>
            <span className={`playfair text-2xl sm:text-3xl font-semibold ${series === "tariff" ? "text-purple-300" : "text-indigo-300"}`}>
              +{excess[series]}%
            </span>
          </motion.div>
        )}
        {revealed && (
          <span className="font-mono-accent text-[11px] text-gray-500 max-w-[15rem]">
            {series === "stock"
              ? "The model could mostly keep up — Stock had a past it could learn from."
              : "The model never saw it coming — Tariff was flat until it wasn’t."}
          </span>
        )}
      </div>
    </div>
  )
}
