// src/app/skills/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Code,
  Brain,
  BarChart3,
  TrendingUp,
  Database,
  Cloud,
  Star,
  Award,
  Target,
  Zap,
  BookOpen,
  Lightbulb,
} from "lucide-react"

export default function SkillsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  const categories = [
    {
      id: "prog",
      title: "Programming Languages",
      Icon: Code,
      color: "from-blue-500 to-blue-700",
      glowColor: "rgba(59, 130, 246, 0.3)",
      skills: [
        { name: "Python", level: "Advanced", color: "green" },
        { name: "R", level: "Intermediate", color: "blue" },
        { name: "SQL", level: "Advanced", color: "green" },
        { name: "JavaScript", level: "Intermediate", color: "blue" },
      ],
    },
    {
      id: "ml",
      title: "Machine Learning",
      Icon: Brain,
      color: "from-purple-500 to-purple-700",
      glowColor: "rgba(139, 92, 246, 0.3)",
      skills: [
        { name: "Scikit-learn", level: "Advanced", color: "green" },
        { name: "TensorFlow", level: "Intermediate", color: "blue" },
        { name: "PyTorch", level: "Intermediate", color: "blue" },
        { name: "XGBoost", level: "Advanced", color: "green" },
        { name: "Random Forests", level: "Advanced", color: "green" },
        { name: "Neural Networks", level: "Intermediate", color: "blue" },
      ],
    },
    {
      id: "viz",
      title: "Data Visualization",
      Icon: BarChart3,
      color: "from-green-500 to-green-700",
      glowColor: "rgba(16, 185, 129, 0.3)",
      skills: [
        { name: "Matplotlib", level: "Advanced", color: "green" },
        { name: "Seaborn", level: "Advanced", color: "green" },
        { name: "Plotly", level: "Intermediate", color: "blue" },
        { name: "Tableau", level: "Intermediate", color: "blue" },
        { name: "Power BI", level: "Basic", color: "gray" },
      ],
    },
    {
      id: "stats",
      title: "Statistical Analysis",
      Icon: TrendingUp,
      color: "from-pink-500 to-pink-700",
      glowColor: "rgba(236, 72, 153, 0.3)",
      skills: [
        { name: "Hypothesis Testing", level: "Advanced", color: "green" },
        { name: "Regression Analysis", level: "Advanced", color: "green" },
        { name: "Time Series", level: "Intermediate", color: "blue" },
        { name: "A/B Testing", level: "Intermediate", color: "blue" },
        { name: "Bayesian Stats", level: "Basic", color: "gray" },
      ],
    },
    {
      id: "db",
      title: "Big Data & Databases",
      Icon: Database,
      color: "from-indigo-500 to-indigo-700",
      glowColor: "rgba(99, 102, 241, 0.3)",
      skills: [
        { name: "Pandas", level: "Advanced", color: "green" },
        { name: "Spark", level: "Basic", color: "gray" },
        { name: "Hadoop", level: "Basic", color: "gray" },
        { name: "PostgreSQL", level: "Intermediate", color: "blue" },
        { name: "MongoDB", level: "Basic", color: "gray" },
      ],
    },
    {
      id: "cloud",
      title: "Cloud & Tools",
      Icon: Cloud,
      color: "from-cyan-500 to-cyan-700",
      glowColor: "rgba(6, 182, 212, 0.3)",
      skills: [
        { name: "Jupyter", level: "Advanced", color: "green" },
        { name: "Git", level: "Intermediate", color: "blue" },
        { name: "Docker", level: "Basic", color: "gray" },
        { name: "AWS", level: "Intermediate", color: "blue" },
        { name: "GCP", level: "Basic", color: "gray" },
        { name: "Streamlit", level: "Intermediate", color: "blue" },
      ],
    },
  ]

  const levelIcon = (lvl: string) => {
    if (lvl === "Advanced") return <Star className="w-3 h-3" />
    if (lvl === "Intermediate") return <Award className="w-3 h-3" />
    return <Target className="w-3 h-3" />
  }

  const colorClasses = (c: string) => {
    switch (c) {
      case "green":
        return "bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/30 text-green-300"
      case "blue":
        return "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300"
      default:
        return "bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-300"
    }
  }

  const all = categories.flatMap((cat) => cat.skills)
  const stats = {
    total: all.length,
    advanced: all.filter((s) => s.level === "Advanced").length,
    intermediate: all.filter((s) => s.level === "Intermediate").length,
    basic: all.filter((s) => s.level === "Basic").length,
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
        <div className="fixed top-0 left-0 h-full z-30">
          <Sidebar active="skills" onToggle={setSidebarCollapsed} />
        </div>

        {/* Main content with dynamic margin */}
        <main
          className="flex-1 overflow-y-auto p-8 relative transition-all duration-300 ease-in-out"
          style={{
            marginLeft: sidebarCollapsed ? "120px" : "288px",
          }}
        >
          <div className="max-w-6xl mx-auto">
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
                  <Zap size={24} className="text-white" />
                </div>
                <h1 className="text-5xl font-extrabold">
                  <span className="text-gradient-enhanced">Technical Skills</span>
                </h1>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                My expertise in data science and machine learning technologies
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {[
                {
                  label: "Total Skills",
                  value: stats.total,
                  color: "from-blue-500 to-blue-700",
                  glow: "rgba(59, 130, 246, 0.3)",
                },
                {
                  label: "Advanced",
                  value: stats.advanced,
                  color: "from-green-500 to-green-700",
                  glow: "rgba(16, 185, 129, 0.3)",
                },
                {
                  label: "Intermediate",
                  value: stats.intermediate,
                  color: "from-purple-500 to-purple-700",
                  glow: "rgba(139, 92, 246, 0.3)",
                },
                {
                  label: "Basic",
                  value: stats.basic,
                  color: "from-gray-500 to-gray-700",
                  glow: "rgba(107, 114, 128, 0.3)",
                },
              ].map(({ label, value, color, glow }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="glow-card rounded-2xl p-6 text-center group cursor-pointer"
                >
                  <div className={`text-3xl font-bold mb-2 bg-gradient-to-br ${color} bg-clip-text text-transparent`}>
                    {value}
                  </div>
                  <div className="text-gray-300 font-medium">{label}</div>
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                    style={{ backgroundColor: glow }}
                  ></div>
                </motion.div>
              ))}
            </motion.div>

            {/* Categories & Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {categories.map(({ id, title, Icon, color, glowColor, skills }, index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="glow-card rounded-2xl p-8 group"
                >
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg mr-4`}
                      style={{ boxShadow: `0 10px 30px ${glowColor}` }}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                      {title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, i) => {
                      const key = `${id}-${i}`
                      return (
                        <div
                          key={key}
                          onMouseEnter={() => setHovered(key)}
                          onMouseLeave={() => setHovered(null)}
                          className={`
                            inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border
                            ${colorClasses(skill.color)}
                            ${hovered === key ? "transform scale-105 shadow-lg" : ""}
                            transition-all duration-300 cursor-default
                          `}
                        >
                          <span className="mr-2">{levelIcon(skill.level)}</span>
                          <span className="mr-2">{skill.name}</span>
                          <span className="text-xs opacity-75">{skill.level}</span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="glow-card rounded-2xl p-8 mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-indigo-400" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Proficiency Levels
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center mr-4">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-300 mb-1">Advanced</div>
                    <div className="text-sm text-gray-400">Expert level, can teach others</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center mr-4">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-blue-300 mb-1">Intermediate</div>
                    <div className="text-sm text-gray-400">Proficient, comfortable using</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center mr-4">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-300 mb-1">Basic</div>
                    <div className="text-sm text-gray-400">Familiar, can work with guidance</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Learning Goals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="glow-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Currently Learning
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Deep Learning (PyTorch)",
                    desc: "Advancing from intermediate to advanced",
                    color: "from-red-500 to-red-700",
                  },
                  {
                    title: "MLOps & Deployment",
                    desc: "Docker, Kubernetes, model serving",
                    color: "from-blue-500 to-blue-700",
                  },
                  {
                    title: "Apache Spark",
                    desc: "Big data processing",
                    color: "from-orange-500 to-orange-700",
                  },
                  {
                    title: "Cloud Architecture",
                    desc: "AWS/GCP data engineering",
                    color: "from-purple-500 to-purple-700",
                  },
                ].map((goal, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                    className="flex items-center p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-xl hover:bg-yellow-500/20 transition-all duration-300"
                  >
                    <div className={`w-3 h-3 bg-gradient-to-br ${goal.color} rounded-full mr-4 animate-pulse`} />
                    <div>
                      <div className="font-semibold text-white mb-1">{goal.title}</div>
                      <div className="text-sm text-gray-400">{goal.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  )
}
