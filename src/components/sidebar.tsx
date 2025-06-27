"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Menu, User, Briefcase, Zap, FolderOpen, FileText, Mail, Github, Linkedin, Home } from "lucide-react"

import type { LucideIcon, LucideProps } from "lucide-react"

interface NavItem {
  key: string
  label: string
  href: string
  Icon: LucideIcon               // ⬅️ accepts size, className, stroke, etc.
}
interface SidebarProps {
  active?: string
  onToggle?: (collapsed: boolean) => void
}

export default function Sidebar({ active, onToggle }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true)

  const handleToggle = () => {
    const newCollapsed = !collapsed
    setCollapsed(newCollapsed)
    onToggle?.(newCollapsed)
  }

  const navItems: NavItem[] = [
    { key: "home", label: "Home", href: "/", Icon: Home },
    { key: "about", label: "About", href: "/about", Icon: User },
    { key: "exp", label: "Experience", href: "/experience", Icon: Briefcase },
    { key: "skills", label: "Skills", href: "/skills", Icon: Zap },
    { key: "projects", label: "Projects", href: "/projects", Icon: FolderOpen },
    { key: "blog", label: "Blog", href: "/blog", Icon: FileText },
    { key: "contact", label: "Contact", href: "/contact", Icon: Mail },
  ]

  return (
    <>
      <style jsx>{`
        .profile-avatar {
          position: relative;
        }
        
        .profile-avatar::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c);
          border-radius: 22px;
          z-index: -1;
          animation: rotate 3s linear infinite;
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .nav-link-glow {
          position: relative;
          overflow: hidden;
        }
        
        .nav-link-glow::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 12px;
        }
        
        .nav-link-glow:hover::before,
        .nav-link-glow.active::before {
          opacity: 1;
        }
        
        .social-link-glow {
          position: relative;
          overflow: hidden;
        }
        
        .social-link-glow::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 8px;
        }
        
        .social-link-glow:hover::before {
          opacity: 1;
        }
        
        .toggle-btn-glow {
          position: relative;
          overflow: hidden;
        }
        
        .toggle-btn-glow::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 8px;
        }
        
        .toggle-btn-glow:hover::before {
          opacity: 1;
        }
      `}</style>

      <div
        className={`
          flex flex-col h-full bg-slate-900/90 backdrop-blur-xl border-r border-white/10 shadow-2xl
          transition-all duration-300 ease-in-out
          overflow-hidden
          ${collapsed ? "w-30" : "w-72"}
        `}
        style={{
          width: collapsed ? "120px" : "288px", // Explicit width values for better control
        }}
      >
        {/* Toggle Button */}
        <div className="flex-shrink-0 p-4 border-b border-white/10">
          <button
            onClick={handleToggle}
            className="toggle-btn-glow p-3 rounded-lg text-slate-400 hover:text-white transition-all duration-300 hover:scale-105 w-full flex justify-center"
          >
            <Menu size={20} />
          </button>
        </div>

     {/* Profile Section */}
        <div className="flex-shrink-0 p-6 border-b border-white/10 flex flex-col items-center">
          <div className="profile-avatar w-16 h-16 rounded-xl shadow-xl shadow-indigo-500/40 ring-2 ring-blue-500/50">
            {/* inner wrapper clips the image */}
            <div className="overflow-hidden rounded-xl w-full h-full">
              <img
                src="./photo.jpg"
                alt="Callixta Fidelia C"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {!collapsed && (
            <>
              <h2 className="mt-4 text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent text-center">
                Callixta Fidelia C
              </h2>
              <p className="text-slate-400 text-sm mt-1 text-center"> Data Scientist</p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-3">
          {navItems.map(({ key, label, href, Icon }) => {
            const isActive = active === key
            return (
              <Link
                key={key}
                href={href}
                className={`
                  nav-link-glow flex items-center gap-3 px-4 py-3 rounded-xl 
                  transition-all duration-300 group
                  ${collapsed ? "justify-center" : ""}
                  ${
                    isActive
                      ? "text-white bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-400/30 shadow-lg shadow-indigo-500/20"
                      : "text-slate-400 hover:text-white hover:translate-x-1"
                  }
                `}
                title={collapsed ? label : undefined} // Tooltip for collapsed state
              >
                <Icon
                  size={22}
                  className={`transition-all duration-300 ${
                    isActive ? "text-indigo-400" : "group-hover:text-indigo-400"
                  }`}
                />
                {!collapsed && <span className="font-medium whitespace-nowrap">{label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Social Links */}
        <div className="flex-shrink-0 p-4 border-t border-white/10 space-y-2">
          <Link
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link-glow flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 group ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? "GitHub" : undefined}
          >
            <Github size={18} className="group-hover:text-blue-400 transition-colors duration-300" />
            {!collapsed && <span className="text-sm">GitHub</span>}
          </Link>
          <Link
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link-glow flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 group ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? "LinkedIn" : undefined}
          >
            <Linkedin size={18} className="group-hover:text-blue-400 transition-colors duration-300" />
            {!collapsed && <span className="text-sm">LinkedIn</span>}
          </Link>
        </div>

        {/* Footer */}
        {!collapsed && (
          <div className="flex-shrink-0 p-4 text-center">
            <p className="text-slate-500 text-xs">&copy; {new Date().getFullYear()} Callixta Fidelia C</p>
          </div>
        )}
      </div>
    </>
  )
}