// src/app/projects/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import ProjectsList from "./components/ProjectsList"
import NHLAnalysis from "./components/NHLAnalysis"

export default function ProjectsPage() {
  const searchParams = useSearchParams()
  const project = searchParams.get('project')

  switch (project) {
    case 'nhl':
      return <NHLAnalysis />
    default:
      return <ProjectsList />
  }
}