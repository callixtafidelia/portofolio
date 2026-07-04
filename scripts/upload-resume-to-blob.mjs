// One-off script: uploads the resume PDF to Vercel Blob so it's no longer
// stored in the (public) git repo. Not run by the app — run it manually
// whenever the resume needs to be (re)uploaded.
//
// Usage:
//   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx node scripts/upload-resume-to-blob.mjs ./resume.pdf
//
// Get BLOB_READ_WRITE_TOKEN from Vercel → Storage → your Blob store → tokens.
// No further setup needed — /api/resume always serves whichever blob under
// "private/resume*" was uploaded most recently, so this script alone is
// enough to swap resumes.

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
// never sent to the client — only the server-side /api/resume route ever
// looks it up (via `list()`, picking the most recently uploaded match).
const blob = await put(`private/resume-${Date.now()}.pdf`, file, {
  access: "public",
  addRandomSuffix: true,
  contentType: "application/pdf",
})

console.log("\nUploaded:\n")
console.log(blob.url)
console.log("\n/api/resume will serve this one automatically on the next request (no env var to update).")
console.log("You can now delete any older resume blob from the Vercel Blob dashboard.")
