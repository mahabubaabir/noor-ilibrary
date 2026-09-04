"use client"

import React, { useEffect, useState, useRef } from "react"

export function MotionCursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad)
    if (typeof window !== "undefined") {
      const finePointer = window.matchMedia("(pointer: fine)").matches
      setIsTouchDevice(!finePointer)
      if (!finePointer) return
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)

      // Direct position for the inner dot
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    const onMouseEnter = () => setVisible(true)
    const onMouseLeave = () => setVisible(false)

    // Check if hovered element is clickable/interactive
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isInteractive = target.closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor-interactive="true"], .interactive-hover'
      )
      setHovered(!!isInteractive)
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("mousedown", onMouseDown, { passive: true })
    window.addEventListener("mouseup", onMouseUp, { passive: true })
    window.addEventListener("mouseover", onMouseOver, { passive: true })
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseleave", onMouseLeave)

    // Smooth animation loop for the outer follower ring (spring lag lerp)
    const render = () => {
      const lerp = 0.18 // Smooth spring responsiveness
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }

      rafId.current = requestAnimationFrame(render)
    }

    rafId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [visible])

  if (isTouchDevice) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Outer Motion Follower Ring */}
      <div
        ref={cursorRingRef}
        className="pointer-events-none fixed left-0 top-0 will-change-transform"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
        }}
      >
        <div
          className={`-ml-5 -mt-5 h-10 w-10 rounded-full border transition-all duration-200 ease-out ${
            hovered
              ? "scale-125 border-neutral-900/60 bg-neutral-900/10 backdrop-blur-[1px] dark:border-white/70 dark:bg-white/10"
              : clicked
              ? "scale-90 border-neutral-900/80 bg-neutral-900/20 dark:border-white dark:bg-white/20"
              : "border-neutral-900/30 dark:border-white/35"
          }`}
        />
      </div>

      {/* Inner Precision Dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 will-change-transform"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
        }}
      >
        <div
          className={`-ml-1 -mt-1 h-2 w-2 rounded-full bg-neutral-900 transition-all duration-150 ease-out dark:bg-white ${
            hovered ? "scale-50 opacity-40" : clicked ? "scale-125" : "scale-100 opacity-90"
          }`}
        />
      </div>
    </div>
  )
}
