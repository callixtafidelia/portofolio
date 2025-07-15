//src/app/blog/pca.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, BookOpen } from "lucide-react"

export default function PCAArticle() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // Smooth-scrolling for in-page links
  useEffect(() => {
    const handleClick = (e: Event) => {
      e.preventDefault()
      const target = e.currentTarget as HTMLAnchorElement
      const href = target.getAttribute("href")!
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", handleClick)
    })

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", handleClick)
      })
    }
  }, [])

  return (
    <>
      {/* Enhanced Global Styles */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #0a0e1a;
          overflow-x: hidden;
        }
        
        /* Animated background gradient */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.15) 0%, transparent 50%);
          z-index: -1;
          animation: backgroundShift 20s ease-in-out infinite;
        }
        
        @keyframes backgroundShift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes gradientShift {
          0%, 100% { 
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
          50% { 
            background-position: 100% 50%;
            filter: hue-rotate(45deg);
          }
        }
        
        .text-gradient-enhanced {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 5s ease infinite;
        }
        
        .glow-card {
          position: relative;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .glow-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(240, 147, 251, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }
        
        .glow-card:hover::before {
          opacity: 1;
        }
        
        .glow-card:hover {
          transform: translateY(-2px);
          border-color: rgba(102, 126, 234, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        /* Mobile responsive adjustments */
        @media (max-width: 1024px) {
          .glow-card:hover {
            transform: none;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        }
      `}</style>

      <div className="flex h-screen overflow-hidden bg-[#0a0e1a] text-white">
        {/* Sidebar */}
        <Sidebar active="blog" onToggle={setSidebarCollapsed} />

        {/* Main content with responsive margin and centering */}
        <main
          className="flex-1 overflow-y-auto py-8 relative transition-all duration-300 ease-in-out"
          style={{
            marginLeft: isMobile ? "0" : "40px",
          }}
        >
          <div className={`max-w-4xl mx-auto ${isMobile ? "px-4" : "px-6"}`}>
            {/* Back link */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-all duration-300 hover:translate-x-1 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Blog</span>
              </Link>
            </motion.div>

            {/* Article Content */}
            <article className="w-full">
              {/* Article Header */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-12 text-center"
              >
                <span
                  className={`inline-flex items-center bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 text-blue-300 font-medium rounded-full mb-6 ${isMobile ? "text-xs px-3 py-1.5" : "text-sm px-4 py-2"}`}
                >
                  <BookOpen size={14} className="mr-2" />
                  Machine Learning
                </span>
                <h1
                  className={`font-bold mb-6 ${isMobile ? "text-2xl sm:text-3xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"}`}
                >
                  <span className="text-gradient-enhanced">Understanding Principal Component Analysis</span>
                </h1>
                <p
                  className={`text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto ${isMobile ? "text-base" : "text-base md:text-xl"}`}
                >
                  A comprehensive guide to PCA, one of the most fundamental techniques in data science for
                  dimensionality reduction and data visualization.
                </p>

                {/* Article Metadata */}
                <div
                  className={`flex gap-4 md:gap-6 text-gray-400 justify-center ${isMobile ? "text-xs flex-wrap" : "text-xs flex-wrap md:text-sm"}`}
                >
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Calendar size={16} />
                    May 15, 2024
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Clock size={16} />8 min read
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Tag size={16} />
                    Callixta Fidelia C
                  </div>
                </div>
              </motion.header>

              {/* Article Body */}
              <div className="space-y-8 md:space-y-12">
                <motion.section
                  id="introduction"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Introduction
                  </h2>
                  <div
                    className={`space-y-3 md:space-y-4 text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                  >
                    <p>
                      Principal Component Analysis (PCA) is one of the most fundamental techniques in data science and
                      machine learning. It's a powerful dimensionality reduction technique that helps us understand and
                      visualize high-dimensional data by finding the most important patterns while preserving essential
                      information.
                    </p>
                    <p>
                      In this comprehensive guide, we'll explore what PCA is, how it works mathematically, and when to
                      use it in your data science projects. Whether you're handling images, financial datasets, or other
                      high-dimensional data, PCA will become an invaluable tool in your analytical toolkit.
                    </p>
                  </div>
                </motion.section>

                <motion.section
                  id="what-is-pca"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    What is PCA?
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      PCA is an unsupervised technique that transforms data into a lower-dimensional space while
                      retaining most of the variance. It finds new axes—called principal components—that capture the
                      maximum variance in the data.
                    </p>

                    <div
                      className={`bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                    >
                      <h3
                        className={`font-bold text-white mb-3 md:mb-4 flex items-center gap-2 ${isMobile ? "text-base" : "text-base md:text-xl"}`}
                      >
                        <BookOpen size={20} className="text-blue-400" />
                        Key Benefits of PCA
                      </h3>
                      <ul
                        className={`space-y-2 md:space-y-3 text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}
                      >
                        <li className="flex items-start gap-2 md:gap-3">
                          <div
                            className={`bg-blue-400 rounded-full flex-shrink-0 ${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-1.5 h-1.5 mt-1.5 md:w-2 md:h-2 md:mt-2"}`}
                          ></div>
                          <div>
                            <strong className="text-white">Dimensionality Reduction:</strong> Reduces the number of
                            features while preserving essential information
                          </div>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <div
                            className={`bg-purple-400 rounded-full flex-shrink-0 ${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-1.5 h-1.5 mt-1.5 md:w-2 md:h-2 md:mt-2"}`}
                          ></div>
                          <div>
                            <strong className="text-white">Noise Reduction:</strong> Filters out less important
                            variations and noise in the data
                          </div>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <div
                            className={`bg-green-400 rounded-full flex-shrink-0 ${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-1.5 h-1.5 mt-1.5 md:w-2 md:h-2 md:mt-2"}`}
                          ></div>
                          <div>
                            <strong className="text-white">Visualization:</strong> Enables 2D/3D plotting of
                            high-dimensional data
                          </div>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <div
                            className={`bg-blue-400 rounded-full flex-shrink-0 ${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-1.5 h-1.5 mt-1.5 md:w-2 md:h-2 md:mt-2"}`}
                          ></div>
                          <div>
                            <strong className="text-white">Computational Efficiency:</strong> Speeds up downstream
                            machine learning algorithms
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  id="how-pca-works"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    How PCA Works
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      PCA works through a series of mathematical steps to identify the directions of maximum variance in
                      your data:
                    </p>

                    <div className="grid gap-3 md:gap-4">
                      <div
                        className={`bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                          Step 1: Standardization
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                          Scale all features to have zero mean and unit variance to ensure equal contribution.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                          Step 2: Covariance Matrix
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                          Compute the covariance matrix to understand how features vary together.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                          Step 3: Eigendecomposition
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                          Extract eigenvalues and eigenvectors from the covariance matrix.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-r from-red-500/10 to-blue-500/10 border border-red-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                          Step 4: Component Selection
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                          Choose the top k components that explain the most variance in your data.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  id="implementation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Implementation
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      Here's how to implement PCA using scikit-learn in Python:
                    </p>

                    <div
                      className={`bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-x-auto ${isMobile ? "p-3" : "p-3 md:p-6"}`}
                    >
                      <pre className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                        <code>{`from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import numpy as np
import matplotlib.pyplot as plt

# Sample data
X = np.random.randn(1000, 10)  # 1000 samples, 10 features

# Step 1: Standardize the data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Step 2: Apply PCA
pca = PCA(n_components=2)  # Reduce to 2 dimensions
X_pca = pca.fit_transform(X_scaled)

# Step 3: Analyze results
print(f"Explained variance ratio: {pca.explained_variance_ratio_}")
print(f"Total variance explained: {pca.explained_variance_ratio_.sum():.2%}")

# Step 4: Visualize
plt.figure(figsize=(10, 6))
plt.scatter(X_pca[:, 0], X_pca[:, 1], alpha=0.6)
plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.1%} variance)')
plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.1%} variance)')
plt.title('PCA Visualization')
plt.show()`}</code>
                      </pre>
                    </div>

                    <div
                      className={`bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                    >
                      <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                        💡 Pro Tips
                      </h4>
                      <ul
                        className={`space-y-1.5 md:space-y-2 text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}
                      >
                        <li>• Always standardize your data before applying PCA</li>
                        <li>• Use the explained variance ratio to choose the number of components</li>
                        <li>• Consider the elbow method for optimal component selection</li>
                      </ul>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  id="use-cases"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Use Cases
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      PCA is particularly useful in several scenarios across different domains:
                    </p>

                    <div className={`grid gap-3 md:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                      <div
                        className={`bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4
                          className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                        >
                          Image Processing
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          Compress images, face recognition, and computer vision applications where pixel data needs
                          dimensionality reduction.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4
                          className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                        >
                          Finance
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          Portfolio optimization, risk management, and identifying key factors driving market movements.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4
                          className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                        >
                          Genomics
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          Analyzing gene expression data and identifying patterns in high-dimensional biological
                          datasets.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4
                          className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                        >
                          Marketing
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          Customer segmentation, market research, and understanding consumer behavior patterns.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  id="conclusion"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Conclusion
                  </h2>
                  <div
                    className={`space-y-3 md:space-y-4 text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                  >
                    <p>
                      PCA offers an elegant solution to the curse of dimensionality, providing a mathematically sound
                      approach to data compression and visualization. By mastering its principles and applications,
                      you'll be able to extract richer insights from complex datasets and build more efficient machine
                      learning models.
                    </p>
                    <p>
                      Remember that PCA is just one tool in your data science toolkit. Consider your specific use case,
                      data characteristics, and interpretability requirements when deciding whether to apply PCA to your
                      projects.
                    </p>
                  </div>

                  <div
                    className={`mt-6 md:mt-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                  >
                    <h4 className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      What's Next?
                    </h4>
                    <p
                      className={`text-gray-300 mb-3 md:mb-4 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}
                    >
                      Ready to dive deeper into dimensionality reduction techniques? Check out these related topics:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span
                        className={`bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-full ${isMobile ? "text-xs px-2.5 py-1" : "text-xs md:px-3 md:py-1 md:text-sm"}`}
                      >
                        t-SNE
                      </span>
                      <span
                        className={`bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-full ${isMobile ? "text-xs px-2.5 py-1" : "text-xs md:px-3 md:py-1 md:text-sm"}`}
                      >
                        UMAP
                      </span>
                      <span
                        className={`bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-full ${isMobile ? "text-xs px-2.5 py-1" : "text-xs md:px-3 md:py-1 md:text-sm"}`}
                      >
                        Factor Analysis
                      </span>
                      <span
                        className={`bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-full ${isMobile ? "text-xs px-2.5 py-1" : "text-xs md:px-3 md:py-1 md:text-sm"}`}
                      >
                        Autoencoders
                      </span>
                    </div>
                  </div>
                </motion.section>
              </div>
            </article>
          </div>
        </main>
      </div>
    </>
  )
}
