"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  Sparkles,
  Search,
  BookOpen,
  Volume2,
  CheckCircle2,
  Bookmark,
  Share2,
  Check,
  X,
  Heart,
  Info,
  ArrowRight,
} from "lucide-react"
import { ALLAH_99_NAMES, AllahName } from "@/lib/allah-names-data"
import { Button } from "@/components/ui/button"

import { playSafeSpeech } from "@/lib/audio/audio-player-engine"

export default function NamesOfAllahPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedName, setSelectedName] = useState<AllahName | null>(null)
  const [memorizedNames, setMemorizedNames] = useState<number[]>([])
  const [favoriteNames, setFavoriteNames] = useState<number[]>([])
  const [copied, setCopied] = useState(false)
  const [speakingNumber, setSpeakingNumber] = useState<number | null>(null)

  // Load memorized and favorites from localStorage
  useEffect(() => {
    try {
      const savedMemorized = localStorage.getItem("noor_memorized_allah_names")
      if (savedMemorized) setMemorizedNames(JSON.parse(savedMemorized))

      const savedFavorites = localStorage.getItem("noor_favorite_allah_names")
      if (savedFavorites) setFavoriteNames(JSON.parse(savedFavorites))
    } catch {}
  }, [])

  const toggleMemorized = (number: number, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const updated = memorizedNames.includes(number)
      ? memorizedNames.filter((n) => n !== number)
      : [...memorizedNames, number]
    setMemorizedNames(updated)
    try {
      localStorage.setItem("noor_memorized_allah_names", JSON.stringify(updated))
    } catch {}
  }

  const toggleFavorite = (number: number, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const updated = favoriteNames.includes(number)
      ? favoriteNames.filter((n) => n !== number)
      : [...favoriteNames, number]
    setFavoriteNames(updated)
    try {
      localStorage.setItem("noor_favorite_allah_names", JSON.stringify(updated))
    } catch {}
  }

  const handleSpeak = (name: AllahName) => {
    if (speakingNumber === name.number) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
      setSpeakingNumber(null)
      return
    }

    setSpeakingNumber(name.number)
    playSafeSpeech({
      text: `${name.arabic}. ${name.transliterationBn}.`,
      lang: "ar-SA",
      onEnd: () => setSpeakingNumber(null),
      onError: () => setSpeakingNumber(null),
    })
  }

  const handleShare = (name: AllahName) => {
    const text = `${name.arabic} (${name.transliterationBn}) — ${name.meaningBn}\nব্যাখ্যা: ${name.explanationBn}\nদলিল: ${name.quranReference}\nনূর ইসলামিক লাইব্রেরি`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  const filteredNames = ALLAH_99_NAMES.filter((item) => {
    const matchCategory =
      selectedCategory === "all" ||
      (selectedCategory === "memorized" && memorizedNames.includes(item.number)) ||
      (selectedCategory === "favorites" && favoriteNames.includes(item.number)) ||
      item.category === selectedCategory

    const q = searchQuery.toLowerCase().trim()
    const matchQuery =
      !q ||
      item.transliterationBn.toLowerCase().includes(q) ||
      item.transliterationEn.toLowerCase().includes(q) ||
      item.meaningBn.toLowerCase().includes(q) ||
      item.meaningEn.toLowerCase().includes(q) ||
      item.arabic.includes(q) ||
      String(item.number) === q

    return matchCategory && matchQuery
  })

  const progressPercent = Math.round((memorizedNames.length / 99) * 100)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Hero Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-stone-900/10 to-amber-950/20 p-6 sm:p-10 backdrop-blur-xl dark:border-emerald-500/30">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              আসমাউল হুসনা (Asma ul Husna)
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
              আল্লাহর ৯৯টি সুন্দর নাম (99 Names of Allah)
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              রাসূলুল্লাহ ﷺ বলেছেন: &ldquo;নিশ্চয়ই আল্লাহর ৯৯টি নাম রয়েছে, যে ব্যক্তি তা মুখস্থ করবে ও অনুধাবন করবে, সে জান্নাতে প্রবেশ করবে।&rdquo; (সহীহ বুখারী)
            </p>
          </div>

          {/* Memorization Progress Card */}
          <div className="w-full lg:w-72 rounded-2xl border border-emerald-500/30 bg-white/80 p-4 shadow-sm backdrop-blur dark:bg-stone-900/80">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-stone-700 dark:text-stone-300">মুখস্থের অগ্রগতি</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {memorizedNames.length} / 99 ({progressPercent}%)
              </span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-stone-500">
              প্রতিটি কার্ডে টিক চিহ্নে ক্লিক করে মুখস্থ চিহ্নিত করুন।
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-xl px-3.5 py-2 transition-all ${
                selectedCategory === "all"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "border border-stone-200 bg-white/80 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-300"
              }`}
            >
              সকল নাম (৯৯)
            </button>
            <button
              onClick={() => setSelectedCategory("memorized")}
              className={`rounded-xl px-3.5 py-2 transition-all ${
                selectedCategory === "memorized"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "border border-stone-200 bg-white/80 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-300"
              }`}
            >
              ✅ মুখস্থকৃত ({memorizedNames.length})
            </button>
            <button
              onClick={() => setSelectedCategory("favorites")}
              className={`rounded-xl px-3.5 py-2 transition-all ${
                selectedCategory === "favorites"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "border border-stone-200 bg-white/80 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-300"
              }`}
            >
              ❤️ প্রিয় তালিকা ({favoriteNames.length})
            </button>
            <button
              onClick={() => setSelectedCategory("mercy")}
              className={`rounded-xl px-3.5 py-2 transition-all ${
                selectedCategory === "mercy"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "border border-stone-200 bg-white/80 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-300"
              }`}
            >
              দয়া ও করুণা
            </button>
            <button
              onClick={() => setSelectedCategory("power")}
              className={`rounded-xl px-3.5 py-2 transition-all ${
                selectedCategory === "power"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "border border-stone-200 bg-white/80 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-300"
              }`}
            >
              ক্ষমতা ও আধিপত্য
            </button>
            <button
              onClick={() => setSelectedCategory("creation")}
              className={`rounded-xl px-3.5 py-2 transition-all ${
                selectedCategory === "creation"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "border border-stone-200 bg-white/80 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-300"
              }`}
            >
              সৃষ্টি ও প্রতিপালন
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="নাম বা অর্থ খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-white/80 py-2 pl-9 pr-4 text-xs font-medium backdrop-blur focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-100"
            />
          </div>
        </div>
      </div>

      {/* Grid of 99 Names */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredNames.map((item) => {
          const isMemorized = memorizedNames.includes(item.number)
          const isFavorite = favoriteNames.includes(item.number)

          return (
            <div
              key={item.number}
              onClick={() => setSelectedName(item)}
              className={`group relative flex cursor-pointer flex-col justify-between rounded-3xl border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                isMemorized
                  ? "border-emerald-500/60 bg-emerald-50/40 dark:border-emerald-500/40 dark:bg-emerald-950/20"
                  : "border-stone-200/80 bg-white/80 dark:border-stone-800/80 dark:bg-stone-900/80"
              }`}
            >
              <div>
                {/* Card Top Row: Number & Actions */}
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-100 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                    {item.number}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSpeak(item)
                      }}
                      title="আরবী উচ্চারণ শুনুন"
                      className={`rounded-lg p-1.5 transition-all ${
                        speakingNumber === item.number
                          ? "bg-emerald-100 text-emerald-700 animate-pulse dark:bg-emerald-950/80 dark:text-emerald-300 ring-2 ring-emerald-500/40"
                          : "text-stone-400 hover:bg-stone-100 hover:text-emerald-600 dark:hover:bg-stone-800"
                      }`}
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>

                    <button
                      onClick={(e) => toggleFavorite(item.number, e)}
                      title="প্রিয় তালিকা"
                      className={`rounded-lg p-1.5 transition-colors ${
                        isFavorite
                          ? "text-red-500 hover:text-red-600"
                          : "text-stone-400 hover:bg-stone-100 hover:text-red-500 dark:hover:bg-stone-800"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                    </button>

                    <button
                      onClick={(e) => toggleMemorized(item.number, e)}
                      title={isMemorized ? "মুখস্থ সম্পন্ন হয়েছে" : "মুখস্থ চিহ্নিত করুন"}
                      className={`rounded-lg p-1.5 transition-colors ${
                        isMemorized
                          ? "text-emerald-600 hover:text-emerald-700"
                          : "text-stone-400 hover:bg-stone-100 hover:text-emerald-600 dark:hover:bg-stone-800"
                      }`}
                    >
                      <CheckCircle2 className={`h-4 w-4 ${isMemorized ? "fill-current text-white bg-emerald-600 rounded-full" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Arabic Name Showcase */}
                <div className="my-4 text-center">
                  <p className="arabic text-3xl font-bold tracking-wide text-stone-900 group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400" dir="rtl">
                    {item.arabic}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-stone-900 dark:text-stone-100">
                    {item.transliterationBn}{" "}
                    <span className="text-xs font-normal text-stone-500">
                      ({item.transliterationEn})
                    </span>
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {item.meaningBn}
                  </p>
                </div>

                <p className="line-clamp-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  {item.explanationBn}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-stone-200/50 pt-3 text-[11px] font-medium text-stone-500 dark:border-stone-800/50">
                <span className="rounded-lg bg-stone-100 px-2 py-0.5 dark:bg-stone-800">
                  {item.categoryLabelBn}
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  বিস্তারিত দেখুন <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detailed Modal Dialog */}
      {selectedName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-900 sm:p-8">
            <button
              onClick={() => setSelectedName(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <span className="inline-block rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                নাম নং #{selectedName.number} • {selectedName.categoryLabelBn}
              </span>

              <p className="arabic mt-4 text-5xl font-bold text-stone-900 dark:text-stone-100" dir="rtl">
                {selectedName.arabic}
              </p>

              <h2 className="mt-2 text-xl font-bold text-stone-900 dark:text-stone-100">
                {selectedName.transliterationBn}
              </h2>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {selectedName.meaningBn} • {selectedName.meaningEn}
              </p>
            </div>

            <div className="mt-6 space-y-4 text-xs leading-relaxed">
              <div className="rounded-2xl bg-stone-50 p-4 dark:bg-stone-800/60">
                <h4 className="font-bold text-stone-900 dark:text-stone-100">ব্যাখ্যা ও তাৎপর্য:</h4>
                <p className="mt-1.5 text-stone-600 dark:text-stone-300">
                  {selectedName.explanationBn}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/30">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200">কুরআনের দলিল ও সূত্র:</h4>
                <p className="mt-1 text-emerald-800 dark:text-emerald-300 font-medium">
                  {selectedName.quranReference}
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50/60 p-4 dark:bg-amber-950/20">
                <h4 className="font-bold text-amber-900 dark:text-amber-200">আমল ও ফজিলত:</h4>
                <p className="mt-1 text-amber-800 dark:text-amber-300">
                  {selectedName.benefitBn}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-between border-t border-stone-200/60 pt-4 dark:border-stone-800/60">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSpeak(selectedName)}
                className={`gap-2 text-xs rounded-xl transition-all ${
                  speakingNumber === selectedName.number
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 animate-pulse"
                    : ""
                }`}
              >
                <Volume2 className="h-4 w-4 text-emerald-600" />
                {speakingNumber === selectedName.number ? "উচ্চারণ হচ্ছে..." : "উচ্চারণ শুনুন"}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare(selectedName)}
                  className="gap-1.5 text-xs rounded-xl"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
                  {copied ? "কপি হয়েছে" : "শেয়ার"}
                </Button>

                <Button
                  size="sm"
                  onClick={() => toggleMemorized(selectedName.number)}
                  className={`gap-1.5 text-xs rounded-xl font-bold ${
                    memorizedNames.includes(selectedName.number)
                      ? "bg-emerald-700 text-white"
                      : "bg-emerald-600 text-white"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {memorizedNames.includes(selectedName.number) ? "মুখস্থকৃত" : "মুখস্থ চিহ্নিত করুন"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
