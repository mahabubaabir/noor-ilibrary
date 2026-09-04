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
        <div key={i} className="h-20 animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
      ))}
    </div>
  )

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {surahs.map(surah => (
        <Link key={surah.number} href={`/quran/${surah.number}`}>
          <div className="group flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-3 transition-all hover:border-neutral-900 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-xs font-bold text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white dark:bg-neutral-900 dark:text-neutral-100 dark:group-hover:bg-white dark:group-hover:text-neutral-950 transition-colors">
              {surah.number}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">{surah.englishName}</h3>
              <p className="text-xs text-neutral-500">{surah.englishNameTranslation} · {surah.numberOfAyahs} ayahs</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
