//src/app/blog/page.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  Search,
  Filter,
  FileText,
  BookOpen,
  TrendingUp,
  Eye,
} from "lucide-react"

export default function BlogPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState<string>("")
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

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Principal Component Analysis",
      description:
        "A deep dive into how PCA works and when to use it for dimensionality reduction in your data science projects. Learn the mathematical foundations and practical applications.",
      date: "May 15, 2024",
      category: "Machine Learning",
      readTime: "8 min read",
      slug: "understanding-pca",
      views: "1.2k",
      featured: true,
    },
    {
      id: 2,
      title: "Time Series Forecasting with LSTM",
      description:
        "Explore how Long Short-Term Memory networks can be used for accurate time series predictions in financial and business applications.",
      date: "April 28, 2024",
      category: "Deep Learning",
      readTime: "12 min read",
      slug: "lstm-time-series",
      views: "890",
      featured: false,
    },
    {
      id: 3,
      title: "Data Visualization Best Practices",
      description:
        "Learn how to create compelling and informative visualizations that tell a story with your data using modern tools and techniques.",
      date: "April 10, 2024",
      category: "Data Visualization",
      readTime: "6 min read",
      slug: "data-viz-best-practices",
      views: "756",
      featured: false,
    },
  ]

  const categories: string[] = ["All", "Machine Learning", "Data Visualization", "Time Series", "Deep Learning"]

  const getCategoryColor = (cat: string) => {
    const map: Record<string, any> = {
      "Machine Learning": {
        bg: "from-blue-500/20 to-blue-600/20",
        border: "border-blue-500/30",
        text: "text-blue-300",
      },
      "Data Visualization": {
        bg: "from-green-500/20 to-green-600/20",
        border: "border-green-500/30",
        text: "text-green-300",
      },
      "Time Series": {
        bg: "from-purple-500/20 to-purple-600/20",
        border: "border-purple-500/30",
        text: "text-purple-300",
      },
      "Deep Learning": {
        bg: "from-red-500/20 to-red-600/20",
        border: "border-red-500/30",
        text: "text-red-300",
      },
    }

    return (
      map[cat] ?? {
        bg: "from-gray-500/20 to-gray-600/20",
        border: "border-gray-500/30",
        text: "text-gray-300",
      }
    )
  }

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const term = searchTerm.toLowerCase()
    const matchesSearch = post.title.toLowerCase().includes(term) || post.description.toLowerCase().includes(term)
    return matchesCategory && matchesSearch
  })

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
          transform: translateY(-4px);
          border-color: rgba(102, 126, 234, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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

        /* Mobile responsive adjustments */
        @media (max-width: 1024px) {
          .glow-card:hover {
            transform: none;
          }
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
          <div className={`max-w-6xl mx-auto ${isMobile ? "px-4" : "px-6"}`}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-all duration-300 hover:translate-x-1 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12 text-center"
            >
              <div className={`flex items-center gap-4 mb-4 justify-center`}>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <BookOpen size={24} className="text-white" />
                </div>
                <h1 className={`font-extrabold ${isMobile ? "text-3xl sm:text-4xl" : "text-5xl"}`}>
                  <span className="text-gradient-enhanced">Blog</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                Articles and insights on data science and machine learning
              </p>
            </motion.div>

            {/* Search & Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`glow-card rounded-xl md:rounded-2xl mb-8 ${isMobile ? "p-4" : "p-6"}`}
            >
              <div className={`flex gap-3 md:gap-4 ${isMobile ? "flex-col" : "flex-col md:flex-row"}`}>
                <div className="flex-1 relative">
                  <Search
                    className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`}
                  />
                  <input
                    type="text"
                    placeholder="Search articles…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pr-3 md:pr-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ${isMobile ? "pl-10 py-2.5 text-sm" : "pl-12 py-3"}`}
                  />
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <Filter className={`text-gray-400 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ${isMobile ? "px-3 py-2.5 text-sm" : "px-4 py-3"}`}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-800">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={`border-t border-white/10 ${isMobile ? "mt-3 pt-3" : "mt-4 pt-4"}`}>
                <p className={`text-gray-400 ${isMobile ? "text-xs" : "text-sm"}`}>
                  Showing {filteredPosts.length} of {blogPosts.length} articles
                </p>
              </div>
            </motion.div>

            {/* Featured Post */}
            {filteredPosts.some((post) => post.featured) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-12"
              >
                <div className={`flex items-center gap-3 mb-6 justify-center`}>
                  <TrendingUp className={`text-yellow-400 ${isMobile ? "w-5 h-5" : "w-6 h-6"}`} />
                  <h2
                    className={`font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${isMobile ? "text-lg" : "text-2xl"}`}
                  >
                    Featured Article
                  </h2>
                </div>
                {filteredPosts
                  .filter((post) => post.featured)
                  .map((post) => {
                    const colors = getCategoryColor(post.category)
                    return (
                      <Link href={`/blog/${post.slug}`} key={post.id}>
                        <div className="glow-card rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer">
                          <div className={isMobile ? "p-4" : "p-6 md:p-8"}>
                            <div
                              className={`gap-4 md:gap-6 ${isMobile ? "flex flex-col" : "flex flex-col lg:flex-row"}`}
                            >
                              <div className="flex-1">
                                <div
                                  className={`flex gap-3 md:gap-4 mb-3 md:mb-4 ${isMobile ? "flex-col" : "items-center flex-wrap"}`}
                                >
                                  <span
                                    className={`inline-flex items-center bg-gradient-to-r ${colors.bg} border ${colors.border} ${colors.text} font-medium rounded-full ${isMobile ? "text-xs px-3 py-1.5 self-start" : "text-sm px-4 py-2"}`}
                                  >
                                    <Tag size={isMobile ? 12 : 14} className="mr-1" />
                                    {post.category}
                                  </span>
                                  <div
                                    className={`flex gap-3 md:gap-4 text-gray-400 ${isMobile ? "text-xs flex-wrap" : "text-sm"}`}
                                  >
                                    <div className="flex items-center gap-1">
                                      <Calendar size={isMobile ? 12 : 14} />
                                      {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock size={isMobile ? 12 : 14} />
                                      {post.readTime}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Eye size={isMobile ? 12 : 14} />
                                      {post.views}
                                    </div>
                                  </div>
                                </div>

                                <h3
                                  className={`font-bold text-white mb-3 md:mb-4 group-hover:text-indigo-300 transition-colors duration-300 ${isMobile ? "text-lg" : "text-2xl"}`}
                                >
                                  {post.title}
                                </h3>
                                <p
                                  className={`text-gray-300 leading-relaxed mb-4 md:mb-6 ${isMobile ? "text-sm" : "text-base"}`}
                                >
                                  {post.description}
                                </p>

                                <div className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors group">
                                  <span className={isMobile ? "text-sm" : "text-base"}>Read article</span>
                                  <ArrowRight
                                    size={isMobile ? 14 : 16}
                                    className="group-hover:translate-x-1 transition-transform duration-300"
                                  />
                                </div>
                              </div>
                              {!isMobile && (
                                <div className="lg:w-48 flex items-center justify-center">
                                  <div className="w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                                    <FileText size={48} className="text-indigo-400" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
              </motion.section>
            )}

            {/* All Posts */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2
                className={`font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-6 text-center ${isMobile ? "text-lg" : "text-2xl"}`}
              >
                All Articles
              </h2>
              <div className="space-y-6">
                {filteredPosts.map((post, index) => {
                  const colors = getCategoryColor(post.category)
                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="glow-card rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer">
                          <div className={isMobile ? "flex flex-col" : "flex flex-col md:flex-row"}>
                            {/* Meta */}
                            <div
                              className={`bg-slate-800/30 ${isMobile ? "p-4 border-b border-white/10" : "md:w-64 p-6 border-r border-white/10"}`}
                            >
                              <div className="space-y-3 md:space-y-4">
                                <span
                                  className={`inline-flex items-center bg-gradient-to-r ${colors.bg} border ${colors.border} ${colors.text} font-medium rounded-full ${isMobile ? "text-xs px-2.5 py-1.5" : "text-sm px-3 py-2"}`}
                                >
                                  <Tag size={isMobile ? 12 : 14} className="mr-1" />
                                  {post.category}
                                </span>
                                <div
                                  className={`text-gray-400 ${isMobile ? "text-xs space-y-1.5 flex flex-wrap gap-3" : "space-y-2 text-sm"}`}
                                >
                                  <div className="flex items-center gap-1.5 md:gap-2">
                                    <Calendar size={isMobile ? 12 : 14} />
                                    {post.date}
                                  </div>
                                  <div className="flex items-center gap-1.5 md:gap-2">
                                    <Clock size={isMobile ? 12 : 14} />
                                    {post.readTime}
                                  </div>
                                  <div className="flex items-center gap-1.5 md:gap-2">
                                    <Eye size={isMobile ? 12 : 14} />
                                    {post.views} views
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className={`flex-1 ${isMobile ? "p-4" : "p-6"}`}>
                              <h3
                                className={`font-bold text-white mb-2 md:mb-3 group-hover:text-indigo-300 transition-colors duration-300 ${isMobile ? "text-base" : "text-xl"}`}
                              >
                                {post.title}
                              </h3>
                              <p
                                className={`text-gray-300 leading-relaxed mb-3 md:mb-4 ${isMobile ? "text-sm" : "text-base"}`}
                              >
                                {post.description}
                              </p>

                              <div className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors group">
                                <span className={isMobile ? "text-sm" : "text-base"}>Read article</span>
                                <ArrowRight
                                  size={isMobile ? 14 : 16}
                                  className="group-hover:translate-x-1 transition-transform duration-300"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  )
                })}
              </div>

              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className={`glow-card rounded-xl md:rounded-2xl text-center ${isMobile ? "p-8" : "p-12"}`}
                >
                  <Search className={`text-gray-400 mb-3 md:mb-4 mx-auto ${isMobile ? "w-12 h-12" : "w-16 h-16"}`} />
                  <h3 className={`font-bold text-white mb-2 ${isMobile ? "text-lg" : "text-xl"}`}>No articles found</h3>
                  <p className={`text-gray-400 ${isMobile ? "text-sm" : "text-base"}`}>
                    Try adjusting your search terms or category filter.
                  </p>
                </motion.div>
              )}
            </motion.section>
          </div>
        </main>
      </div>
    </>
  )
}
