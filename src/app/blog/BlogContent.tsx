// src/app/blog/BlogContent.tsx
//
// DEPRECATED / UNUSED: the blog now uses the dynamic route /blog/[slug] and a
// Server Component /blog/page.tsx that reads from Keystatic. This old
// ?article=<slug> query-router is no longer wired into any route. It is kept in
// place (per request) but neutralized so the production build type-checks.
// Safe to delete along with the PCA/LSTM/DataViz article components.
"use client"

import { useSearchParams } from "next/navigation"
import BlogList from "./components/BlogList"
import PCAArticle from "./components/PCAArticle"
import LSTMArticle from "./components/LSTMArticle"
import DataVizArticle from "./components/DataVizArticle"

export default function BlogContent() {
  const searchParams = useSearchParams()
  const article = searchParams.get('article')

  switch (article) {
    case 'understanding-pca':
      return <PCAArticle />
    case 'lstm-time-series':
      return <LSTMArticle />
    case 'data-viz-best-practices':
      return <DataVizArticle />
    default:
      // Old hardcoded list retired; the live list lives at /blog/page.tsx.
      return <BlogList posts={[]} />
  }
}