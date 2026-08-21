"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { BookOpen, Search, ArrowRight, Loader2 } from "lucide-react"

const collections = [
  { id: "bukhari", name: "Sahih Bukhari", full: "Sahih al-Bukhari", hadithCount: 7563 },
  { id: "muslim", name: "Sahih Muslim", full: "Sahih Muslim", hadithCount: 7500 },
]

export default function HadithPage() {
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searching, setSearching] = useState(false)

  const handleSearch = async () => {
    if (!search.trim()) return
    setSearching(true)
    try {
      const r = await fetch(`/api/hadith/search?q=${encodeURIComponent(search)}&collection=bukhari,muslim`)
      const d = await r.json()
      setSearchResults(d.hadiths || [])
    } catch { setSearchResults([]) }
    setSearching(false)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-amber-100 p-2.5 dark:bg-amber-900/30">
            <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Hadith Collections</h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">Authenticated narrations from the Prophet Muhammad (PBUH)</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="relative max-w-lg">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search hadith by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
          />
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-stone-500 dark:text-stone-400">Search Results</h2>
          <div className="space-y-3">
            {searchResults.map((h: any, i: number) => (
              <Link key={i} href={`/hadith/${h.collection}?n=${h.hadithNumber}`}>
                <div className="rounded-2xl border border-stone-200 bg-white p-4 transition-all hover:border-emerald-200 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900">
                  <p className="text-sm text-stone-700 dark:text-stone-300 line-clamp-3">{h.text}</p>
                  <p className="mt-2 text-xs text-stone-400">#{h.hadithNumber} · {h.collection}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {collections.map((col) => (
          <Link key={col.id} href={`/hadith/${col.id}`}>
            <div className="group rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-200 hover:border-amber-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-700">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">{col.name}</h3>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{col.full}</p>
                  <p className="mt-2 text-xs text-stone-400 dark:text-stone-500">{col.hadithCount.toLocaleString()} hadith</p>
                </div>
                <ArrowRight className="h-5 w-5 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-amber-500 dark:text-stone-500" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
