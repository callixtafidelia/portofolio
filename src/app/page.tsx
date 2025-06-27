// src/app/page.tsx
'use client'

import React, { useRef, useEffect, useState, Suspense } from 'react'
import Sidebar from '@/components/sidebar'
import { motion } from 'framer-motion'
import { Download, ArrowRight, BarChart3, Users, Award } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

// Crystal Component
function Crystal() {
  const { scene } = useGLTF('/crystal.glb')
  return (
    <primitive
      object={scene}
      scale={[0.43, 0.44, 0.43]}    // reduced scale
      position={[0, -2.43, 0]}       // adjusted position to center vertically
    />
  )
}

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const stats = [
    { value: '100%', label: 'Model Accuracy', icon: BarChart3, iconBg: 'from-blue-500 to-blue-700' },
    { value: '15+',  label: 'Projects Completed', icon: Users,    iconBg: 'from-purple-500 to-purple-700' },
    { value: '3.8', label: 'GPA Score',        icon: Award,    iconBg: 'from-green-500 to-green-700' },
  ]

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

      <div className="flex h-screen bg-[#0a0e1a] text-white">
        <Sidebar active="home" onToggle={setSidebarCollapsed} />
        <main className="flex-1 overflow-y-auto relative transition-all duration-300 ease-in-out">
          <div className="min-h-screen flex items-center justify-center p-8">
            <div className="max-w-7xl w-full flex items-center gap-12 lg:gap-20">
              {/* 3D Crystal Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  {/* Glow behind crystal */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl scale-110" />
                  <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">  {/* removed border */}
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
                className="flex-1 space-y-6 lg:space-y-8"
              >
                <span className="inline-flex items-center rounded-full border border-indigo-500/50 bg-indigo-900/30 px-6 py-2 text-sm text-indigo-300 backdrop-blur-sm neue-montreal font-light">
                  Welcome to My Portfolio Website!
                </span>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight neue-montreal">
                  Hey, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    Callixta Fidelia C
                    </span>
                </h1>
               <p className="text-lg lg:text-xl text-gray-300 neue-montreal leading-relaxed max-w-2xl">
                 Like crystals forming from chaos, I shape raw information into structured, meaningful outcomes through thoughtful analysis and design.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                  <motion.a href="/resume.pdf" download whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold neue-montreal">
                    <Download size={20} /> Download Resume
                  </motion.a>
                  <motion.a href="/projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-3 rounded-xl border border-gray-600/50 px-6 py-3 neue-montreal">
                    View Projects <ArrowRight size={20} />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Stats and Journey sections omitted for brevity */}

          {/* Debug Info */}
          <div className="fixed bottom-4 right-4 bg-black/50 text-white p-2 rounded text-xs">
            Sidebar collapsed: {sidebarCollapsed ? 'Yes (120px)' : 'No (288px)'}
          </div>
        </main>
      </div>
    </>
  )
}
