"use client"

import React, { useRef, useState } from "react"

interface SpotlightTiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  tiltIntensity?: number
}

export function SpotlightTiltCard({
  children,
  className = "",
  spotlightColor = "rgba(5, 150, 105, 0.15)",
  tiltIntensity = 6,
  ...props
}: SpotlightTiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [transformStyle, setTransformStyle] = useState("")

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCoords({ x, y })

    // 3D perspective tilt calculation
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -tiltIntensity
    const rotateY = ((x - centerX) / centerX) * tiltIntensity

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
    )
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)")
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? "transform 0.12s ease-out, box-shadow 0.2s ease"
          : "transform 0.5s ease-out, box-shadow 0.3s ease",
      }}
      className={`relative overflow-hidden rounded-3xl border will-change-transform ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Aura */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 75%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
