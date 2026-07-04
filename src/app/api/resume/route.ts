import { NextResponse } from "next/server"
import { list } from "@vercel/blob"
import { resumeRatelimit } from "@/lib/resume-redis"

export const dynamic = "force-dynamic"

const RESUME_PREFIX = "private/resume"

/**
 * POST /api/resume  body: { passcode: string }
 * Casual friction gate — one shared passcode, no accounts. On match, looks up
 * the most recently uploaded resume blob (so swapping resumes is just an
 * upload — no env var to update) and streams it back. On mismatch, a
 * generic 401.
 */
export async function POST(req: Request) {
  const passcode = process.env.RESUME_PASSCODE
  if (!passcode) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 })
  }

  if (resumeRatelimit) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
    const { success } = await resumeRatelimit.limit(ip)
    if (!success) return NextResponse.json({ error: "rate-limited" }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 })
  }

  const { passcode: submitted } = (body ?? {}) as { passcode?: unknown }
  if (typeof submitted !== "string" || submitted !== passcode) {
    return NextResponse.json({ error: "invalid" }, { status: 401 })
  }

  const { blobs } = await list({ prefix: RESUME_PREFIX })
  if (blobs.length === 0) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 })
  }
  const latest = blobs.reduce((a, b) => (b.uploadedAt > a.uploadedAt ? b : a))

  const blobRes = await fetch(latest.url, { cache: "no-store" })
  if (!blobRes.ok) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 })
  }

  const buf = await blobRes.arrayBuffer()
  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Callixta_Fidelia_Resume.pdf"',
      "Cache-Control": "no-store",
    },
  })
}
