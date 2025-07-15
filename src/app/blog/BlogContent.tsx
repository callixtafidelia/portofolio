// src/app/blog/BlogContent.tsx
"use client"

import { useSearchParams } from "next/navigation"
import BlogList from "./components/BlogList"
import PCAArticle from "./components/PCAArticle"

export default function BlogContent() {
  const searchParams = useSearchParams()
  const article = searchParams.get('article')
  
  // Add some debugging
  console.log('Current article param:', article)
  
  switch (article) {
    case 'understanding-pca':
      console.log('Rendering PCAArticle')
      return <PCAArticle />
    case 'lstm-time-series':
      return <BlogList />
    case 'data-viz-best-practices':
      return <BlogList />
    default:
      console.log('Rendering BlogList (default)')
      return <BlogList />
  }
}