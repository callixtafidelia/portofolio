import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import ArticleShell from "./ArticleShell"
import { mdxComponents } from "./mdxComponents"
import { getPost, getPublishedSlugs } from "@/lib/posts"

// Real syntax highlighting via Shiki (runs at build time — export-safe).
// keepBackground:false lets our .prose-article pre styling own the surface.
const rehypePrettyCodeOptions = {
  theme: "poimandres",
  keepBackground: false,
} as const

// Only build pages for published slugs; unknown/draft slugs 404 (export-safe).
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs()
  return slugs.map((slug) => ({ slug }))
}

function formatDate(iso: string | null) {
  if (!iso) return ""
  const d = new Date(iso + "T00:00:00")
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  }
}

export default async function BlogArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <ArticleShell
      title={post.title}
      category={post.category}
      excerpt={post.excerpt}
      date={formatDate(post.publishedAt)}
      readTime={post.readTime}
      author={post.author}
    >
      <MDXRemote
        source={post.source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
          },
        }}
      />
    </ArticleShell>
  )
}
