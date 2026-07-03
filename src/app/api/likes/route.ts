import { NextResponse } from "next/server"
import { redis, ratelimit, LIKES_KEY, DEDUPE_TTL } from "@/lib/likes-redis"

export const dynamic = "force-dynamic"

/**
 * GET /api/likes
 * → { counts: { [photoId]: number }, ranking: string[] }  (ranking = most loved first)
 * Called on mount to hydrate real, shared counts.
 */
export async function GET() {
  if (!redis) return NextResponse.json({ counts: {}, ranking: [] })

  // ZREVRANGE 0 -1 WITHSCORES → [member, score, member, score, ...]
  const raw = (await redis.zrange(LIKES_KEY, 0, -1, {
    rev: true,
    withScores: true,
  })) as (string | number)[]

  const counts: Record<string, number> = {}
  const ranking: string[] = []
  for (let i = 0; i < raw.length; i += 2) {
    const id = String(raw[i])
    const score = Math.max(0, Number(raw[i + 1]))
    counts[id] = score
    ranking.push(id)
  }

  return NextResponse.json({ counts, ranking })
}

/**
 * POST /api/likes  body: { photoId, visitorId, liked }
 * Rate-limit → dedup (one like per visitor+photo) → ZINCRBY ±1 → { photoId, count }.
 */
export async function POST(req: Request) {
  if (!redis || !ratelimit) {
    return NextResponse.json({ error: "likes-unavailable" }, { status: 503 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 })
  }

  const { photoId, visitorId, liked } = (body ?? {}) as {
    photoId?: unknown
    visitorId?: unknown
    liked?: unknown
  }
  if (typeof photoId !== "string" || typeof visitorId !== "string" || typeof liked !== "boolean") {
    return NextResponse.json({ error: "bad-request" }, { status: 400 })
  }

  const { success } = await ratelimit.limit(visitorId)
  if (!success) return NextResponse.json({ error: "rate-limited" }, { status: 429 })

  const dedupeKey = `dedupe:${visitorId}:${photoId}`

  if (liked) {
    // First like from this visitor for this photo only — NX prevents inflation.
    const set = await redis.set(dedupeKey, 1, { nx: true, ex: DEDUPE_TTL })
    if (set === "OK") await redis.zincrby(LIKES_KEY, 1, photoId)
    // else: already liked → no-op (toggle)
  } else {
    // Unlike: only decrement if this visitor had actually liked it.
    const existed = await redis.del(dedupeKey)
    if (existed) await redis.zincrby(LIKES_KEY, -1, photoId)
  }

  let count = Number(await redis.zscore(LIKES_KEY, photoId)) || 0
  if (count < 0) {
    count = 0
    await redis.zadd(LIKES_KEY, { score: 0, member: photoId })
  }

  return NextResponse.json({ photoId, count })
}
