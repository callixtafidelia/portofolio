"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { ArrowLeft, Code, Brain, BarChart3, TrendingUp, Database, Cloud, Star, Award, Target, Zap, Layers } from "lucide-react"

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
        { name: "Python", level: "Advanced", color: "gray", logoUrl: "./programming/python.png" },
        { name: "R", level: "Intermediate", color: "gray", logoUrl: "./programming/R.png" },
        { name: "SQL", level: "Advanced", color: "gray", logoUrl: "./programming/SQL.png" },
        { name: "JavaScript", level: "Intermediate", color: "gray", logoUrl: "./programming/javascript.png" },
      ],
    },
    {
      id: "ml",
      title: "Machine Learning",
      Icon: Brain,
      color: "from-purple-500 to-purple-700",
      glowColor: "rgba(139, 92, 246, 0.3)",
      skills: [
        { name: "Scikit-learn", level: "Advanced", color: "gray", logoUrl: "./ml/scikitlearn.png" },
        { name: "TensorFlow", level: "Intermediate", color: "gray", logoUrl: "./ml/tensorflow.png" },
        { name: "PyTorch", level: null, color: "gray", logoUrl: "./ml/pytorch.png" },
        { name: "XGBoost", level: "Basic", color: "gray", logoUrl: null },
        { name: "Random Forests", level: "Advanced", color: "gray", logoUrl: null },
        { name: "K-Means Clustering", level: "Intermediate", color: "gray", logoUrl: null },
        { name: "PCA", level: "Intermediate", color: "gray", logoUrl: null },
        { name: "Hyperparameter Tuning", level: "Intermediate", color: "gray", logoUrl: null },
        { name: "Cross-Validation", level: "Intermediate", color: "gray", logoUrl: null },
      ],
    },
    {
      id: "viz",
      title: "Data Visualization",
      Icon: BarChart3,
      color: "from-green-500 to-green-700",
      glowColor: "rgba(16, 185, 129, 0.3)",
      skills: [
        { name: "Matplotlib", level: "Advanced", color: "gray", logoUrl: "./dataviz/matplotlib.png" },
        { name: "Seaborn", level: "Advanced", color: "gray", logoUrl: "./dataviz/seaborn.png" },
        { name: "ggplot2", level: "Intermediate", color: "gray", logoUrl: "./dataviz/ggplot2.png" },
        { name: "Tableau", level: "Intermediate", color: "gray", logoUrl: "./dataviz/tableau.png" },
        { name: "Power BI", level: "Basic", color: "gray", logoUrl: "./dataviz/powerbi.png" },
      ],
    },
    {
  id: "design",
  title: "Graphic Design",
  Icon: Layers,
  color: "from-pink-500 to-rose-700",
  glowColor: "rgba(236, 72, 153, 0.3)",
  skills: [
    { name: "Figma", level: "Basic", color: "gray", logoUrl: "./design/figma.png" },
    { name: "Canva", level: "Basic", color: "gray", logoUrl: "./design/canva.png" },
    { name: "DaVinci Resolve", level: "Basic", color: "gray", logoUrl: "./design/davinciresolve.png" },
    { name: "Adobe Premier Pro", level: "Basic", color: "gray", logoUrl: "./design/premierpro.png" },
    { name: "Adobe After Effects", level: "Basic", color: "gray", logoUrl: "./design/aftereffects.png" },
    { name: "Adobe Photoshop", level: "Basic", color: "gray", logoUrl: "./design/photoshop.png" },
    { name: "Adobe Illustrator", level: "Basic", color: "gray", logoUrl: "./design/illustrator.png" },
    { name: "Adobe Lightroom", level: "Basic", color: "gray", logoUrl: "./design/lightroom.png" },
  ],
},
    {
      id: "stats",
      title: "Statistical Analysis",
      Icon: TrendingUp,
      color: "from-orange-500 to-orange-700",
      glowColor: "rgba(236, 143, 72, 0.3)",
      skills: [
        { name: "Hypothesis Testing", level: "Advanced", color: "gray", logoUrl: null },
        { name: "Regression & Residual Analysis", level: "Advanced", color: "gray", logoUrl: null },
        { name: "Time Series", level: "Intermediate", color: "gray", logoUrl: null },
        { name: "Econometrics", level: "Intermediate", color: "gray", logoUrl: null },
        { name: "A/B Testing", level: "Intermediate", color: "gray", logoUrl: null },
        { name: "Bayesian Stats", level: "Basic", color: "gray", logoUrl: null },
      ],
    },
    {
      id: "cloud",
      title: "Databases & Cloud Tools",
      Icon: Cloud,
      color: "from-cyan-500 to-cyan-700",
      glowColor: "rgba(6, 182, 212, 0.3)",
      skills: [
        { name: "PostgreSQL", level: "Advanced", color: "gray", logoUrl: "./database/docker.png" },
        { name: "MongoDB", level: "Intermediate", color: "gray", logoUrl: "./database/mongodb.png" },
        { name: "Google Cloud Platform", level: "Basic", color: "gray", logoUrl: "./database/GCP.png" },
        { name: "Docker", level: "Intermediate", color: "gray", logoUrl: "./database/postgresql.png" },
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
        
        /* Dynamic animated background */
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
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 60% 60%, rgba(255, 200, 87, 0.1) 0%, transparent 50%);
          z-index: -1;
          animation: backgroundShift 25s ease-in-out infinite;
        }
        
        /* Floating particles */
        body::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.1), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.05), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.1), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.05), transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          z-index: -1;
          animation: float 20s linear infinite;
        }
        
        @keyframes backgroundShift {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg);
          }
          25% { 
            opacity: 0.8; 
            transform: scale(1.05) rotate(1deg);
          }
          50% { 
            opacity: 0.9; 
            transform: scale(0.95) rotate(-1deg);
          }
          75% { 
            opacity: 0.85; 
            transform: scale(1.02) rotate(0.5deg);
          }
        }
        
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
          100% { transform: translateY(0px) translateX(0px); }
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
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        
        .glow-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(240, 147, 251, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: inherit;
        }
        
        .glow-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.6s ease;
          display: none;
        }
        
        .glow-card:hover::before {
          opacity: 1;
        }
        
        .glow-card:hover::after {
          left: 100%;
          display: none;
        }
        
        .glow-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(102, 126, 234, 0.4);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
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
        
        /* Mobile responsive adjustments */
        @media (max-width: 1024px) {
          .glow-card:hover {
            transform: none;
          }
        }

        /* Enhanced logo hover effects */
        .skill-logo {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .skill-item:hover .skill-logo {
          transform: scale(1.2) rotate(5deg);
          filter: brightness(1.3) saturate(1.2);
        }
        
        /* Pulse animation for stats */
        .stat-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .8;
          }
        }
        
        /* Filter button animations */
        .filter-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .filter-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }
        
        .filter-btn:hover::before {
          left: 100%;
        }
        
        /* Staggered animations */
        .stagger-item {
          opacity: 0;
          transform: translateY(20px);
          animation: staggerIn 0.6s ease forwards;
        }
        
        @keyframes staggerIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Image placeholder styling */
        .logo-placeholder {
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          color: rgba(255,255,255,0.6);
          transition: all 0.3s ease;
        }

        .logo-placeholder:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%);
          transform: scale(1.1);
        }

        @media (min-width: 768px) {
          .logo-placeholder {
            width: 20px;
            height: 20px;
            font-size: 10px;
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
            marginLeft: isMobile ? "0" : "40px",
          }}
        >
          <div className={`max-w-7xl mx-auto ${isMobile ? "px-4" : "px-6"}`}>
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
                <h1 className={`font-bold font-neue-montreal ${isMobile ? "text-3xl sm:text-4xl" : "text-5xl"}`}>
                  <span className="text-gradient-enhanced">Technical Skills</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed font-neue-montreal ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                My expertise in data science and machine learning technologies
              </p>
            </motion.div>



            {/* Categories & Skills */}
            <div className={`grid gap-6 md:gap-8 mb-12 ${isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
              {categories.map(({ id, title, Icon, color, glowColor, skills }, index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className={`glow-card rounded-2xl group relative overflow-hidden ${isMobile ? "p-6" : "p-8"}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5 overflow-hidden">
                    <Icon size={128} className="text-white transform rotate-12 translate-x-8 -translate-y-8" />
                  </div>

                  <div className="flex items-center mb-6 relative z-10">
                    <div
                      className={`bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-2xl mr-4 relative overflow-hidden ${isMobile ? "w-12 h-12" : "w-14 h-14"}`}
                      style={{ boxShadow: `0 15px 35px ${glowColor}` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      <Icon size={isMobile ? 24 : 28} className="text-white relative z-10" />
                    </div>
                    <div>
                      <h3
                        className={`font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${isMobile ? "text-lg" : "text-xl"}`}
                      >
                        {title}
                      </h3>
                      <p className="text-gray-400 text-sm">{skills.length} skills</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 relative z-10">
                    {skills.map((skill, i) => {
                      const key = `${id}-${i}`
                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                          onMouseEnter={() => !isMobile && setHovered(key)}
                          onMouseLeave={() => !isMobile && setHovered(null)}
                          className={`
                            skill-item inline-flex items-center rounded-full border transition-all duration-300 cursor-pointer relative overflow-hidden
                            ${colorClasses(skill.color)}
                            ${hovered === key && !isMobile ? "scale-110 shadow-xl z-10" : ""}
                            font-medium ${isMobile ? "text-xs px-3 py-2" : "text-sm px-4 py-2.5"}
                          `}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Logo or Icon */}
                          {skill.logoUrl && (
                            <div className="skill-logo mr-2 relative z-10">
                              <img 
                                src={skill.logoUrl} 
                                alt={`${skill.name} logo`}
                                className="w-4 h-4 md:w-5 md:h-5 object-contain"
                              />
                            </div>
                          )}
                          
                          <span className="relative z-10">{skill.name}</span>
                          {hovered === key && !isMobile && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
                              {skill.level}
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}