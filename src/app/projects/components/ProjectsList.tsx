// src/app/projects/components/ProjectsList.tsx  
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { ArrowLeft, Star, Github, FolderOpen, LineChart } from "lucide-react"
import type { ProjectCard } from "../lib/getQuartoProjects"

export default function ProjectsList({ projects }: { projects: ProjectCard[] }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const featured = projects

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
          background: linear-gradient(to right, #7dd3fe 0%, #818cf8 50%, #c084fc 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 5s ease infinite;
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
          className="flex-1 overflow-y-auto py-8 relative z-10 transition-all duration-300 ease-in-out"
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
                <h1 className={`font-semibold playfair ${isMobile ? "text-4xl sm:text-5xl" : "text-6xl"}`}>
                  My <span className="text-gradient-enhanced italic">Projects</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed font-neue-montreal ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                a collection of my technical and research work
              </p>
            </motion.div>

            {/* Projects Grid */}
            <section className="mb-16">
              <div className={`grid gap-8 ${isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
                {featured.map((proj, index) => (
                  <motion.div
                    key={proj.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="glow-card rounded-2xl overflow-hidden group font-neue-montreal"
                    onMouseEnter={() => setHovered(proj.slug)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Real Image (or gradient placeholder when no card image is uploaded) */}
                    <div className="relative h-48 overflow-hidden border-b border-white/10">
                      {proj.cardImageUrl ? (
                        <img
                          src={proj.cardImageUrl}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          alt={proj.title}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#0b1020] relative overflow-hidden">
                          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 40%, rgba(129,140,248,0.25), transparent 55%), radial-gradient(circle at 75% 70%, rgba(192,132,252,0.22), transparent 55%)" }} />
                          <LineChart size={54} className="text-indigo-300/70 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    <div className={`p-6 ${isMobile ? "p-4" : "p-6"}`}>
                      <div className="mb-4">
                        <h3 className={`font-bold text-white mb-3 transition-colors duration-300 font-neue-montreal ${isMobile ? "text-lg" : "text-xl"}`}>
                          {proj.title}
                        </h3>
                        <span className="text-sm text-indigo-400 font-medium font-neue-montreal">{proj.category}</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 font-neue-montreal">{proj.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {proj.skills.map((skill, i) => (
                          <span key={i} className={`bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs font-medium font-neue-montreal rounded-full hover:bg-slate-700/50 hover:border-indigo-500/30 hover:text-indigo-300 transition-all duration-300 ${isMobile ? "px-2 py-1" : "px-3 py-1"}`}>
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className={`flex gap-3 ${isMobile ? "flex-col" : ""}`}>
                        <Link
                          href={`/projects?project=${proj.slug}`}
                          className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium font-neue-montreal rounded-lg shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ${isMobile ? "justify-center" : ""}`}
                        >
                          <LineChart size={16} />
                          Open Notebook
                        </Link>
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/50 text-slate-300 hover:text-white text-sm font-medium font-neue-montreal rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 ${isMobile ? "justify-center" : ""}`}
                          >
                            <Github size={16} />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}