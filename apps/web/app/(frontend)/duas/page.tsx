"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  Sparkles,
  Search,
  BookOpen,
  Volume2,
  Bookmark,
  Share2,
  Check,
  Heart,
  Copy,
  BookMarked,
  Layers,
  HelpCircle,
} from "lucide-react"
import { AUTHENTIC_DUAS_COLLECTION, DUA_CATEGORIES, DuaItem } from "@/lib/duas-data"
import { Button } from "@/components/ui/button"

export default function DuasCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [bookmarkedDuas, setBookmarkedDuas] = useState<string[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("noor_bookmarked_duas")
      if (saved) setBookmarkedDuas(JSON.parse(saved))
    } catch {}
  }, [])

  const toggleBookmark = (id: string) => {
    const updated = bookmarkedDuas.includes(id)
      ? bookmarkedDuas.filter((d) => d !== id)
      : [...bookmarkedDuas, id]
    setBookmarkedDuas(updated)
    try {
      localStorage.setItem("noor_bookmarked_duas", JSON.stringify(updated))
    } catch {}
  }

  const handleCopy = (dua: DuaItem) => {
    const text = `${dua.titleBn}\n\n${dua.arabic}\n\nউচ্চারণ: ${dua.transliterationBn}\nঅর্থ: ${dua.translationBn}\n\nসূত্র: ${dua.reference}\nনূর ইসলামিক লাইব্রেরি`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(dua.id)
        setTimeout(() => setCopiedId(null), 2000)
      })
    }
  }

  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "ar-SA"
      window.speechSynthesis.speak(utterance)
    }
  }

  const filteredDuas = AUTHENTIC_DUAS_COLLECTION.filter((item) => {
    const matchCategory =
      selectedCategory === "all" ||
      (selectedCategory === "saved" && bookmarkedDuas.includes(item.id)) ||
      item.category === selectedCategory

    const q = searchQuery.toLowerCase().trim()
    const matchQuery =
      !q ||
      item.titleBn.toLowerCase().includes(q) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.translationBn.toLowerCase().includes(q) ||
      item.transliterationBn.toLowerCase().includes(q) ||
      item.arabic.includes(q) ||
      item.reference.toLowerCase().includes(q)

    return matchCategory && matchQuery
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header Banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-stone-900/10 to-amber-950/20 p-6 sm:p-10 backdrop-blur-xl dark:border-emerald-500/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              কুরআন ও সুন্নাহর দু'আ ভাণ্ডার (Dua & Azkar Center)
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
              মাসনূন দু&apos;আ ও আযকার সংকলন
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              ৪০টি কুরআনী রাব্বানা দু&apos;আ, সকাল-সন্ধ্যার জিকির, সাইয়্যিদুল ইস্তিগফার, রোগমুক্তি, রিজিক বৃদ্ধি ও জীবনের সকল মুহূর্তের সহীহ দু&apos;আ আরবী, উচ্চারণ ও অর্থসহ।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/hisnul-muslim"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-white/80 px-4 py-2.5 text-xs font-bold text-emerald-800 shadow-sm hover:bg-emerald-50 dark:bg-stone-900/80 dark:text-emerald-300 transition-all"
            >
              <BookMarked className="h-4 w-4" /> হিসনুল মুসলিম (মুমিনের দুর্গ)
            </Link>
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {DUA_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition-all ${
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-md"
                    : "border border-stone-200 bg-white/80 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-300"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.labelBn}</span>
              </button>
            ))}

            <button
              onClick={() => setSelectedCategory("saved")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition-all ${
                selectedCategory === "saved"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "border border-stone-200 bg-white/80 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-300"
              }`}
            >
              <span>🔖</span>
              <span>সংরক্ষিত ({bookmarkedDuas.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="দু'আ বা বিষয় খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-white/80 py-2 pl-9 pr-4 text-xs font-medium backdrop-blur focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-100"
            />
          </div>
        </div>
      </div>

      {/* Duas Cards List */}
      <div className="space-y-6">
        {filteredDuas.map((dua) => {
          const isSaved = bookmarkedDuas.includes(dua.id)
          const isCopied = copiedId === dua.id

          return (
            <div
              key={dua.id}
              className="group relative rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-xl transition-all duration-200 hover:shadow-lg dark:border-stone-800/80 dark:bg-stone-900/90 sm:p-8"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/50 pb-4 dark:border-stone-800/50">
                <div className="flex items-center gap-2">
                  <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {dua.categoryLabelBn}
                  </span>
                  {dua.recommendedCount && (
                    <span className="rounded-xl bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                      পঠিতব্য: {dua.recommendedCount} বার
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSpeak(dua.arabic)}
                    title="আরবী উচ্চারণ শুনুন"
                    className="rounded-xl p-2 text-stone-400 hover:bg-stone-100 hover:text-emerald-600 dark:hover:bg-stone-800"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleCopy(dua)}
                    title="দু'আ কপি করুন"
                    className="rounded-xl p-2 text-stone-400 hover:bg-stone-100 hover:text-emerald-600 dark:hover:bg-stone-800"
                  >
                    {isCopied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>

                  <button
                    onClick={() => toggleBookmark(dua.id)}
                    title="বুকমার্ক করুন"
                    className={`rounded-xl p-2 transition-colors ${
                      isSaved
                        ? "text-emerald-600 hover:text-emerald-700"
                        : "text-stone-400 hover:bg-stone-100 hover:text-emerald-600 dark:hover:bg-stone-800"
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Title & Arabic */}
              <div className="mt-4">
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {dua.titleBn}
                </h3>

                <div className="my-5 rounded-2xl bg-emerald-50/40 p-5 text-center dark:bg-emerald-950/20 sm:p-7">
                  <p className="arabic text-2xl font-bold leading-loose text-stone-900 dark:text-stone-100 sm:text-3xl" dir="rtl">
                    {dua.arabic}
                  </p>
                </div>

                {/* Transliteration & Translation */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="rounded-2xl bg-stone-50 p-4 dark:bg-stone-800/50">
                    <p className="font-semibold text-stone-700 dark:text-stone-300">
                      <span className="font-bold text-emerald-600">উচ্চারণ:</span> {dua.transliterationBn}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-stone-200/60 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
                    <p className="leading-relaxed text-stone-800 dark:text-stone-200">
                      <span className="font-bold text-emerald-600">বাংলা অর্থ:</span> {dua.translationBn}
                    </p>
                  </div>
                </div>

                {/* Benefits & References */}
                <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-amber-50/50 p-4 text-xs dark:bg-amber-950/20 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-amber-900 dark:text-amber-200">
                    <span className="font-bold">ফজিলত ও আমল:</span> {dua.benefitBn}
                  </p>
                  <span className="shrink-0 font-medium text-stone-500 dark:text-stone-400">
                    সূত্র: {dua.reference}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
