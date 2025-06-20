// components/Sidebar.tsx
"use client"

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  User,
  Briefcase,
  Zap,
  FolderOpen,
  FileText,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

interface NavItem {
  key: string;
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number }>;
}

export default function Sidebar({ active }: { active?: string }) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { key: "home", label: "Home", href: "/", Icon: User },
    { key: "about", label: "About", href: "/about", Icon: User },
    { key: "exp", label: "Experience", href: "/experience", Icon: Briefcase },
    { key: "skills", label: "Skills", href: "/skills", Icon: Zap },
    { key: "projects", label: "Projects", href: "/projects", Icon: FolderOpen },
    { key: "blog", label: "Blog", href: "/blog", Icon: FileText },
    { key: "contact", label: "Contact", href: "/contact", Icon: Mail },
  ];

  return (
    <div
      className={`
        flex flex-col h-full bg-white shadow-lg 
        transition-width duration-200 ease-in-out
        overflow-hidden
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* toggle button */}
      <div className="flex-shrink-0 p-2 border-b">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-200"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Profile */}
      <div className="flex-shrink-0 p-4 border-b flex flex-col items-center">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          YN
        </div>
        {!collapsed && (
          <>
            <h2 className="mt-2 text-lg font-bold text-gray-900">Your Name</h2>
            <p className="text-gray-600 text-sm">Data Scientist</p>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map(({ key, label, href, Icon }) => {
          const isActive = active === key;
          return (
            <Link
              key={key}
              href={href}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded 
                transition-colors
                ${isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"}
              `}
            >
              <Icon size={20} />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Connect */}
      <div className="flex-shrink-0 p-2 border-t space-y-1">
        <Link
          href="https://github.com/your-username"
          target="_blank"
          className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-50"
        >
          <Github size={18} />
          {!collapsed && <span>GitHub</span>}
        </Link>
        <Link
          href="https://linkedin.com/in/your-profile"
          target="_blank"
          className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-50"
        >
          <Linkedin size={18} />
          {!collapsed && <span>LinkedIn</span>}
        </Link>
      </div>
    </div>
  );
}
