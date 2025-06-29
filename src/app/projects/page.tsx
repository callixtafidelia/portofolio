"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { ArrowLeft, Star, Code, ExternalLink, Github, FolderOpen, Zap, TrendingUp } from "lucide-react"

export default function ProjectsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
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

        {/* Main content with responsive margin */}
        <main
          className="flex-1 overflow-y-auto py-8 relative transition-all duration-300 ease-in-out"
          style={{
            marginLeft: isMobile ? "0" : "40px", // No margin on mobile, fixed 40px on desktop
          }}
        >
          <div className={`max-w-6xl ${isMobile ? 'px-4' : ''}`}>
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
              <div className={`flex items-center gap-4 mb-4 ${isMobile ? 'flex-col sm:flex-row' : ''}`}>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <FolderOpen size={24} className="text-white" />
                </div>
                <h1 className={`font-extrabold ${isMobile ? 'text-3xl sm:text-4xl' : 'text-5xl'}`}>
                  <span className="text-gradient-enhanced">Projects</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed ${isMobile ? 'text-base sm:text-lg' : 'text-xl'}`}>
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
                <Star className={`text-yellow-400 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                <h2 className={`font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                  Featured Projects
                </h2>
              </motion.div>

              <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
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
                      <div className={`flex ${isMobile ? 'flex-col' : ''}`}>
                        {/* Project Number Section */}
                        <div className={`bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border-white/10 ${
                          isMobile ? 'w-full h-16 border-b' : 'w-32 border-r'
                        }`}>
                          <span className={`project-number font-bold text-indigo-300/60 ${
                            isMobile ? 'text-3xl' : 'text-5xl'
                          }`}>{proj.number}</span>
                        </div>

                        {/* Content Section */}
                        <div className={`flex-1 ${isMobile ? 'p-4' : 'p-6'}`}>
                          {/* Header */}
                          <div className={`mb-4 ${isMobile ? 'flex flex-col gap-3' : 'flex justify-between items-start'}`}>
                            <div>
                              <h3 className={`font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300 ${
                                isMobile ? 'text-lg' : 'text-xl'
                              }`}>
                                {proj.title}
                              </h3>
                              <div className={`flex items-center gap-3 ${isMobile ? 'flex-col items-start gap-2' : ''}`}>
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
                            <div className={`${isMobile ? 'text-left' : 'text-right'}`}>
                              <div className={`font-bold text-green-400 ${isMobile ? 'text-xl' : 'text-2xl'}`}>{proj.accuracy}</div>
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
                                className={`bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs font-medium rounded-full hover:bg-slate-700/50 hover:border-indigo-500/30 hover:text-indigo-300 transition-all duration-300 ${
                                  isMobile ? 'px-2 py-1' : 'px-3 py-1'
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className={`flex gap-3 ${isMobile ? 'flex-col' : ''}`}>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                window.open(`/projects/${proj.slug}/code`, "_blank")
                              }}
                              className={`flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white text-sm font-medium rounded-lg border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300 ${
                                isMobile ? 'justify-center' : ''
                              }`}
                            >
                              <Code size={16} />
                              Code
                            </button>
                            <span className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/25 ${
                              isMobile ? 'justify-center' : ''
                            }`}>
                              <ExternalLink size={16} />
                              View Details
                            </span>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                window.open(`/projects/${proj.slug}/github`, "_blank")
                              }}
                              className={`flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/50 text-slate-300 hover:text-white text-sm font-medium rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 ${
                                isMobile ? 'justify-center' : ''
                              }`}
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
              className={`glow-card rounded-2xl ${isMobile ? 'p-6' : 'p-8'}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className={`text-yellow-400 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                <h2 className={`font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${
                  isMobile ? 'text-xl' : 'text-2xl'
                }`}>
                  Technologies & Skills
                </h2>
              </div>
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
                <div className="text-center">
                  <div className={`bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30 ${
                    isMobile ? 'w-12 h-12' : 'w-16 h-16'
                  }`}>
                    <TrendingUp size={isMobile ? 20 : 28} className="text-white" />
                  </div>
                  <h3 className={`font-semibold text-white mb-1 ${isMobile ? 'text-sm' : ''}`}>Machine Learning</h3>
                  <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Scikit-learn, XGBoost</p>
                </div>
                <div className="text-center">
                  <div className={`bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/30 ${
                    isMobile ? 'w-12 h-12' : 'w-16 h-16'
                  }`}>
                    <Code size={isMobile ? 20 : 28} className="text-white" />
                  </div>
                  <h3 className={`font-semibold text-white mb-1 ${isMobile ? 'text-sm' : ''}`}>Programming</h3>
                  <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Python, R, SQL</p>
                </div>
                <div className="text-center">
                  <div className={`bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/30 ${
                    isMobile ? 'w-12 h-12' : 'w-16 h-16'
                  }`}>
                    <Star size={isMobile ? 20 : 28} className="text-white" />
                  </div>
                  <h3 className={`font-semibold text-white mb-1 ${isMobile ? 'text-sm' : ''}`}>Deep Learning</h3>
                  <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>TensorFlow, Keras</p>
                </div>
                <div className="text-center">
                  <div className={`bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-pink-500/30 ${
                    isMobile ? 'w-12 h-12' : 'w-16 h-16'
                  }`}>
                    <FolderOpen size={isMobile ? 20 : 28} className="text-white" />
                  </div>
                  <h3 className={`font-semibold text-white mb-1 ${isMobile ? 'text-sm' : ''}`}>Data Viz</h3>
                  <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Matplotlib, Plotly</p>
                </div>
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </>
  )
}