// src/app/blog/BlogContent.tsx
"use client"

import { useSearchParams } from "next/navigation"
import BlogList from "./components/BlogList"
import PCAArticle from "./components/PCAArticle"
import LSTMArticle from "./components/LSTMArticle"  // Changed: Capitalized the import name
import DataVizArticle from "./components/DataVizArticle"  // Added: Import for data viz article

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
      console.log('Rendering LSTMArticle')
      return <LSTMArticle />  // Changed: Using proper component name
    case 'data-viz-best-practices':
      console.log('Rendering DataVizArticle')
      return <DataVizArticle />  // Changed: Using proper component instead of BlogList
    default:
      console.log('Rendering BlogList (default)')
      return <BlogList />
  }
}