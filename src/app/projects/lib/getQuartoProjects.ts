import "server-only"
import fs from "fs"
import path from "path"
import { createReader } from "@keystatic/core/reader"
import keystaticConfig from "../../../../keystatic.config"

const reader = createReader(process.cwd(), keystaticConfig)

export interface QuartoProject {
  slug: string
  title: string
  excerpt: string
  // Public URL of the uploaded Quarto HTML file — rendered directly in an
  // <iframe> (see QuartoNotebook.tsx) so it keeps Quarto's own CSS/JS with
  // full fidelity (real MathJax/KaTeX, Bootstrap callout collapse, tippy
  // tooltips, any TOC) instead of us re-parsing and re-rendering it.
  fileUrl: string
}

// Keystatic's file field returns the stored value as-is (bare filename or
// already-prefixed path) — normalize to a usable /content/projects-html/<file>
// URL, same pattern as getPhotos.ts uses for image fields.
function toPublicPath(value: string): string {
  if (!value) return value
  if (value.startsWith("/")) return value
  return "/content/projects-html/" + value.replace(/^content\/projects-html\//, "")
}

// Cheap — just enumerates entry filenames, no parsing. Used to check
// whether a ?project=<slug> query param is a Keystatic quarto entry before
// doing any real work, so plain nav (list view, tariff/nhl) stays free of
// this collection entirely.
export async function getQuartoProjectSlugs(): Promise<string[]> {
  return reader.collections.projects.list()
}

// Only called for the one slug actually being viewed — reads a single small
// JSON entry (no HTML file parsing; the browser fetches that directly).
export async function getQuartoProject(slug: string): Promise<QuartoProject | null> {
  const entry = await reader.collections.projects.read(slug)
  if (!entry || entry.contentSource !== "quarto-html" || !entry.htmlFile) return null

  const fileUrl = toPublicPath(entry.htmlFile)
  const abs = path.join(process.cwd(), "public", fileUrl.replace(/^\//, ""))
  if (!fs.existsSync(abs)) return null

  return {
    slug,
    title: entry.title,
    excerpt: entry.excerpt ?? "",
    fileUrl,
  }
}

export interface ProjectCard {
  slug: string
  title: string
  excerpt: string
  cardImageUrl: string | null
  category: string
  skills: string[]
  githubUrl: string | null
}

// Drives the /projects grid — every entry in the collection becomes a card,
// so uploading a new project in the CMS is enough for it to appear (no code
// changes needed). Sorted by the optional `order` field, then title.
export async function getAllProjectCards(): Promise<ProjectCard[]> {
  const slugs = await reader.collections.projects.list()
  const entries = await Promise.all(
    slugs.map(async (slug) => ({ slug, entry: await reader.collections.projects.read(slug) }))
  )

  return entries
    .filter((e): e is { slug: string; entry: NonNullable<typeof e.entry> } => e.entry !== null)
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      excerpt: entry.excerpt ?? "",
      cardImageUrl: entry.cardImage ? toPublicImagePath(entry.cardImage) : null,
      category: entry.category ?? "",
      skills: (entry.skills ?? []).filter(Boolean),
      githubUrl: entry.githubUrl || null,
      order: entry.order ?? null,
    }))
    .sort((a, b) => {
      if (a.order !== null && b.order !== null) return a.order - b.order
      if (a.order !== null) return -1
      if (b.order !== null) return 1
      return a.title.localeCompare(b.title)
    })
    .map(({ order: _order, ...card }) => card)
}

function toPublicImagePath(value: string): string {
  if (!value) return value
  if (value.startsWith("/")) return value
  return "/images/projects/" + value.replace(/^images\/projects\//, "")
}
