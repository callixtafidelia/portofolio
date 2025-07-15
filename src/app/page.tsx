'use client'

import React, { useRef, useEffect, useState, Suspense } from 'react'
import Sidebar from '@/components/sidebar'
import { motion } from 'framer-motion'
import { Download, ArrowRight } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

// Crystal Component
function Crystal() {
  const { scene } = useGLTF('./crystal.glb')
  return (
    <primitive
      object={scene}
      scale={[0.43, 0.44, 0.43]}
      position={[0, -2.43, 0]}
    />
  )
}

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Neue+Montreal:wght@400;500;600;700;800;900&display=swap');
        body { margin: 0; padding: 0; background: #0a0e1a; overflow-x: hidden; }
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%); }
        .neue-montreal { font-family: 'Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      `}</style>

      <div className="min-h-screen bg-[#0a0e1a] text-white">
        {/* Sidebar - Desktop fixed, Mobile top nav */}
        <div className="hidden lg:block fixed left-0 top-0 h-full z-50">
          <Sidebar active="home" onToggle={setSidebarCollapsed} />
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <Sidebar active="home" onToggle={setSidebarCollapsed} />
        </div>

        {/* Main content - adjusted for responsive sidebar */}
        <main
          className={`transition-all duration-300 ease-in-out pt-16 lg:pt-0 ${
            isMobile ? '' : sidebarCollapsed ? 'lg:ml-[120px]' : 'lg:ml-[288px]'
          }`}
        >
          {/* Hero Section */}
          <div className="min-h-screen flex items-center justify-center p-4 lg:p-8">
            <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-20">
              {/* 3D Crystal Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0 order-2 lg:order-1"
              >
                <div className="relative">
                  {/* Enhanced glow behind crystal */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl scale-110" />
                  
                  {/* 3D Crystal Canvas Container - Responsive sizing */}
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900/30 to-slate-800/30 backdrop-blur-sm">
                    <Canvas camera={{ position: [0, 2, 5], fov: 50 }} gl={{ alpha: true, antialias: true }}>
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[10, 10, 5]} intensity={1} />
                      <pointLight position={[-10, -10, -10]} intensity={0.3} />
                      <Suspense fallback={null}>
                        <Crystal />
                        <Environment preset="studio" />
                      </Suspense>
                      <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={2}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                      />
                    </Canvas>
                  </div>
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left order-1 lg:order-2"
              >
                {/* Badge */}
                <div className="relative inline-flex items-center">
                  <span className="inline-flex items-center rounded-full border border-indigo-500/50 bg-indigo-900/30 px-4 py-2 sm:px-6 sm:py-2 text-sm font-medium text-indigo-300 backdrop-blur-sm neue-montreal font-light">
                    Welcome to My Portfolio Website!
                  </span>
                </div>

                {/* Title - Responsive text sizing */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight neue-montreal">
                  Hey, I'm{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    Callixta Fidelia C
                  </span>
                </h1>

                {/* Description - Responsive text sizing */}
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 neue-montreal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Like crystals forming from chaos, I shape raw information into structured, meaningful outcomes through
                  thoughtful analysis and design.
                </p>

                {/* Buttons - Responsive layout */}
                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start">
                  <motion.a
                    href="./resume.pdf"
                    download = "Callixta_Fidelia_Resume.pdf"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 lg:px-8 py-3 lg:py-4 text-white font-semibold text-base lg:text-lg shadow-2xl neue-montreal"
                  >
                    <Download size={20} />
                    Download Resume
                  </motion.a>

                  <motion.a
                    href="/projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-3 rounded-xl border border-gray-600/50 px-6 lg:px-8 py-3 lg:py-4 text-gray-200 font-semibold text-base lg:text-lg bg-white/5 backdrop-blur-sm neue-montreal"
                  >
                    View Projects
                    <ArrowRight size={20} />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>

        </main>
      </div>
    </>
  )
}
