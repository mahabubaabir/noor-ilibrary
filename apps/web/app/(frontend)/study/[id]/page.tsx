"use client"

import { use, useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react"
import { studyThemes } from "@/lib/study/themes"
import type { StudyTheme, StudyLesson } from "@noor/types"

function LessonContent({ lesson }: { lesson: StudyLesson }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">{lesson.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{lesson.overview}</p>
      {lesson.ayahs && lesson.ayahs.length > 0 && (
        <div className="mb-3">
          <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Quran References</h4>
          <div className="flex flex-wrap gap-1.5">
            {lesson.ayahs.map((ref, i) => (
              <Link key={i} href={`/quran/${ref.surah}`}>
                <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  {ref.surah}:{ref.from}{ref.to ? `-${ref.to}` : ""}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {lesson.hadiths && lesson.hadiths.length > 0 && (
        <div>
          <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Hadith References</h4>
          <div className="flex flex-wrap gap-1.5">
            {lesson.hadiths.map((ref, i) => (
              <Link key={i} href={`/hadith/${ref.collection}?n=${ref.number}`}>
                <span className="inline-flex items-center rounded-lg bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  {ref.collection} #{ref.number}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {lesson.takeaway && (
        <div className="mt-4 rounded-xl bg-emerald-50/50 p-4 dark:bg-emerald-950/20">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">Key Takeaway</p>
          <p className="text-sm text-stone-700 dark:text-stone-300">{lesson.takeaway}</p>
        </div>
      )}
    </div>
  )
}

export default function ThemeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [currentLesson, setCurrentLesson] = useState(0)
  const theme = studyThemes.find(t => t.id === id) as (StudyTheme & { category?: string }) | undefined

  if (!theme) return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">Theme not found</h2>
        <Link href="/study" className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to themes
        </Link>
      </div>
    </div>
  )

  const lesson = theme.lessons[currentLesson]

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/study" className="mb-6 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-emerald-600 dark:text-stone-400">
        <ArrowLeft className="h-4 w-4" /> Back to themes
      </Link>

      <div className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <span className="mb-3 inline-flex items-center rounded-lg bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          {theme.difficulty}
        </span>
        <h1 className="mb-2 text-2xl font-bold text-stone-900 dark:text-stone-100">{theme.title}</h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">{theme.description}</p>
      </div>

      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
        {theme.lessons.map((l: StudyLesson, i: number) => (
          <button
            key={l.id}
            onClick={() => setCurrentLesson(i)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              i === currentLesson
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : i < currentLesson
                ? "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400"
                : "text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
            }`}
          >
            {i < currentLesson ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
            {i + 1}
          </button>
        ))}
      </div>

      {lesson && <LessonContent lesson={lesson} />}

      <div className="mt-6 flex items-center justify-between">
        <button onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))} disabled={currentLesson === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        <button onClick={() => setCurrentLesson(Math.min(theme.lessons.length - 1, currentLesson + 1))} disabled={currentLesson === theme.lessons.length - 1}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50">
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
