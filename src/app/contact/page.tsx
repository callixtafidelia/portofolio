"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Mail, Linkedin, Github, MapPin } from "lucide-react"
import Sidebar from "@/components/sidebar"

export default function ContactPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    const { name, email, subject, message } = formData
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.")
      return
    }

    // Create the email body with formatted content
    const emailBody = `Hi Callixta,

My name is ${name} and I'm reaching out regarding ${subject}

${message}

Best,
${name}
${email}`

    // Create mailto URL with encoded parameters
    const mailtoUrl = `mailto:callixta124@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`
    
    // Open the email client
    window.location.href = mailtoUrl
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "callixta124@gmail.com",
      href: "mailto:callixta124@gmail.com",
      color: "from-blue-500 to-blue-700",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/callixta-fidelia-cahyaningrum",
      href: "https://www.linkedin.com/in/callixta-fidelia-cahyaningrum/",
      color: "from-blue-600 to-blue-800",
      glowColor: "rgba(37, 99, 235, 0.3)",
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/callixtafidelia",
      href: "https://github.com/callixtafidelia",
      color: "from-gray-700 to-gray-900",
      glowColor: "rgba(75, 85, 99, 0.3)",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Available for Remote Work",
      href: "#",
      color: "from-green-500 to-green-700",
      glowColor: "rgba(16, 185, 129, 0.3)",
    },
  ]

  return (
    <>
      {/* Enhanced Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Neue+Montreal:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
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
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
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
          z-index: 1;
        }
        
        .glow-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(240, 147, 251, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
          z-index: -1;
          pointer-events: none;
        }
        
        .glow-card:hover::before {
          opacity: 1;
        }
        
        .glow-card:hover {
          transform: translateY(-5px);
          border-color: rgba(102, 126, 234, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .form-input {
          position: relative;
          z-index: 10;
          pointer-events: auto;
        }
        
        .form-button {
          position: relative;
          z-index: 10;
          pointer-events: auto;
          cursor: pointer;
        }
      `}</style>

      <div className="flex h-screen overflow-hidden bg-[#0a0e1a] text-white">
        <Sidebar active="contact" onToggle={setSidebarCollapsed} />

        {/* Main content with responsive margin and proper mobile spacing */}
        <main
          className="flex-1 overflow-y-auto relative transition-all duration-300 ease-in-out"
          style={{
            marginLeft: isMobile ? "0" : "40px",
            paddingTop: isMobile ? "80px" : "32px", // Extra top padding on mobile
            paddingBottom: "32px",
          }}
        >
          <div className={`max-w-6xl mx-auto ${isMobile ? "px-4" : "px-6"}`}>
            {/* Header with extra mobile spacing */}
            <div className={`mb-12 text-center ${isMobile ? "mt-4" : ""}`}>
              <div className={`flex items-center gap-4 mb-4 justify-center`}>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Mail size={24} className="text-white" />
                </div>
                <h1 className={`font-bold ${isMobile ? "text-3xl sm:text-4xl" : "text-5xl"}`}>
                  <span className="text-gradient-enhanced">Contact Me</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                Let's connect and discuss opportunities in data science
              </p>
            </div>

            {/* Contact Methods */}
            <div
              className={`grid gap-6 mb-12 ${isMobile ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 lg:grid-cols-4"}`}
            >
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon
                return (
                  <a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : "_self"}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : ""}
                    className="glow-card rounded-2xl p-6 text-center group cursor-pointer block"
                  >
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      style={{ boxShadow: `0 10px 30px ${method.glowColor}` }}
                    >
                      <IconComponent size={28} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                      {method.title}
                    </h3>
                    <p className="text-gray-400 text-sm break-words">{method.value}</p>
                  </a>
                )
              })}
            </div>

            {/* Contact Form */}
            <div className="glow-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Send a Message</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                    className="form-input w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInput}
                    className="form-input w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInput}
                    className="form-input w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInput}
                    rows={6}
                    className="form-input w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>
                <div className="md:col-span-2 text-center">
                  <button
                    onClick={handleSubmit}
                    className="form-button px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105"
                  >
                    Open My Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
