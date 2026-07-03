import type { ReactNode } from "react"
import { Info, Sparkles } from "lucide-react"

// Components made available to the MDX body. These match the Keystatic
// content-components (Note / Highlight) defined in keystatic.config.ts, so
// callouts inserted in the editor render as styled blocks here.
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
}
