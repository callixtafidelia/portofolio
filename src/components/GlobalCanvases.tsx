"use client"

import { usePathname, useSearchParams } from "next/navigation"
import ParticleField from "./ParticleField"
import StarCursor from "./StarCursor"

// Renders the global background particles + star cursor everywhere EXCEPT
// the Keystatic admin (/keystatic) and Quarto notebook pages, so they don't
// overlay the editor UI or bleed behind a full-bleed real-Quarto document.
export default function GlobalCanvases() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (pathname?.startsWith("/keystatic")) return null

  // Hide animations for all /projects?project=<slug> pages (both case studies and notebooks)
  const project = searchParams.get("project")
  if (pathname === "/projects" && project) {
    return null
  }

  return (
    <>
      <ParticleField />
      <StarCursor />
    </>
  )
}
