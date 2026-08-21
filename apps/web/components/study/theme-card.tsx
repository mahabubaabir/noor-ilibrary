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
      <div className="group h-full rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-200 hover:border-emerald-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-emerald-700">
        <div className="mb-3 flex items-center gap-2">
          <span className={`inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {theme.difficulty}
          </span>
          <span className="text-xs text-stone-400">{theme.lessons.length} lessons</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">{theme.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-2">{theme.description}</p>
        <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Start studying <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}
