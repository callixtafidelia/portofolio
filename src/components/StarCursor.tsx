"use client"

import { useRef, useEffect } from "react"

// Draws a 4-point twinkle (sparkle) centered at 0,0 with pinched concave sides.
function drawSparkle(ctx: CanvasRenderingContext2D, r: number) {
  const inner = r * 0.18
  ctx.beginPath()
  ctx.moveTo(0, -r)
  ctx.quadraticCurveTo(inner, -inner, r, 0)
  ctx.quadraticCurveTo(inner, inner, 0, r)
  ctx.quadraticCurveTo(-inner, inner, -r, 0)
  ctx.quadraticCurveTo(-inner, -inner, 0, -r)
  ctx.closePath()
}

export default function StarCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let animId = 0
    let running = true

    const mouse = { x: -9999, y: -9999 }
    const smooth = { x: -9999, y: -9999 }
    let pulse = 0

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e: MouseEvent) => {
      if (mouse.x < -900) {
        smooth.x = e.clientX
        smooth.y = e.clientY
      }
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
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Ease the star toward the cursor for a soft, weightless follow
      smooth.x += (mouse.x - smooth.x) * 0.25
      smooth.y += (mouse.y - smooth.y) * 0.25

      if (mouse.x > -900) {
        pulse += 0.12
        const twinkle = 1 + Math.sin(pulse) * 0.12
        const r = 11 * twinkle

        ctx.save()
        ctx.translate(smooth.x, smooth.y)
        ctx.globalCompositeOperation = "lighter"

        // Outer glow
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2.6)
        glow.addColorStop(0, "hsla(245, 95%, 82%, 0.55)")
        glow.addColorStop(1, "hsla(245, 95%, 70%, 0)")
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(0, 0, r * 2.6, 0, Math.PI * 2)
        ctx.fill()

        // Soft violet sparkle body
        ctx.rotate(pulse * 0.05)
        ctx.fillStyle = "hsla(250, 90%, 78%, 0.9)"
        drawSparkle(ctx, r)
        ctx.fill()

        // Bright white core
        ctx.fillStyle = "rgba(255, 255, 255, 0.98)"
        drawSparkle(ctx, r * 0.55)
        ctx.fill()

        ctx.restore()
      }

      ctx.globalCompositeOperation = "source-over"
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
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    />
  )
}
