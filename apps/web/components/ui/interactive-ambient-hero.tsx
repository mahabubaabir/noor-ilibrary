"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
  alpha: number
  hue: number
}

export function InteractiveAmbientHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; active: boolean }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      initParticles()
    }

    window.addEventListener("resize", handleResize)

    // Mouse movement tracker with smooth interpolation
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.targetX = e.clientX - rect.left
      mouseRef.current.targetY = e.clientY - rect.top
      mouseRef.current.active = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Particle nodes for celestial constellation & sacred geometry
    let particles: Particle[] = []
    const particleCount = Math.min(Math.floor((width * height) / 12000), 75)

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
          hue: Math.random() > 0.6 ? 160 : 42, // Emerald (160) or Gold (42)
        })
      }
    }

    initParticles()

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Smooth mouse position damping
      const mouse = mouseRef.current
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      const isDark = document.documentElement.classList.contains("dark")

      // Draw soft ambient spotlight at cursor
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          width * 0.4
        )
        if (isDark) {
          gradient.addColorStop(0, "rgba(5, 150, 105, 0.12)")
          gradient.addColorStop(0.5, "rgba(217, 119, 6, 0.04)")
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        } else {
          gradient.addColorStop(0, "rgba(5, 150, 105, 0.08)")
          gradient.addColorStop(0.5, "rgba(245, 158, 11, 0.03)")
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        }

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      }

      // Update and draw particles & celestial connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!

        // Drift motion
        p.x += p.vx
        p.y += p.vy

        // Wrap boundaries
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Gentle interactive mouse repulsion/attraction
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 180

          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 1.5
            p.x -= (dx / dist) * force
            p.y -= (dy / dist) * force
          }
        }

        // Draw particle node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.hue === 160
          ? `hsla(158, 70%, ${isDark ? "60%" : "40%"}, ${p.alpha})`
          : `hsla(40, 90%, ${isDark ? "65%" : "45%"}, ${p.alpha * 0.8})`
        ctx.fill()

        // Draw constellation connective lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]!
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            const lineAlpha = (1 - dist / 110) * (isDark ? 0.18 : 0.1)
            ctx.strokeStyle = `hsla(158, 60%, 50%, ${lineAlpha})`
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-80 transition-opacity duration-700"
      aria-hidden="true"
    />
  )
}
