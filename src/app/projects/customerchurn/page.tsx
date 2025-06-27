// src/app/projects/customerchurn/page.tsx
"use client"

import { useState } from "react"
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
      `}</style>

      <div className="flex h-screen overflow-hidden bg-[#0a0e1a] text-white">
        {/* Sidebar - Fixed positioned */}
         <Sidebar active="projects" onToggle={setSidebarCollapsed} />
  
        {/* Main content with dynamic margin */}
        <main
          className="flex-1 overflow-y-auto relative transition-all duration-300 ease-in-out"
          style={{
            marginLeft: "40px" ,
          }}
        >

          
          {/* Header */}
          <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-6 transition-all duration-300 hover:translate-x-1 group"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Back to Projects</span>
                </Link>
              </motion.div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h1 className="text-4xl font-extrabold mb-3">
                    <span className="text-gradient-enhanced">Customer Churn Prediction</span>
                  </h1>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                    Machine learning model to predict customer churn using ensemble methods with 94% accuracy.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap gap-3"
                >
                  <button className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white font-medium rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300">
                    <Code size={18} />
                    View Code
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300">
                    <ExternalLink size={18} />
                    Live Demo
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-slate-900/50 hover:bg-slate-800/50 text-slate-300 hover:text-white font-medium rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                    <Github size={18} />
                    GitHub
                  </button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-white/10 bg-slate-900/30 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6">
              <nav className="flex space-x-8">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon
                  return (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                        activeTab === tab.id
                          ? "border-indigo-500 text-indigo-400"
                          : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </motion.button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            {activeTab === "overview" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="glow-card rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-6 h-6 text-indigo-400" />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                      Project Overview
                    </h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg mb-8">
                    This project focuses on predicting customer churn for a telecommunications company using advanced
                    machine learning techniques. Customer churn prediction is crucial for businesses to identify
                    customers who are likely to cancel their subscriptions or stop purchasing to take preventive actions
                    and reduce revenue loss.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {keyMetrics.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`text-center p-6 bg-gradient-to-br ${m.bg} border ${m.border} rounded-xl`}
                      >
                        <div className={`text-4xl font-bold ${m.color} mb-2`}>{m.value}</div>
                        <div className="text-gray-300 font-medium">{m.label}</div>
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
                className="glow-card rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                    Problem Statement
                  </h2>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  A telecommunications company was struggling with customer retention. Acquiring new customers costs
                  5–10x more than retaining existing ones. The company needed a reliable way to identify customers at
                  risk of churning to implement targeted retention strategies and reduce revenue loss.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <AlertTriangle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">High Acquisition Costs</h3>
                      <p className="text-gray-300">Customer acquisition costs 5-10x more than retention</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <AlertTriangle size={20} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">No Early Warning System</h3>
                      <p className="text-gray-300">Lack of predictive system for potential churners</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                    <AlertTriangle size={20} className="text-orange-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">Reactive Approach</h3>
                      <p className="text-gray-300">Reactive rather than predictive customer retention strategy</p>
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
                className="glow-card rounded-2xl p-8 space-y-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                    Methodology
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Data Collection */}
                  <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-4">
                      <Database className="w-5 h-5 text-blue-400" />
                      Data Collection & Preprocessing
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        Collected customer demographics, usage patterns, and billing information
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        Cleaned data, handled outliers and missing values systematically
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        Normalized numerical features using StandardScaler
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        One-hot encoded categorical features for model compatibility
                      </li>
                    </ul>
                  </div>

                  {/* Feature Engineering */}
                  <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-4">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                      Feature Engineering
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        Created engagement scores from usage patterns and behavior
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        Engineered seasonality and trend features from time series data
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        Selected optimal features through correlation analysis and importance scoring
                      </li>
                    </ul>
                  </div>

                  {/* Model Development */}
                  <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-4">
                      <Zap className="w-5 h-5 text-green-400" />
                      Model Development
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        Tested multiple algorithms: XGBoost, Random Forest, Logistic Regression
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        Final model: XGBoost with extensive hyperparameter tuning
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
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
                className="space-y-8"
              >
                <div className="glow-card rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <LineChart className="w-6 h-6 text-green-400" />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                      Results & Impact
                    </h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg mb-8">
                    The XGBoost model achieved 94% accuracy, enabling targeted campaigns that reduced churn by 23% and
                    boosted customer lifetime value significantly.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-6">Key Achievements</h3>
                      <div className="space-y-4">
                        {achievements.map((a, i) => {
                          const Icon = a.icon
                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                              className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-700/30 transition-colors duration-300"
                            >
                              <div className="flex items-center gap-3">
                                <Icon size={20} className="text-indigo-400" />
                                <span className="text-gray-300">{a.metric}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-white text-lg">{a.value}</span>
                                <span className="text-xs text-green-400 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full">
                                  {a.change}
                                </span>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-6">Technical Metrics</h3>
                      <div className="space-y-4">
                        {technicalMetrics.map((m, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-700/30 transition-colors duration-300"
                          >
                            <span className="text-gray-300">{m.metric}</span>
                            <span className={`font-bold text-xl ${m.color}`}>{m.value}</span>
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
                className="glow-card rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Code className="w-6 h-6 text-gray-400" />
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                    Code & Resources
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link
                    href="#"
                    className="glow-card flex items-center justify-between p-6 rounded-xl hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Code size={24} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-white text-lg">View Source Code</span>
                        <p className="text-gray-400 text-sm">Complete implementation</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300" />
                  </Link>
                  <Link
                    href="#"
                    className="glow-card flex items-center justify-between p-6 rounded-xl hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                        <ExternalLink size={24} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-white text-lg">Live Demo</span>
                        <p className="text-gray-400 text-sm">Interactive prediction tool</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors duration-300" />
                  </Link>
                </div>
              </motion.section>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
