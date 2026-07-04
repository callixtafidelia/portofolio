"use client"

import { useState, useEffect, useMemo } from "react"
import { states, StateRow, Series } from "./data"
import { Toggle } from "@/components/case-study/primitives"

interface Feat { name: string; d: string }

// lerp between two hex colors
function lerp(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16))
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16))
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t))
  return `rgb(${c[0]},${c[1]},${c[2]})`
}

const SCALES: Record<Series, [string, string]> = {
  tariff: ["#241b47", "#c084fc"], // dark → violet
  stock: ["#0c2038", "#7dd3fc"], // dark → sky
}

export default function USChoropleth() {
  const [series, setSeries] = useState<Series>("tariff")
  const [feats, setFeats] = useState<Feat[] | null>(null)
  const [hover, setHover] = useState<string | null>(null)

  const byState = useMemo(() => {
    const m = new Map<string, StateRow>()
    states.forEach((s) => m.set(s.state, s))
    return m
  }, [])
  const [min, max] = useMemo(() => {
    const vals = states.map((s) => s[series])
    return [Math.min(...vals), Math.max(...vals)]
  }, [series])

  useEffect(() => {
    let alive = true
    ;(async () => {
      const [us, topo, geo] = await Promise.all([
        import("us-atlas/states-10m.json"),
        import("topojson-client"),
        import("d3-geo"),
      ])
      const topology = (us.default ?? us) as any
      const fc = topo.feature(topology, topology.objects.states) as any
      const path = geo.geoPath() // us-atlas is pre-projected (975×610)
      const list: Feat[] = fc.features
        .map((f: any) => ({ name: f.properties.name as string, d: path(f) as string }))
        .filter((f: Feat) => f.d)
      if (alive) setFeats(list)
    })()
    return () => { alive = false }
  }, [])

  const colorFor = (name: string) => {
    const row = byState.get(name)
    if (!row) return "#1e293b"
    const t = (row[series] - min) / (max - min)
    return lerp(SCALES[series][0], SCALES[series][1], t)
  }

  const hoveredRow = hover ? byState.get(hover) : null

  return (
    <div className="glow-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <Toggle ariaLabel="map-series"
          options={[{ value: "tariff", label: "Tariff" }, { value: "stock", label: "Stock" }]}
          value={series} onChange={(v) => setSeries(v as Series)} />
        {/* legend */}
        <div className="flex items-center gap-2">
          <span className="font-mono-accent text-[10px] text-gray-500 tabular-nums">{min.toFixed(1)}</span>
          <div className="h-2.5 w-24 rounded-full" style={{ background: `linear-gradient(90deg, ${SCALES[series][0]}, ${SCALES[series][1]})` }} />
          <span className="font-mono-accent text-[10px] text-gray-500 tabular-nums">{max.toFixed(1)}</span>
          <span className="font-mono-accent text-[10px] text-gray-500 ml-1">ΔRSV</span>
        </div>
      </div>

      {/* hovered readout */}
      <div className="h-9 mb-1 flex items-center">
        {hoveredRow ? (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white font-medium">{hoveredRow.state}</span>
            <span className="font-mono-accent text-xs text-purple-300">Tariff +{hoveredRow.tariff.toFixed(1)}</span>
            <span className="font-mono-accent text-xs text-sky-300">Stock +{hoveredRow.stock.toFixed(1)}</span>
          </div>
        ) : (
          <span className="font-mono-accent text-xs text-gray-500">Hover a state — Δ RSV, before vs after Nov 2024</span>
        )}
      </div>

      <div className="relative w-full">
        {!feats ? (
          <div className="w-full aspect-[975/610] rounded-xl bg-slate-900/40 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <svg viewBox="0 0 975 610" className="w-full h-auto">
            {feats.map((f) => {
              const active = hover === f.name
              return (
                <path key={f.name} d={f.d} fill={colorFor(f.name)}
                  stroke={active ? "#fff" : "rgba(10,14,26,0.8)"} strokeWidth={active ? 1.6 : 0.6}
                  style={{ transition: "fill 0.3s ease", cursor: "pointer" }}
                  onMouseEnter={() => setHover(f.name)} onMouseLeave={() => setHover(null)}
                  onClick={() => setHover(f.name)} />
              )
            })}
          </svg>
        )}
      </div>

      <p className="mt-3 text-[11px] font-mono-accent text-gray-500">
        Tariff attention rose slightly more in manufacturing states (Texas, Wisconsin); stock attention rose more in
        wealthier states (New York, California, Washington).
      </p>
    </div>
  )
}
