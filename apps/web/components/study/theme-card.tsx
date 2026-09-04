"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { StudyTheme } from "@noor/types"
import { getAccentClasses, type ThemeAccent } from "@/lib/study/accents"

interface ThemeCardProps {
  theme: StudyTheme
  accent?: ThemeAccent
}

export function ThemeCard({ theme, accent = "emerald" }: ThemeCardProps) {
  const colors = getAccentClasses(accent)
  return (
    <Link href={`/study/${theme.id}`}>
      <div className="group h-full rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:border-neutral-900 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white">
        <div className="mb-3 flex items-center gap-2">
          <span className={`inline-flex items-center rounded-lg border border-neutral-200 px-2 py-0.5 text-xs font-medium dark:border-neutral-800 ${colors.bg} ${colors.text}`}>
            {theme.difficulty}
          </span>
          <span className="text-xs text-neutral-400">{theme.lessons.length} lessons</span>
        </div>
        <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">{theme.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-2">{theme.description}</p>
        <div className="flex items-center gap-1 text-xs font-bold text-neutral-900 dark:text-white">
          <span>Start studying</span> <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
