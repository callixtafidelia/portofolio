// src/app/projects/page.tsx
"use client"

import { Suspense } from "react"
import ProjectsContent from "./ProjectsContent"

// Loading component
function ProjectsLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#0a0e1a] text-white">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-300">Loading projects...</p>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsContent />
    </Suspense>
  )
}