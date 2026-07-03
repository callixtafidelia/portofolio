"use client"

import { useRef, useState, useEffect, ReactNode } from "react"
import { motion } from "framer-motion"

/* ── Respect prefers-reduced-motion ─────────────────────────────────────── */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return reduced
}

/* ── Fire once when an element scrolls into view ─────────────────────────── */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(margin = "-15%") {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") { setInView(true); return }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { rootMargin: `0px 0px ${margin} 0px`, threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [margin])
  return { ref, inView }
}

/* ── Count-up number (respects reduced motion) ──────────────────────────── */
export function AnimatedNumber({
  to, from = 0, duration = 1400, decimals = 2, active, className, prefix = "", suffix = "",
}: {
  to: number; from?: number; duration?: number; decimals?: number; active: boolean
  className?: string; prefix?: string; suffix?: string
}) {
  const reduced = usePrefersReducedMotion()
  const [val, setVal] = useState(from)
  useEffect(() => {
    if (!active) return
    if (reduced) { setVal(to); return }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(from + (to - from) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, to, from, duration, reduced])
  return <span className={className}>{prefix}{val.toFixed(decimals)}{suffix}</span>
}

/* ── Syntax-lite highlighter for R / Python code cells ──────────────────── */
function highlight(code: string, lang: "r" | "python") {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  const kw = lang === "r"
    ? ["function", "for", "in", "if", "else", "return", "library", "TRUE", "FALSE", "NULL", "NA"]
    : ["def", "for", "in", "if", "else", "return", "import", "from", "as", "None", "True", "False", "with", "while"]
  return esc(code)
    .split("\n")
    .map((line) => {
      // comments
      const cIdx = line.indexOf("#")
      let codePart = cIdx >= 0 ? line.slice(0, cIdx) : line
      const comment = cIdx >= 0 ? line.slice(cIdx) : ""
      codePart = codePart
        .replace(/(&quot;|&#39;|"|')(.*?)\1/g, '<span class="tok-str">$1$2$1</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="tok-num">$1</span>')
        .replace(new RegExp(`\\b(${kw.join("|")})\\b`, "g"), '<span class="tok-kw">$1</span>')
        .replace(/([A-Za-z_.][A-Za-z0-9_.]*)\s*(?=\()/g, '<span class="tok-fn">$1</span>')
      const commentHtml = comment ? `<span class="tok-com">${comment}</span>` : ""
      return codePart + commentHtml
    })
    .join("\n")
}

export function CodeCell({ lang, code, caption }: { lang: "r" | "python"; code: string; caption?: string }) {
  return (
    <div className="code-cell rounded-xl overflow-hidden border border-white/10 bg-[#0b1020]/80 backdrop-blur-sm my-4">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/[0.03]">
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400/60" />
        </span>
        <span className="ml-auto text-[11px] font-mono-accent uppercase tracking-widest text-indigo-300/90 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-400/20">
          {lang === "r" ? "R" : "Python"}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed">
        <code className="font-mono-accent" dangerouslySetInnerHTML={{ __html: highlight(code, lang) }} />
      </pre>
      {caption && <div className="px-4 pb-3 text-[11px] text-gray-500 font-mono-accent">{caption}</div>}
      <style jsx global>{`
        .code-cell .tok-kw { color: #c084fc; }
        .code-cell .tok-str { color: #7dd3fc; }
        .code-cell .tok-num { color: #5eead4; }
        .code-cell .tok-fn { color: #818cf8; }
        .code-cell .tok-com { color: #64748b; font-style: italic; }
        .code-cell code { color: #cbd5e1; white-space: pre; }
      `}</style>
    </div>
  )
}

/* ── Notebook cell: number + title, narrative, then children (code+output) ─ */
export function Cell({
  index, kicker, title, children,
}: { index: string; kicker?: string; title: string; children: ReactNode }) {
  const { ref, inView } = useInViewOnce("-10%")
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-20 md:mb-28 scroll-mt-8"
    >
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono-accent text-sm text-indigo-400/80 tabular-nums">{index}</span>
        {kicker && <span className="font-mono-accent text-[11px] uppercase tracking-[0.25em] text-gray-500">{kicker}</span>}
      </div>
      <h2 className="playfair text-3xl sm:text-4xl md:text-5xl font-semibold mb-5 leading-tight">
        <span className="text-gradient-enhanced">{title}</span>
      </h2>
      {children}
    </motion.section>
  )
}

/* ── Small labelled toggle switch ───────────────────────────────────────── */
export function Toggle<T extends string>({
  options, value, onChange, ariaLabel,
}: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void; ariaLabel?: string }) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="inline-flex p-1 rounded-full bg-slate-800/60 border border-white/10">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
              active ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`toggle-${ariaLabel}`}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
