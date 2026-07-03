"use client"

import { useState } from "react"
import { Eye } from "lucide-react"

interface Props {
  beforeSrc: string
  afterSrc: string
}

/**
 * Adobe Lightroom–style compare: the edited photo shows by default.
 * Press and hold (mouse or touch) to reveal the original, unedited frame;
 * release to return to the edit.
 */
export default function BeforeAfterHold({ beforeSrc, afterSrc }: Props) {
  const [holding, setHolding] = useState(false)

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none touch-none cursor-pointer"
      onMouseDown={() => setHolding(true)}
      onMouseUp={() => setHolding(false)}
      onMouseLeave={() => setHolding(false)}
      onTouchStart={(e) => { e.preventDefault(); setHolding(true) }}
      onTouchEnd={() => setHolding(false)}
      onTouchCancel={() => setHolding(false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />

      {/* Edited (after) — always mounted as the base */}
      <img
        src={afterSrc}
        alt="Edited"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Original (before) — fades in while holding */}
      <img
        src={beforeSrc}
        alt="Original"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ease-out"
        style={{ opacity: holding ? 1 : 0 }}
        draggable={false}
      />

      {/* State label */}
      <div
        className={`absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-sm border text-xs font-mono-accent tracking-widest uppercase transition-colors duration-150 ${
          holding
            ? "bg-amber-500/20 border-amber-400/40 text-amber-200"
            : "bg-black/60 border-white/20 text-white"
        }`}
      >
        {holding ? "Original" : "Edited"}
      </div>

      {/* Hold hint */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-sm font-medium pointer-events-none transition-opacity duration-200"
        style={{ opacity: holding ? 0 : 1 }}
      >
        <Eye size={15} />
        Press &amp; hold to see the original
      </div>
    </div>
  )
}
