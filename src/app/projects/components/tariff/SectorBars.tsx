"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { sectors, sectorColors } from "./data"
import { Toggle, useInViewOnce } from "@/components/case-study/primitives"

type Sort = "change" | "post" | "name"

export default function SectorBars() {
  const [sort, setSort] = useState<Sort>("change")
  const { ref, inView } = useInViewOnce()

  const rows = [...sectors].sort((a, b) =>
    sort === "change" ? b.change - a.change : sort === "post" ? b.post - a.post : a.sector.localeCompare(b.sector)
  )
  const max = Math.max(...sectors.map((s) => s.post)) * 1.05

  return (
    <div ref={ref} className="glow-card rounded-2xl p-5 sm:p-6 h-full">
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <h3 className="text-sm font-semibold text-gray-200">Sector attention · pre vs post</h3>
        <Toggle ariaLabel="sector-sort"
          options={[{ value: "change", label: "% change" }, { value: "post", label: "Post RSV" }, { value: "name", label: "A–Z" }]}
          value={sort} onChange={(v) => setSort(v as Sort)} />
      </div>

      <div className="space-y-4">
        {rows.map((s, i) => {
          const color = sectorColors[s.sector]
          const highlight = s.sector === "Semiconductors" || s.sector === "Industrial"
          return (
            <motion.div key={s.sector} layout transition={{ type: "spring", stiffness: 300, damping: 32 }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs sm:text-sm text-gray-300 flex items-center gap-2">
                  {s.sector}
                  {s.sector === "Semiconductors" && <span className="text-[9px] font-mono-accent px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-400/30">biggest jump</span>}
                  {s.sector === "Industrial" && <span className="text-[9px] font-mono-accent px-1.5 py-0.5 rounded bg-slate-600/30 text-slate-300 border border-slate-500/30">basically flat</span>}
                </span>
                <span className={`font-mono-accent text-xs tabular-nums ${s.change > 50 ? "text-purple-300" : s.change < 5 ? "text-slate-400" : "text-indigo-300"}`}>
                  {s.change > 0 ? "+" : ""}{s.change}%
                </span>
              </div>
              {/* pre bar */}
              <div className="relative h-3 rounded-full bg-slate-800/40 overflow-hidden mb-1">
                <motion.div className="h-full rounded-full" style={{ background: `${color}55` }}
                  initial={{ width: 0 }} animate={inView ? { width: `${(s.pre / max) * 100}%` } : {}}
                  transition={{ duration: 0.8, delay: i * 0.05 }} />
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] font-mono-accent text-gray-500">pre {s.pre}</span>
              </div>
              {/* post bar */}
              <div className="relative h-3.5 rounded-full bg-slate-800/40 overflow-hidden">
                <motion.div className="h-full rounded-full relative" style={{ background: color, boxShadow: highlight ? `0 0 12px ${color}66` : "none" }}
                  initial={{ width: 0 }} animate={inView ? { width: `${(s.post / max) * 100}%` } : {}}
                  transition={{ duration: 0.9, delay: i * 0.05 + 0.1 }} />
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] font-mono-accent text-white/70">post {s.post}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
