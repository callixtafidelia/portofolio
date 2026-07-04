import { NextResponse } from "next/server"
import { resumeRatelimit } from "@/lib/resume-redis"

export const dynamic = "force-dynamic"

/**
 * POST /api/resume  body: { passcode: string }
 * Casual friction gate — one shared passcode, no accounts. On match, fetches
 * the resume from its private Blob URL (server-side only, never exposed to
 * the client) and streams it back. On mismatch, a generic 401.
 */
export async function POST(req: Request) {
  const passcode = process.env.RESUME_PASSCODE
  const blobUrl = process.env.RESUME_BLOB_URL
  if (!passcode || !blobUrl) {
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

  const blobRes = await fetch(blobUrl, { cache: "no-store" })
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
