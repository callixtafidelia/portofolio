// src/app/projects/ProjectsContent.tsx
"use client"

import { useSearchParams } from "next/navigation"
import ProjectsList from "./components/ProjectsList"
import QuartoNotebook from "./components/QuartoNotebook"
import type { QuartoProject, ProjectCard } from "./lib/getQuartoProjects"

export default function ProjectsContent({
  quartoProject,
  projectCards,
}: {
  quartoProject: QuartoProject | null
  projectCards: ProjectCard[]
}) {
  const searchParams = useSearchParams()
  const project = searchParams.get('project')

  if (quartoProject) return <QuartoNotebook project={quartoProject} />
  if (project) return null

  return <ProjectsList projects={projectCards} />
}
