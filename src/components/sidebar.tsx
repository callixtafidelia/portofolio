//src/components/sidebar.tsx
"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User, Briefcase, Zap, FolderOpen, FileText, Mail, Github, Linkedin, Home } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface NavItem {
  key: string
  label: string
  href: string
  Icon: LucideIcon
}

interface SidebarProps {
  active?: string
  onToggle?: (collapsed: boolean) => void
}

export default function Sidebar({ active, onToggle }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const handleToggle = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen)
      onToggle?.(!isMobileMenuOpen)
    } else {
      const newCollapsed = !collapsed
      setCollapsed(newCollapsed)
      onToggle?.(newCollapsed)
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    onToggle?.(true)
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

  // Desktop Sidebar
  if (!isMobile) {
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
            neue-montreal
            flex flex-col h-full bg-slate-900/90 backdrop-blur-xl border-r border-white/10 shadow-2xl
            transition-all duration-300 ease-in-out
            overflow-hidden
            ${collapsed ? "w-30" : "w-72"}
          `}
          style={{
            width: collapsed ? "120px" : "288px",
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
              <div className="overflow-hidden rounded-xl w-full h-full">
                <img src="./photo.jpg" className="w-full h-full object-cover" />
              </div>
            </div>
            {!collapsed && (
              <>
                <h2 className="neue-montreal mt-4 text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent text-center">
                  Callixta Fidelia C
                </h2>
                <p className="neue-montreal text-slate-400 text-sm mt-1 text-center"> Data Enthusiast @UBC</p>
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
                    transition-all duration-300 group neue-montreal
                    ${collapsed ? "justify-center" : ""}
                    ${
                      isActive
                        ? "text-white bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-400/30 shadow-lg shadow-indigo-500/20"
                        : "text-slate-400 hover:text-white hover:translate-x-1"
                    }
                  `}
                  title={collapsed ? label : undefined}
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
              href="https://github.com/callixtafidelia"
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link-glow flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 group neue-montreal ${
                collapsed ? "justify-center" : ""
              }`}
              title={collapsed ? "GitHub" : undefined}
            >
              <Github size={18} className="group-hover:text-blue-400 transition-colors duration-300" />
              {!collapsed && <span className="text-sm">GitHub</span>}
            </Link>
            <Link
              href="https://linkedin.com/in/callixta-fidelia-cahyaningrum"
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link-glow flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 group neue-montreal ${
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
              <p className="text-slate-500 text-xs neue-montreal">&copy; {new Date().getFullYear()} Callixta Fidelia C</p>
            </div>
          )}
        </div>
      </>
    )
  }

  // Mobile Navigation
  return (
    <>
      <style jsx>{`
        .profile-avatar-mobile {
          position: relative;
        }
        
        .profile-avatar-mobile::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c);
          border-radius: 14px;
          z-index: -1;
          animation: rotate 3s linear infinite;
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .nav-link-glow-mobile {
          position: relative;
          overflow: hidden;
        }
        
        .nav-link-glow-mobile::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 12px;
        }
        
        .nav-link-glow-mobile:hover::before,
        .nav-link-glow-mobile.active::before {
          opacity: 1;
        }
        
        .social-link-glow-mobile {
          position: relative;
          overflow: hidden;
        }
        
        .social-link-glow-mobile::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 8px;
        }
        
        .social-link-glow-mobile:hover::before {
          opacity: 1;
        }
        
        .hamburger-glow {
          position: relative;
          overflow: hidden;
        }
        
        .hamburger-glow::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 8px;
        }
        
        .hamburger-glow:hover::before {
          opacity: 1;
        }
      `}</style>

      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 neue-montreal">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo/Name */}
          <Link href="/" className="flex items-center gap-3">
            <div className="profile-avatar-mobile w-10 h-10 rounded-lg shadow-lg shadow-indigo-500/40 ring-2 ring-blue-500/50">
              <div className="overflow-hidden rounded-lg w-full h-full">
                <img src="./photo.jpg" className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            </span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={handleToggle}
            className="hamburger-glow p-2 rounded-lg text-slate-400 hover:text-white transition-all duration-300 hover:scale-105"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={closeMobileMenu} />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-slate-900/98 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col neue-montreal ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header - Fixed */}
        <div className="flex-shrink-0 p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="profile-avatar-mobile w-12 h-12 rounded-lg shadow-lg shadow-indigo-500/40 ring-2 ring-blue-500/50">
                <div className="overflow-hidden rounded-lg w-full h-full">
                  <img src="./photo.jpg" alt="Callixta Fidelia C" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="neue-montreal text-white font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Callixta Fidelia C
                </h3>
                <p className="neue-montreal text-slate-400 text-sm">Biostatistics @UBC</p>
              </div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="hamburger-glow p-2 rounded-lg text-slate-400 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Scrollable */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          {navItems.map(({ key, label, href, Icon }) => {
            const isActive = active === key
            return (
              <Link
                key={key}
                href={href}
                onClick={closeMobileMenu}
                className={`
                  nav-link-glow-mobile flex items-center gap-3 px-4 py-4 rounded-xl 
                  transition-all duration-300 group neue-montreal
                  ${
                    isActive
                      ? "text-white bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-400/30 shadow-lg shadow-indigo-500/20"
                      : "text-slate-400 hover:text-white hover:translate-x-1"
                  }
                `}
              >
                <Icon
                  size={22}
                  className={`transition-all duration-300 ${
                    isActive ? "text-indigo-400" : "group-hover:text-indigo-400"
                  }`}
                />
                <span className="font-medium text-lg">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Mobile Social Links - Fixed at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-white/10 space-y-2">
          <Link
            href="https://github.com/callixtafidelia"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-glow-mobile flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 group neue-montreal"
          >
            <Github size={20} className="group-hover:text-blue-400 transition-colors duration-300" />
            <span>GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/callixta-fidelia-cahyaningrum"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-glow-mobile flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 group neue-montreal"
          >
            <Linkedin size={20} className="group-hover:text-blue-400 transition-colors duration-300" />
            <span>LinkedIn</span>
          </Link>

          {/* Mobile Footer */}
          <div className="pt-4 text-center">
            <p className="text-slate-500 text-sm neue-montreal">&copy; {new Date().getFullYear()} Callixta Fidelia C</p>
          </div>
        </div>
      </div>
    </>
  )
}