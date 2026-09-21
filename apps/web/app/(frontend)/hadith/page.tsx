"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { BookOpen, Search, ArrowRight, Sparkles, CheckCircle2, Bookmark } from "lucide-react"

interface CollectionInfo {
  id: string
  name: string
  bnName: string
  arabicName: string
  full: string
  hadithCount: number
  reliability: string
}

const COLLECTIONS: CollectionInfo[] = [
  {
    id: "bukhari",
    name: "Sahih Bukhari",
    bnName: "সহীহ আল-বুখারী",
    arabicName: "صحيح البخاري",
    full: "Sahih al-Bukhari — Imam Muhammad al-Bukhari",
    hadithCount: 7563,
    reliability: "সহীহ (সর্বোচ্চ বিশুদ্ধ সংকলন)",
  },
  {
    id: "muslim",
    name: "Sahih Muslim",
    bnName: "সহীহ মুসলিম",
    arabicName: "صحيح مسلم",
    full: "Sahih Muslim — Imam Muslim ibn al-Hajjaj",
    hadithCount: 7500,
    reliability: "সহীহ (বিশুদ্ধ সংকলন)",
  },
  {
    id: "tirmidhi",
    name: "Jami` at-Tirmidhi",
    bnName: "জামে আত-তিরমিযী",
    arabicName: "جامع الترمذي",
    full: "Jami` at-Tirmidhi — Imam at-Tirmidhi",
    hadithCount: 3956,
    reliability: "সুনান ও জামে গ্রন্থ",
  },
  {
    id: "abudawud",
    name: "Sunan Abi Dawud",
    bnName: "সুনানে আবু দাউদ",
    arabicName: "سنن أبي داود",
    full: "Sunan Abi Dawud — Imam Abu Dawud",
    hadithCount: 5274,
    reliability: "সুনান (আহকাম সংক্রান্ত হাদিস)",
  },
  {
    id: "nasai",
    name: "Sunan an-Nasa'i",
    bnName: "সুনানে আন-নাসায়ী",
    arabicName: "سنن النسائي",
    full: "Sunan an-Nasa'i — Imam an-Nasa'i",
    hadithCount: 5758,
    reliability: "সুনান গ্রন্থ",
  },
  {
    id: "ibnmajah",
    name: "Sunan Ibn Majah",
    bnName: "সুনানে ইবনে মাজাহ",
    arabicName: "سنن ابن ماجه",
    full: "Sunan Ibn Majah — Imam Ibn Majah",
    hadithCount: 4341,
    reliability: "সুনান গ্রন্থ",
  },
  {
    id: "nawawi40",
    name: "40 Hadith Nawawi",
    bnName: "চল্লিশ হাদিস (ইমাম নববী)",
    arabicName: "الأربعون النووية",
    full: "An-Nawawi's 40 Hadith — Imam Yahya an-Nawawi",
    hadithCount: 42,
    reliability: "দ্বীনের মূলনীতি সংক্রান্ত সংকলন",
  },
]

interface HadithSearchHit {
  collection: string
  hadithNumber: number
  grade?: string | null
  translationBn?: string | null
  english?: string | null
  text?: string | null
}

export default function HadithPage() {
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState<HadithSearchHit[]>([])
  const [searching, setSearching] = useState(false)

  const handleSearch = async () => {
    if (!search.trim()) return
    setSearching(true)
    try {
      // UmmahAPI only accepts a single collection key (CSV lists return 0 results)
      const r = await fetch(`/api/hadith/search?q=${encodeURIComponent(search)}`)
      const d = await r.json()
      setSearchResults(d.hadiths || d.result?.hadiths || [])
    } catch {
      setSearchResults([])
    }
    setSearching(false)
  }

  const filteredCollections = COLLECTIONS.filter((col) =>
    col.name.toLowerCase().includes(search.toLowerCase()) ||
    col.bnName.includes(search) ||
    col.arabicName.includes(search) ||
    col.full.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-neutral-500/20 bg-gradient-to-br from-neutral-500/10 via-neutral-600/5 to-neutral-500/5 p-6 sm:p-8 dark:border-neutral-500/30 dark:from-neutral-950/40 dark:via-neutral-900/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-neutral-100/80 px-3 py-1 text-xs font-semibold text-neutral-900 dark:bg-neutral-900/40 dark:text-neutral-300">
              <Sparkles className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-400" />
              বিশুদ্ধ হাদিস সংকলন (Hadith Library)
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
              Hadith Collections
            </h1>
            <p className="mt-1 max-w-xl text-sm text-neutral-600 dark:text-neutral-400">
              Explore authentic narrations from the Prophet Muhammad (ﷺ) with Arabic text, Bangla & English translations, and narration chains.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-neutral-500/20 bg-white/80 p-4 text-center backdrop-blur dark:border-neutral-500/30 dark:bg-neutral-900/80">
              <span className="block text-2xl font-bold text-neutral-700 dark:text-neutral-400">7</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">কিতাব / Books</span>
            </div>
            <div className="rounded-2xl border border-neutral-500/20 bg-white/80 p-4 text-center backdrop-blur dark:border-neutral-500/30 dark:bg-neutral-900/80">
              <span className="block text-2xl font-bold text-neutral-700 dark:text-neutral-400">34,000+</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">হাদিস / Hadiths</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search hadith topics, keywords (e.g., prayer, intention, দান)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-10 pr-24 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
          />
          <button
            onClick={handleSearch}
            disabled={searching}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-neutral-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-neutral-700 disabled:opacity-50"
          >
            {searching ? "খোঁজা হচ্ছে..." : "Search"}
          </button>
        </div>
      </div>

      {/* Search Results if any */}
      {searchResults.length > 0 && (
        <div className="mb-10 rounded-3xl border border-neutral-200 bg-white/60 p-6 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
          <h2 className="mb-4 text-sm font-bold text-neutral-700 dark:text-neutral-300">
            অনুসন্ধানের ফলাফল ({searchResults.length})
          </h2>
          <div className="space-y-3">
            {searchResults.map((h, i: number) => (
              <Link key={i} href={`/hadith/${h.collection}?n=${h.hadithNumber}`}>
                <div className="rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:border-neutral-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="mb-1 flex items-center justify-between text-xs text-neutral-700 dark:text-neutral-400">
                    <span className="font-semibold uppercase">{h.collection} #{h.hadithNumber}</span>
                    <span>{h.grade || "Sahih"}</span>
                  </div>
                  <p className="line-clamp-2 text-sm text-neutral-800 dark:text-neutral-200">{h.translationBn || h.english || h.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Collections Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCollections.map((col) => (
          <Link key={col.id} href={`/hadith/${col.id}`}>
            <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-neutral-200/80 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-400/80 hover:shadow-xl dark:border-neutral-800/80 dark:bg-neutral-900/90 dark:hover:border-neutral-500/50">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="rounded-2xl bg-neutral-50 p-3 text-neutral-700 dark:bg-neutral-950/50 dark:text-neutral-400">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <span className="font-arabic text-xl text-neutral-400 group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-400">
                    {col.arabicName}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  {col.name}
                </h3>
                <p className="text-xs font-medium text-neutral-700 dark:text-neutral-400">
                  {col.bnName}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {col.full}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                  {col.hadithCount.toLocaleString()} হাদিস
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-700 transition-transform group-hover:translate-x-1 dark:text-neutral-400">
                  অধ্যায় পড়ুন <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
