// src/app/projects/components/NHLAnalysis.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Database,
  Brain,
  LineChart,
  Zap,
  CheckCircle,
  Target,
  Award,
  Activity,
  Users,
  Trophy,
} from "lucide-react"

export default function NHLAnalysis() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "problem" | "methodology" | "results">("overview")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "problem", label: "Problem", icon: AlertTriangle },
    { id: "methodology", label: "Methodology", icon: Brain },
    { id: "results", label: "Results", icon: LineChart },
  ] as const

  const keyMetrics = [
    {
      value: "13K+",
      label: "Player Records",
      color: "text-blue-400",
      bg: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30",
    },
    {
      value: "97%",
      label: "Data Accuracy",
      color: "text-green-400",
      bg: "from-green-500/20 to-green-600/20",
      border: "border-green-500/30",
    },
    {
      value: "5",
      label: "Skill Categories",
      color: "text-purple-400",
      bg: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/30",
    },
  ]

  const findings = [
    { metric: "Skill Correlation Analysis", value: "Strong", change: "Positive", icon: TrendingUp },
    { metric: "Player Performance Variance", value: "High", change: "Significant", icon: Target },
    { metric: "Position-Based Patterns", value: "Clear", change: "Identified", icon: Users },
    { metric: "Statistical Significance", value: "p < 0.01", change: "Validated", icon: Award },
  ]

  const technicalMetrics = [
    { metric: "Correlation Coefficient", value: "0.87", color: "text-green-400" },
    { metric: "R-squared", value: "0.76", color: "text-blue-400" },
    { metric: "Sample Size", value: "13,049", color: "text-purple-400" },
    { metric: "Confidence Level", value: "99%", color: "text-pink-400" },
  ]

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #0a0e1a;
          overflow-x: hidden;
          font-family: 'Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%); }
        
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
        
        /* Enhanced scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 5px;
          border: 2px solid rgba(15, 23, 42, 0.5);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        }

        @media (max-width: 1024px) {
          .glow-card:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="flex h-screen overflow-hidden bg-[#0a0e1a] text-white font-neue-montreal">
        {/* Sidebar */}
        <Sidebar active="projects" onToggle={setSidebarCollapsed} />

        {/* Main content with responsive margin */}
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
                href="/projects"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-all duration-300 hover:translate-x-1 group font-neue-montreal"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Projects</span>
              </Link>
            </motion.div>

            {/* Project Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-center"
            >
              <div className="flex items-center gap-4 mb-4 justify-center">
                <h1 className={`font-bold font-neue-montreal ${isMobile ? "text-3xl sm:text-4xl" : "text-5xl"}`}>
                  <span className="text-gradient-enhanced">NHL Hockey Skill Interactions Analysis</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed font-neue-montreal ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                Statistical analysis of NHL player performance and skill interactions using advanced data science techniques.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`flex gap-3 mb-12 justify-center ${isMobile ? "flex-col" : "flex-wrap"}`}
            >
              <button className={`flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium font-neue-montreal rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 ${isMobile ? "px-3 py-2 text-sm justify-center" : "px-4 py-2 text-base"}`}>
                <ExternalLink size={18} />
                Live Demo
              </button>
              <a
                href="https://github.com/callixtafidelia/hockey-skill-interactions-analysis"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 bg-slate-900/50 hover:bg-slate-800/50 text-slate-300 hover:text-white font-medium font-neue-montreal rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 ${isMobile ? "px-3 py-2 text-sm justify-center" : "px-4 py-2 text-base"}`}
              >
                <Github size={18} />
                GitHub
              </a>
            </motion.div>

            {/* Tabs */}
            <div className="border-b border-white/10 bg-slate-900/30 backdrop-blur-xl rounded-t-xl mb-8">
              <nav className={`flex overflow-x-auto scrollbar-hide ${isMobile ? "space-x-4 px-4" : "space-x-8 px-6"}`}>
                {tabs.map((tab, index) => {
                  const Icon = tab.icon
                  return (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-3 md:py-4 px-1 border-b-2 font-medium font-neue-montreal transition-all duration-300 whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-indigo-500 text-indigo-400"
                          : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                      } ${isMobile ? "text-xs" : "text-sm"}`}
                    >
                      <Icon size={isMobile ? 14 : 16} />
                      <span className={isMobile ? "hidden xs:inline" : ""}>{tab.label}</span>
                    </motion.button>
                  )
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="space-y-8">
              {activeTab === "overview" && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-6 md:p-8"}`}>
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <BarChart3 className={`text-indigo-400 ${isMobile ? "w-5 h-5" : "w-6 h-6"}`} />
                      <h2 className={`font-bold font-neue-montreal bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${isMobile ? "text-lg" : "text-xl md:text-2xl"}`}>
                        Project Overview
                      </h2>
                    </div>
                    <p className={`text-gray-300 leading-relaxed mb-6 md:mb-8 font-neue-montreal ${isMobile ? "text-sm" : "text-base md:text-lg"}`}>
                      This project analyzes NHL player performance data to uncover patterns and correlations between different hockey skills. 
                      Using statistical analysis and data visualization techniques, we explore how various player attributes interact and 
                      influence overall performance in professional hockey.
                    </p>

                    <div className={`grid gap-4 md:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
                      {keyMetrics.map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className={`text-center bg-gradient-to-br ${m.bg} border ${m.border} rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                        >
                          <div className={`font-bold font-neue-montreal ${m.color} mb-1 md:mb-2 ${isMobile ? "text-2xl" : "text-3xl md:text-4xl"}`}>
                            {m.value}
                          </div>
                          <div className={`text-gray-300 font-medium font-neue-montreal ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                            {m.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.section>
              )}

              {activeTab === "problem" && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-6 md:p-8"}`}
                >
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <AlertTriangle className={`text-red-400 ${isMobile ? "w-5 h-5" : "w-6 h-6"}`} />
                    <h2 className={`font-bold font-neue-montreal bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${isMobile ? "text-lg" : "text-xl md:text-2xl"}`}>
                      Research Questions
                    </h2>
                  </div>
                  <p className={`text-gray-300 leading-relaxed mb-6 md:mb-8 font-neue-montreal ${isMobile ? "text-sm" : "text-base md:text-lg"}`}>
                    Understanding the complex relationships between different hockey skills is crucial for player development, 
                    team strategy, and performance optimization. This analysis addresses key questions about NHL player performance patterns.
                  </p>

                  <div className="space-y-3 md:space-y-4">
                    <div className={`flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl ${isMobile ? "p-3" : "p-4"}`}>
                      <Activity size={isMobile ? 16 : 18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className={`font-semibold text-white mb-1 font-neue-montreal ${isMobile ? "text-sm" : "text-base"}`}>
                          Skill Correlation Analysis
                        </h3>
                        <p className={`text-gray-300 font-neue-montreal ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                          How do different hockey skills correlate with each other across player positions?
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-start gap-3 bg-green-500/10 border border-green-500/20 rounded-xl ${isMobile ? "p-3" : "p-4"}`}>
                      <Users size={isMobile ? 16 : 18} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className={`font-semibold text-white mb-1 font-neue-montreal ${isMobile ? "text-sm" : "text-base"}`}>
                          Position-Based Patterns
                        </h3>
                        <p className={`text-gray-300 font-neue-montreal ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                          Do forwards, defensemen, and goalies show distinct skill interaction patterns?
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-start gap-3 bg-purple-500/10 border border-purple-500/20 rounded-xl ${isMobile ? "p-3" : "p-4"}`}>
                      <Trophy size={isMobile ? 16 : 18} className="text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className={`font-semibold text-white mb-1 font-neue-montreal ${isMobile ? "text-sm" : "text-base"}`}>
                          Performance Predictors
                        </h3>
                        <p className={`text-gray-300 font-neue-montreal ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                          Which skill combinations best predict overall player performance?
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}

              {activeTab === "methodology" && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`glow-card rounded-xl md:rounded-2xl space-y-6 md:space-y-8 ${isMobile ? "p-4" : "p-6 md:p-8"}`}
                >
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <Brain className={`text-purple-400 ${isMobile ? "w-5 h-5" : "w-6 h-6"}`} />
                    <h2 className={`font-bold font-neue-montreal bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${isMobile ? "text-lg" : "text-xl md:text-2xl"}`}>
                      Methodology
                    </h2>
                  </div>

                  <div className="space-y-6 md:space-y-8">
                    <div className={`bg-blue-500/10 border border-blue-500/20 rounded-xl ${isMobile ? "p-3" : "p-4 md:p-6"}`}>
                      <h3 className={`font-bold text-white flex items-center gap-3 mb-3 md:mb-4 font-neue-montreal ${isMobile ? "text-base" : "text-lg md:text-xl"}`}>
                        <Database className={`text-blue-400 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                        Data Collection & Preprocessing
                      </h3>
                      <ul className={`space-y-2 text-gray-300 font-neue-montreal ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Collected NHL player statistics from official league databases
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Cleaned and standardized data for 13,000+ player records
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Handled missing values and outliers using statistical methods
                        </li>
                      </ul>
                    </div>

                    <div className={`bg-purple-500/10 border border-purple-500/20 rounded-xl ${isMobile ? "p-3" : "p-4 md:p-6"}`}>
                      <h3 className={`font-bold text-white flex items-center gap-3 mb-3 md:mb-4 font-neue-montreal ${isMobile ? "text-base" : "text-lg md:text-xl"}`}>
                        <TrendingUp className={`text-purple-400 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                        Statistical Analysis
                      </h3>
                      <ul className={`space-y-2 text-gray-300 font-neue-montreal ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Applied correlation analysis to identify skill relationships
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Performed regression analysis for performance prediction
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Conducted hypothesis testing for statistical significance
                        </li>
                      </ul>
                    </div>

                    <div className={`bg-green-500/10 border border-green-500/20 rounded-xl ${isMobile ? "p-3" : "p-4 md:p-6"}`}>
                      <h3 className={`font-bold text-white flex items-center gap-3 mb-3 md:mb-4 font-neue-montreal ${isMobile ? "text-base" : "text-lg md:text-xl"}`}>
                        <Zap className={`text-green-400 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                        Data Visualization
                      </h3>
                      <ul className={`space-y-2 text-gray-300 font-neue-montreal ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Created interactive heatmaps for correlation matrices
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Developed scatter plots for skill relationship visualization
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Built position-based comparison charts and dashboards
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.section>
              )}

              {activeTab === "results" && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-6 md:p-8"}`}>
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <LineChart className={`text-green-400 ${isMobile ? "w-5 h-5" : "w-6 h-6"}`} />
                      <h2 className={`font-bold font-neue-montreal bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${isMobile ? "text-lg" : "text-xl md:text-2xl"}`}>
                        Key Findings
                      </h2>
                    </div>
                    <p className={`text-gray-300 leading-relaxed mb-6 md:mb-8 font-neue-montreal ${isMobile ? "text-sm" : "text-base md:text-lg"}`}>
                      The analysis revealed significant patterns in NHL player skill interactions, with strong correlations 
                      between offensive and defensive capabilities varying by position. Statistical significance was established 
                      for all major findings.
                    </p>

                    {/* Image Placeholder for Results */}
                    <div className="mb-6 md:mb-8">
                      <div className="relative h-64 md:h-80 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 opacity-60"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 rounded-xl flex items-center justify-center border border-white/20">
                              <BarChart3 size={40} className="text-white/80" />
                            </div>
                            <p className="text-white/60 text-sm font-neue-montreal">Statistical Analysis Visualizations</p>
                            <p className="text-white/40 text-xs font-neue-montreal mt-1">Correlation matrices, scatter plots, and trend analysis</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`grid gap-6 md:gap-8 ${isMobile ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-2"}`}>
                      <div>
                        <h3 className={`font-bold text-white mb-4 md:mb-6 font-neue-montreal ${isMobile ? "text-base" : "text-lg md:text-xl"}`}>
                          Research Findings
                        </h3>
                        <div className="space-y-3 md:space-y-4">
                          {findings.map((f, i) => {
                            const Icon = f.icon
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`flex items-center justify-between bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-700/30 transition-colors duration-300 ${isMobile ? "p-3" : "p-3 md:p-4"}`}
                              >
                                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                                  <Icon size={isMobile ? 16 : 18} className="text-indigo-400 flex-shrink-0" />
                                  <span className={`text-gray-300 truncate font-neue-montreal ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                                    {f.metric}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                                  <span className={`font-bold text-white font-neue-montreal ${isMobile ? "text-sm" : "text-base md:text-lg"}`}>
                                    {f.value}
                                  </span>
                                  <span className={`text-green-400 bg-green-500/20 border border-green-500/30 rounded-full font-neue-montreal ${isMobile ? "text-xs px-2 py-0.5" : "text-xs px-2 md:px-3 py-1"}`}>
                                    {f.change}
                                  </span>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <h3 className={`font-bold text-white mb-4 md:mb-6 font-neue-montreal ${isMobile ? "text-base" : "text-lg md:text-xl"}`}>
                          Statistical Metrics
                        </h3>
                        <div className="space-y-3 md:space-y-4">
                          {technicalMetrics.map((m, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                              className={`flex items-center justify-between bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-700/30 transition-colors duration-300 ${isMobile ? "p-3" : "p-3 md:p-4"}`}
                            >
                              <span className={`text-gray-300 font-neue-montreal ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                                {m.metric}
                              </span>
                              <span className={`font-bold font-neue-montreal ${m.color} ${isMobile ? "text-base" : "text-lg md:text-xl"}`}>
                                {m.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}