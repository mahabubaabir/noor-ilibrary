"use client"

import { useState } from "react"
import Link from "next/link"
import { Search as SearchIcon, Loader2 } from "lucide-react"

interface QuranMatch {
  surahNumber: number
  numberInSurah: number
  globalNumber: number
  text: string
}

interface HadithMatch {
  id: string
  collection: string
  collectionName?: string
  hadithNumber: number
  english?: string
  translationBn?: string | null
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [quranResults, setQuranResults] = useState<QuranMatch[]>([])
  const [hadithResults, setHadithResults] = useState<HadithMatch[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"quran" | "hadith">("quran")

  const handleSearch = async () => {
    const q = query.trim()
    if (!q) return
    setLoading(true)
    setError(null)
    setHasSearched(true)
    try {
      // Quran search requires 3+ characters; hadith requires 2+.
      const [qRes, hRes] = await Promise.all([
        q.length >= 3 ? fetch(`/api/quran/search?q=${encodeURIComponent(q)}&lang=en`) : null,
        q.length >= 2 ? fetch(`/api/hadith/search?q=${encodeURIComponent(q)}`) : null,
      ])

      const qData = qRes ? await qRes.json().catch(() => null) : null
      const hData = hRes ? await hRes.json().catch(() => null) : null

      if (qRes && hRes && !qRes.ok && !hRes.ok) {
        throw new Error(qData?.error || hData?.error || "Search failed")
      }

      setQuranResults(Array.isArray(qData?.matches) ? qData.matches : [])
      setHadithResults(Array.isArray(hData?.result?.hadiths) ? hData.result.hadiths : [])

      if (qRes && !qRes.ok) setError(qData?.error ?? "Quran search is unavailable")
      else if (hRes && !hRes.ok) setError(hData?.error ?? "Hadith search is unavailable")
    } catch (err) {
      setQuranResults([])
      setHadithResults([])
      setError(err instanceof Error ? err.message : "Search failed")
    }
    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-neutral-100 p-2.5 dark:bg-neutral-900">
            <SearchIcon className="h-6 w-6 text-neutral-900 dark:text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Search</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Search across Quran and Hadith</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for words, phrases, topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white dark:focus:ring-white/20"
            />
          </div>
          <button onClick={handleSearch} disabled={loading}
            className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-neutral-800 active:scale-95 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
          {error}
        </p>
      )}

      {(quranResults.length > 0 || hadithResults.length > 0) && (
        <div className="mb-4 flex gap-1 rounded-xl bg-neutral-100 p-1 dark:bg-neutral-900">
          <button onClick={() => setActiveTab("quran")} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${activeTab === "quran" ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-neutral-100" : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400"}`}>
            Quran ({quranResults.length})
          </button>
          <button onClick={() => setActiveTab("hadith")} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${activeTab === "hadith" ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-neutral-100" : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400"}`}>
            Hadith ({hadithResults.length})
          </button>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-900 dark:text-white" />
        </div>
      )}

      {!loading && activeTab === "quran" && quranResults.length > 0 && (
        <div className="space-y-3">
          {quranResults.slice(0, 20).map((r, i) => (
            <Link key={`${r.surahNumber}-${r.numberInSurah}-${i}`} href={`/quran/${r.surahNumber}#ayah-${r.numberInSurah}`}>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:border-neutral-900 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white">
                <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">{r.text}</p>
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Surah {r.surahNumber} · Ayah {r.numberInSurah}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && activeTab === "hadith" && hadithResults.length > 0 && (
        <div className="space-y-3">
          {hadithResults.map((h, i) => (
            <Link key={`${h.collection}-${h.hadithNumber}-${i}`} href={`/hadith/${h.collection}?n=${h.hadithNumber}`}>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:border-neutral-900 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white">
                <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">{h.english || h.translationBn || "Hadith"}</p>
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">#{h.hadithNumber} · {h.collectionName || h.collection}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && hasSearched && quranResults.length === 0 && hadithResults.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">No results found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  )
}
