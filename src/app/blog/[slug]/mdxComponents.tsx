import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { Info, Sparkles } from "lucide-react"
import { CodeShell, Eyebrow } from "@/components/case-study/primitives"

// Components made available to the MDX body. These match the Keystatic
// content-components (Note / Highlight) defined in keystatic.config.ts, so
// callouts inserted in the editor render as styled blocks here. h2/pre/
// figcaption route ## headings and fenced code blocks through the same
// eyebrow + terminal-style components the case studies use, so blog posts
// share one visual system instead of a second copy of the styling.
export const mdxComponents = {
  Note: ({ children }: { children?: ReactNode }) => (
    <aside className="article-callout article-note" role="note">
      <div className="article-callout__label">
        <Info size={14} />
        Note
      </div>
      <div className="article-callout__body">{children}</div>
    </aside>
  ),
  Highlight: ({ children }: { children?: ReactNode }) => (
    <aside className="article-callout article-highlight">
      <div className="article-callout__label">
        <Sparkles size={14} />
        Highlight
      </div>
      <div className="article-callout__body">{children}</div>
    </aside>
  ),
  // ## heading — same mono/small-caps eyebrow as case-study sections, just
  // without the leading 01/02 number (blog posts aren't a numbered sequence).
  h2: ({ children }: ComponentPropsWithoutRef<"h2">) => <Eyebrow size="lg">{children}</Eyebrow>,
  // Fenced code block — rehype-pretty-code already did the Shiki syntax
  // highlighting; this just swaps the surrounding chrome for the terminal
  // shell (traffic-light dots + language badge) instead of default <pre>.
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre"> & { "data-language"?: string }) => (
    <CodeShell langLabel={props["data-language"]?.toUpperCase()}>
      <pre {...props} className="overflow-x-auto p-4 text-[12.5px] leading-relaxed">
        {children}
      </pre>
    </CodeShell>
  ),
  // Optional title="…"/caption="…" fence meta — rendered as a filename-style
  // footer line to match CodeCell's optional caption.
  figcaption: ({ children, ...props }: ComponentPropsWithoutRef<"figcaption">) => (
    <div
      {...props}
      className={`text-[11px] text-gray-500 font-mono-accent ${
        "data-rehype-pretty-code-caption" in props ? "-mt-3 mb-4" : "mb-1"
      }`}
    >
      {children}
    </div>
  ),
}
