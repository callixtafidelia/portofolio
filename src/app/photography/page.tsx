import { Suspense } from "react"
import PhotographyContent from "./PhotographyContent"

function PhotographyLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#0a0e1a] text-white">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 neue-montreal text-sm tracking-widest uppercase">Loading photography...</p>
      </div>
    </div>
  )
}

export default function PhotographyPage() {
  return (
    <Suspense fallback={<PhotographyLoading />}>
      <PhotographyContent />
    </Suspense>
  )
}
