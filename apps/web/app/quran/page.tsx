"use client"

import Link from "next/link"
import { BookOpen, Search } from "lucide-react"
import { useEffect, useState } from "react"

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

const juzPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [pageStart, setPageStart] = useState(0)

  useEffect(() => {
    fetch("/api/quran/surahs")
      .then((r) => r.json())
      .then((d) => { setSurahs(d.data || d.surahs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = surahs.filter((s) =>
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.name.includes(search) ||
    String(s.number) === search
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-2.5 dark:bg-emerald-900/30">
            <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">The Quran</h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">114 Surahs - Read, listen, and study</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search surahs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-stone-400">Page:</span>
          <div className="flex gap-1">
            {[1, 11, 21].map((start) => (
              <button
                key={start}
                onClick={() => setPageStart(start - 1)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  pageStart === start - 1
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "text-stone-500 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
                }`}
              >
                {start}-{Math.min(start + 9, 114)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800" />
          ))}
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(pageStart, pageStart + 20).map((surah) => (
            <Link key={surah.number} href={`/quran/${surah.number}`}>
              <div className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 transition-all duration-200 hover:border-emerald-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-emerald-700">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-stone-100 text-sm font-bold text-stone-700 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-700 dark:bg-stone-800 dark:text-stone-300 dark:group-hover:bg-emerald-900/30 dark:group-hover:text-emerald-400">
                  {surah.number}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-stone-900 dark:text-stone-100">
                      {surah.englishName}
                    </h3>
                    <span className="text-lg leading-none text-stone-400 dark:text-stone-500">
                      {surah.name}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                    {surah.englishNameTranslation} · {surah.numberOfAyahs} Ayahs · {surah.revelationType}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {filtered.slice(pageStart, pageStart + 20).map((surah) => (
            <Link key={surah.number} href={`/quran/${surah.number}`}>
              <div className="flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-stone-100 dark:hover:bg-stone-800">
                <span className="w-8 text-center text-sm font-bold text-stone-400">{surah.number}</span>
                <div className="flex-1">
                  <span className="text-sm font-medium text-stone-900 dark:text-stone-100">{surah.englishName}</span>
                  <span className="ml-2 text-xs text-stone-500 dark:text-stone-400">{surah.englishNameTranslation}</span>
                </div>
                <span className="text-lg text-stone-400 dark:text-stone-500">{surah.name}</span>
                <span className="text-xs text-stone-400">{surah.numberOfAyahs} ayahs</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
