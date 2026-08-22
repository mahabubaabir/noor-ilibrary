"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ShieldCheck,
  Search,
  BookOpen,
  Volume2,
  Copy,
  Check,
  Sparkles,
  ChevronRight,
  Bookmark,
  Share2,
} from "lucide-react"
import { HISNUL_MUSLIM_CHAPTERS } from "@/lib/hisnul-muslim-data"
import { Button } from "@/components/ui/button"

export default function HisnulMuslimPage() {
  const [selectedChapterId, setSelectedChapterId] = useState<string>("sleep-waking")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const activeChapter =
    HISNUL_MUSLIM_CHAPTERS.find((c) => c.id === selectedChapterId) ||
    HISNUL_MUSLIM_CHAPTERS[0]!

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(id)
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

  // Filter across all chapters if search query is entered
  const allDuas = HISNUL_MUSLIM_CHAPTERS.flatMap((c) =>
    c.duas.map((d) => ({ ...d, chapterTitleBn: c.titleBn, chapterIcon: c.icon }))
  )

  const filteredDuas = searchQuery.trim()
    ? allDuas.filter(
        (d) =>
          d.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.translationBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.transliterationBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.arabic.includes(searchQuery)
      )
    : activeChapter.duas.map((d) => ({
        ...d,
        chapterTitleBn: activeChapter.titleBn,
        chapterIcon: activeChapter.icon,
      }))

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header Banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-stone-900/10 to-amber-950/20 p-6 sm:p-10 backdrop-blur-xl dark:border-emerald-500/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              হিসনুল মুসলিম (Fortress of the Muslim)
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
              হিসনুল মুসলিম — মুমিনের দুর্গ
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              শায়েখ সাঈদ ইবনে আলী আল-ক্বাহত্বানী (রহ.) সংকলিত প্রাত্যহিক জীবনের সকল মুহূর্তের অত্যন্ত নির্ভরযোগ্য সহীহ মাসনূন দু&apos;আ ও জিকির।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/duas"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all"
            >
              <BookOpen className="h-4 w-4" /> দু&apos;আ ও আযকার কেন্দ্র
            </Link>
          </div>
        </div>
      </div>

      {/* Main Layout: Chapter Selector & Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Chapters Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl border border-stone-200/80 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-900/80">
            <h3 className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-stone-400">
              অধ্যায়সমূহ ({HISNUL_MUSLIM_CHAPTERS.length})
            </h3>

            <div className="space-y-1.5">
              {HISNUL_MUSLIM_CHAPTERS.map((chapter) => {
                const isActive = selectedChapterId === chapter.id && !searchQuery.trim()
                return (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      setSelectedChapterId(chapter.id)
                      setSearchQuery("")
                    }}
                    className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-3 text-left text-xs font-bold transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{chapter.icon}</span>
                      <span>{chapter.titleBn}</span>
                    </div>
                    <span
                      className={`text-[10px] ${
                        isActive ? "text-emerald-100" : "text-stone-400"
                      }`}
                    >
                      {chapter.duas.length} দু&apos;আ
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Duas Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="হিসনুল মুসলিম থেকে যেকোনো দু'আ খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-white/90 py-2.5 pl-10 pr-4 text-xs font-medium backdrop-blur focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900/90 dark:text-stone-100"
            />
          </div>

          {/* Chapter Title Badge */}
          {!searchQuery.trim() && (
            <div className="flex items-center gap-2 text-sm font-bold text-stone-800 dark:text-stone-200">
              <span className="text-lg">{activeChapter.icon}</span>
              <h2>{activeChapter.titleBn}</h2>
            </div>
          )}

          {/* Duas List */}
          <div className="space-y-4">
            {filteredDuas.map((dua) => {
              const isCopied = copiedId === dua.id
              const copyText = `${dua.titleBn}\n\n${dua.arabic}\n\nউচ্চারণ: ${dua.transliterationBn}\nঅর্থ: ${dua.translationBn}\n\nসূত্র: ${dua.reference}`

              return (
                <div
                  key={dua.id}
                  className="rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-xl transition-all hover:shadow-md dark:border-stone-800/80 dark:bg-stone-900/90"
                >
                  <div className="flex items-center justify-between border-b border-stone-200/50 pb-3 dark:border-stone-800/50">
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">
                      {dua.titleBn}
                    </h3>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeak(dua.arabic)}
                        title="আরবী শুনুন"
                        className="rounded-xl p-1.5 text-stone-400 hover:bg-stone-100 hover:text-emerald-600 dark:hover:bg-stone-800"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleCopy(dua.id, copyText)}
                        title="কপি করুন"
                        className="rounded-xl p-1.5 text-stone-400 hover:bg-stone-100 hover:text-emerald-600 dark:hover:bg-stone-800"
                      >
                        {isCopied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Arabic Display */}
                  <div className="my-4 rounded-2xl bg-emerald-50/40 p-5 text-center dark:bg-emerald-950/20">
                    <p className="arabic text-2xl font-bold leading-loose text-stone-900 dark:text-stone-100 sm:text-3xl" dir="rtl">
                      {dua.arabic}
                    </p>
                  </div>

                  {/* Transliteration & Translation */}
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="rounded-2xl bg-stone-50 p-3.5 dark:bg-stone-800/50">
                      <p className="font-semibold text-stone-700 dark:text-stone-300">
                        <span className="font-bold text-emerald-600">উচ্চারণ:</span> {dua.transliterationBn}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-stone-200/60 bg-white p-3.5 dark:border-stone-800 dark:bg-stone-900">
                      <p className="leading-relaxed text-stone-800 dark:text-stone-200">
                        <span className="font-bold text-emerald-600">অর্থ:</span> {dua.translationBn}
                      </p>
                    </div>
                  </div>

                  {/* Instruction or Reference */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
                    {dua.instructionBn && (
                      <span className="font-medium text-amber-700 dark:text-amber-300">
                        নিয়ম: {dua.instructionBn}
                      </span>
                    )}
                    <span className="ml-auto font-medium">সূত্র: {dua.reference}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
