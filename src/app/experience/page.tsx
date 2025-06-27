// app/experience/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { MapPin, Calendar, ArrowLeft, Briefcase, Clock, Star } from "lucide-react"

export default function ExperiencePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const experiences = [
    {
      id: 1,
      title: "Data Science Intern",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      duration: "May 2023 - August 2023",
      description:
        "Worked on customer segmentation analysis using clustering algorithms. Developed dashboards to visualize customer behavior patterns. Collaborated with marketing team to implement targeted campaigns based on data insights.",
      skills: ["Python", "Scikit-learn", "Pandas", "Tableau", "Customer Analytics"],
      current: false,
      type: "internship",
      achievements: [
        "Improved customer targeting accuracy by 35%",
        "Built 5 interactive dashboards",
        "Reduced analysis time by 50%",
      ],
    },
    {
      id: 2,
      title: "Research Assistant",
      company: "University Data Lab",
      location: "Remote",
      duration: "January 2023 - Present",
      description:
        "Assisting faculty with research on predictive modeling for healthcare outcomes. Preprocessing medical datasets and implementing machine learning models. Contributing to academic papers on AI applications in healthcare.",
      skills: ["Python", "R", "Statistical Analysis", "Research Methods", "Healthcare Analytics"],
      current: true,
      type: "research",
      achievements: ["Co-authored 2 research papers", "Processed 10M+ medical records", "Achieved 92% model accuracy"],
    },
    {
      id: 3,
      title: "Data Analysis Project",
      company: "Environmental Nonprofit",
      location: "Boston, MA",
      duration: "October 2022 - December 2022",
      description:
        "Volunteer project analyzing environmental data to identify pollution patterns. Created visualizations to support advocacy efforts. Presented findings to stakeholders and community members.",
      skills: ["Data Visualization", "GIS", "Statistical Analysis", "Public Speaking"],
      current: false,
      type: "volunteer",
      achievements: [
        "Identified 3 major pollution sources",
        "Presented to 200+ stakeholders",
        "Influenced policy changes",
      ],
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "internship":
        return {
          bg: "from-blue-500/20 to-blue-600/20",
          border: "border-blue-500/30",
          text: "text-blue-300",
          glow: "rgba(59, 130, 246, 0.3)",
        }
      case "research":
        return {
          bg: "from-purple-500/20 to-purple-600/20",
          border: "border-purple-500/30",
          text: "text-purple-300",
          glow: "rgba(139, 92, 246, 0.3)",
        }
      case "volunteer":
        return {
          bg: "from-green-500/20 to-green-600/20",
          border: "border-green-500/30",
          text: "text-green-300",
          glow: "rgba(16, 185, 129, 0.3)",
        }
      default:
        return {
          bg: "from-indigo-500/20 to-indigo-600/20",
          border: "border-indigo-500/30",
          text: "text-indigo-300",
          glow: "rgba(102, 126, 234, 0.3)",
        }
    }
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
        
        
        @keyframes timelineGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
          }
          50% { 
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
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
        
        .timeline-line {
          background: linear-gradient(180deg, 
            rgba(102, 126, 234, 0.8) 0%, 
            rgba(139, 92, 246, 0.8) 50%, 
            rgba(240, 147, 251, 0.8) 100%
          );
          animation: timelineGlow 3s ease-in-out infinite;
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
      
        <Sidebar active="exp" onToggle={setSidebarCollapsed} />

        {/* Main content with dynamic margin */}
        <main
          className="flex-1 overflow-y-auto py-8 y-8 relative transition-all duration-300 ease-in-out"
          style={{
            marginLeft: "40px", // terniery operation
          }}
        >
          <div className="max-w-6xl">
            {/* Header */}
            <div className="mb-12">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-6 transition-all duration-300 hover:translate-x-1 group"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Back to Home</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Briefcase size={24} className="text-white" />
                  </div>
                  <h1 className="text-5xl font-extrabold">
                    <span className="text-gradient-enhanced">Experience</span>
                  </h1>
                </div>
                <p className="text-xl text-gray-300 leading-relaxed">My professional journey and work experience</p>
              </motion.div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Enhanced Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 timeline-line rounded-full"></div>

              {experiences.map((exp, index) => {
                const colors = getTypeColor(exp.type)
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="relative mb-12 last:mb-0"
                  >
                    {/* Enhanced Dot */}
                    <div className="absolute left-6 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full border-4 border-slate-900 shadow-2xl shadow-indigo-500/50 z-10"></div>

                    {/* Enhanced Card */}
                    <div className="ml-20">
                      <div className="glow-card rounded-2xl p-8 group cursor-pointer">
                        {/* Title & Company */}
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                              {exp.title}
                            </h3>
                            <h4 className="text-xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                              {exp.company}
                            </h4>
                          </div>
                          <div className="flex gap-2">
                            {exp.current && (
                              <span className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 text-green-300 text-sm font-medium px-4 py-2 rounded-full">
                                <Clock size={14} className="mr-1" />
                                Current
                              </span>
                            )}
                            <span
                              className={`inline-flex items-center bg-gradient-to-r ${colors.bg} border ${colors.border} ${colors.text} text-sm font-medium px-4 py-2 rounded-full capitalize`}
                            >
                              {exp.type}
                            </span>
                          </div>
                        </div>

                        {/* Location & Duration */}
                        <div className="flex flex-wrap gap-6 mb-6 text-gray-400">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-indigo-400" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-purple-400" />
                            <span>{exp.duration}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 mb-6 leading-relaxed text-lg">{exp.description}</p>

                        {/* Achievements */}
                        <div className="mb-6">
                          <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <Star size={16} className="text-yellow-400" />
                            Key Achievements
                          </h5>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-gray-300 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Skills */}
                        <div>
                          <h5 className="text-white font-semibold mb-3">Technologies & Skills</h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-700/50 hover:border-indigo-500/30 hover:text-indigo-300 transition-all duration-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Enhanced Footer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-16"
            >
              <div className="glow-card rounded-2xl p-8 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/40">
                    <Star size={28} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Ready for New Opportunities
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  Looking for new opportunities to grow and contribute to meaningful projects that make a real impact.
                  Let's build something amazing together!
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  )
}