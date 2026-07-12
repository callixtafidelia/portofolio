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
    title: "Research Assistant",
    company: "Moutouama Lab, University of British Columbia",
    location: "Vancouver, BC",
    duration: "September 2025 - Present",
    description:
      "Developing a global riparian forest map and building R-based spatial workflows that integrate river networks, ecoregions, and land cover datasets to investigate long-term drivers of forest degradation.",
    skills: [
      "R",
      "Spatial Analysis",
      "Remote Sensing",
      "Geospatial Modeling", 
      "Google Earth Engine",
    ],
    current: true,
    type: "research",
  },
  {
    id: 2,
    title: "Project Assistant",
    company: "Gaynor Lab, University of British Columbia",
    location: "Vancouver, BC",
    duration: "July 2025 - May 2026",
    description:
      "Developing Google Earth Engine workflows to analyze wildfire impacts on wildlife habitat while managing over 300,000 camera trap records for ecological research.",
    skills: [
      "Google Earth Engine",
      "Spatial Analysis",
      "Data Cleaning",
      "Metadata Management",
      "Species Identification",
    ],
    current: false,
    type: "research",
  },
  {
    id: 3,
    title: "Research Assistant",
    company: "Moore Inclusive Conservation Lab, University of British Columbia",
    location: "Vancouver, BC",
    duration: "September 2023 - April 2024",
    description:
      "Conducted a systematic meta-analysis for wetland restoration by screening literature, extracting metadata, and synthesizing research findings across multiple scientific databases.",
    skills: [
      "Meta Analysis",
      "Literature Review",
      "Data Extraction",
      "Scientific Writing",
    ],
    current: false,
    type: "research",
  },
  {
    id: 4,
    title: "Communications Manager",
    company: "AI Summit Vancouver",
    location: "Vancouver, BC",
    duration: "July 2025 - October 2025",
    description:
      "Managed communications between 30+ sponsorship and partnership stakeholders and 100+ enterprise participants, contributing to smooth event operations and a positive attendee experience.",
    skills: [
      "Stakeholder Management",
      "Project Coordination",
      "Partnership Management",
      "Event Operations",
    ],
    current: false,
    type: "leadership",
  },
  {
    id: 5,
    title: "Senior Orientation Leader",
    company: "Vantage College, University of British Columbia",
    location: "Vancouver, BC",
    duration: "May 2025 - September 2025",
    description:
      "Recruited and facilitated debrief sessions for 50+ Orientation Leader candidates before training 16 selected Orientation Leaders, supporting UBC's largest orientation program.",
    skills: [
      "Leadership",
      "Mentorship",
      "Public Speaking",
      "Team Coordination",
    ],
    current: false,
    type: "leadership",
  },
  {
    id: 6,
    title: "Peer Mentor",
    company: "Vantage College, University of British Columbia",
    location: "Vancouver, BC",
    duration: "September 2023 - April 2024",
    description:
      "Mentored over 100 first-year international students while organizing academic and community events that fostered student engagement and success.",
    skills: [
      "Mentorship",
      "Student Support",
      "Community Building",
      "Event Planning",
    ],
    current: false,
    type: "leadership",
  },
  {
    id: 7,
    title: "Fundraising Executive",
    company: "Best Buddies Club, University of British Columbia",
    location: "Vancouver, BC",
    duration: "May 2023 - May 2024",
    description:
      "Collaborated with community partners and executive members to organize fundraising initiatives supporting club programs and increasing fundraising revenue.",
    skills: [
      "Fundraising",
      "Community Outreach",
      "Strategic Planning",
      "Event Coordination",
    ],
    current: false,
    type: "leadership",
  },
  {
    id: 8,
    title: "Community Engagement Coordinator",
    company: "Indonesian Young Researchers Association (APMI)",
    location: "Remote",
    duration: "February 2023 - February 2024",
    description:
      "Organized online research events and community initiatives that connected aspiring researchers while strengthening digital engagement across the organization.",
    skills: [
      "Research Communication",
      "Digital Events",
      "Project Coordination",
      "Public Speaking",
    ],
    current: false,
    type: "leadership",
  },
  {
    id: 9,
    title: "Vantage College Representative",
    company: "Science Undergraduate Society of UBC Vancouver",
    location: "Vancouver, BC",
    duration: "November 2022 - March 2023",
    description:
      "Represented Vantage One Science students by communicating student feedback and collaborating with the Science Undergraduate Society to improve the student experience.",
    skills: [
      "Student Advocacy",
      "Leadership",
      "Representation",
      "Collaboration",
    ],
    current: false,
    type: "leadership",
  },
];

// Volunteer experiences
const volunteerExperiences = [
  {
    id: 10,
    title: "Event Volunteer",
    company: "Google Developer Group Vancouver - Build with AI 2025",
    location: "Vancouver, BC",
    duration: "March 2025",
    description:
      "Supported attendee engagement and community networking during Google's Build with AI event, helping create an engaging learning environment for participants.",
    skills: [
      "Event Support",
      "Community Engagement",
      "Networking",
      "Technical Events",
    ],
    current: false,
  },
  {
    id: 11,
    title: "Undergraduate First-Year Mentor",
    company: "Science Undergraduate Society (SUS UBC)",
    location: "Vancouver, BC",
    duration: "October 2024 - March 2025",
    description:
      "Provided academic guidance, study strategies, and regular mentorship to first-year undergraduate students throughout their transition to university.",
    skills: [
      "Academic Mentoring",
      "Student Support",
      "Communication",
      "Guidance",
    ],
    current: false,
  },
  {
    id: 12,
    title: "Capstone Conference Committee",
    company: "UBC Vantage College",
    location: "Vancouver, BC",
    duration: "May 2023 - July 2023",
    description:
      "Collaborated in planning the 9th Vantage Capstone Conference by supporting event organization, logistics, and conference branding.",
    skills: [
      "Conference Organization",
      "Event Planning",
      "Graphic Design",
      "Team Collaboration",
    ],
    current: false,
  },
  {
    id: 13,
    title: "Community Partner",
    company: "Gado-Gado Indonesian Students Association of UBC (GISAU)",
    location: "Vancouver, BC",
    duration: "February 2023 - March 2023",
    description:
      "Volunteered at FIESTA 2023, supporting cultural activities that brought together Indonesian communities across Vancouver through food, performances, and games.",
    skills: [
      "Community Outreach",
      "Cultural Events",
      "Team Collaboration",
    ],
    current: false,
  },
];

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
                  <span className={`font-neue-montreal inline-flex items-center bg-gradient-to-r from-teal-500/20 to-cyan-600/20 border border-teal-500/30 text-teal-300 font-medium rounded-full ${isMobile ? "text-xs px-3 py-1.5" : "text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2"}`}>
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
          inset: 0;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(circle at 15% 20%, rgba(129, 140, 248, 0.38) 0%, transparent 28%),
            radial-gradient(circle at 85% 12%, rgba(236, 72, 153, 0.34) 0%, transparent 24%),
            radial-gradient(circle at 70% 78%, rgba(56, 189, 248, 0.32) 0%, transparent 26%),
            radial-gradient(circle at 30% 62%, rgba(192, 132, 252, 0.28) 0%, transparent 20%),
            radial-gradient(circle at 52% 36%, rgba(255, 255, 255, 0.09) 0%, transparent 14%);
          filter: blur(20px);
          transform: scale(1.04);
          z-index: -1;
          animation: backgroundShift 18s ease-in-out infinite;
        }
        
        @keyframes backgroundShift {
          0%, 100% { opacity: 1; transform: scale(1.04) translate3d(0, 0, 0); }
          50% { opacity: 0.9; transform: scale(1.08) translate3d(2%, -1%, 0); }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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
        
        .timeline-line {
          background: linear-gradient(180deg, 
            rgba(102, 126, 234, 0.8) 0%, 
            rgba(139, 92, 246, 0.8) 50%, 
            rgba(192, 132, 252, 0.8) 100%
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
                <h1 className={`playfair font-semibold ${isMobile ? "text-4xl sm:text-5xl" : "text-6xl"}`}>
                  My <span className="text-gradient-enhanced italic">Experience</span>
                </h1>
              </div>
              <p className={`font-neue-montreal text-gray-300 leading-relaxed ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                work experiences, leadership roles, and community contributions
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
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <Heart size={20} className="text-white" />
                </div>
                <h2 className={`font-neue-montreal font-bold bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent ${isMobile ? "text-xl" : "text-2xl md:text-3xl"}`}>
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
                            <h4 className={`font-neue-montreal font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent ${isMobile ? "text-sm" : "text-base md:text-lg"}`}>
                              {exp.company}
                            </h4>
                          </div>
                          {exp.current && (
                            <span className={`font-neue-montreal inline-flex items-center bg-gradient-to-r from-teal-500/20 to-cyan-600/20 border border-teal-500/30 text-teal-300 font-medium rounded-full ${isMobile ? "text-xs px-2 py-1" : "text-xs px-3 py-1.5"}`}>
                              <Clock size={10} className="mr-1" />
                              Current
                            </span>
                          )}
                        </div>

                        {/* Duration */}
                        <div className="flex items-center gap-2 mb-3 text-gray-400">
                          <Calendar size={12} className="md:w-3.5 md:h-3.5 text-teal-400 flex-shrink-0" />
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
