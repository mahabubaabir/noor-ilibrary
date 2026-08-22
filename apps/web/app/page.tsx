"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  BookOpen,
  Library,
  Search,
  Sparkles,
  Compass,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  Share2,
  Heart,
  Calendar,
  Newspaper,
  BookMarked,
  CheckCircle2,
  Coins,
  ShieldCheck,
} from "lucide-react"
import type { DailyHadithItem } from "@/lib/daily-hadith"

export default function HomePage() {
  const [dailyHadith, setDailyHadith] = useState<DailyHadithItem | null>(null)
  const [hadithIndex, setHadithIndex] = useState(0)
  const [totalHadiths, setTotalHadiths] = useState(10)
  const [loadingHadith, setLoadingHadith] = useState(true)
  const [isManual, setIsManual] = useState(false)
  const [copied, setCopied] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [languageMode, setLanguageMode] = useState<"bn" | "ar+bn" | "all">("bn")
  const [latestPosts, setLatestPosts] = useState<any[]>([])

  const fetchHadith = async (index?: number, action?: string) => {
    setLoadingHadith(true)
    try {
      let url = "/api/hadith/daily"
      const params = new URLSearchParams()
      if (typeof index === "number") params.set("index", String(index))
      if (action) params.set("action", action)
      if (params.toString()) url += `?${params.toString()}`

      const r = await fetch(url)
      const d = await r.json()
      if (d.hadith) {
        setDailyHadith(d.hadith)
        setHadithIndex(d.currentIndex ?? 0)
        setTotalHadiths(d.totalCount ?? 10)
      }
    } catch {
      // Ignored
    }
    setLoadingHadith(false)
  }

  useEffect(() => {
    fetchHadith()

    // Fetch latest blog posts
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => {
        if (d.posts) setLatestPosts(d.posts.slice(0, 3))
      })
      .catch(() => undefined)
  }, [])

  const handleNextHadith = () => {
    setIsManual(true)
    const next = (hadithIndex + 1) % totalHadiths
    fetchHadith(next)
  }

  const handleAutoReset = () => {
    setIsManual(false)
    fetchHadith()
  }

  const handleCopyHadith = async () => {
    if (!dailyHadith) return
    const text = [
      dailyHadith.arabic,
      `[বাংলা অনুবাদ]: ${dailyHadith.bangla}`,
      dailyHadith.english ? `[English]: ${dailyHadith.english}` : null,
      `— ${dailyHadith.collectionName} #${dailyHadith.hadithNumber} (${dailyHadith.narrator || "রাসূলুল্লাহ ﷺ"})`,
    ]
      .filter(Boolean)
      .join("\n\n")

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignored
    }
  }

  const handleShareHadith = async () => {
    if (!dailyHadith) return
    const text = `${dailyHadith.bangla}\n\n— ${dailyHadith.collectionName} #${dailyHadith.hadithNumber}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: "দৈনিক হাদিস - নূর ইসলামিক লাইব্রেরি",
          text,
        })
      } catch {
        // Cancelled
      }
    } else {
      handleCopyHadith()
    }
  }

  const handleBookmarkHadith = async () => {
    if (!dailyHadith) return
    try {
      const r = await fetch("/api/library/hadith-bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: dailyHadith.collection,
          hadithNumber: dailyHadith.hadithNumber,
          arabic: dailyHadith.arabic,
          english: dailyHadith.english,
          grade: dailyHadith.grade || "Sahih",
          translationBn: dailyHadith.bangla,
        }),
      })
      if (r.ok) setBookmarked(true)
    } catch {
      // Ignored
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      {/* Hero Section */}
      <div className="mb-14 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/80 px-4 py-1.5 text-xs font-bold text-emerald-800 backdrop-blur dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300">
          <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          নূর ইসলামিক ডিজিটাল লাইব্রেরি (Noor Islamic Library)
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 sm:text-6xl">
          পবিত্র কুরআন ও সুন্নাহর{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-amber-400">
            নিয়মিত পাঠাগার
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-300 sm:text-lg">
          সহজ ও বিশুদ্ধ বাংলা ও ইংরেজি অনুবাদে কুরআন তিলাওয়াত, বিশুদ্ধ হাদিস গ্রন্থসমূহ, তাফসীর, আসমাউল হুসনা ও মাসনূন দু&apos;আ সংকলনের আধুনিক ডিজিটাল প্ল্যাটফর্ম।
        </p>

        {/* Quick Action Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/quran"
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-95"
          >
            <BookOpen className="h-4 w-4" /> কুরআন মাজীদ পড়ুন
          </Link>
          <Link
            href="/names-of-allah"
            className="inline-flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-50/80 px-5 py-3 text-sm font-bold text-amber-900 shadow-sm hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200 transition-all active:scale-95"
          >
            <Sparkles className="h-4 w-4 text-amber-500" /> আল্লাহর ৯৯টি নাম
          </Link>
          <Link
            href="/duas"
            className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-5 py-3 text-sm font-bold text-stone-800 shadow-sm hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 transition-all active:scale-95"
          >
            <Heart className="h-4 w-4 text-emerald-600" /> দু&apos;আ ও আযকার
          </Link>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-5 py-3 text-sm font-bold text-stone-800 shadow-sm hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 transition-all active:scale-95"
          >
            <BookMarked className="h-4 w-4 text-emerald-600" /> জীবনগাঁথা ও ইতিহাস
          </Link>
        </div>
      </div>

      {/* DYNAMIC HADITH OF THE DAY CARD */}
      <div className="relative mb-16 overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 p-6 shadow-xl backdrop-blur sm:p-8 dark:border-amber-500/30 dark:from-stone-900 dark:via-stone-900 dark:to-amber-950/20">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/60 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-md">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  দৈনিক নির্বাচিত হাদিস (Hadith of the Day)
                </h2>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    isManual
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                      : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                  }`}
                >
                  {isManual ? "ম্যানুয়াল ব্রাউজিং (Manual)" : "আজকের নির্ধারিত হাদিস (Auto Daily)"}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {dailyHadith?.topic || "দৈনন্দিন জীবনে রসূলুল্লাহ (ﷺ)-এর দিকনির্দেশনা"}
              </p>
            </div>
          </div>

          {/* Controls: Next/Shuffle, Language mode */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-xl bg-stone-100 p-1 dark:bg-stone-800">
              <button
                onClick={() => setLanguageMode("bn")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  languageMode === "bn"
                    ? "bg-white text-amber-800 shadow-sm dark:bg-stone-700 dark:text-amber-300"
                    : "text-stone-500 hover:text-stone-800 dark:text-stone-400"
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguageMode("ar+bn")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  languageMode === "ar+bn"
                    ? "bg-white text-amber-800 shadow-sm dark:bg-stone-700 dark:text-amber-300"
                    : "text-stone-500 hover:text-stone-800 dark:text-stone-400"
                }`}
              >
                আরবি + বাংলা
              </button>
              <button
                onClick={() => setLanguageMode("all")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  languageMode === "all"
                    ? "bg-white text-amber-800 shadow-sm dark:bg-stone-700 dark:text-amber-300"
                    : "text-stone-500 hover:text-stone-800 dark:text-stone-400"
                }`}
              >
                সব (All)
              </button>
            </div>

            <button
              onClick={handleNextHadith}
              disabled={loadingHadith}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300/80 bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-900 shadow-sm hover:bg-amber-100 active:scale-95 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
              title="অন্য হাদিস দেখুন"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loadingHadith ? "animate-spin" : ""}`} />
              পরবর্তী হাদিস ({hadithIndex + 1}/{totalHadiths})
            </button>

            {isManual && (
              <button
                onClick={handleAutoReset}
                className="rounded-xl border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
              >
                আজকের মূল হাদিসে ফিরুন
              </button>
            )}
          </div>
        </div>

        {/* Hadith Content Display */}
        {loadingHadith && !dailyHadith ? (
          <div className="py-12 text-center text-xs text-stone-400">হাদিস লোড হচ্ছে...</div>
        ) : dailyHadith ? (
          <div className="space-y-4">
            {(languageMode === "ar+bn" || languageMode === "all") && (
              <div className="rounded-2xl bg-amber-50/60 p-4 dark:bg-stone-800/80">
                <p className="arabic text-xl leading-loose text-stone-900 dark:text-stone-100 text-right" dir="rtl">
                  {dailyHadith.arabic}
                </p>
              </div>
            )}

            <div className="rounded-2xl bg-white/80 p-5 shadow-sm dark:bg-stone-800/50">
              <p className="text-sm sm:text-base leading-relaxed text-stone-800 dark:text-stone-100 font-medium">
                {dailyHadith.bangla}
              </p>
            </div>

            {languageMode === "all" && dailyHadith.english && (
              <div className="rounded-2xl border border-stone-200/60 bg-stone-50/60 p-4 dark:border-stone-800 dark:bg-stone-800/30">
                <p className="text-xs italic leading-relaxed text-stone-600 dark:text-stone-400">
                  {dailyHadith.english}
                </p>
              </div>
            )}

            {/* Hadith Meta & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-amber-200/40 pt-4 text-xs dark:border-stone-800">
              <div className="flex flex-wrap items-center gap-2 text-stone-500 dark:text-stone-400">
                <span className="font-bold text-amber-900 dark:text-amber-300">
                  {dailyHadith.collectionName} • হাদিস নং {dailyHadith.hadithNumber}
                </span>
                <span>•</span>
                <span>বর্ণনাকারী: {dailyHadith.narrator || "সাহাবী (রাঃ)"}</span>
                <span>•</span>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {dailyHadith.grade || "সহীহ"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleBookmarkHadith}
                  disabled={bookmarked}
                  className={`inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                    bookmarked
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : "border-stone-200 bg-white text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                  }`}
                >
                  {bookmarked ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> সংরক্ষিত
                    </>
                  ) : (
                    <>
                      <Heart className="h-3.5 w-3.5 text-stone-400" /> বুকমার্ক
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyHadith}
                  className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "কপি হয়েছে" : "কপি"}
                </button>

                <button
                  onClick={handleShareHadith}
                  className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300"
                >
                  <Share2 className="h-3.5 w-3.5" /> শেয়ার
                </button>

                <Link
                  href={`/hadith/${dailyHadith.collection}?n=${dailyHadith.hadithNumber}`}
                  className="inline-flex items-center gap-1 rounded-xl bg-amber-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-amber-700"
                >
                  বিস্তারিত পড়ুন <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* EXPLORE OUR ONLINE ISLAMIC RESOURCES (অনলাইন ইসলামিক রিসোর্স ও ফিচারসমূহ) */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            ONLINE ISLAMIC RESOURCES
          </span>
          <h2 className="mt-2 text-2xl font-extrabold text-stone-900 dark:text-stone-100 sm:text-4xl">
            অনলাইন ইসলামিক রিসোর্স ও ফিচারসমূহ
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            কুরআন, হাদিস, আসমাউল হুসনা, মাসনূন দু&apos;আ, নবীজি ও সাহাবীদের জীবনগাঁথা এবং প্রাত্যহিক ইসলামিক টুলস।
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* 1. INTERACTIVE QURAN */}
          <Link href="/quran" className="group">
            <div className="relative h-full flex flex-col justify-between rounded-3xl border border-sky-200/80 bg-gradient-to-b from-sky-50/70 to-white/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-xl dark:border-sky-950 dark:from-sky-950/20 dark:to-stone-900/90">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400 shadow-sm">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-sky-600 group-hover:text-white dark:bg-stone-800 dark:text-stone-300">
                    ↗
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 group-hover:text-sky-700 dark:group-hover:text-sky-400">
                  ইন্টারেক্টিভ কুরআন (INTERACTIVE QURAN)
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  আরবী তিলাওয়াত, বাংলা ও ইংরেজি অনুবাদ, অডিও এবং তাফসীর ইবনে কাসীর সহ ১১৪টি সূরা অধ্যয়ন করুন।
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-400">
                কুরআন পাঠাগার খুলুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* 2. COMPANION & LIFE STORIES */}
          <Link href="/stories" className="group">
            <div className="relative h-full flex flex-col justify-between rounded-3xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/70 to-white/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl dark:border-emerald-950 dark:from-emerald-950/20 dark:to-stone-900/90">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 shadow-sm">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-emerald-600 group-hover:text-white dark:bg-stone-800 dark:text-stone-300">
                    ↗
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                  সাহাবী ও মহামানবদের জীবনগাঁথা (COMPANION STORIES)
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  রাসূলুল্লাহ ﷺ ও খোলাফায়ে রাশেদীনের দীন, স্বাস্থ্য, দাম্পত্য, ব্যবসা ও সততার বাস্তব গল্প ই-বুক রিডারে পাঠ করুন।
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                জীবনগাঁথা পাঠ শুরু করুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* 3. 99 NAMES OF ALLAH */}
          <Link href="/names-of-allah" className="group">
            <div className="relative h-full flex flex-col justify-between rounded-3xl border border-amber-200/80 bg-gradient-to-b from-amber-50/70 to-white/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl dark:border-amber-950 dark:from-amber-950/20 dark:to-stone-900/90">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 shadow-sm font-bold text-lg">
                    ৯৯
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-amber-600 group-hover:text-white dark:bg-stone-800 dark:text-stone-300">
                    ↗
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                  আল্লাহর ৯৯টি সুন্দর নাম (99 NAMES OF ALLAH)
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  আসমাউল হুসনার প্রতিটি নামের আরবী, অর্থ, গভীর তাৎপর্য, কুরআনের দলিল ও মুখস্থ ট্র্যাকিং।
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                আসমাউল হুসনা শিখুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* 4. DUA & AZKAR COLLECTION */}
          <Link href="/duas" className="group">
            <div className="relative h-full flex flex-col justify-between rounded-3xl border border-indigo-200/80 bg-gradient-to-b from-indigo-50/70 to-white/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-xl dark:border-indigo-950 dark:from-indigo-950/20 dark:to-stone-900/90">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 shadow-sm">
                    <Heart className="h-6 w-6" />
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-indigo-600 group-hover:text-white dark:bg-stone-800 dark:text-stone-300">
                    ↗
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
                  দু&apos;আ ও আযকার সংকলন (DUA & AZKAR)
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  ৪০টি কুরআনী রাব্বানা দু&apos;আ, সকাল-সন্ধ্যার জিকির, সাইয়্যিদুল ইস্তিগফার, রোগমুক্তি ও ঋণমুক্তির দু&apos;আ।
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                দু&apos;আ ভাণ্ডার দেখুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* 5. HISNUL MUSLIM */}
          <Link href="/hisnul-muslim" className="group">
            <div className="relative h-full flex flex-col justify-between rounded-3xl border border-teal-200/80 bg-gradient-to-b from-teal-50/70 to-white/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:shadow-xl dark:border-teal-950 dark:from-teal-950/20 dark:to-stone-900/90">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400 shadow-sm">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-teal-600 group-hover:text-white dark:bg-stone-800 dark:text-stone-300">
                    ↗
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 group-hover:text-teal-700 dark:group-hover:text-teal-400">
                  হিসনুল মুসলিম (HISNUL MUSLIM)
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  ঘুম, ওযু, সালাত, খাবার, সফর ও প্রাত্যহিক জীবনের সকল মুহূর্তের সহীহ মাসনূন দু&apos;আ ও জিকির।
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400">
                মুমিনের দুর্গ অধ্যায়সমূহ <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* 6. DIGITAL TASBIH & ZAKAT TOOLS */}
          <Link href="/tasbih" className="group">
            <div className="relative h-full flex flex-col justify-between rounded-3xl border border-rose-200/80 bg-gradient-to-b from-rose-50/70 to-white/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-400 hover:shadow-xl dark:border-rose-950 dark:from-rose-950/20 dark:to-stone-900/90">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 shadow-sm">
                    <Coins className="h-6 w-6" />
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-rose-600 group-hover:text-white dark:bg-stone-800 dark:text-stone-300">
                    ↗
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-400">
                  ডিজিটাল তাসবীহ ও টুলস (TASBIH & TOOLS)
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  প্রতিদিনের যিকির গণনার জন্য স্মার্ট ডিজিটাল তাসবীহ এবং ২.৫% নিট সম্পদ হিসাবের সহজ যাকাত ক্যালকুলেটর।
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400">
                টুলস ব্যবহার করুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Latest Blog Posts Section */}
      {latestPosts.length > 0 && (
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                সাম্প্রতিক ইসলামিক প্রবন্ধ (Articles & Reflections)
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                কুরআন-হাদিসের আলোকে জীবন ঘনিষ্ঠ শিক্ষণীয় ব্লগ পোস্ট
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              সব প্রবন্ধ দেখুন <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="flex h-full flex-col justify-between rounded-3xl border border-stone-200/80 bg-white p-6 transition-all hover:border-emerald-300 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900">
                  <div>
                    <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                      {post.category}
                    </span>
                    <h3 className="mt-3 text-base font-bold text-stone-900 group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400">
                      {post.titleBn || post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-[11px] text-stone-400 dark:border-stone-800">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="font-semibold text-emerald-700 group-hover:underline dark:text-emerald-400">
                      পড়ুন →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
