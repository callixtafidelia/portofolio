// /blog index — Server Component. Reads published posts from Keystatic (at
// build time, export-safe) and hands them to the existing BlogList UI.
import BlogList, { type BlogPost } from "./components/BlogList"
import { getPublishedPosts } from "@/lib/posts"

function formatDate(iso: string | null) {
  if (!iso) return ""
  const d = new Date(iso + "T00:00:00")
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()
  const list: BlogPost[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.excerpt,
    date: formatDate(p.publishedAt),
    category: p.category,
    readTime: p.readTime,
  }))
  return <BlogList posts={list} />
}
