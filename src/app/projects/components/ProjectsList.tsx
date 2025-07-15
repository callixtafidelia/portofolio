// src/app/projects/components/ProjectsList.tsx  
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { ArrowLeft, Star, ExternalLink, Github, FolderOpen } from "lucide-react"

export default function ProjectsList() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

   const getProjectImage = (slug: string) => {
  switch(slug) {
    case 'nhl': return 'nhl.png'          
    case 'flight': return 'map.png'
    case 'readmap': return 'readmap.png'
    case 'rebirdth': return 'rebirdth.png'
  }
}
  const getGitHubUrl = (slug: string) => {
  switch(slug) {
    case 'nhl': return 'https://github.com/callixtafidelia/hockey-skill-interactions-analysis'
    case 'flight': return 'https://github.com/callixtafidelia/flight-no2-impact-study'
    case 'readmap': return 'https://github.com/gatahcha/readmap-ai'
    case 'rebirdth': return 'https://github.com/callixtafidelia/rebirdth'
    default: return 'https://github.com/callixtafidelia/'
  }
}

  const featured = [
    {
      id: 1,
      slug: "nhl",
      title: "NHL Goal Production Analysis",
      description: "Analyzed five seasons of NHL player performance data (22,117 observations across 1,460 players) using fixed‑effects panel regression in R to quantify how interactions between player skills influence goal production. The model explained 57.7% of goal variability, providing actionable insights for coaching strategies and player evaluation.",
      skills: ["R", "Panel Data Analysis", "Regression", "Data Visualization"],
      category: "Sports Analytics & Statistical Modeling",
      imageUrl: "./public/nhl.png",
    },
    {
      id: 2,
      slug: "flight",
      title: "COVID-19 NO₂ Impact Analysis",
      description: "Analyzed flight trajectories from 58 major Chinese airports (Jan 2019–Dec 2020) alongside Sentinel‑5P TROPOMI satellite data to quantify changes in urban NO₂ pollution across pre‑COVID, disruption, and recovery phases. Applied two‑way fixed‑effects OLS controlling for wind and weather to isolate aviation’s impact on air quality.",
      skills: ["Remote Sensing", "R", "Spatial Regression", "Data Visualization"],
      category: "Spatial Analysis & Remote Sensing",
      imageUrl: "./public/map.png",
    },
    {
      id: 3,
      slug: "readmap",
      title: "Readmap.ai",
      description: "Built ReadMap.AI, a full‑stack platform that uses Google Vertex AI and MongoDB Atlas to generate personalized reading roadmaps. Leveraged semantic search over a large book database to match user interests, achieving 95% relevance accuracy, and wrapped it in a Next.js/TypeScript frontend for an intuitive UX.",
      skills: ["Python", "MongoDB", "Next.js", "Typescript", "Vertex AI"],
      category: "AI Learning Roadmap Tool",
      imageUrl: "./public/readmap.png",
    },
    {
      id: 4,
      slug: "rebirdth",
      title: "Rebirdth Educational Platform",
      description: "Co‑founded and developed Rebirdth, a Next.js/TypeScript site that delivers research tutorials, peer‑mentoring events, and interactive articles for Indonesian students. Designed a responsive UI, content‑management workflows, and event pages that have onboarded dozens of learners into a supportive, student‑led research community.",
      skills: ["Next.js", "Three.js", "TypeScript", "React", "Tailwind CSS"],
      category: "Community Education Platform",
      imageUrl: "./public/rebirdth.png",
    },
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
        
        .glow-card:hover {
          transform: translateY(-8px);
          border-color: rgba(102, 126, 234, 0.3);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
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
                href="/"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-all duration-300 hover:translate-x-1 group font-neue-montreal"
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
              <div className="flex items-center gap-4 mb-4 justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <FolderOpen size={24} className="text-white" />
                </div>
                <h1 className={`font-bold font-neue-montreal ${isMobile ? "text-3xl sm:text-4xl" : "text-5xl"}`}>
                  <span className="text-gradient-enhanced">Projects</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed font-neue-montreal ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                A collection of my data science and machine learning projects
              </p>
            </motion.div>

            {/* Projects Grid */}
            <section className="mb-16">
              <div className={`grid gap-8 ${isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
                {featured.map((proj, index) => (
                  <Link href={`/projects?project=${proj.slug}`} key={proj.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="glow-card rounded-2xl overflow-hidden group cursor-pointer block font-neue-montreal"
                      onMouseEnter={() => setHovered(proj.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* Real Image */}
                        <div className="relative h-48 overflow-hidden border-b border-white/10">
                        <img 
                            src={getProjectImage(proj.slug)} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"> 
                        </div>
                        </div>

                        

                      <div className={`p-6 ${isMobile ? "p-4" : "p-6"}`}>
                        <div className="mb-4">
                          <h3 className={`font-bold text-white mb-3 transition-colors duration-300 font-neue-montreal ${isMobile ? "text-lg" : "text-xl"}`}>
                            {proj.title}
                          </h3>
                          <span className="text-sm text-indigo-400 font-medium font-neue-montreal">{proj.category}</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6 font-neue-montreal">{proj.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {proj.skills.map((skill, i) => (
                            <span key={i} className={`bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs font-medium font-neue-montreal rounded-full hover:bg-slate-700/50 hover:border-indigo-500/30 hover:text-indigo-300 transition-all duration-300 ${isMobile ? "px-2 py-1" : "px-3 py-1"}`}>
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className={`flex gap-3 ${isMobile ? "flex-col" : ""}`}>
                          <span className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium font-neue-montreal rounded-lg shadow-lg shadow-indigo-500/25 ${isMobile ? "justify-center" : ""}`}>
                            <ExternalLink size={16} />
                            View Details
                          </span>
                          <a 
                            href={getGitHubUrl(proj.slug)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/50 text-slate-300 hover:text-white text-sm font-medium font-neue-montreal rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 ${isMobile ? "justify-center" : ""}`}
                            >
                            <Github size={16} />
                            GitHub
                            </a>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}