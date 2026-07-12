"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"
import type { QuartoProject } from "../lib/getQuartoProjects"

// Quarto's light/dark toggle (present when the .qmd sets a light+dark theme
// pair) persists the reader's choice in localStorage under this key —
// "default" = light, "alternate" = dark. Since the iframe is same-origin,
// this storage is shared with the parent page, so we can default new
// visitors to dark (matching the site's theme) by pre-seeding it, without
// ever touching a value a reader already chose for themselves.
const QUARTO_COLOR_SCHEME_KEY = "quarto-color-scheme"

function seedDarkDefault() {
  if (window.localStorage.getItem(QUARTO_COLOR_SCHEME_KEY) === null) {
    window.localStorage.setItem(QUARTO_COLOR_SCHEME_KEY, "alternate")
  }
}

/**
 * Renders the uploaded Quarto HTML file directly in a full-bleed <iframe> —
 * real Quarto CSS, real MathJax/KaTeX, real Bootstrap callout collapse,
 * tippy tooltips, any TOC, all untouched — instead of us re-parsing/
 * sanitizing/re-rendering it. Only the site's dark Sidebar sits outside the
 * iframe (it already provides navigation back to /projects, so there's no
 * separate back-link chrome here); the real document fills 100% of the
 * remaining space immediately next to it, exactly like visiting the file
 * directly. The iframe is same-origin (served from our own
 * public/content/projects-html/), so `allow-same-origin` grants no extra
 * privilege beyond a plain unsandboxed iframe. `allow-top-navigation` is
 * deliberately omitted so the embedded page can't hijack the parent tab.
 *
 * `src` is intentionally NOT set directly in JSX: Next.js server-renders
 * whatever's in the initial markup, so a literal `src={project.fileUrl}`
 * would let the browser start loading the iframe (and it reads
 * localStorage for its color scheme on load) before our own client JS has
 * hydrated and seeded the dark default — a real race that made the
 * document sometimes load light regardless of the seeded value. Setting
 * `src` only after seeding, in an effect, guarantees the seed always wins.
 */
export default function QuartoNotebook({ project }: { project: QuartoProject }) {
  const [isMobile, setIsMobile] = useState(false)
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    seedDarkDefault()
    setSrc(project.fileUrl)
  }, [project.fileUrl])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Inject scrollbar styles into iframe
  useEffect(() => {
    const iframe = document.querySelector('iframe') as HTMLIFrameElement
    if (!iframe) return

    const injectScrollbarStyles = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
        if (!iframeDoc) return

        // Check if styles already injected
        if (iframeDoc.getElementById('themed-scrollbar-styles')) return

        const style = iframeDoc.createElement('style')
        style.id = 'themed-scrollbar-styles'
        style.textContent = `
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(15, 23, 42, 0.5);
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
          }
        `
        iframeDoc.head.appendChild(style)
      } catch (e) {
        console.error('Failed to inject scrollbar styles:', e)
      }
    }

    // Wait for iframe to load
    iframe.addEventListener('load', injectScrollbarStyles)
    
    // Try immediately in case it's already loaded
    injectScrollbarStyles()

    return () => {
      iframe.removeEventListener('load', injectScrollbarStyles)
    }
  }, [src])

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0e1a] text-white">
      <Sidebar active="projects" />

      <main className="flex-1 h-screen" style={{ paddingTop: isMobile ? "64px" : 0 }}>
        {src && (
          <iframe
            src={src}
            title={project.title}
            sandbox="allow-scripts allow-same-origin allow-popups"
            className="w-full h-full block border-0"
          />
        )}
      </main>
    </div>
  )
}
