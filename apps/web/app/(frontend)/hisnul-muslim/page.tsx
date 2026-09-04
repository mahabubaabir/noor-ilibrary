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
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-1 text-xs font-bold text-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white">
              <ShieldCheck className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
              হিসনুল মুসলিম (Fortress of the Muslim)
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              হিসনুল মুসলিম — মুমিনের দুর্গ
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              শায়েখ সাঈদ ইবনে আলী আল-ক্বাহত্বানী (রহ.) সংকলিত প্রাত্যহিক জীবনের সকল মুহূর্তের অত্যন্ত নির্ভরযোগ্য সহীহ মাসনূন দু&apos;আ ও জিকির।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/duas"
              className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-all"
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
          <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
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
                        ? "bg-neutral-900 text-white shadow-md dark:bg-white dark:text-neutral-900"
                        : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{chapter.icon}</span>
                      <span>{chapter.titleBn}</span>
                    </div>
                    <span
                      className={`text-[10px] ${
                        isActive ? "text-neutral-300 dark:text-neutral-700" : "text-neutral-400"
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
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="হিসনুল মুসলিম থেকে যেকোনো দু'আ খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
            />
          </div>

          {/* Chapter Title Badge */}
          {!searchQuery.trim() && (
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
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
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <h3 className="font-bold text-neutral-900 dark:text-white text-xs sm:text-sm">
                      {dua.titleBn}
                    </h3>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeak(dua.arabic)}
                        title="আরবী শুনুন"
                        className="rounded-xl p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleCopy(dua.id, copyText)}
                        title="কপি করুন"
                        className="rounded-xl p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
                      >
                        {isCopied ? <Check className="h-4 w-4 text-neutral-900 dark:text-white" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Arabic Display */}
                  <div className="my-4 rounded-2xl bg-neutral-50 border border-neutral-200 p-5 text-center dark:bg-neutral-900 dark:border-neutral-800">
                    <p className="arabic text-2xl font-bold leading-loose text-neutral-900 dark:text-white sm:text-3xl" dir="rtl">
                      {dua.arabic}
                    </p>
                  </div>

                  {/* Transliteration & Translation */}
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-3.5 dark:bg-neutral-900 dark:border-neutral-800">
                      <p className="font-semibold text-neutral-700 dark:text-neutral-300">
                        <span className="font-bold text-neutral-900 dark:text-white">উচ্চারণ:</span> {dua.transliterationBn}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-neutral-200 bg-white p-3.5 dark:border-neutral-800 dark:bg-neutral-950">
                      <p className="leading-relaxed text-neutral-800 dark:text-neutral-200">
                        <span className="font-bold text-neutral-900 dark:text-white">অর্থ:</span> {dua.translationBn}
                      </p>
                    </div>
                  </div>

                  {/* Instruction or Reference */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500">
                    {dua.instructionBn && (
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">
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
