"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { table1, Series, Metric } from "./data"
import { Toggle, useInViewOnce } from "./primitives"

export default function ModelBakeoff() {
  const [series, setSeries] = useState<Series>("stock")
  const [metric, setMetric] = useState<Metric>("mspe")
  const { ref, inView } = useInViewOnce()

  const rows = [...table1[series]].sort((a, b) => a[metric] - b[metric])
  const max = Math.max(...rows.map((r) => r[metric]))
  const unit = metric === "mspe" ? "" : "%"

  return (
    <div ref={ref} className="glow-card rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          <Toggle ariaLabel="series"
            options={[{ value: "stock", label: "Stock" }, { value: "tariff", label: "Tariff" }]}
            value={series} onChange={(v) => setSeries(v as Series)} />
          <Toggle ariaLabel="metric"
            options={[{ value: "mspe", label: "MSPE" }, { value: "mape", label: "MAPE" }]}
            value={metric} onChange={(v) => setMetric(v as Metric)} />
        </div>
        <span className="font-mono-accent text-[11px] uppercase tracking-widest text-gray-500">
          lower is better · {metric.toUpperCase()}
        </span>
      </div>

      <div className="space-y-2.5">
        {rows.map((row, i) => {
          const pct = (row[metric] / max) * 100
          const win = row.winner
          return (
            <motion.div key={row.model} layout transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="flex items-center gap-3">
              <div className="w-24 sm:w-28 shrink-0 text-right">
                <span className={`text-xs sm:text-sm ${win ? "text-white font-semibold" : "text-gray-400"}`}>{row.model}</span>
              </div>
              <div className="flex-1 h-8 sm:h-9 rounded-lg bg-slate-800/40 overflow-hidden relative">
                <motion.div
                  className="h-full rounded-lg relative"
                  style={{
                    background: win
                      ? "linear-gradient(90deg, #6366f1, #a855f7)"
                      : "linear-gradient(90deg, rgba(99,102,241,0.35), rgba(168,85,247,0.28))",
                  }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${pct}%` } : { width: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                >
                  {win && (
                    <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/40"
                      style={{ boxShadow: "0 0 18px rgba(168,85,247,0.5)" }} />
                  )}
                </motion.div>
                <span className={`absolute top-1/2 -translate-y-1/2 text-[11px] sm:text-xs font-mono-accent tabular-nums ${
                  pct > 55 ? "right-2 text-white/90" : "text-gray-300"
                }`} style={pct > 55 ? {} : { left: `calc(${pct}% + 8px)` }}>
                  {row[metric].toFixed(2)}{unit}
                </span>
              </div>
              {win && (
                <span className="shrink-0 text-[10px] font-mono-accent uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200">
                  winner
                </span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
