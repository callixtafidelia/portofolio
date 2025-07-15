"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { MapPin, Calendar, ArrowLeft, Briefcase, Clock, Star, Heart, GraduationCap } from "lucide-react"

export default function ExperiencePage() {
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

  // Main professional experiences
  const professionalExperiences = [
    {
      id: 1,
      title: "Senior Orientation Leader",
      company: "Vantage College, University of British Columbia",
      location: "Vancouver, BC",
      duration: "May 2025 - Present",
      description:
        "Facilitated small-group activities and debrief sessions for 180+ Orientation Leader candidates while leading training programs for 16 Senior Orientation Leaders, supporting UBC's largest orientation event through asset-based evaluation and inclusive facilitation.",
      skills: ["Leadership", "Event Management", "Training", "Facilitation", "Team Coordination"],
      current: true,
      type: "leadership",
    },
    {
      id: 2,
      title: "Undergraduate Research Assistant",
      company: "Gaynor Lab, UBC & UC Santa Barbara",
      location: "Vancouver, BC",
      duration: "May 2025 - Present",
      description:
        "Process camera trap data to identify wildlife species for predator-prey research in California, contributing to collaborative ecological studies using Wildlife Insights datasets.",
      skills: ["Wildlife Research", "Data Processing", "Species Identification", "Ecological Analysis", "Camera Trap Technology"],
      current: true,
      type: "research",
    },
    {
      id: 3,
      title: "Undergraduate Research Assistant",
      company: "Moore Inclusive Conservation Lab, University of British Columbia",
      location: "Vancouver, BC",
      duration: "September 2023 - April 2024",
      description:
        "Assisted Dr. Alex Moore in conducting comprehensive meta-analysis literature review for wetland restoration project, involving collection and synthesis of research articles from various academic databases.",
      skills: ["Research", "Literature Review", "Data Analysis", "Academic Writing", "Conservation Biology"],
      current: false,
      type: "research",
    },
    {
      id: 4,
      title: "Peer Mentor",
      company: "Vantage College, University of British Columbia",
      location: "Vancouver, BC",
      duration: "September 2023 - April 2024",
      description:
        "Provided comprehensive peer support to 100+ ESL students by collaborating with staff to organize academic and social events, achieving 80% overall satisfaction while developing leadership and logistics management skills.",
      skills: ["Mentoring", "Event Planning", "Cross-cultural Communication", "Leadership", "Student Support"],
      current: false,
      type: "leadership",
    },
    {
      id: 5,
      title: "Fundraising Executive Team",
      company: "Best Buddies Club, University of British Columbia",
      location: "Vancouver, BC",
      duration: "March 2023 - April 2024",
      description:
        "Developed and led fundraising initiatives for the Best Buddies Club at UBC, using innovative strategies and donor engagement to successfully reach fundraising targets.",
      skills: ["Fundraising", "Strategic Planning", "Donor Engagement", "Team Leadership", "Event Coordination"],
      current: false,
      type: "leadership",
    },
    {
      id: 6,
      title: "Community Engagement Coordinator",
      company: "Indonesian Young Researchers Association (APMI)",
      location: "Remote",
      duration: "February 2023 - February 2024",
      description:
        "Planned and hosted impactful online events for association members by understanding unique needs and aspirations to enhance research skills, developing digital community engagement strategies.",
      skills: ["Community Engagement", "Event Planning", "Digital Strategy", "Research Coordination", "Cross-cultural Communication"],
      current: false,
      type: "leadership",
    },
 {
      id: 7,
      title: "Vantage College Representative",
      company: "Science Undergraduate Society of UBC Vancouver",
      location: "Vancouver, BC",
      duration: "November 2022 - March 2023",
      description:
        "Represent the Vantage One Science student to convey the aspiration for the student's development through the Science Undergraduate Society at the University of British Columbia (UBC).",
      skills: ["Student Representation", "Advocacy", "Communication", "Policy Development", "Student Affairs"],
      current: false,
      type: "leadership",
    }
  ]

  // Volunteer experiences - UPDATED WITH REAL EXPERIENCES
  const volunteerExperiences = [
    {
      id: 7,
      title: "Community Manager",
      company: "AI Summit Vancouver (VanAI Summit)",
      location: "Vancouver, BC",
      duration: "July 2025 - Present",
      description:
        "Grow community engagement through LinkedIn outreach, email communication, and on-site interactions, helping shape Western Canada's largest volunteer-led AI conference for 4,000+ members.",
      skills: ["Community Management", "Social Media Marketing", "Event Coordination", "Networking"],
      current: true,
    },
    {
      id: 8,
      title: "Event Volunteer",
      company: "Google Developer Group Vancouver - Build with AI 2025",
      location: "Vancouver, BC",
      duration: "March 2025",
      description:
        "Supported attendee engagement and community networking at GDG Vancouver's Build with AI event, fostering connections and learning around Google's latest Generative AI tools.",
      skills: ["Event Support", "Community Networking", "Technical Events", "Attendee Engagement"],
      current: false,
    },
    {
      id: 9,
      title: "Undergraduate First Year Mentor",
      company: "SUS UBC",
      location: "Vancouver, BC",
      duration: "October 2024 - March 2025",
      description:
        "Provided academic and personal guidance to first-year mentees through regular check-ins, study advice, and effective communication to foster supportive learning environment.",
      skills: ["Academic Mentoring", "Student Support", "Communication", "Guidance Counseling"],
      current: false,
    },
    {
      id: 10,
      title: "Capstone Conference Committee",
      company: "UBC Vantage College",
      location: "Vancouver, BC",
      duration: "May 2023 - July 2023",
      description:
        "Collaborated with the team to plan and organize the 9th Vantage Capstone Conference, an annual event showcasing student research projects, including event planning and logo design.",
      skills: ["Event Planning", "Conference Organization", "Graphic Design", "Team Collaboration"],
      current: false,
    },
    {
      id: 11,
      title: "Community Partner",
      company: "Gado-Gado Indonesian Students Association of UBC (GISAU)",
      location: "Vancouver, BC",
      duration: "February 2023 - March 2023",
      description:
        "Volunteered in the FIESTA 2023, a bazaar event consisting of traditional Indonesian foods, games, and performances as a collaboration between Indonesian communities in Vancouver (PERMIKA Vancouver, GISAU UBC, and SFU Indonesian Association).",
      skills: ["Event Management", "Cultural Outreach", "Community Collaboration", "Cross-cultural Communication"],
      current: false,
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "leadership":
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
            bg: "from-gray-500/20 to-gray-600/20",
            border: "border-gray-500/30",
            text: "text-gray-300",
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

  const renderExperienceCard = (exp: any, index: number) => {
    const colors = getTypeColor(exp.type || "volunteer")
    return (
      <motion.div
        key={exp.id}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative mb-8 md:mb-12 last:mb-0"
      >
        {/* Timeline Dot */}
        <div className="absolute left-2.5 md:left-6 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full border-2 md:border-4 border-slate-900 shadow-2xl shadow-indigo-500/50 z-10"></div>

        {/* Card */}
        <div className="ml-10 md:ml-20">
          <div className={`glow-card rounded-xl md:rounded-2xl group cursor-pointer ${isMobile ? "p-4" : "p-4 md:p-8"}`}>
            {/* Title & Company */}
            <div className={`flex gap-3 mb-4 md:mb-6 ${isMobile ? "flex-col" : "flex-col md:flex-row md:justify-between md:items-start"}`}>
              <div className="flex-1">
                <h3 className={`font-neue-montreal font-bold text-white mb-1 md:mb-2 leading-tight ${isMobile ? "text-lg" : "text-xl md:text-2xl"}`}>
                  {exp.title}
                </h3>
                <h4 className={`font-neue-montreal font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent ${isMobile ? "text-base" : "text-lg md:text-xl"}`}>
                  {exp.company}
                </h4>
              </div>

              {/* Tags */}
              <div className={`flex gap-2 ${isMobile ? "flex-wrap" : "flex-wrap md:flex-nowrap"}`}>
                {exp.current && (
                  <span className={`font-neue-montreal inline-flex items-center bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 text-green-300 font-medium rounded-full ${isMobile ? "text-xs px-3 py-1.5" : "text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2"}`}>
                    <Clock size={12} className="md:w-3.5 md:h-3.5 mr-1" />
                    Current
                  </span>
                )}
                <span className={`font-neue-montreal inline-flex items-center bg-gradient-to-r ${colors.bg} border ${colors.border} ${colors.text} font-medium rounded-full capitalize ${isMobile ? "text-xs px-3 py-1.5" : "text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2"}`}>
                  {exp.type}
                </span>
              </div>
            </div>

            {/* Location & Duration */}
            <div className={`flex gap-3 md:gap-6 mb-4 md:mb-6 text-gray-400 ${isMobile ? "flex-col text-sm" : "flex-col sm:flex-row sm:flex-wrap text-sm md:text-base"}`}>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="md:w-4 md:h-4 text-indigo-400 flex-shrink-0" />
                <span className="font-neue-montreal">{exp.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="md:w-4 md:h-4 text-purple-400 flex-shrink-0" />
                <span className="font-neue-montreal">{exp.duration}</span>
              </div>
            </div>

            {/* Description */}
            <p className={`font-neue-montreal text-gray-300 mb-4 md:mb-6 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
              {exp.description}
            </p>

  

            {/* Skills */}
            <div>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {exp.skills.map((skill: string, i: number) => (
                  <span key={i} className={`font-neue-montreal bg-slate-800/50 border border-slate-700/50 text-slate-300 font-medium rounded-full hover:bg-slate-700/50 hover:border-indigo-500/30 hover:text-indigo-300 transition-all duration-300 ${isMobile ? "text-xs px-2.5 py-1.5" : "text-xs md:text-sm px-2.5 md:px-4 py-1.5 md:py-2"}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
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

        .font-neue-montreal {
          font-family: 'Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
        <Sidebar active="exp" onToggle={setSidebarCollapsed} />

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
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-all duration-300 hover:translate-x-1 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-neue-montreal">Back to Home</span>
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
                  <Briefcase size={24} className="text-white" />
                </div>
                <h1 className={`font-neue-montreal font-bold ${isMobile ? "text-3xl sm:text-4xl" : "text-5xl"}`}>
                  <span className="text-gradient-enhanced">Experience</span>
                </h1>
              </div>
              <p className={`font-neue-montreal text-gray-300 leading-relaxed ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                My professional journey and community contributions
              </p>
            </motion.div>

            {/* Professional Experience Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <GraduationCap size={20} className="text-white" />
                </div>
                <h2 className={`font-neue-montreal font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent ${isMobile ? "text-xl" : "text-2xl md:text-3xl"}`}>
                  Experience
                </h2>
              </div>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 md:w-1 timeline-line rounded-full"></div>
                {professionalExperiences.map((exp, index) => renderExperienceCard(exp, index))}
              </div>
            </motion.div>

            {/* Volunteer Experience Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                  <Heart size={20} className="text-white" />
                </div>
                <h2 className={`font-neue-montreal font-bold bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent ${isMobile ? "text-xl" : "text-2xl md:text-3xl"}`}>
                  Volunteer & Community Work 
                </h2>
              </div>

              {/* Grid layout for volunteer experiences */}
              <div className={`grid gap-4 md:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
                {volunteerExperiences.map((exp, index) => {
                  const colors = getTypeColor("volunteer")
                  return (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glow-card rounded-xl md:rounded-2xl group cursor-pointer"
                    >
                      <div className={`${isMobile ? "p-4" : "p-4 md:p-6"}`}>
                        {/* Header with icon */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-neue-montreal font-bold text-white mb-1 leading-tight ${isMobile ? "text-base" : "text-lg md:text-xl"}`}>
                              {exp.title}
                            </h3>
                            <h4 className={`font-neue-montreal font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent ${isMobile ? "text-sm" : "text-base md:text-lg"}`}>
                              {exp.company}
                            </h4>
                          </div>
                          {exp.current && (
                            <span className={`font-neue-montreal inline-flex items-center bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 text-green-300 font-medium rounded-full ${isMobile ? "text-xs px-2 py-1" : "text-xs px-3 py-1.5"}`}>
                              <Clock size={10} className="mr-1" />
                              Current
                            </span>
                          )}
                        </div>

                        {/* Duration */}
                        <div className="flex items-center gap-2 mb-3 text-gray-400">
                          <Calendar size={12} className="md:w-3.5 md:h-3.5 text-green-400 flex-shrink-0" />
                          <span className={`font-neue-montreal ${isMobile ? "text-xs" : "text-sm"}`}>{exp.duration}</span>
                        </div>

                        {/* Description */}
                        <p className={`font-neue-montreal text-gray-300 mb-4 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-base"}`}>
                          {exp.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill: string, i: number) => (
                            <span key={i} className={`font-neue-montreal bg-gray-500/20 border border-gray-500/30 text-gray-300 font-medium rounded-full ${isMobile ? "text-xs px-2.5 py-1" : "text-xs px-2.5 md:px-3 py-1"}`}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  )
}
