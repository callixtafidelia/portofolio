"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { ArrowLeft, Code, Brain, BarChart3, TrendingUp, Database, Cloud, Star, Award, Target, Zap } from "lucide-react"

export default function SkillsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
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
    if (lvl === "Advanced") return <Star className="w-2.5 h-2.5 md:w-3 md:h-3" />
    if (lvl === "Intermediate") return <Award className="w-2.5 h-2.5 md:w-3 md:h-3" />
    return <Target className="w-2.5 h-2.5 md:w-3 md:h-3" />
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

        /* Mobile responsive adjustments */
        @media (max-width: 1024px) {
          .glow-card:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="flex h-screen overflow-hidden bg-[#0a0e1a] text-white">
        {/* Sidebar */}
        <Sidebar active="skills" onToggle={setSidebarCollapsed} />

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
                  <Zap size={24} className="text-white" />
                </div>
                <h1 className={`font-extrabold ${isMobile ? "text-3xl sm:text-4xl" : "text-5xl"}`}>
                  <span className="text-gradient-enhanced">Technical Skills</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                My expertise in data science and machine learning technologies
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`grid gap-3 md:gap-6 mb-8 md:mb-12 ${isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}
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
                  className={`glow-card rounded-xl md:rounded-2xl text-center group cursor-pointer ${isMobile ? "p-3" : "p-3 md:p-6"}`}
                >
                  <div
                    className={`font-bold mb-1 md:mb-2 bg-gradient-to-br ${color} bg-clip-text text-transparent ${isMobile ? "text-2xl" : "text-2xl md:text-3xl"}`}
                  >
                    {value}
                  </div>
                  <div className={`text-gray-300 font-medium ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                    {label}
                  </div>
                  <div
                    className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                    style={{ backgroundColor: glow }}
                  ></div>
                </motion.div>
              ))}
            </motion.div>

            {/* Categories & Skills */}
            <div
              className={`grid gap-4 md:gap-8 mb-8 md:mb-12 ${isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}
            >
              {categories.map(({ id, title, Icon, color, glowColor, skills }, index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className={`glow-card rounded-xl md:rounded-2xl group ${isMobile ? "p-4" : "p-4 md:p-8"}`}
                >
                  <div className="flex items-center mb-4 md:mb-6">
                    <div
                      className={`bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg mr-3 md:mr-4 ${isMobile ? "w-10 h-10" : "w-10 h-10 md:w-12 md:h-12"}`}
                      style={{ boxShadow: `0 10px 30px ${glowColor}` }}
                    >
                      <Icon size={20} className="md:w-6 md:h-6 text-white" />
                    </div>
                    <h3
                      className={`font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${isMobile ? "text-base" : "text-base md:text-xl"}`}
                    >
                      {title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {skills.map((skill, i) => {
                      const key = `${id}-${i}`
                      return (
                        <div
                          key={key}
                          onMouseEnter={() => !isMobile && setHovered(key)}
                          onMouseLeave={() => !isMobile && setHovered(null)}
                          className={`
                            inline-flex items-center rounded-full border transition-all duration-300 cursor-pointer
                            ${colorClasses(skill.color)}
                            ${hovered === key && !isMobile ? "scale-105 shadow-lg" : ""}
                            font-medium ${isMobile ? "text-xs px-2.5 py-1.5" : "text-xs md:text-sm px-2.5 md:px-4 py-1.5 md:py-2"}
                          `}
                        >
                          {levelIcon(skill.level)}
                          <span className="ml-1.5 md:ml-2">{skill.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills Legend */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className={`glow-card rounded-xl md:rounded-2xl text-center ${isMobile ? "p-4" : "p-4 md:p-8"}`}
            >
              <h3
                className={`font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${isMobile ? "text-lg" : "text-lg md:text-2xl"}`}
              >
                Skill Levels
              </h3>
              <div className={`flex justify-center gap-4 md:gap-8 ${isMobile ? "flex-col space-y-3" : "flex-wrap"}`}>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                  <span className={`text-gray-300 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}>
                    Advanced - Professional proficiency
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  <span className={`text-gray-300 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}>
                    Intermediate - Working knowledge
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  <span className={`text-gray-300 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}>
                    Basic - Foundational understanding
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  )
}
