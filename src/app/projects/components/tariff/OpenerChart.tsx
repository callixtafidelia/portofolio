"use client"

import { motion } from "framer-motion"
import { monthly, ELECTION_IDX } from "./data"
import { usePrefersReducedMotion } from "./primitives"

const N = monthly.length
const Y_MAX = 50 // RSV scale headroom (tariff peaks ~42)

// normalized 0..100 coords; SVG uses preserveAspectRatio="none" + non-scaling stroke
const x = (i: number) => (i / (N - 1)) * 100
const y = (v: number) => 100 - (v / Y_MAX) * 96 - 2
const linePath = monthly.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(2)} ${y(p.tariff).toFixed(2)}`).join(" ")
const areaPath = `${linePath} L 100 100 L 0 100 Z`
const electionX = x(ELECTION_IDX)

const yearTicks = monthly
  .map((p, i) => ({ i, p }))
  .filter(({ p }) => p.date.endsWith("-01"))

export default function OpenerChart() {
  const reduced = usePrefersReducedMotion()
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-sm">
      <div className="relative w-full h-[340px] sm:h-[400px] md:h-[440px]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="op-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="op-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="70%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>

          {/* horizontal gridlines */}
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" y1={g * 100} x2="100" y2={g * 100}
              stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          ))}

          {/* election marker */}
          <line x1={electionX} y1="0" x2={electionX} y2="100"
            stroke="#c084fc" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" opacity="0.8" />

          {/* area + line (draw-in) */}
          <motion.path d={areaPath} fill="url(#op-area)"
            initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} />
          <motion.path d={linePath} fill="none" stroke="url(#op-line)" strokeWidth="2.4"
            strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
            initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: "easeInOut" }} />
        </svg>

        {/* headline overlay */}
        <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-start pointer-events-none">
          <p className="playfair-italic text-lg sm:text-2xl md:text-[1.7rem] leading-snug max-w-2xl text-white/95"
            style={{ textShadow: "0 2px 20px rgba(10,14,26,0.9)" }}>
            In late 2024, the whole country started Googling <span className="text-indigo-300">“tariffs.”</span> We
            wanted to know if that changed how people watched the stock market.
          </p>
        </div>

        {/* election label */}
        <div className="absolute top-2 sm:top-3 flex flex-col items-start pointer-events-none"
          style={{ left: `${electionX}%`, transform: "translateX(-50%)" }}>
          <div className="mt-16 sm:mt-20 px-2 py-1 rounded-md bg-purple-500/20 border border-purple-400/40 backdrop-blur-sm whitespace-nowrap">
            <span className="text-[10px] sm:text-[11px] font-mono-accent text-purple-200">Trump re-elected, Nov 2024</span>
          </div>
        </div>

        {/* y-axis max */}
        <div className="absolute top-1 left-1.5 text-[10px] font-mono-accent text-gray-500">RSV {Y_MAX}</div>
        <div className="absolute bottom-6 left-1.5 text-[10px] font-mono-accent text-gray-500">0</div>

        {/* x-axis year ticks */}
        <div className="absolute bottom-1.5 left-0 right-0 h-4">
          {yearTicks.map(({ i, p }) => (
            <span key={i} className="absolute text-[10px] font-mono-accent text-gray-500"
              style={{ left: `${x(i)}%`, transform: "translateX(-50%)" }}>
              {p.date.slice(0, 4)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
