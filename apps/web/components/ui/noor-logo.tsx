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
      {/* Minimalist Monochrome Vector Islamic Khatim Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Outer Octagram / 8-pointed star base */}
        <rect
          x="7"
          y="7"
          width="34"
          height="34"
          rx="6"
          className="fill-black stroke-neutral-800 dark:fill-white dark:stroke-neutral-200"
          strokeWidth="1"
        />
        <rect
          x="7"
          y="7"
          width="34"
          height="34"
          rx="6"
          transform="rotate(45 24 24)"
          className="fill-black stroke-neutral-700 dark:fill-white dark:stroke-neutral-300"
          strokeWidth="1"
        />

        {/* Inner delicate diamond */}
        <rect
          x="13"
          y="13"
          width="22"
          height="22"
          rx="3"
          transform="rotate(45 24 24)"
          fill="none"
          className="stroke-white dark:stroke-black"
          strokeWidth="1.2"
        />

        {/* Central Noor Star Motif */}
        <path
          d="M24 16L25.8 21.2L31 22.8L25.8 24.5L24 30L22.2 24.5L17 22.8L22.2 21.2L24 16Z"
          className="fill-white dark:fill-black"
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
                  ? "text-black"
                  : "text-neutral-900 dark:text-white"
              }`}
            >
              Noor
            </span>
            <span className="rounded-md border border-neutral-300 px-1.5 py-0.2 text-[9px] font-mono font-bold text-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
              نُوْر
            </span>
          </div>
          <span className="text-[10px] font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
            Islamic Library
          </span>
        </div>
      )}
    </div>
  )
}
