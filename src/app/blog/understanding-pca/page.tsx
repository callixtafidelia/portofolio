"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

export default function PCAArticle() {
  // Smooth-scrolling for in-page links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href")!;
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex overflow-auto">
      <Sidebar active="blog" />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>

          {/* Category badge */}
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Machine Learning
          </span>

          {/* Article title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Understanding Principal Component Analysis
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap gap-6 text-gray-600 text-sm mb-8">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" /> May 15, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" /> 8 min read
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-1" /> Your Name
            </div>
          </div>

          <div className="md:flex gap-8">
            {/* Sidebar / TOC */}
            <aside className="md:w-1/4 mb-8 md:mb-0">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Contents</h2>
                <ul className="space-y-2 text-sm">
                  {[
                    { href: "#introduction", label: "1. Introduction" },
                    { href: "#what-is-pca", label: "2. What is PCA?" },
                    { href: "#how-pca-works", label: "3. How PCA Works" },
                    { href: "#implementation", label: "4. Implementation" },
                    { href: "#use-cases", label: "5. Use Cases" },
                    { href: "#conclusion", label: "6. Conclusion" },
                  ].map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="text-blue-600 hover:underline">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Article body */}
            <article className="md:flex-1 space-y-8 text-gray-700">
              <section id="introduction">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p>
                  Principal Component Analysis (PCA) is one of the most fundamental techniques in data science and machine
                  learning. It’s a powerful dimensionality reduction technique that helps us understand and visualize
                  high-dimensional data by finding the most important patterns while preserving essential information.
                </p>
                <p>
                  In this guide, we’ll explore what PCA is, how it works, and when to use it. Whether you’re handling
                  images, financial datasets, or other high-dimensional data, PCA will enhance your analytical toolkit.
                </p>
              </section>

              <section id="what-is-pca">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What is PCA?</h2>
                <p>
                  PCA is an unsupervised technique that transforms data into a lower-dimensional space while retaining
                  most variance. It finds new axes—principal components—that capture maximum variance in the data.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <h3 className="font-semibold text-gray-900 mb-2">Key Benefits of PCA:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Dimensionality Reduction: preserves essential features</li>
                    <li>Noise Reduction: filters out less important variation</li>
                    <li>Visualization: enables 2D/3D plotting of data</li>
                    <li>Computational Efficiency: speeds up downstream algorithms</li>
                  </ul>
                </div>
              </section>

              <section id="how-pca-works">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How PCA Works</h2>
                <p>PCA works through these mathematical steps to identify directions of maximum variance:</p>
                <ol className="list-decimal list-inside space-y-4">
                  <li className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <strong>Step 1: Standardization</strong> — scale features to zero mean & unit variance.
                  </li>
                  <li className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                    <strong>Step 2: Covariance Matrix</strong> — compute how features vary together.
                  </li>
                  <li className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
                    <strong>Step 3: Eigendecomposition</strong> — extract eigenvalues & eigenvectors.
                  </li>
                  <li className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                    <strong>Step 4: Component Selection</strong> — choose the top k components.
                  </li>
                </ol>
              </section>

              <section id="implementation">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Implementation</h2>
                <p>Example using scikit-learn:</p>
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm text-gray-800">
                  <code>{`from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

# 1) Standardize
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 2) PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)`}</code>
                </pre>
                <p>
                  Always standardize first, then pick components by inspecting explained variance.
                </p>
              </section>

              <section id="use-cases">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Use Cases</h2>
                <p>
                  PCA is ideal for exploratory analysis, feature reduction, and compression in fields like image
                  processing, finance, and genomics.
                </p>
              </section>

              <section id="conclusion">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
                <p>
                  PCA offers an elegant solution to the curse of dimensionality. By mastering its mathematics and
                  applications, you’ll be able to extract richer insights and build more efficient models.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
