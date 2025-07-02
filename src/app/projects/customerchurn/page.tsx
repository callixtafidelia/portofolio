"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Code,
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
} from "lucide-react"

export default function CustomerChurnPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "problem" | "methodology" | "results" | "code">("overview")
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

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "problem", label: "Problem", icon: AlertTriangle },
    { id: "methodology", label: "Methodology", icon: Brain },
    { id: "results", label: "Results", icon: LineChart },
    { id: "code", label: "Code", icon: Code },
  ] as const

  const keyMetrics = [
    {
      value: "94%",
      label: "Accuracy",
      color: "text-blue-400",
      bg: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30",
    },
    {
      value: "92%",
      label: "Precision",
      color: "text-green-400",
      bg: "from-green-500/20 to-green-600/20",
      border: "border-green-500/30",
    },
    {
      value: "89%",
      label: "Recall",
      color: "text-purple-400",
      bg: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/30",
    },
  ]

  const achievements = [
    { metric: "Accuracy Improvement", value: "15%", change: "+15%", icon: TrendingUp },
    { metric: "Early Warning Precision", value: "92%", change: "+12%", icon: Target },
    { metric: "Customer Risk Assessment", value: "94%", change: "+18%", icon: AlertTriangle },
    { metric: "F1 Score", value: "90.7%", change: "+14%", icon: Award },
  ]

  const technicalMetrics = [
    { metric: "Precision", value: "92%", color: "text-green-400" },
    { metric: "Recall", value: "89%", color: "text-blue-400" },
    { metric: "F1-Score", value: "90.7%", color: "text-purple-400" },
    { metric: "AUC-ROC", value: "96.2%", color: "text-pink-400" },
  ]

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
        {/* Sidebar - Only show on desktop */}
        {!isMobile && <Sidebar active="projects" onToggle={setSidebarCollapsed} />}

        {/* Main content with responsive margin */}
        <main
          className="flex-1 overflow-y-auto py-8 relative transition-all duration-300 ease-in-out"
          style={{
            marginLeft: isMobile ? "0" : "40px", // No margin on mobile, fixed 40px on desktop
          }}
        >
          <div className={`max-w-6xl mx-auto ${isMobile ? "px-4" : "px-6"}`}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-all duration-300 hover:translate-x-1 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Projects</span>
              </Link>
            </motion.div>

            {/* Project Header with Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12 text-center"
            >
              <div className={`flex items-center gap-4 mb-4 justify-center`}>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <h1 className={`font-extrabold ${isMobile ? "text-3xl sm:text-4xl" : "text-5xl"}`}>
                  <span className="text-gradient-enhanced">Customer Churn Prediction</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                Machine learning model to predict customer churn using ensemble methods with 94% accuracy.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`flex gap-3 mb-12 ${isMobile ? "flex-col" : "flex-wrap"}`}
            >
              <button
                className={`flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white font-medium rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300 ${
                  isMobile ? "px-4 py-3 text-sm justify-center" : "px-6 py-3 text-base"
                }`}
              >
                <Code size={18} />
                View Code
              </button>
              <button
                className={`flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 ${
                  isMobile ? "px-4 py-3 text-sm justify-center" : "px-6 py-3 text-base"
                }`}
              >
                <ExternalLink size={18} />
                Live Demo
              </button>
              <button
                className={`flex items-center gap-2 bg-slate-900/50 hover:bg-slate-800/50 text-slate-300 hover:text-white font-medium rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 ${
                  isMobile ? "px-4 py-3 text-sm justify-center" : "px-6 py-3 text-base"
                }`}
              >
                <Github size={18} />
                GitHub
              </button>
            </motion.div>

            {/* Tabs - Responsive navigation */}
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
                      className={`flex items-center gap-2 py-3 md:py-4 px-1 border-b-2 font-medium transition-all duration-300 whitespace-nowrap ${
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

            {/* Content - Responsive padding */}
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
                      <h2
                        className={`font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${
                          isMobile ? "text-lg" : "text-xl md:text-2xl"
                        }`}
                      >
                        Project Overview
                      </h2>
                    </div>
                    <p
                      className={`text-gray-300 leading-relaxed mb-6 md:mb-8 ${isMobile ? "text-sm" : "text-base md:text-lg"}`}
                    >
                      This project focuses on predicting customer churn for a telecommunications company using advanced
                      machine learning techniques. Customer churn prediction is crucial for businesses to identify
                      customers who are likely to cancel their subscriptions or stop purchasing to take preventive
                      actions and reduce revenue loss.
                    </p>

                    <div
                      className={`grid gap-4 md:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}
                    >
                      {keyMetrics.map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className={`text-center bg-gradient-to-br ${m.bg} border ${m.border} rounded-xl ${
                            isMobile ? "p-4" : "p-4 md:p-6"
                          }`}
                        >
                          <div
                            className={`font-bold ${m.color} mb-1 md:mb-2 ${isMobile ? "text-2xl" : "text-3xl md:text-4xl"}`}
                          >
                            {m.value}
                          </div>
                          <div className={`text-gray-300 font-medium ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
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
                    <h2
                      className={`font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${
                        isMobile ? "text-lg" : "text-xl md:text-2xl"
                      }`}
                    >
                      Problem Statement
                    </h2>
                  </div>
                  <p
                    className={`text-gray-300 leading-relaxed mb-6 md:mb-8 ${isMobile ? "text-sm" : "text-base md:text-lg"}`}
                  >
                    A telecommunications company was struggling with customer retention. Acquiring new customers costs
                    5–10x more than retaining existing ones. The company needed a reliable way to identify customers at
                    risk of churning to implement targeted retention strategies and reduce revenue loss.
                  </p>

                  <div className="space-y-3 md:space-y-4">
                    <div
                      className={`flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl ${isMobile ? "p-3" : "p-4"}`}
                    >
                      <AlertTriangle size={isMobile ? 16 : 18} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className={`font-semibold text-white mb-1 ${isMobile ? "text-sm" : "text-base"}`}>
                          High Acquisition Costs
                        </h3>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                          Customer acquisition costs 5-10x more than retention
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl ${isMobile ? "p-3" : "p-4"}`}
                    >
                      <AlertTriangle size={isMobile ? 16 : 18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className={`font-semibold text-white mb-1 ${isMobile ? "text-sm" : "text-base"}`}>
                          No Early Warning System
                        </h3>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                          Lack of predictive system for potential churners
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex items-start gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl ${isMobile ? "p-3" : "p-4"}`}
                    >
                      <AlertTriangle size={isMobile ? 16 : 18} className="text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className={`font-semibold text-white mb-1 ${isMobile ? "text-sm" : "text-base"}`}>
                          Reactive Approach
                        </h3>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                          Reactive rather than predictive customer retention strategy
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
                    <h2
                      className={`font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${
                        isMobile ? "text-lg" : "text-xl md:text-2xl"
                      }`}
                    >
                      Methodology
                    </h2>
                  </div>

                  <div className="space-y-6 md:space-y-8">
                    {/* Data Collection */}
                    <div
                      className={`bg-blue-500/10 border border-blue-500/20 rounded-xl ${isMobile ? "p-3" : "p-4 md:p-6"}`}
                    >
                      <h3
                        className={`font-bold text-white flex items-center gap-3 mb-3 md:mb-4 ${
                          isMobile ? "text-base" : "text-lg md:text-xl"
                        }`}
                      >
                        <Database className={`text-blue-400 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                        Data Collection & Preprocessing
                      </h3>
                      <ul className={`space-y-2 text-gray-300 ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Collected customer demographics, usage patterns, and billing information
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Cleaned data, handled outliers and missing values systematically
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Normalized numerical features using StandardScaler
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          One-hot encoded categorical features for model compatibility
                        </li>
                      </ul>
                    </div>

                    {/* Feature Engineering */}
                    <div
                      className={`bg-purple-500/10 border border-purple-500/20 rounded-xl ${isMobile ? "p-3" : "p-4 md:p-6"}`}
                    >
                      <h3
                        className={`font-bold text-white flex items-center gap-3 mb-3 md:mb-4 ${
                          isMobile ? "text-base" : "text-lg md:text-xl"
                        }`}
                      >
                        <TrendingUp className={`text-purple-400 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                        Feature Engineering
                      </h3>
                      <ul className={`space-y-2 text-gray-300 ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Created engagement scores from usage patterns and behavior
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Engineered seasonality and trend features from time series data
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Selected optimal features through correlation analysis and importance scoring
                        </li>
                      </ul>
                    </div>

                    {/* Model Development */}
                    <div
                      className={`bg-green-500/10 border border-green-500/20 rounded-xl ${isMobile ? "p-3" : "p-4 md:p-6"}`}
                    >
                      <h3
                        className={`font-bold text-white flex items-center gap-3 mb-3 md:mb-4 ${
                          isMobile ? "text-base" : "text-lg md:text-xl"
                        }`}
                      >
                        <Zap className={`text-green-400 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                        Model Development
                      </h3>
                      <ul className={`space-y-2 text-gray-300 ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Tested multiple algorithms: XGBoost, Random Forest, Logistic Regression
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Final model: XGBoost with extensive hyperparameter tuning
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={isMobile ? 12 : 14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          Cross-validation and performance optimization techniques applied
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
                      <h2
                        className={`font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${
                          isMobile ? "text-lg" : "text-xl md:text-2xl"
                        }`}
                      >
                        Results & Impact
                      </h2>
                    </div>
                    <p
                      className={`text-gray-300 leading-relaxed mb-6 md:mb-8 ${isMobile ? "text-sm" : "text-base md:text-lg"}`}
                    >
                      The XGBoost model achieved 94% accuracy, enabling targeted campaigns that reduced churn by 23% and
                      boosted customer lifetime value significantly.
                    </p>

                    <div className={`grid gap-6 md:gap-8 ${isMobile ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-2"}`}>
                      <div>
                        <h3
                          className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-base" : "text-lg md:text-xl"}`}
                        >
                          Key Achievements
                        </h3>
                        <div className="space-y-3 md:space-y-4">
                          {achievements.map((a, i) => {
                            const Icon = a.icon
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`flex items-center justify-between bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-700/30 transition-colors duration-300 ${
                                  isMobile ? "p-3" : "p-3 md:p-4"
                                }`}
                              >
                                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                                  <Icon size={isMobile ? 16 : 18} className="text-indigo-400 flex-shrink-0" />
                                  <span
                                    className={`text-gray-300 truncate ${isMobile ? "text-xs" : "text-sm md:text-base"}`}
                                  >
                                    {a.metric}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                                  <span
                                    className={`font-bold text-white ${isMobile ? "text-sm" : "text-base md:text-lg"}`}
                                  >
                                    {a.value}
                                  </span>
                                  <span
                                    className={`text-green-400 bg-green-500/20 border border-green-500/30 rounded-full ${
                                      isMobile ? "text-xs px-2 py-0.5" : "text-xs px-2 md:px-3 py-1"
                                    }`}
                                  >
                                    {a.change}
                                  </span>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <h3
                          className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-base" : "text-lg md:text-xl"}`}
                        >
                          Technical Metrics
                        </h3>
                        <div className="space-y-3 md:space-y-4">
                          {technicalMetrics.map((m, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                              className={`flex items-center justify-between bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-700/30 transition-colors duration-300 ${
                                isMobile ? "p-3" : "p-3 md:p-4"
                              }`}
                            >
                              <span className={`text-gray-300 ${isMobile ? "text-xs" : "text-sm md:text-base"}`}>
                                {m.metric}
                              </span>
                              <span className={`font-bold ${m.color} ${isMobile ? "text-base" : "text-lg md:text-xl"}`}>
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

              {activeTab === "code" && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-6 md:p-8"}`}
                >
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <Code className={`text-gray-400 ${isMobile ? "w-5 h-5" : "w-6 h-6"}`} />
                    <h2
                      className={`font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${
                        isMobile ? "text-lg" : "text-xl md:text-2xl"
                      }`}
                    >
                      Code & Resources
                    </h2>
                  </div>

                  <div className={`grid gap-4 md:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
                    <Link
                      href="#"
                      className={`glow-card flex items-center justify-between rounded-xl hover:scale-105 transition-all duration-300 group ${
                        isMobile ? "p-4" : "p-4 md:p-6"
                      }`}
                    >
                      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                        <div
                          className={`bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isMobile ? "w-10 h-10" : "w-10 h-10 md:w-12 md:h-12"
                          }`}
                        >
                          <Code size={isMobile ? 18 : 20} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <span
                            className={`font-semibold text-white block truncate ${
                              isMobile ? "text-sm" : "text-base md:text-lg"
                            }`}
                          >
                            View Source Code
                          </span>
                          <p className={`text-gray-400 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                            Complete implementation
                          </p>
                        </div>
                      </div>
                      <ExternalLink
                        className={`text-gray-400 group-hover:text-indigo-400 transition-colors duration-300 flex-shrink-0 ${
                          isMobile ? "w-4 h-4" : "w-4 h-4 md:w-5 md:h-5"
                        }`}
                      />
                    </Link>

                    <Link
                      href="#"
                      className={`glow-card flex items-center justify-between rounded-xl hover:scale-105 transition-all duration-300 group ${
                        isMobile ? "p-4" : "p-4 md:p-6"
                      }`}
                    >
                      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                        <div
                          className={`bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isMobile ? "w-10 h-10" : "w-10 h-10 md:w-12 md:h-12"
                          }`}
                        >
                          <ExternalLink size={isMobile ? 18 : 20} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <span
                            className={`font-semibold text-white block truncate ${
                              isMobile ? "text-sm" : "text-base md:text-lg"
                            }`}
                          >
                            Live Demo
                          </span>
                          <p className={`text-gray-400 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                            Interactive prediction tool
                          </p>
                        </div>
                      </div>
                      <ExternalLink
                        className={`text-gray-400 group-hover:text-green-400 transition-colors duration-300 flex-shrink-0 ${
                          isMobile ? "w-4 h-4" : "w-4 h-4 md:w-5 md:h-5"
                        }`}
                      />
                    </Link>
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
