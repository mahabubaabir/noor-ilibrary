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
          সহজ ও বিশুদ্ধ বাংলা ও ইংরেজি অনুবাদে কুরআন তিলাওয়াত, বিশুদ্ধ হাদিস গ্রন্থসমূহ, তাফসীর এবং ইসলামিক গবেষণাধর্মী প্রবন্ধের আধুনিক ডিজিটাল প্ল্যাটফর্ম।
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
            href="/stories"
            className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-5 py-3 text-sm font-bold text-stone-800 shadow-sm hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 transition-all active:scale-95"
          >
            <BookMarked className="h-4 w-4 text-emerald-600" /> জীবনগাঁথা ও ইতিহাস
          </Link>
          <Link
            href="/hadith"
            className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-5 py-3 text-sm font-bold text-stone-800 shadow-sm hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 transition-all active:scale-95"
          >
            <Library className="h-4 w-4" /> হাদিস সংকলন
          </Link>
        </div>
      </div>

      {/* DYNAMIC HADITH OF THE DAY CARD (Bangla + Auto/Manual Toggle) */}
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
            {/* Display language toggle */}
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

            {/* Manual Shuffle/Next Button */}
            <button
              onClick={handleNextHadith}
              disabled={loadingHadith}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300/80 bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-900 shadow-sm hover:bg-amber-100 active:scale-95 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
              title="অন্য হাদিস দেখুন"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loadingHadith ? "animate-spin" : ""}`} />
              পরবর্তী হাদিস (Next)
            </button>

            {isManual && (
              <button
                onClick={handleAutoReset}
                className="text-xs font-semibold text-stone-500 hover:underline dark:text-stone-400"
              >
                স্বয়ংক্রিয় দৈনিক মোডে ফিরুন
              </button>
            )}
          </div>
        </div>

        {/* Hadith Content Box */}
        {loadingHadith ? (
          <div className="py-12 text-center">
            <RefreshCw className="mx-auto h-6 w-6 animate-spin text-amber-600" />
            <p className="mt-2 text-xs text-stone-500">হাদিস লোড হচ্ছে...</p>
          </div>
        ) : dailyHadith ? (
          <div>
            {/* Arabic */}
            {(languageMode === "ar+bn" || languageMode === "all") && (
              <p
                className="arabic mb-4 text-right text-xl font-medium leading-loose text-stone-900 sm:text-2xl dark:text-stone-50"
                dir="rtl"
              >
                {dailyHadith.arabic}
              </p>
            )}

            {/* Bangla (Primary) */}
            <div className="rounded-2xl bg-amber-50/60 p-5 dark:bg-amber-950/30">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400">
                বাংলা অর্থ
              </span>
              <p className="bengali text-base sm:text-lg font-medium leading-relaxed text-stone-900 dark:text-stone-100">
                &quot;{dailyHadith.bangla}&quot;
              </p>
            </div>

            {/* English */}
            {languageMode === "all" && dailyHadith.english && (
              <div className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  English
                </span>
                <p>&quot;{dailyHadith.english}&quot;</p>
              </div>
            )}

            {/* Source & Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-amber-100 pt-4 dark:border-stone-800">
              <div className="text-xs text-stone-600 dark:text-stone-400">
                <span className="font-bold text-amber-800 dark:text-amber-400">
                  {dailyHadith.collectionName}
                </span>{" "}
                · হাদিস নং: {dailyHadith.hadithNumber} · বর্ণনাকারী: {dailyHadith.narrator || "সাহাবী (রা.)"} ·{" "}
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {dailyHadith.grade || "সহীহ"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleBookmarkHadith}
                  className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    bookmarked
                      ? "bg-red-50 text-red-600 dark:bg-red-950/40"
                      : "bg-white text-stone-700 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300"
                  }`}
                >
                  <Heart className={`h-3.5 w-3.5 ${bookmarked ? "fill-current" : ""}`} />
                  {bookmarked ? "সংরক্ষিত" : "বুকমার্ক"}
                </button>

                <button
                  onClick={handleCopyHadith}
                  className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "কপি হয়েছে" : "কপি"}
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

      {/* Feature Modules Grid */}
      <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Quran Module */}
        <Link href="/quran" className="group">
          <div className="relative h-full overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-4 inline-flex rounded-2xl bg-emerald-500 p-3 text-white shadow-md">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-stone-900 dark:text-stone-100">
              আল-কুরআন (The Noble Quran)
            </h3>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              ১১৪টি সূরার বিশুদ্ধ আরবি ও বাংলা অনুবাদ, অডিও তিলাওয়াত, তাফসীর ইবনে কাসীর এবং আয়াত বুকমার্ক সুবিধা।
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              কুরআন তিলাওয়াত শুরু করুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Hadith Module */}
        <Link href="/hadith" className="group">
          <div className="relative h-full overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-4 inline-flex rounded-2xl bg-amber-500 p-3 text-white shadow-md">
              <Library className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-stone-900 dark:text-stone-100">
              হাদিস সংকলন (Hadith Collections)
            </h3>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              সহীহ বুখারী, সহীহ মুসলিম সহ সিহাহ সিত্তাহর ৩৪,০০০+ বিশুদ্ধ হাদিস বাংলা অর্থসহ অনুসন্ধান ও পাঠাগার।
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
              হাদিস গ্রন্থসমূহ দেখুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Life Stories & History (with PDF / E-Book Reader & Highlights) */}
        <Link href="/stories" className="group">
          <div className="relative h-full overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-transparent p-7 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-xl dark:border-emerald-500/20 dark:bg-stone-900">
            <div className="mb-4 inline-flex rounded-2xl bg-emerald-600 p-3 text-white shadow-md">
              <Sparkles className="h-6 w-6 text-amber-300" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-stone-900 dark:text-stone-100">
              জীবনগাঁথা ও ইতিহাস (Life Stories)
            </h3>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              রাসূলুল্লাহ ﷺ ও মহামানবদের দীন, স্বাস্থ্য, খাদ্যাভ্যাস, দাম্পত্য, সন্তান, ব্যবসা ও সততার বাস্তব গল্প। পিডিএফ রিডার, হাইলাইট ও নোটস ফিচারযুক্ত।
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              ই-বুক রিডারে পাঠ করুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>



        {/* Study & Reflections */}
        <Link href="/study" className="group">
          <div className="relative h-full overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-4 inline-flex rounded-2xl bg-blue-500 p-3 text-white shadow-md">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-stone-900 dark:text-stone-100">
              বিষয়ভিত্তিক শিক্ষা (Study Themes)
            </h3>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              ঈমান, নামায, চরিত্র গঠন ও আত্মশুদ্ধি সংক্রান্ত কুরআন ও হাদিসের বিষয়ভিত্তিক সংকলিত পাঠ।
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400">
              বিষয়ভিত্তিক পাঠ শুরু করুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Blog / Articles Module */}
        <Link href="/blog" className="group">
          <div className="relative h-full overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-purple-400 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-4 inline-flex rounded-2xl bg-purple-600 p-3 text-white shadow-md">
              <Newspaper className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-stone-900 dark:text-stone-100">
              ইসলামিক প্রবন্ধ ও ব্লগ (Articles)
            </h3>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              কুরআন-হাদিসের আলোকে সমসাময়িক জিজ্ঞাসা ও জীবন ঘনিষ্ঠ শিক্ষণীয় ইসলামিক আর্টিকেলের সমৃদ্ধ সংগ্রহশালা।
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-400">
              সকল ব্লগ পড়ুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
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
