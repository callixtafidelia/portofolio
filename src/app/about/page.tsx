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
    "Data Visualization",
    "Statistical Modeling",
    "Deep Learning",
    "Econometrics",
    "Time Series Analysis",
    "Remote Sensing",
  ]

  const publications = [
    {
      title: "The Implementation of Deep Learning Algorithm with Gaussian Blur Data Preprocessing in Circular RNA Classification and Detection",
      issuer: "Undergraduate Research in Natural and Clinical Science and Technology (URNCST) Journal",
      year: "2024",
      color: "blue",
    },
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

        .font-neue-montreal {
            font-family: 'Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
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
                <h1 className={`font-bold font-neue-montreal ${isMobile ? "text-3xl sm:text-4xl" : "text-5xl"}`}>
                  About <span className="text-gradient-enhanced">Me</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed font-neue-montreal ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
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
                    className={`font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent font-neue-montreal  ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}
                  >
                    My Story
                  </h2>
                  <div
                    className={`space-y-4 md:space-y-6 text-gray-300 leading-relaxed font-neue-montreal ${isMobile ? "text-sm" : "text-sm md:text-base"}`}
                  >
                    <p>
                     As an Integrated Science student at UBC, I bridge the worlds of statistics, biology, and web development to tackle complex challenges with innovative solutions. My technical foundation spans from statistical modeling and machine learning to full-stack development with modern frameworks.
                    </p>
                    <p>
                     What truly drives me is the intersection of data science and design. I'm deeply passionate about graphic design, statistical modelling, and data visualization, finding joy in creating thoughtful experiences that blend aesthetics with functionality. I explore creative approaches using various tools to tell compelling visual stories with data.                    </p>
                    <p>
                    My approach combines scientific rigor with creative problem-solving, I believe excellent analysis isn't just about achieving high accuracy, but about communicating results in ways that inspire action. Beyond technical work, I'm passionate about creating meaningful social impact through mentoring, research collaboration, and community projects.
                    </p>
                    <p>
                    When I'm not analyzing data or building something new, you'll find me experimenting with emerging technologies, connecting with people over coffee (I'm always down for it!), or brainstorming my next project.
                    </p>
                  </div>

                  <motion.button
                     whileHover={isMobile ? {} : { scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = './resume.pdf'; // Path to your resume in public folder
                    link.download = 'Callixta_Fidelia_Resume.pdf'; // Name for downloaded file
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
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
                      className={`font-neue-montreal font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent ${isMobile ? "text-lg" : "text-lg md:text-xl"}`}
                    >
                      Education
                    </h3>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <h4 className={`font-neue-montreal font-semibold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}>
                        Bsc in Integrated Science                      </h4>
                      <div
                        className={`font-neue-montreal flex gap-2 md:gap-4 text-gray-400 mb-2 md:mb-3 ${isMobile ? "flex-col text-xs" : "flex-col sm:flex-row sm:items-center text-xs md:text-sm"}`}
                      >
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="md:w-3.5 md:h-3.5" />
                          <span>UBC </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="md:w-3.5 md:h-3.5" />
                          <span>May 2026</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                      <span
                        className={`font-neue-montreal inline-flex items-center bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 text-green-300 font-medium rounded-full ${isMobile ? "text-xs px-2.5 py-1" : "text-xs px-2.5 md:px-3 py-1"}`}
                      >
                        Statistics and Biology Concentration 
                      </span>
                      <span
                        className={`font-neue-montreal inline-flex items-center bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 text-orange-300 font-medium rounded-full ${isMobile ? "text-xs px-2.5 py-1" : "text-xs px-2.5 md:px-3 py-1"}`}
                      >
                        Minor in Food and Resource Economics
                      </span>
                    </div>
                    </div>
                    <div className="pt-3 md:pt-4 border-t border-white/10">
                      <h5
                        className={`font-neue-montreal font-medium text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}
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

                {/* Publications */}
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
                      Publications
                    </h3>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {publications.map((cert, i) => (
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
