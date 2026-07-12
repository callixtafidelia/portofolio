"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import ResumeDownload from "@/components/ResumeDownload"
import { motion } from "framer-motion"
import { ArrowLeft, GraduationCap, Award, Calendar, MapPin } from "lucide-react"

export default function AboutMe() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const courseworkRows: Array<{ courses: string[] }> = [
    {
      courses: [
        "STAT 300: Intermediate Statistics for Applications",
        "STAT 302: Introduction to Probability",
        "STAT 305: Introduction to Statistical Inference",
        "STAT 306: Finding Relationships in Data",
        "STAT 404: Design and Analysis of Experiments",
        "STAT 406: Methods for Statistical Learning",
        "STAT 443: Time Series and Forecasting",
      ],
    },
    {
      courses: [
        "BIOL 300: Fundamentals of Biostatistics",
        "ISCI 320: Research Development Project",
        "FRST 399: Introduction to Research Methods",
        "ISCI 300: Interdisciplinary Seminar",
        "ISCI 360: Systems Approaches to Regional Sustainability",
      ],
    },
    {
      courses: [
        "FRE 326: Empirical Methods for Food and Resource Economics",
        "FRE 385: Quantitative Methods for Business and Resource Management",
        "FRE 302: Small Business Management in Agri-food Industries",
        "FRE 490: Current Issues in Food and Resource Economics",
      ],
    },
  ]
  const [courseworkDisplay, setCourseworkDisplay] = useState(
    courseworkRows.map((row) => ({
      text: row.courses[0],
      isVisible: true,
    }))
  )
  const currentIndexes = useRef<number[]>(courseworkRows.map(() => 0))
  const fadeTimeouts = useRef<Array<number | null>>([null, null, null])

  useEffect(() => {
    return () => {
      fadeTimeouts.current.forEach((timeoutId, index) => {
        if (timeoutId) {
          window.clearTimeout(timeoutId)
          fadeTimeouts.current[index] = null
        }
      })
    }
  }, [])

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleReducedMotionChange = () => setReducedMotion(mediaQuery.matches)

    handleReducedMotionChange()
    mediaQuery.addEventListener("change", handleReducedMotionChange)

    return () => mediaQuery.removeEventListener("change", handleReducedMotionChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const intervals = courseworkRows.map((row, index) => {
      const intervalId = window.setInterval(() => {
        setCourseworkDisplay((prev) => {
          const next = [...prev]
          next[index] = { ...next[index], isVisible: false }
          return next
        })

        const fadeTimeoutId = window.setTimeout(() => {
          setCourseworkDisplay((prev) => {
            const next = [...prev]
            const currentIndex = currentIndexes.current[index]
            const nextIndex = (currentIndex + 1) % row.courses.length
            currentIndexes.current[index] = nextIndex
            next[index] = {
              ...next[index],
              text: row.courses[nextIndex],
              isVisible: true,
            }
            return next
          })
        }, 420)

        fadeTimeouts.current[index] = fadeTimeoutId
      }, 2600 + index * 900)

      return intervalId
    })

    return () => {
      intervals.forEach((intervalId) => window.clearInterval(intervalId))
      fadeTimeouts.current.forEach((timeoutId, index) => {
        if (timeoutId) {
          window.clearTimeout(timeoutId)
          fadeTimeouts.current[index] = null
        }
      })
    }
  }, [reducedMotion])

  const publications = [
    {
      title: "The Implementation of Deep Learning Algorithm with Gaussian Blur Data Preprocessing in Circular RNA Classification and Detection",
      issuer: "Undergraduate Research in Natural and Clinical Science and Technology (URNCST) Journal",
      doiUrl: "https://doi.org/10.26685/urncst.601",
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
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .text-gradient-enhanced {
          background: linear-gradient(to right, #7dd3fe 0%, #818cf8 50%, #c084fc 100%);
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
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(192, 132, 252, 0.1) 100%);
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
          className="flex-1 overflow-y-auto py-8 relative z-10 transition-all duration-300 ease-in-out"
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
                <h1 className={`font-semibold playfair ${isMobile ? "text-4xl sm:text-5xl" : "text-6xl"}`}>
                  About <span className="text-gradient-enhanced italic">Me</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed font-neue-montreal ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                a little about the person behind the work
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
                    Where did it all begin?
                  </h2>
                  <div
                    className={`space-y-4 md:space-y-6 text-gray-300 leading-relaxed font-neue-montreal ${isMobile ? "text-sm" : "text-sm md:text-base"}`}
                  >
                    <p>
                    I think it started earlier than I could name it. Back in high school, I spent most of my time in the lab, mixing solutions and running experiments, especially to prepare for KoPSI, the Indonesian National Student Research Competition.
                    </p>
                    <p>
                    This was where I first applied statistical methods to my experimental data, something I had not really encountered before. In high school, we mostly learned the basics like mean, median, and mode, just simple ways to summarize data. It was useful, but it always felt like there was something deeper that I was not seeing.
                    </p>
                    <p>
                    At that time, I used ANOVA to analyze my lab data. It was a basic statistical test, but this was also the moment where I started to look at statistics differently, not just as calculations, but as something that can actually reveal patterns and structure hidden in data.
                    </p>
                    <p>
                    Going into my university journey at the UBC, I started to explore this more deeply, including taking BIOL 300: Biostatistics as my first formal statistics course. I found myself constantly amazed by how statistics could reveal patterns and complexity across ecological systems. I enjoyed it far more than I expected.
                    </p>
                    <p>
                    That led me to choose Integrated Science as my major, where I can integrate Biology and Statistics together as my main focus. Interestingly, at the same time I also got drawn into Macroeconomics, since research and data not only describe what is happening in nature, but also shape policy decisions. They influence how resources are used and how ecosystems are managed.
                    </p>
                    <p>
                    This interest brought me to Food and Resource Economics as a concentration that I also explore alongside biology and statistics in the Faculty of Science, to extend my thinking beyond pure science into systems where science, society, and policy intersect.
                    </p>
                    <p>
                    For me, it all connects back to one thing. I am interested in how data reveals patterns, and how those patterns can be used to understand and possibly improve the systems we live in.
                    </p>
                  </div>

                  <ResumeDownload
                    className={`btn-glow inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-2xl shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 rounded-xl mt-6 md:mt-8 ${isMobile ? "px-6 py-3 text-base" : "px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"}`}
                    iconSize={18}
                    iconClassName="md:w-6 md:h-6"
                  />
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
                      <h4 className={`font-neue-montreal font-semibold text-white mb-1 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}>
                        Bsc in Integrated Science                      </h4>
                      <div
                        className={`font-neue-montreal flex flex-col gap-1 text-gray-400 mb-4 ${isMobile ? "text-xs" : "text-xs md:text-sx"}`}
                      >
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="md:w-3.5 md:h-3.5" />
                          <span>University of British Columbia</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="md:w-3.5 md:h-3.5" />
                          <span>Sep 2022 - May 2026</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                      <span className={`font-neue-montreal inline-flex items-center bg-gradient-to-r from-teal-500/20 to-cyan-600/20 border border-teal-500/30 text-teal-300 font-medium rounded-full ${isMobile ? "text-xs px-2.5 py-1" : "text-xs px-2.5 md:px-3 py-1"}`}>Statistics</span>
                      <span className={`font-neue-montreal inline-flex items-center bg-gradient-to-r from-teal-500/20 to-cyan-600/20 border border-teal-500/30 text-teal-300 font-medium rounded-full ${isMobile ? "text-xs px-2.5 py-1" : "text-xs px-2.5 md:px-3 py-1"}`}>Biology</span>
                      <span className={`font-neue-montreal inline-flex items-center bg-gradient-to-r from-teal-500/20 to-cyan-600/20 border border-teal-500/30 text-teal-300 font-medium rounded-full ${isMobile ? "text-xs px-2.5 py-1" : "text-xs px-2.5 md:px-3 py-1"}`}>Food & Resource Economics</span>
                    </div>
                    </div>
                    <div className="pt-3 md:pt-4 border-t border-white/10">
                      <h5
                        className={`font-neue-montreal font-medium text-white mb-4 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}
                      >
                        Relevant Coursework
                      </h5>
                      <div className="flex flex-col gap-2">
                        {courseworkDisplay.map((row, index) => (
                          <div
                            key={`${row.text}-${index}`}
                            className={`w-full overflow-hidden rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-2 text-left text-slate-300 transition-opacity duration-300 ease-in-out ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}
                            style={{
                              opacity: row.isVisible ? 1 : 0,
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            <span className="font-semibold text-slate-200">{row.text.split(":")[0]}: </span>
                            <span className="truncate">{row.text.split(":").slice(1).join(":")}</span>
                          </div>
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
                          {cert.issuer}
                        </p>
                        <a
                          href={cert.doiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-1 relative z-10 inline-flex break-all text-cyan-400 underline decoration-cyan-400/50 underline-offset-4 hover:text-cyan-300 hover:decoration-cyan-300 transition-colors cursor-pointer ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}
                        >
                          {cert.doiUrl}
                        </a>
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
