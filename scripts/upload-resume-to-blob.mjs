// One-off script: uploads the resume PDF to Vercel Blob so it's no longer
// stored in the (public) git repo. Not run by the app — run it manually
// whenever the resume needs to be (re)uploaded.
//
// Usage:
//   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx node scripts/upload-resume-to-blob.mjs ./resume.pdf
//
// Get BLOB_READ_WRITE_TOKEN from Vercel → Storage → your Blob store → tokens.
// After it prints a URL, set that as RESUME_BLOB_URL in Vercel → Project →
// Settings → Environment Variables (Production + Preview). Never commit it.

import { put } from "@vercel/blob"
import { readFile } from "fs/promises"

const filePath = process.argv[2]
if (!filePath) {
  console.error("Usage: node scripts/upload-resume-to-blob.mjs <path-to-resume.pdf>")
  process.exit(1)
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN env var. Get it from Vercel → Storage → Blob → tokens.")
  process.exit(1)
}

const file = await readFile(filePath)

// addRandomSuffix (default true) makes the path unguessable; the URL is
// never sent to the client — only the server-side /api/resume route (via
// RESUME_BLOB_URL) ever fetches it.
const blob = await put(`private/resume-${Date.now()}.pdf`, file, {
  access: "public",
  addRandomSuffix: true,
  contentType: "application/pdf",
})

console.log("\nUploaded. Set this as RESUME_BLOB_URL in Vercel (Production + Preview):\n")
console.log(blob.url)
console.log("\nThen remove any old blob you no longer need from the Vercel Blob dashboard.")
