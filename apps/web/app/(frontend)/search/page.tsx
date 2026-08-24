"use client"

import { useState } from "react"
import Link from "next/link"
import { Search as SearchIcon, BookOpen, Library, Loader2 } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [quranResults, setQuranResults] = useState<any[]>([])
  const [hadithResults, setHadithResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"quran" | "hadith">("quran")

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const [qRes, hRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/en.sahih`).then(r => r.json()),
        fetch(`/api/hadith/search?q=${encodeURIComponent(query)}&collection=bukhari,muslim`).then(r => r.json()),
      ])
      setQuranResults(qRes.data?.matches || [])
      setHadithResults(hRes.hadiths || [])
    } catch {}
    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-2.5 dark:bg-blue-900/30">
            <SearchIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Search</h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">Search across Quran and Hadith</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search for words, phrases, topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>
          <button onClick={handleSearch} disabled={loading}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition-all active:scale-95">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </button>
        </div>
      </div>

      {(quranResults.length > 0 || hadithResults.length > 0) && (
        <div className="mb-4 flex gap-1 rounded-xl bg-stone-100 p-1 dark:bg-stone-800">
          <button onClick={() => setActiveTab("quran")} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${activeTab === "quran" ? "bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-100" : "text-stone-500 hover:text-stone-700 dark:text-stone-400"}`}>
            Quran ({quranResults.length})
          </button>
          <button onClick={() => setActiveTab("hadith")} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${activeTab === "hadith" ? "bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-100" : "text-stone-500 hover:text-stone-700 dark:text-stone-400"}`}>
            Hadith ({hadithResults.length})
          </button>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
        </div>
      )}

      {!loading && activeTab === "quran" && quranResults.length > 0 && (
        <div className="space-y-3">
          {quranResults.slice(0, 20).map((r: any, i: number) => (
            <Link key={i} href={`/quran/${r.surah?.number || 1}`}>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 transition-all hover:border-emerald-200 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900">
                <p className="mb-1 text-right font-arabic text-lg text-stone-900 dark:text-stone-100">{r.text}</p>
                <p className="text-sm text-stone-600 dark:text-stone-400">{r.edition?.name} — Surah {r.surah?.number}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && activeTab === "hadith" && hadithResults.length > 0 && (
        <div className="space-y-3">
          {hadithResults.map((h: any, i: number) => (
            <Link key={i} href={`/hadith/${h.collection}?n=${h.hadithNumber}`}>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 transition-all hover:border-amber-200 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900">
                <p className="text-sm text-stone-700 dark:text-stone-300">{h.text}</p>
                <p className="mt-2 text-xs text-stone-400">#{h.hadithNumber} · {h.collection}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && quranResults.length === 0 && hadithResults.length === 0 && query && (
        <div className="py-12 text-center">
          <p className="text-sm text-stone-500 dark:text-stone-400">No results found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  )
}
