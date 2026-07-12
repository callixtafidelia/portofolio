// src/app/projects/page.tsx
import { Suspense } from "react"
import ProjectsContent from "./ProjectsContent"
import { getQuartoProject, getQuartoProjectSlugs, getAllProjectCards } from "./lib/getQuartoProjects"

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

interface Props {
  searchParams: Promise<{ project?: string }>
}

export default async function ProjectsPage({ searchParams }: Props) {
  const { project: projectSlug } = await searchParams

  // Only reads the single requested project's small JSON entry (never the
  // uploaded HTML file itself — the browser fetches that directly into the
  // iframe) — plain nav (list view, tariff/nhl) never touches this
  // collection at all, so it doesn't scale with however many notebooks
  // get added later.
  let quartoProject = null
  if (projectSlug) {
    const slugs = await getQuartoProjectSlugs()
    if (slugs.includes(projectSlug)) {
      quartoProject = await getQuartoProject(projectSlug)
    }
  }

  // Only needed for the grid view — skip it when opening a single notebook.
  const projectCards = quartoProject || projectSlug ? [] : await getAllProjectCards()

  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsContent quartoProject={quartoProject} projectCards={projectCards} />
    </Suspense>
  )
}
