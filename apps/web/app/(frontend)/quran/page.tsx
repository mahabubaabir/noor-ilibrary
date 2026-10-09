"use client"

import Link from "next/link"
import { BookOpen, Search, Sparkles, SlidersHorizontal, ArrowRight, CheckCircle2 } from "lucide-react"
import { useEffect, useState, useMemo } from "react"
import type { SurahMeta } from "@noor/types"
import { SURAH_NAMES_BN } from "@/lib/surah-names-bn"


export default function QuranPage() {
  const [surahs, setSurahs] = useState<SurahMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<"All" | "Meccan" | "Medinan">("All")
  const [view, setView] = useState<"grid" | "list">("grid")

  useEffect(() => {
    fetch("/api/quran/surahs")
      .then((r) => r.json())
      .then((d) => {
        if (d.surahs && Array.isArray(d.surahs)) {
          setSurahs(d.surahs)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filteredSurahs = useMemo(() => {
    const q = search.trim().toLowerCase()
    return surahs.filter((s) => {
      if (filterType !== "All" && s.revelationType !== filterType) {
        return false
      }
      if (!q) return true

      const bn = SURAH_NAMES_BN[s.number]
      const bnMatch = bn?.bnName.toLowerCase().includes(q) || bn?.bnMeaning.toLowerCase().includes(q)

      return (
        s.nameEnglish.toLowerCase().includes(q) ||
        s.nameArabic.includes(q) ||
        s.nameTranslation.toLowerCase().includes(q) ||
        String(s.number) === q ||
        bnMatch
      )
    })
  }, [surahs, search, filterType])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header Banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
              <Sparkles className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
              <span>পবিত্র আল-কুরআন (114 Surahs)</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              The Noble Quran
            </h1>
            <p className="mt-1 max-w-xl text-sm text-neutral-600 dark:text-neutral-400">
              Read with Arabic script, authentic English & Bangla translations, verse-by-verse recitation, and Ibn Kathir Tafsir.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <span className="block text-2xl font-bold text-neutral-900 dark:text-white font-mono">114</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">সূরা / Surahs</span>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <span className="block text-2xl font-bold text-neutral-900 dark:text-white font-mono">6,236</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">আয়াত / Ayahs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name, number, Bangla (যেমন: ফাতিহা)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-white dark:focus:ring-white/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-xl border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-900">
            {(["All", "Meccan", "Medinan"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  filterType === type
                    ? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-black"
                    : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                {type === "All" ? "সকল (All)" : type === "Meccan" ? "মাক্কী (Meccan)" : "মাদানী (Medinan)"}
              </button>
            ))}
          </div>

          <div className="flex rounded-xl border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-900">
            <button
              onClick={() => setView("grid")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                view === "grid"
                  ? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-black"
                  : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                view === "list"
                  ? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-black"
                  : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Surah List / Grid */}
      {loading ? (
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-900" />
          ))}
        </div>
      ) : filteredSurahs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-950">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-neutral-400" />
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">কোনো সূরা পাওয়া যায়নি</h3>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            &quot;{search}&quot; এর জন্য কোনো ফলাফল মেলেনি। অন্য শব্দ দিয়ে অনুসন্ধান করুন।
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSurahs.map((surah) => {
            const bn = SURAH_NAMES_BN[surah.number]
            return (
              <Link key={surah.number} href={`/quran/${surah.number}`}>
                <div className="group relative flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white">
                  {/* Number Badge */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-sm font-bold text-neutral-900 transition-colors group-hover:bg-neutral-900 group-hover:text-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:group-hover:bg-white dark:group-hover:text-black font-mono">
                    {surah.number}
                  </div>

                  {/* Main Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-1.5">
                      <h3 className="truncate text-sm font-bold text-neutral-900 dark:text-white">
                        {surah.nameEnglish}
                      </h3>
                      <span className="font-arabic text-xl leading-none text-neutral-800 dark:text-neutral-200">
                        {surah.nameArabic}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="truncate">
                        {bn ? `${bn.bnName} (${bn.bnMeaning})` : surah.nameTranslation}
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center gap-2 text-[11px] text-neutral-400 dark:text-neutral-500">
                      <span className="rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                        {surah.ayahCount} আয়াত
                      </span>
                      <span>·</span>
                      <span>{surah.revelationType === "Meccan" ? "মাক্কী" : "মাদানী"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-white dark:divide-neutral-900 dark:border-neutral-800 dark:bg-neutral-950">
          {filteredSurahs.map((surah) => {
            const bn = SURAH_NAMES_BN[surah.number]
            return (
              <Link key={surah.number} href={`/quran/${surah.number}`}>
                <div className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/60">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white font-mono">
                    {surah.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-neutral-900 dark:text-white">{surah.nameEnglish}</span>
                      {bn && <span className="text-xs text-neutral-500 dark:text-neutral-400">({bn.bnName})</span>}
                    </div>
                    <p className="text-xs text-neutral-400">{bn?.bnMeaning || surah.nameTranslation} · {surah.ayahCount} Ayahs</p>
                  </div>
                  <span className="font-arabic text-xl text-neutral-800 dark:text-neutral-200">{surah.nameArabic}</span>
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-black dark:text-neutral-600 dark:group-hover:text-white" />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
