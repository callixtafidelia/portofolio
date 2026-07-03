"use client"

import { useRef, useEffect } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const PARTICLE_DENSITY = 1 / 11000 // particles per px² of viewport
const MAX_PARTICLES = 165
const LINK_DISTANCE = 125
const MOUSE_RADIUS = 190

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Respect users who prefer reduced motion, and skip on touch devices
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none)").matches
    ) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: Particle[] = []
    let animId = 0
    let running = true
    const mouse = { x: -9999, y: -9999 }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.min(
        Math.round(window.innerWidth * window.innerHeight * PARTICLE_DENSITY),
        MAX_PARTICLES
      )
      while (particles.length < target) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.6 + 0.6,
        })
      }
      particles.length = target
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onVisibility = () => {
      running = !document.hidden
      if (running) draw()
      else cancelAnimationFrame(animId)
    }

    const draw = () => {
      if (!running) return
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        // Gentle attraction toward the cursor within its radius
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_RADIUS && dist > 0.001) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.012
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Speed cap keeps motion calm
        const speed = Math.hypot(p.vx, p.vy)
        if (speed > 0.8) {
          p.vx = (p.vx / speed) * 0.8
          p.vy = (p.vy / speed) * 0.8
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }

      // Links between nearby particles — brighter near the cursor
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          if (Math.abs(dx) > LINK_DISTANCE || Math.abs(dy) > LINK_DISTANCE) continue
          const dist = Math.hypot(dx, dy)
          if (dist > LINK_DISTANCE) continue

          const midX = (a.x + b.x) / 2
          const midY = (a.y + b.y) / 2
          const mouseDist = Math.hypot(mouse.x - midX, mouse.y - midY)
          const nearMouse = Math.max(0, 1 - mouseDist / (MOUSE_RADIUS * 1.4))
          const alpha = (1 - dist / LINK_DISTANCE) * (0.10 + nearMouse * 0.45)

          ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const p of particles) {
        const mouseDist = Math.hypot(mouse.x - p.x, mouse.y - p.y)
        const nearMouse = Math.max(0, 1 - mouseDist / MOUSE_RADIUS)
        ctx.fillStyle = `rgba(165, 180, 252, ${0.35 + nearMouse * 0.65})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius + nearMouse * 1.2, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)
    document.addEventListener("visibilitychange", onVisibility)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  )
}
