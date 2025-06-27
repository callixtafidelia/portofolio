// src/app/projects/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { ArrowLeft, Star, Code, ExternalLink, Github, FolderOpen, Zap, TrendingUp } from "lucide-react"

export default function ProjectsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  const featured = [
    {
      id: 1,
      slug: "customerchurn",
      number: "01",
      title: "Customer Churn Prediction",
      description:
        "Machine learning model to predict customer churn using ensemble methods with 94% accuracy. This project helps businesses identify customers at risk of leaving and take proactive retention measures.",
      skills: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "XGBoost"],
      category: "Machine Learning",
      status: "Completed",
      accuracy: "94%",
    },
    {
      id: 2,
      slug: "salesforecast",
      number: "02",
      title: "Sales Forecasting Dashboard",
      description:
        "Interactive dashboard for sales forecasting using time series analysis and Streamlit. The dashboard allows business users to visualize historical sales data and generate forecasts with adjustable parameters.",
      skills: ["Python", "Streamlit", "Prophet", "Plotly", "Pandas"],
      category: "Data Visualization",
      status: "In Progress",
      accuracy: "89%",
    },
    {
      id: 3,
      slug: "sentimentanalysis",
      number: "03",
      title: "Sentiment Analysis Tool",
      description:
        "NLP tool that analyzes customer reviews and social media posts to determine sentiment. Built with transformers and deployed as a web app for real-time analysis.",
      skills: ["Python", "Transformers", "NLTK", "Flask", "Docker"],
      category: "Natural Language Processing",
      status: "Completed",
      accuracy: "91%",
    },
    {
      id: 4,
      slug: "stockpredictor",
      number: "04",
      title: "Stock Price Predictor",
      description:
        "Deep learning model using LSTM networks to predict stock prices. Features technical indicators, multiple timeframes, and risk assessment metrics for informed trading decisions.",
      skills: ["Python", "TensorFlow", "Keras", "Yahoo Finance API", "NumPy"],
      category: "Deep Learning",
      status: "Completed",
      accuracy: "87%",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "from-green-500/20 to-green-600/20 border-green-500/30 text-green-300"
      case "In Progress":
        return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-300"
      default:
        return "from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-300"
    }
  }

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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
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
          transform: translateY(-8px);
          border-color: rgba(102, 126, 234, 0.3);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }
        
        .project-number {
          animation: float 3s ease-in-out infinite;
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
      
          <Sidebar active="projects" onToggle={setSidebarCollapsed} />

        {/* Main content with dynamic margin */}
        <main
          className="flex-1 overflow-y-auto py-8 y-8 relative transition-all duration-300 ease-in-out"
          style={{
            marginLeft: "40px", // terniery operation
          }}
        >
          <div className="max-w-6xl">


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
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <FolderOpen size={24} className="text-white" />
                </div>
                <h1 className="text-5xl font-extrabold">
                  <span className="text-gradient-enhanced">Projects</span>
                </h1>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                A collection of my data science and machine learning projects
              </p>
            </motion.div>

            {/* Featured Projects */}
            <section className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <Star className="w-6 h-6 text-yellow-400" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Featured Projects
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featured.map((proj, index) => (
                  <Link href={`/projects/${proj.slug}`} key={proj.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="glow-card rounded-2xl overflow-hidden group cursor-pointer block"
                      onMouseEnter={() => setHovered(proj.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* Rest of the card content remains the same */}
                      <div className="flex">
                        {/* Project Number Section */}
                        <div className="w-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border-r border-white/10">
                          <span className="project-number text-5xl font-bold text-indigo-300/60">{proj.number}</span>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 p-6">
                          {/* Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                                {proj.title}
                              </h3>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-indigo-400 font-medium">{proj.category}</span>
                                <span
                                  className={`inline-flex items-center bg-gradient-to-r ${getStatusColor(
                                    proj.status,
                                  )} text-xs font-medium px-3 py-1 rounded-full`}
                                >
                                  {proj.status}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-400">{proj.accuracy}</div>
                              <div className="text-xs text-gray-400">Accuracy</div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-300 text-sm leading-relaxed mb-4">{proj.description}</p>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {proj.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs font-medium px-3 py-1 rounded-full hover:bg-slate-700/50 hover:border-indigo-500/30 hover:text-indigo-300 transition-all duration-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                window.open(`/projects/${proj.slug}/code`, "_blank")
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white text-sm font-medium rounded-lg border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300"
                            >
                              <Code size={16} />
                              Code
                            </button>
                            <span className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/25">
                              <ExternalLink size={16} />
                              View Details
                            </span>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                window.open(`/projects/${proj.slug}/github`, "_blank")
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/50 text-slate-300 hover:text-white text-sm font-medium rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300"
                            >
                              <Github size={16} />
                              GitHub
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Skills Overview */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="glow-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Technologies & Skills
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30">
                    <TrendingUp size={28} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Machine Learning</h3>
                  <p className="text-sm text-gray-400">Scikit-learn, XGBoost</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/30">
                    <Code size={28} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Programming</h3>
                  <p className="text-sm text-gray-400">Python, R, SQL</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/30">
                    <Star size={28} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Deep Learning</h3>
                  <p className="text-sm text-gray-400">TensorFlow, Keras</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-pink-500/30">
                    <FolderOpen size={28} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Data Viz</h3>
                  <p className="text-sm text-gray-400">Matplotlib, Plotly</p>
                </div>
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </>
  )
}