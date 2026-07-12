"use client"

import type { ReactNode } from "react"

/* ── Terminal-style code chrome: traffic-light dots + optional lang badge
   and filename footer. Used by the blog MDX code-block override so fenced
   code blocks render with the same terminal look as the rest of the site. */
export function CodeShell({
  langLabel, filename, className = "", children,
}: { langLabel?: string; filename?: string; className?: string; children: ReactNode }) {
  return (
    <div className={`code-cell rounded-xl overflow-hidden border border-white/10 bg-[#0b1020]/80 backdrop-blur-sm ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/[0.03]">
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400/60" />
        </span>
        {langLabel && (
          <span className="ml-auto text-[11px] font-mono-accent uppercase tracking-widest text-indigo-300/90 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-400/20">
            {langLabel}
          </span>
        )}
      </div>
      {children}
      {filename && <div className="px-4 pb-3 text-[11px] text-gray-500 font-mono-accent">{filename}</div>}
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

/* ── Mono, small-caps eyebrow label — with or without a leading number.
   Case studies pass `number` for their fixed 01/02/03 sequence; blog posts
   (not part of a numbered sequence) omit it and get just the label.
   `size="lg"` is for top-level (##) section headers in article bodies —
   bigger/bolder than the default so it outranks the h3/h4 sub-headings
   instead of reading smaller than them. ─────────────────────────────── */
export function Eyebrow({
  children, number, size = "sm",
}: { children?: ReactNode; number?: string; size?: "sm" | "lg" }) {
  if (!number && !children) return null
  const isLg = size === "lg"
  return (
    <div className={`flex items-baseline gap-3 ${isLg ? "mt-14 mb-5 pt-8 border-t border-white/10 first:mt-0 first:pt-0 first:border-0" : "mb-4"}`}>
      {number && <span className="font-mono-accent text-sm text-indigo-400/80 tabular-nums">{number}</span>}
      {children && (
        <span
          className={
            isLg
              ? "font-body text-sm md:text-base font-bold uppercase tracking-[0.12em] text-indigo-300"
              : "font-mono-accent text-[11px] uppercase tracking-[0.25em] text-gray-500"
          }
        >
          {children}
        </span>
      )}
    </div>
  )
}

/* ── Page/section headline: Playfair serif + animated gradient, no italic ─ */
export function PageHeadline({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={`font-semibold playfair leading-[1.05] ${className}`}>
      <span className="text-gradient-enhanced">{children}</span>
    </h1>
  )
}
