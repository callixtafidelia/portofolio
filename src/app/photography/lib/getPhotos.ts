import "server-only"
import path from "path"
import fs from "fs"
import imageSize from "image-size"
import { createReader } from "@keystatic/core/reader"
import keystaticConfig from "../../../../keystatic.config"

// Reads the Keystatic `photos` collection (committed JSON in content/photos/*)
// at build time and attaches REAL pixel dimensions from the after-image, so
// react-photo-album can compute the justified layout with no manual aspect tags.
const reader = createReader(process.cwd(), keystaticConfig)

export interface Photo {
  id: string
  title: string
  location: string
  date: string
  camera: string
  lens: string
  editingNotes: string
  beforeSrc: string
  afterSrc: string
  width: number
  height: number
  featured: boolean
}

// Keystatic's standalone image field returns the stored value as-is (it does
// NOT prepend publicPath). Normalize to a usable /photography/<file> URL,
// whether the stored value is a bare filename or already an absolute path.
function toPublicPath(value: string): string {
  if (!value) return value
  if (value.startsWith("/")) return value
  return "/photography/" + value.replace(/^photography\//, "")
}

function dimensionsOf(publicSrc: string): { width: number; height: number } {
  try {
    const abs = path.join(process.cwd(), "public", publicSrc.replace(/^\//, ""))
    const buf = fs.readFileSync(abs)
    const { width, height } = imageSize(buf)
    if (width && height) return { width, height }
  } catch {
    // missing/unreadable file — fall through to a safe 4:3 default
  }
  return { width: 1600, height: 1200 }
}

export async function getPhotos(): Promise<Photo[]> {
  const slugs = await reader.collections.photos.list()

  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.photos.read(slug)
      if (!entry || !entry.afterImage || !entry.beforeImage) return null
      const afterSrc = toPublicPath(entry.afterImage)
      const beforeSrc = toPublicPath(entry.beforeImage)
      const { width, height } = dimensionsOf(afterSrc)
      return {
        id: slug,
        title: entry.title,
        location: entry.location ?? "",
        date: entry.date ?? "",
        camera: entry.camera ?? "",
        lens: entry.lens ?? "",
        editingNotes: entry.editingNotes ?? "",
        beforeSrc,
        afterSrc,
        width,
        height,
        featured: !!entry.featured,
        order: entry.order ?? null,
      }
    })
  )

  return entries
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => {
      const ao = a.order ?? Number.MAX_SAFE_INTEGER
      const bo = b.order ?? Number.MAX_SAFE_INTEGER
      if (ao !== bo) return ao - bo
      return a.title.localeCompare(b.title)
    })
    .map(({ order: _order, ...photo }) => photo)
}
