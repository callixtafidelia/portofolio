"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { Mail, Linkedin, Github, ArrowLeft, Send, MapPin, MessageCircle, ExternalLink } from "lucide-react"

export default function ContactPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const { name, email, subject, message } = formData
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.")
      return
    }

    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Submitting:", formData)
    alert("Thank you! I'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "callixta.fidelia@example.com",
      href: "mailto:callixta.fidelia@example.com",
      color: "from-blue-500 to-blue-700",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/callixta-fidelia",
      href: "https://linkedin.com/in/callixta-fidelia",
      color: "from-blue-600 to-blue-800",
      glowColor: "rgba(37, 99, 235, 0.3)",
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/callixta-fidelia",
      href: "https://github.com/callixta-fidelia",
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
      `}</style>

      <div className="flex h-screen overflow-hidden bg-[#0a0e1a] text-white">
        {/* Sidebar - Fixed positioned */}
        <div className="fixed top-0 left-0 h-full z-30">
          <Sidebar active="contact" onToggle={setSidebarCollapsed} />
        </div>

        {/* Main content with dynamic margin */}
        <main
          className="flex-1 overflow-y-auto p-8 relative transition-all duration-300 ease-in-out"
          style={{
            marginLeft: sidebarCollapsed ? "120px" : "288px",
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-all duration-300 hover:translate-x-1 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <h1 className="text-5xl font-extrabold">
                  <span className="text-gradient-enhanced">Contact Me</span>
                </h1>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                Let's connect and discuss opportunities, collaborations, or just have a chat about data science
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Methods */}
              <motion.section
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="glow-card rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                    Get in Touch
                  </h2>
                  <div className="space-y-4">
                    {contactMethods.map((method, index) => {
                      const Icon = method.icon
                      return (
                        <motion.a
                          key={method.title}
                          href={method.href}
                          target={method.href.startsWith("http") ? "_blank" : undefined}
                          rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          className="flex items-center p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-700/30 transition-all duration-300 group cursor-pointer"
                        >
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300`}
                            style={{ boxShadow: `0 10px 30px ${method.glowColor}` }}
                          >
                            <Icon size={24} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors duration-300">
                              {method.title}
                            </h3>
                            <p className="text-gray-400 text-sm">{method.value}</p>
                          </div>
                          {method.href.startsWith("http") && (
                            <ExternalLink
                              size={16}
                              className="text-gray-400 group-hover:text-indigo-400 transition-colors duration-300"
                            />
                          )}
                        </motion.a>
                      )
                    })}
                  </div>
                </div>

                {/* Quick Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="glow-card rounded-2xl p-8"
                >
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                    Let's Collaborate
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <p className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                      Available for data science projects and consulting
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                      Open to full-time and freelance opportunities
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                      Interested in machine learning research collaborations
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></span>
                      Happy to mentor aspiring data scientists
                    </p>
                  </div>
                </motion.div>
              </motion.section>

              {/* Contact Form */}
              <motion.section
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glow-card rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Send a Message
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInput}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInput}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInput}
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInput}
                      rows={5}
                      placeholder="Tell me about your project or idea..."
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 resize-none"
                    />
                  </div>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`btn-glow w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-lg shadow-2xl transition-all duration-300 ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-indigo-500/25 hover:shadow-indigo-500/40"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.section>
            </div>

            {/* Footer Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <div className="glow-card rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Looking forward to hearing from you!
                </h3>
                <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  Whether you have a project in mind, want to discuss data science trends, or just want to connect, I'm
                  always excited to meet new people and explore interesting opportunities.
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  )
}
