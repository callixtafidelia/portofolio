// app/page.tsx
"use client"

import type React from "react"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { Download, ArrowRight, BarChart3, Users, Award } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const stats = [
    {
      value: "100%",
      label: "Model Accuracy",
      icon: BarChart3,
      iconBg: "from-blue-500 to-blue-700",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      value: "15+",
      label: "Projects Completed",
      icon: Users,
      iconBg: "from-purple-500 to-purple-700",
      glowColor: "rgba(139, 92, 246, 0.3)",
    },
    {
      value: "3.8",
      label: "GPA Score",
      icon: Award,
      iconBg: "from-green-500 to-green-700",
      glowColor: "rgba(16, 185, 129, 0.3)",
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
          transform: translateY(-8px);
          border-color: rgba(102, 126, 234, 0.3);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
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
        
        .floating-icon {
          animation: float 3s ease-in-out infinite;
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
          <Sidebar active="home" onToggle={setSidebarCollapsed} />
        </div>

        {/* Main content with dynamic margin - increased collapsed margin */}
        <main
          className="flex-1 overflow-y-auto p-8 relative transition-all duration-300 ease-in-out"
          style={{
            marginLeft: sidebarCollapsed ? "120px" : "288px", // Increased from 64px to 120px for collapsed state
          }}
        >
          {/* Enhanced Badge + Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative inline-flex items-center">
              <span className="inline-flex items-center rounded-full border border-indigo-500/50 bg-indigo-900/30 px-6 py-2 text-sm font-medium text-indigo-300 backdrop-blur-sm relative overflow-hidden">
                <span className="mr-2 text-lg floating-icon">✨</span>
                Data Science Portfolio
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </span>
            </div>

            <h1 className="mt-8 scroll-m-20 text-6xl font-extrabold leading-tight">
              Hey, I'm{" "}
              <span className="text-gradient-enhanced relative">
                Callixta Fidelia C
                <div className="absolute inset-0 text-gradient-enhanced blur-sm opacity-30 -z-10"></div>
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-xl text-gray-300 leading-relaxed">
              I transform complex data into actionable insights through statistical analysis, machine learning, and
              compelling visualizations that drive business decisions.
            </p>

            <div className="mt-10 flex flex-wrap gap-6">
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glow relative inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-white font-semibold text-lg shadow-2xl shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40"
              >
                <Download size={22} />
                Download Resume
              </motion.a>

              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glow relative inline-flex items-center gap-3 rounded-xl border border-gray-600/50 px-8 py-4 text-gray-200 font-semibold text-lg bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-gray-500/70"
              >
                View Projects
                <ArrowRight size={22} />
              </motion.a>
            </div>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map(({ value, label, icon: Icon, iconBg, glowColor }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="glow-card rounded-2xl p-8 text-center group cursor-pointer"
                style={{ "--glow-color": glowColor } as React.CSSProperties}
              >
                <div className="mb-6 flex justify-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${iconBg} shadow-2xl group-hover:scale-110 transition-transform duration-300 relative`}
                  >
                    <Icon size={28} className="text-white relative z-10" />
                    <div
                      className="absolute inset-0 rounded-xl blur-md opacity-50"
                      style={{ backgroundColor: glowColor }}
                    ></div>
                  </div>
                </div>

                <div className="relative">
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    {value}
                  </div>
                  <div className="text-gray-300 font-medium text-lg">{label}</div>
                </div>

                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                  style={{ backgroundColor: glowColor }}
                ></div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Journey Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl"></div>
            <div className="glow-card rounded-3xl p-10 relative">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                My Data Science Journey
              </h2>
              <p className="text-gray-300 text-xl leading-relaxed max-w-3xl">
                From curiosity to expertise in machine learning and analytics, transforming raw data into meaningful
                stories that drive innovation and business success.
              </p>
            </div>
          </motion.div>

          {/* Debug info - remove this in production */}
          <div className="fixed bottom-4 right-4 bg-black/50 text-white p-2 rounded text-xs">
            Sidebar collapsed: {sidebarCollapsed ? "Yes (120px)" : "No (288px)"}
          </div>
        </main>
      </div>
    </>
  )
}
