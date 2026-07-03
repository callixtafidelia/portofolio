import { createReader } from "@keystatic/core/reader"
import keystaticConfig from "../../keystatic.config"

// Reads content/posts/*.mdx from the repo at build time (export-safe).
export const reader = createReader(process.cwd(), keystaticConfig)

export interface PostMeta {
  slug: string
  title: string
  category: string
  excerpt: string
  publishedAt: string | null
  readTime: string
  author: string
  coverImage: string | null
  draft: boolean
}

function toMeta(slug: string, entry: any): PostMeta {
  return {
    slug,
    title: entry.title ?? slug,
    category: entry.category ?? "",
    excerpt: entry.excerpt ?? "",
    publishedAt: entry.publishedAt ?? null,
    readTime: entry.readTime ?? "",
    author: entry.author ?? "Callixta Fidelia C",
    coverImage: entry.coverImage ?? null,
    draft: !!entry.draft,
  }
}

/** All published (non-draft) posts, newest first. */
export async function getPublishedPosts(): Promise<PostMeta[]> {
  const slugs = await reader.collections.posts.list()
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.posts.read(slug)
      return entry ? toMeta(slug, entry) : null
    })
  )
  return entries
    .filter((p): p is PostMeta => p !== null && !p.draft)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
}

/** Slugs of published posts — for generateStaticParams. */
export async function getPublishedSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts()
  return posts.map((p) => p.slug)
}

/** A single published post with its resolved MDX body string, or null. */
export async function getPost(slug: string) {
  const entry = await reader.collections.posts.read(slug)
  if (!entry || entry.draft) return null
  // For fields.mdx the reader exposes the body either as a string or a thunk.
  const rawContent = (entry as any).content
  const source: string =
    typeof rawContent === "function" ? await rawContent() : (rawContent ?? "")
  return { ...toMeta(slug, entry), source }
}
