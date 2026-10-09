"use client"

import React, { useEffect, useRef } from "react"

interface NeuronNode {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

/**
 * Site-wide living background: a neuron network where nodes drift, connect to
 * nearby nodes (synapses) and reach toward the mouse cursor. Rendered on a
 * fixed full-viewport canvas behind all content.
 *
 * White and black themes use compensated alpha values so the network has the
 * same perceived intensity in both themes.
 */
export function BlurredGeometryBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1
    let nodes: NeuronNode[] = []

    const mouse = { x: -9999, y: -9999, active: false }
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const initNodes = () => {
      const count = Math.max(30, Math.min(85, Math.floor((width * height) / 20000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.9,
      }))
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      initNodes()
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const handleMouseLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    const NODE_LINK_DIST = 150
    const CURSOR_LINK_DIST = 240

    const render = (animate: boolean) => {
      const isDark = document.documentElement.classList.contains("dark")

      // Compensated palettes: the light theme needs a touch more alpha for
      // dark ink on white to read the same as white ink on black.
      const ink = isDark ? { r: 255, g: 255, b: 255 } : { r: 15, g: 15, b: 15 }
      const gain = isDark ? 1 : 1.25

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      // Advance drift
      if (animate) {
        for (const n of nodes) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < -10) n.x = width + 10
          if (n.x > width + 10) n.x = -10
          if (n.y < -10) n.y = height + 10
          if (n.y > height + 10) n.y = -10
        }
      }

      // Gentle cursor repulsion keeps the network feeling alive
      if (mouse.active) {
        for (const n of nodes) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > 0 && dist < 140) {
            const force = (1 - dist / 140) * 0.6
            n.x += (dx / dist) * force
            n.y += (dy / dist) * force
          }
        }
      }

      // === Neuron-to-neuron synapses ===
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < NODE_LINK_DIST) {
            const strength = 1 - dist / NODE_LINK_DIST
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${ink.r}, ${ink.g}, ${ink.b}, ${(strength * 0.14 * gain).toFixed(3)})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      // === Cursor synapses ===
      if (mouse.active) {
        for (const n of nodes) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CURSOR_LINK_DIST) {
            const strength = 1 - dist / CURSOR_LINK_DIST
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(n.x, n.y)
            ctx.strokeStyle = `rgba(${ink.r}, ${ink.g}, ${ink.b}, ${(strength * 0.3 * gain).toFixed(3)})`
            ctx.lineWidth = 0.85
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(n.x, n.y, n.radius + strength * 2, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${ink.r}, ${ink.g}, ${ink.b}, ${(strength * 0.35 * gain).toFixed(3)})`
            ctx.fill()
          }
        }

        // Soft cursor halo
        const halo = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 110)
        halo.addColorStop(0, isDark ? "rgba(255,255,255,0.07)" : "rgba(15,15,15,0.05)")
        halo.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = halo
        ctx.fillRect(mouse.x - 110, mouse.y - 110, 220, 220)
      }

      // === Neuron bodies ===
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ink.r}, ${ink.g}, ${ink.b}, ${(0.3 * gain).toFixed(3)})`
        ctx.fill()
      }

      if (animate) {
        raf = requestAnimationFrame(() => render(true))
      }
    }

    render(!prefersReducedMotion)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Subtle Monochrome Ambient Depth */}
      <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-neutral-200/30 blur-3xl dark:bg-neutral-800/15" />
      <div className="absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full bg-neutral-200/25 blur-3xl dark:bg-neutral-800/15" />

      {/* Living neuron network */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
