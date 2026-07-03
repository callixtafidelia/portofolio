"use client"

import { usePathname } from "next/navigation"
import ParticleField from "./ParticleField"
import StarCursor from "./StarCursor"

// Renders the global background particles + star cursor everywhere EXCEPT the
// Keystatic admin (/keystatic), so they don't overlay the editor UI.
export default function GlobalCanvases() {
  const pathname = usePathname()
  if (pathname?.startsWith("/keystatic")) return null
  return (
    <>
      <ParticleField />
      <StarCursor />
    </>
  )
}
