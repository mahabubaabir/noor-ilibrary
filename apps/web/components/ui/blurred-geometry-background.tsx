"use client"

import React from "react"

export function BlurredGeometryBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Subtle Monochrome Ambient Depth */}
      <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-neutral-200/20 blur-3xl dark:bg-neutral-800/10" />
      <div className="absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full bg-neutral-200/15 blur-3xl dark:bg-neutral-800/10" />

      {/* Modern Sacred Geometric Pattern SVG Overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.02] dark:opacity-[0.035] stroke-black dark:stroke-white"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="sacred-islamic-geometry"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(0)"
          >
            {/* Center Octagram */}
            <polygon
              points="60,20 70,45 95,45 75,60 85,85 60,70 35,85 45,60 25,45 50,45"
              fill="none"
              strokeWidth="0.8"
            />
            {/* Corner Stars */}
            <polygon
              points="0,0 10,15 25,15 15,25 20,40 0,30"
              fill="none"
              strokeWidth="0.8"
            />
            <polygon
              points="120,0 110,15 95,15 105,25 100,40 120,30"
              fill="none"
              strokeWidth="0.8"
            />
            <polygon
              points="0,120 10,105 25,105 15,95 20,80 0,90"
              fill="none"
              strokeWidth="0.8"
            />
            <polygon
              points="120,120 110,105 95,105 105,95 100,80 120,90"
              fill="none"
              strokeWidth="0.8"
            />
            {/* Interlaced connecting diamond diagonals */}
            <line x1="0" y1="60" x2="120" y2="60" strokeWidth="0.4" strokeDasharray="3 3" />
            <line x1="60" y1="0" x2="60" y2="120" strokeWidth="0.4" strokeDasharray="3 3" />
            <circle cx="60" cy="60" r="38" fill="none" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="28" fill="none" strokeWidth="0.5" />
            <circle cx="120" cy="0" r="28" fill="none" strokeWidth="0.5" />
            <circle cx="0" cy="120" r="28" fill="none" strokeWidth="0.5" />
            <circle cx="120" cy="120" r="28" fill="none" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sacred-islamic-geometry)" />
      </svg>
    </div>
  )
}
