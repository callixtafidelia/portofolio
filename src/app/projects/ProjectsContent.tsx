// src/app/projects/ProjectsContent.tsx
"use client"

import { useSearchParams } from "next/navigation"
import ProjectsList from "./components/ProjectsList"
import NHLAnalysis from "./components/NHLAnalysis"
import TariffAnalysis from "./components/tariff/TariffAnalysis"

export default function ProjectsContent() {
  const searchParams = useSearchParams()
  const project = searchParams.get('project')

  switch (project) {
    case 'nhl':
      return <NHLAnalysis />
    case 'tariff':
      return <TariffAnalysis />
    default:
      return <ProjectsList />
  }
}