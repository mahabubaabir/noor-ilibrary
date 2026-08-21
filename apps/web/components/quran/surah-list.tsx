"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Surah { number: number; name: string; englishName: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string }

export function SurahList() {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/quran/surahs")
      .then(r => r.json())
      .then(d => { setSurahs(d.data || d.surahs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-20 animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800" />
      ))}
    </div>
  )

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {surahs.map(surah => (
        <Link key={surah.number} href={`/quran/${surah.number}`}>
          <div className="group flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-3 transition-all hover:border-emerald-200 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900 dark:hover:border-emerald-800">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-stone-100 text-xs font-bold text-stone-600 group-hover:bg-emerald-100 group-hover:text-emerald-700 dark:bg-stone-800 dark:text-stone-400 dark:group-hover:bg-emerald-900/30">
              {surah.number}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium text-stone-900 dark:text-stone-100">{surah.englishName}</h3>
              <p className="text-xs text-stone-400">{surah.englishNameTranslation} · {surah.numberOfAyahs} ayahs</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
