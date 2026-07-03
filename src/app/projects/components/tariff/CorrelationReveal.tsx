"use client"

import { motion } from "framer-motion"
import { correlation } from "./data"
import { AnimatedNumber, useInViewOnce, usePrefersReducedMotion } from "./primitives"

function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// deterministic scatter with an approximate target correlation
function scatter(r: number, seed: number, n = 34) {
  const rand = mulberry32(seed)
  return Array.from({ length: n }, () => {
    const x = rand()
    const noise = (rand() - 0.5) * 2
    const y = r * (x - 0.5) + Math.sqrt(Math.max(0, 1 - r * r)) * noise * 0.5 + 0.5
    return { x, y: Math.max(0.02, Math.min(0.98, y)) }
  })
}

const beforePts = scatter(0.02, 7)
const afterPts = scatter(0.81, 91)

function Scatter({ pts, label, r, inView, accent }: {
  pts: { x: number; y: number }[]; label: string; r: number; inView: boolean; accent: string
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono-accent text-[11px] uppercase tracking-widest text-gray-500">{label}</span>
        <span className="font-mono-accent text-xs" style={{ color: accent }}>r = {r.toFixed(2)}</span>
      </div>
      <div className="relative w-full aspect-[4/3] rounded-xl border border-white/10 bg-slate-900/40 overflow-hidden">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <line x1="8" y1="92" x2="92" y2="92" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          <line x1="8" y1="8" x2="8" y2="92" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          {pts.map((p, i) => (
            <motion.circle key={i}
              cx={8 + p.x * 84} cy={92 - p.y * 84} r="1.6" fill={accent}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 0.85, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.015 }} />
          ))}
        </svg>
        <span className="absolute bottom-1 right-2 text-[9px] font-mono-accent text-gray-600">Tariff RSV →</span>
      </div>
    </div>
  )
}

export default function CorrelationReveal() {
  const { ref, inView } = useInViewOnce()
  const reduced = usePrefersReducedMotion()
  return (
    <div ref={ref} className="glow-card rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* big number */}
        <div className="text-center md:text-left shrink-0">
          <div className="flex items-baseline gap-3 justify-center md:justify-start">
            <span className="font-mono-accent text-lg text-gray-500">r =</span>
            <AnimatedNumber active={inView} from={reduced ? correlation.after : correlation.before}
              to={correlation.after} decimals={2}
              className="playfair text-6xl sm:text-7xl md:text-8xl font-semibold text-gradient-enhanced tabular-nums" />
          </div>
          <div className="mt-2 font-mono-accent text-sm text-gray-400">
            p = {correlation.p} <span className="text-teal-300">· significant</span>
          </div>
          <div className="mt-3 flex items-center gap-2 justify-center md:justify-start font-mono-accent text-xs text-gray-500">
            <span>{correlation.before.toFixed(2)}</span>
            <span className="w-16 h-px bg-gradient-to-r from-gray-600 to-indigo-400" />
            <span className="text-indigo-300">{correlation.after.toFixed(2)}</span>
            <span className="text-gray-600">before → after</span>
          </div>
        </div>

        {/* scatters */}
        <div className="flex gap-4 w-full">
          <Scatter pts={beforePts} label="Before" r={correlation.before} inView={inView} accent="#64748b" />
          <Scatter pts={afterPts} label="After" r={correlation.after} inView={inView} accent="#818cf8" />
        </div>
      </div>
      <p className="mt-6 text-sm text-gray-400 italic border-l-2 border-indigo-500/40 pl-4">
        Correlation, not causation — but the two went from unrelated to tightly coupled.
      </p>
    </div>
  )
}
