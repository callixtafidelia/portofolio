"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { companies, sectorColors } from "./data"
import { useInViewOnce } from "./primitives"

const MAX = 0.8 // axis extent for ±

export default function CompanyCorrelations() {
  const { ref, inView } = useInViewOnce()
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div ref={ref} className="glow-card rounded-2xl p-5 sm:p-6 h-full">
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <h3 className="text-sm font-semibold text-gray-200">Tariff-attention correlation · 25 stocks</h3>
        <span className="font-mono-accent text-[10px] text-gray-500">BYD +0.77 → ASML −0.40</span>
      </div>

      {/* zero axis label row */}
      <div className="relative mb-1 h-3">
        <span className="absolute left-1/2 -translate-x-1/2 text-[9px] font-mono-accent text-gray-600">0</span>
        <span className="absolute left-0 text-[9px] font-mono-accent text-gray-600">−{MAX}</span>
        <span className="absolute right-0 text-[9px] font-mono-accent text-gray-600">+{MAX}</span>
      </div>

      <div className="relative space-y-[3px]">
        {/* center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/15 -translate-x-1/2 pointer-events-none" />
        {companies.map((c, i) => {
          const pos = c.r >= 0
          const w = (Math.abs(c.r) / MAX) * 50 // % of half-width
          const color = pos ? sectorColors[c.sector] : "#fb7185"
          return (
            <div key={c.company} className="relative flex items-center h-4 group"
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              {/* label */}
              <span className={`absolute z-10 text-[9.5px] font-mono-accent whitespace-nowrap px-1 ${
                pos ? "right-1/2 mr-1 text-gray-400" : "left-1/2 ml-1 text-gray-400"
              }`}>{c.company}</span>
              {/* bar */}
              <div className="absolute left-0 right-0 h-2 top-1/2 -translate-y-1/2">
                <motion.div
                  className="absolute h-full rounded-sm"
                  style={{ [pos ? "left" : "right"]: "50%", background: color, opacity: hover === i ? 1 : 0.82 } as React.CSSProperties}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${w}%` } : {}}
                  transition={{ duration: 0.7, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* tooltip */}
      {hover !== null && (
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: companies[hover].r >= 0 ? sectorColors[companies[hover].sector] : "#fb7185" }} />
            <span className="text-sm text-white font-medium">{companies[hover].company}</span>
            <span className="text-xs text-gray-500">{companies[hover].sector}</span>
          </div>
          <div className="flex items-center gap-2 font-mono-accent">
            <span className={`text-sm ${companies[hover].r >= 0 ? "text-indigo-300" : "text-rose-300"}`}>
              r = {companies[hover].r > 0 ? "+" : ""}{companies[hover].r.toFixed(2)}
            </span>
            {companies[hover].stars && <span className="text-amber-300 text-sm">{companies[hover].stars}</span>}
          </div>
        </div>
      )}
      <p className="mt-3 text-[10px] font-mono-accent text-gray-600">
        *** p&lt;0.001 · ** p&lt;0.01 · * p&lt;0.05 &nbsp;·&nbsp; hover a bar for detail
      </p>
    </div>
  )
}
