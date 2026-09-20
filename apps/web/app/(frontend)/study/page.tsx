"use client"

import Link from "next/link"
import { useState } from "react"
import { BookOpen, Search, ArrowRight } from "lucide-react"
import { studyThemes } from "@/lib/study/themes"
import { getAccentClasses, type ThemeAccent } from "@/lib/study/accents"
import type { StudyTheme } from "@noor/types"

const accentOptions: ThemeAccent[] = ["emerald", "blue", "purple", "amber"]

export default function StudyPage() {
  const [search, setSearch] = useState("")
  const [selectedAccent, setSelectedAccent] = useState<ThemeAccent>("emerald")

  const filtered = studyThemes.filter(
    t => t.title.toLowerCase().includes(search.toLowerCase()) ||
         t.description.toLowerCase().includes(search.toLowerCase()) ||
         t.difficulty.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-neutral-100 p-2.5 dark:bg-neutral-900/30">
            <BookOpen className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Study Themes</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Curated lessons on Islamic topics</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search themes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((theme) => {
          const accent = getAccentClasses(selectedAccent)
          return (
            <Link key={theme.id} href={`/study/${theme.id}`}>
              <div className="group h-full rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
                <div className="mb-3 flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-medium ${accent.bg} ${accent.text}`}>
                    {theme.difficulty}
                  </span>
                  <span className="text-xs text-neutral-400">{theme.lessons.length} lessons</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{theme.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-2">{theme.description}</p>
                <div className="flex items-center gap-1 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  Start studying <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
