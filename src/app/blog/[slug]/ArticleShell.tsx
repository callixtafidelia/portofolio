"use client"

import { useState, useEffect, ReactNode } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, BookOpen, BarChart3, Brain } from "lucide-react"
import { PageHeadline } from "@/components/case-study/primitives"

interface Props {
  title: string
  category: string
  excerpt: string
  date: string
  readTime: string
  author: string
  children: ReactNode
}

// Category → accent pill (matches the current per-article headers).
const CATEGORY_STYLE: Record<string, { cls: string; Icon: typeof BookOpen }> = {
  "Machine Learning": { cls: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300", Icon: BookOpen },
  "Data Visualization": { cls: "from-green-500/20 to-green-600/20 border-green-500/30 text-green-300", Icon: BarChart3 },
  "Deep Learning": { cls: "from-red-500/20 to-red-600/20 border-red-500/30 text-red-300", Icon: Brain },
}

export default function ArticleShell({ title, category, excerpt, date, readTime, author, children }: Props) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const cat = CATEGORY_STYLE[category] ?? { cls: "from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-300", Icon: Tag }
  const CatIcon = cat.Icon

  return (
    <>
      <style jsx global>{`
        body { margin: 0; padding: 0; background: #0a0e1a; overflow-x: hidden; }
        body::before {
          content: ''; position: fixed; inset: 0; z-index: -1;
          background:
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.15) 0%, transparent 50%);
          animation: backgroundShift 20s ease-in-out infinite;
        }
        @keyframes backgroundShift { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
        @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .text-gradient-enhanced {
          background: linear-gradient(to right, #7dd3fe 0%, #818cf8 50%, #c084fc 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradientShift 5s ease infinite;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 4px; }

        /* ── Article body — case-study typography (MDX renders through these) ── */
        .prose-article {
          color: #dfe4ec;
          font-family: var(--font-body), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 1.14rem; line-height: 1.85; letter-spacing: 0.003em;
        }
        @media (min-width: 768px) { .prose-article { font-size: 1.25rem; line-height: 1.9; } }
        .prose-article > *:first-child { margin-top: 0; }
        /* h2 renders through the Eyebrow component (mdxComponents.tsx) instead
           of a plain heading — only h3/h4 still use this display styling. */
        .prose-article h3, .prose-article h4 {
          font-family: var(--font-body), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #fff; letter-spacing: -0.01em;
        }
        .prose-article h3 { font-weight: 700; font-size: 1.2rem; margin: 2rem 0 0.65rem; }
        @media (min-width: 768px) { .prose-article h3 { font-size: 1.4rem; } }
        .prose-article h4 { font-weight: 600; font-size: 1.05rem; margin: 1.4rem 0 0.5rem; }
        .prose-article p { margin: 0 0 1.4rem; }
        .prose-article strong { color: #fff; font-weight: 700; }
        .prose-article em { color: #eef2ff; }
        .prose-article a { color: #a5b4fc; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
        .prose-article a:hover { color: #c7d2fe; }
        .prose-article ul, .prose-article ol { margin: 0 0 1.4rem; padding-left: 0; list-style: none; }
        .prose-article li { position: relative; padding-left: 1.5rem; margin-bottom: 0.6rem; }
        .prose-article ul > li::before {
          content: ''; position: absolute; left: 0.2rem; top: 0.72em;
          width: 6px; height: 6px; border-radius: 9999px; background: #818cf8;
        }
        .prose-article ol { counter-reset: item; }
        .prose-article ol > li { counter-increment: item; }
        .prose-article ol > li::before { content: counter(item) '.'; position: absolute; left: 0; color: #818cf8; font-weight: 700; }
        .prose-article blockquote {
          border-left: 3px solid #818cf8; padding: 0.25rem 0 0.25rem 1.25rem; margin: 1.75rem 0;
          color: #c7cede; font-style: italic; font-size: 1.05em;
        }
        .prose-article hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 2.5rem 0; }
        .prose-article img {
          display: block; max-width: 100%; height: auto; margin: 1.75rem auto;
          border-radius: 0.85rem; border: 1px solid rgba(255,255,255,0.08);
        }

        /* Inline + block code (mono, not serif) */
        .prose-article :not(pre) > code {
          background: rgba(129, 140, 248, 0.13); color: #c7d2fe;
          padding: 0.12rem 0.4rem; border-radius: 0.35rem; font-size: 0.82em;
          font-family: var(--font-mono), 'SF Mono', 'Fira Code', monospace;
        }
        /* Code-block surface (background/border/dots/lang badge/filename) now
           comes entirely from CodeShell, rendered via the pre/figcaption
           overrides in mdxComponents.tsx — just reset the figure's default
           browser margin/indentation here. */
        .prose-article figure[data-rehype-pretty-code-figure] { margin: 1.5rem 0; }
        .prose-article pre code { display: grid; counter-reset: line; }
        .prose-article pre code [data-line] { padding: 0 0.1rem; }

        /* ── Medium-style callouts (Note / Highlight) ── */
        .article-callout {
          font-family: var(--font-body), -apple-system, sans-serif;
          border-radius: 0.85rem; padding: 1.05rem 1.25rem; margin: 1.75rem 0;
        }
        .article-callout__label {
          display: flex; align-items: center; gap: 0.4rem;
          font-family: var(--font-body), -apple-system, sans-serif; font-size: 0.78rem;
          letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; margin-bottom: 0.55rem;
        }
        .article-callout__body { font-size: 1rem; line-height: 1.7; color: #dfe4ec; }
        .article-callout__body > *:last-child { margin-bottom: 0; }
        .article-callout__body p { margin-bottom: 0.6rem; }
        .article-note { background: rgba(129,140,248,0.09); border: 1px solid rgba(129,140,248,0.28); border-left: 3px solid #818cf8; }
        .article-note .article-callout__label { color: #a5b4fc; }
        .article-highlight { background: rgba(251,191,36,0.07); border: 1px solid rgba(251,191,36,0.26); border-left: 3px solid #fbbf24; }
        .article-highlight .article-callout__label { color: #fcd34d; }
      `}</style>

      <div className="flex h-screen overflow-hidden bg-[#0a0e1a] text-white">
        <Sidebar active="blog" onToggle={setSidebarCollapsed} />
        <main
          className="flex-1 overflow-y-auto py-8 relative z-10 transition-all duration-300 ease-in-out"
          style={{ marginLeft: isMobile ? "0" : "40px" }}
        >
          <div className={`max-w-3xl mx-auto ${isMobile ? "px-4" : "px-6"}`}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link href="/blog" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-all duration-300 hover:translate-x-1 group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Blog</span>
              </Link>
            </motion.div>

            <article className="w-full">
              <motion.header
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-12 text-center"
              >
                <span className={`inline-flex items-center bg-gradient-to-r ${cat.cls} border font-medium rounded-full mb-6 ${isMobile ? "text-xs px-3 py-1.5" : "text-sm px-4 py-2"}`}>
                  <CatIcon size={14} className="mr-2" />
                  {category}
                </span>
                <PageHeadline className={`mb-6 ${isMobile ? "text-2xl sm:text-3xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"}`}>
                  {title}
                </PageHeadline>
                {excerpt && (
                  <p className={`text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto ${isMobile ? "text-base" : "text-base md:text-xl"}`}>
                    {excerpt}
                  </p>
                )}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400 border-y border-white/10 py-4">
                  {date && <span className="flex items-center gap-1.5"><Calendar size={14} className="text-indigo-400" />{date}</span>}
                  {readTime && <span className="flex items-center gap-1.5"><Clock size={14} className="text-indigo-400" />{readTime}</span>}
                  {author && <span className="flex items-center gap-1.5"><Tag size={14} className="text-indigo-400" />{author}</span>}
                </div>
              </motion.header>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="prose-article">{children}</div>
              </motion.div>
              <div className="h-16" />
            </article>
          </div>
        </main>
      </div>
    </>
  )
}
