import React from "react"

interface NoorLogoProps {
  className?: string
  size?: number
  showText?: boolean
  variant?: "light" | "dark" | "auto"
}

export function NoorLogo({
  className = "",
  size = 36,
  showText = true,
  variant = "auto",
}: NoorLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Illuminated Vector Islamic Star & Crescent Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Emerald Gradient */}
          <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          {/* Golden Noor Ray Gradient */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Soft Radial Glow */}
          <radialGradient id="noorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow Aura */}
        <circle cx="24" cy="24" r="22" fill="url(#noorGlow)" />

        {/* Rounded Octagram Base / Khatim (8-Pointed Star Sacred Geometry) */}
        <rect
          x="6"
          y="6"
          width="36"
          height="36"
          rx="10"
          fill="url(#emeraldGrad)"
          stroke="#065f46"
          strokeWidth="1"
        />
        <rect
          x="6"
          y="6"
          width="36"
          height="36"
          rx="10"
          transform="rotate(45 24 24)"
          fill="url(#emeraldGrad)"
          fillOpacity="0.85"
          stroke="#10b981"
          strokeWidth="0.75"
          strokeOpacity="0.6"
        />

        {/* Inner Golden Sacred Diamond */}
        <rect
          x="12"
          y="12"
          width="24"
          height="24"
          rx="4"
          transform="rotate(45 24 24)"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
          strokeDasharray="2 1"
        />

        {/* Central Luminous Crescent & Star / Minaret Flame */}
        <path
          d="M26.5 13C20.7 13 16 17.7 16 23.5C16 29.3 20.7 34 26.5 34C28.2 34 29.8 33.6 31.2 32.8C25.5 32.2 21 27.4 21 21.5C21 17.5 23.1 14 26.2 13.1C26.3 13.05 26.4 13.02 26.5 13Z"
          fill="url(#goldGrad)"
        />

        {/* Radiant Noor Center Star */}
        <path
          d="M29 18L30.2 21L33.2 22.2L30.2 23.4L29 26.4L27.8 23.4L24.8 22.2L27.8 21L29 18Z"
          fill="#ffffff"
        />
      </svg>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xl font-black tracking-tight ${
                variant === "light"
                  ? "text-white"
                  : variant === "dark"
                  ? "text-stone-900"
                  : "text-stone-900 dark:text-stone-100"
              }`}
            >
              Noor
            </span>
            <span className="rounded-md bg-emerald-100/90 px-1.5 py-0.2 text-[9px] font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              نُوْر
            </span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
            ইসলামিক লাইব্রেরি
          </span>
        </div>
      )}
    </div>
  )
}
