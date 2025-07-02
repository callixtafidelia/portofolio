"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { ArrowLeft, Download, GraduationCap, Award, Calendar, MapPin } from "lucide-react"

export default function AboutMe() {
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

  const coursework = [
    "Machine Learning",
    "Statistical Analysis",
    "Database Systems",
    "Data Mining",
    "Python Programming",
    "R Programming",
  ]

  const certifications = [
    {
      title: "Machine Learning Specialization",
      issuer: "Stanford Online",
      year: "2023",
      color: "blue",
    },
    {
      title: "Data Science Professional Certificate",
      issuer: "IBM",
      year: "2022",
      color: "purple",
    },
  ]

  const quickStats = [
    { label: "Projects Completed", value: "15+" },
    { label: "Programming Languages", value: "6" },
    { label: "Years Learning", value: "3+" },
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .text-gradient-enhanced {
          background: linear-gradient(135deg,rgb(13, 27, 88) 0%,rgb(3, 53, 138) 50%,rgb(2, 131, 151) 100%);
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
        
        .btn-glow {
          position: relative;
          overflow: hidden;
        }
        
        .btn-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .btn-glow:hover::before {
          left: 100%;
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
        @media (max-width: 768px) {
          .glow-card:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="flex h-screen overflow-hidden bg-[#0a0e1a] text-white">
        {/* Sidebar */}
        <Sidebar active="about" onToggle={setSidebarCollapsed} />

        {/* Main content with responsive margin */}
        <main
          className="flex-1 overflow-y-auto py-8 relative transition-all duration-300 ease-in-out"
          style={{
            marginLeft: isMobile ? "0" : "40px", // No margin on mobile, fixed 40px on desktop
          }}
        >
          <div className={`max-w-6xl mx-auto ${isMobile ? "px-4" : "px-6"}`}>
            {/* Back to Home */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-all duration-300 hover:translate-x-1 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12 text-center"
            >
              <div className={`flex items-center gap-4 mb-4 justify-center`}>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <h1 className={`font-extrabold ${isMobile ? "text-3xl sm:text-4xl" : "text-5xl"}`}>
                  About <span className="text-gradient-enhanced">Me</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                My background, education, and journey in data science
              </p>
            </motion.div>

            <div className={`grid gap-6 md:gap-8 ${isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"}`}>
              {/* Story Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={isMobile ? "" : "lg:col-span-2"}
              >
                <div
                  className={`glow-card rounded-xl md:rounded-2xl space-y-4 md:space-y-6 ${isMobile ? "p-4" : "p-4 md:p-8"}`}
                >
                  <h2
                    className={`font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}
                  >
                    My Story
                  </h2>
                  <div
                    className={`space-y-4 md:space-y-6 text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-base"}`}
                  >
                    <p>
                      I'm a dedicated Data Science student with a passion for transforming complex datasets into
                      actionable insights that drive meaningful business decisions. My journey began with curiosity
                      about how data shapes our world and has evolved into a comprehensive skill set spanning
                      statistical analysis, machine learning, and data visualization.
                    </p>
                    <p>
                      Through rigorous coursework and hands-on personal projects, I've developed expertise in Python, R,
                      SQL, and various machine learning frameworks. I particularly enjoy working with predictive
                      modeling and finding patterns in seemingly chaotic data that can inform strategic decisions.
                    </p>
                    <p>
                      My approach combines technical rigor with creative problem-solving, always keeping the end user
                      and business impact in mind. I believe that the best data science work not only achieves high
                      accuracy but also tells a compelling story that stakeholders can understand and act upon.
                    </p>
                    <p>
                      When I'm not working with data, you can find me exploring new technologies, contributing to
                      open-source projects, or sharing my knowledge through blog posts and community presentations. I'm
                      always eager to learn and collaborate on challenging problems.
                    </p>
                  </div>

                  <motion.button
                    whileHover={isMobile ? {} : { scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`btn-glow inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-2xl shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 rounded-xl mt-6 md:mt-8 ${isMobile ? "px-6 py-3 text-base" : "px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"}`}
                  >
                    <Download size={18} className="md:w-6 md:h-6" />
                    Download Resume
                  </motion.button>
                </div>
              </motion.div>

              {/* Sidebar Info */}
              <div className="space-y-4 md:space-y-6">
                {/* Education */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                >
                  <div className="flex items-center mb-4 md:mb-6 gap-2 md:gap-3">
                    <div
                      className={`bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 ${isMobile ? "w-10 h-10" : "w-10 h-10 md:w-12 md:h-12"}`}
                    >
                      <GraduationCap size={20} className="md:w-6 md:h-6 text-white" />
                    </div>
                    <h3
                      className={`font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent ${isMobile ? "text-lg" : "text-lg md:text-xl"}`}
                    >
                      Education
                    </h3>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <h4 className={`font-semibold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}>
                        Bachelor of Science in Data Science
                      </h4>
                      <div
                        className={`flex gap-2 md:gap-4 text-gray-400 mb-2 md:mb-3 ${isMobile ? "flex-col text-xs" : "flex-col sm:flex-row sm:items-center text-xs md:text-sm"}`}
                      >
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="md:w-3.5 md:h-3.5" />
                          <span>University Name</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="md:w-3.5 md:h-3.5" />
                          <span>Expected 2025</span>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 text-green-300 font-medium rounded-full ${isMobile ? "text-xs px-2.5 py-1" : "text-xs px-2.5 md:px-3 py-1"}`}
                      >
                        GPA 3.8/4.0
                      </span>
                    </div>
                    <div className="pt-3 md:pt-4 border-t border-white/10">
                      <h5
                        className={`font-medium text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}
                      >
                        Relevant Coursework
                      </h5>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {coursework.map((course, i) => (
                          <span
                            key={i}
                            className={`bg-slate-800/50 border border-slate-700/50 text-slate-300 font-medium rounded-full hover:bg-slate-700/50 transition-colors duration-300 ${isMobile ? "text-xs px-2.5 py-1" : "text-xs px-2.5 md:px-3 py-1"}`}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Certifications */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                >
                  <div className="flex items-center mb-4 md:mb-6 gap-2 md:gap-3">
                    <div
                      className={`bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 ${isMobile ? "w-10 h-10" : "w-10 h-10 md:w-12 md:h-12"}`}
                    >
                      <Award size={20} className="md:w-6 md:h-6 text-white" />
                    </div>
                    <h3
                      className={`font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent ${isMobile ? "text-lg" : "text-lg md:text-xl"}`}
                    >
                      Certifications
                    </h3>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {certifications.map((cert, i) => (
                      <div
                        key={i}
                        className={`border-l-4 pl-3 md:pl-4 ${cert.color === "blue" ? "border-blue-500" : "border-purple-500"}`}
                      >
                        <h4
                          className={`font-semibold text-white mb-1 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}
                        >
                          {cert.title}
                        </h4>
                        <p className={`text-gray-400 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          {cert.issuer} • {cert.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative overflow-hidden rounded-xl md:rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 opacity-90"></div>
                  <div className={`relative text-white ${isMobile ? "p-4" : "p-4 md:p-6"}`}>
                    <h3 className={`font-bold mb-3 md:mb-4 ${isMobile ? "text-base" : "text-base md:text-lg"}`}>
                      Quick Stats
                    </h3>
                    <div className="space-y-2 md:space-y-3">
                      {quickStats.map((stat, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className={`text-indigo-100 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                            {stat.label}
                          </span>
                          <span className={`font-bold ${isMobile ? "text-base" : "text-base md:text-lg"}`}>
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
