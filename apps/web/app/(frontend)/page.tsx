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
  BookMarked,
  CheckCircle2,
  Coins,
  ShieldCheck,
  Flame,
  Volume2,
  Play,
} from "lucide-react"
import type { DailyHadithItem } from "@/lib/daily-hadith"
import { InteractiveAmbientHero } from "@/components/ui/interactive-ambient-hero"
import { SpotlightTiltCard } from "@/components/ui/spotlight-tilt-card"
import { ForYouFeed } from "@/components/home/for-you-feed"
import { trackUserInteraction } from "@/lib/recommendation/engine"

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
    trackUserInteraction("hadith", `daily-hadith-${next}`)
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
      if (r.ok) {
        setBookmarked(true)
        trackUserInteraction("hadith", `bookmark-hadith-${dailyHadith.hadithNumber}`)
      }
    } catch {
      // Ignored
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Interactive Celestial Ambient Motion Canvas */}
      <InteractiveAmbientHero />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:py-16">
        {/* Minimalist, Captivating Hero Header */}
        <div className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/90 px-4 py-1.5 text-xs font-black text-emerald-900 shadow-sm backdrop-blur-md dark:border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-300 animate-in fade-in zoom-in-95 duration-500">
            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            নূর ইসলামিক নলেজ লাইব্রেরি • NOOR LIBRARY
          </div>

          <h1 className="mb-5 text-4xl font-black tracking-tight text-stone-900 sm:text-6xl lg:text-7xl dark:text-stone-100">
            পবিত্র কুরআন ও সুন্নাহর{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-400 dark:to-amber-400">
              আধুনিক ডিজিটাল পাঠাগার
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-stone-600 dark:text-stone-300">
            সহজ ও বিশুদ্ধ অনুবাদে কুরআন তিলাওয়াত, তাফসীর ইবনে কাসীর, বিশুদ্ধ হাদিস গ্রন্থসমূহ, আসমাউল হুসনা, মাসনূন দু&apos;আ এবং সাহাবীদের সোনালী জীবনগাঁথা।
          </p>

          {/* Minimalist Action Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quran"
              onClick={() => trackUserInteraction("quran", "hero-quran")}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <BookOpen className="h-4 w-4" /> কুরআন মাজীদ শুরু করুন
            </Link>

            <Link
              href="/names-of-allah"
              onClick={() => trackUserInteraction("names", "hero-names")}
              className="inline-flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-50/90 px-5 py-3.5 text-sm font-extrabold text-amber-900 shadow-sm transition-all hover:bg-amber-100 hover:scale-105 active:scale-95 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-200"
            >
              <Sparkles className="h-4 w-4 text-amber-500" /> আল্লাহর ৯৯ নাম
            </Link>

            <Link
              href="/companions"
              onClick={() => trackUserInteraction("companion", "hero-companions")}
              className="inline-flex items-center gap-2 rounded-2xl border border-stone-200/90 bg-white/90 px-5 py-3.5 text-sm font-extrabold text-stone-800 shadow-sm transition-all hover:bg-stone-50 hover:scale-105 active:scale-95 dark:border-stone-800 dark:bg-stone-900/90 dark:text-stone-200"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> সাহাবীদের জীবনী
            </Link>
          </div>
        </div>

        {/* Dynamic Hadith of the Day Card with Spotlight FX */}
        <SpotlightTiltCard
          tiltIntensity={5}
          spotlightColor="rgba(217, 119, 6, 0.16)"
          className="mb-14 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-white/95 to-amber-500/5 p-6 sm:p-8 shadow-xl backdrop-blur-2xl dark:border-amber-500/30 dark:from-stone-900/95 dark:via-stone-900/90 dark:to-amber-950/30"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/60 pb-4 dark:border-stone-800">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-md shadow-amber-600/30">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100">
                    দৈনিক নির্বাচিত হাদিস (Hadith of the Day)
                  </h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                      isManual
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                    }`}
                  >
                    {isManual ? "ম্যানুয়াল" : "আজকের হাদিস"}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {dailyHadith?.topic || "দৈনন্দিন জীবনে রসূলুল্লাহ (ﷺ)-এর অমূল্য দিকনির্দেশনা"}
                </p>
              </div>
            </div>

            {/* Language & Rotation Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-xl bg-stone-100/90 p-1 dark:bg-stone-800/90">
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
                  সব
                </button>
              </div>

              <button
                onClick={handleNextHadith}
                disabled={loadingHadith}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300/80 bg-amber-50/90 px-3.5 py-1.5 text-xs font-bold text-amber-900 shadow-sm hover:bg-amber-100 active:scale-95 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loadingHadith ? "animate-spin" : ""}`} />
                পরবর্তী ({hadithIndex + 1}/{totalHadiths})
              </button>

              {isManual && (
                <button
                  onClick={handleAutoReset}
                  className="rounded-xl border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                >
                  মূল হাদিসে ফিরুন
                </button>
              )}
            </div>
          </div>

          {/* Hadith Content */}
          {loadingHadith && !dailyHadith ? (
            <div className="py-12 text-center text-xs text-stone-400">হাদিস লোড হচ্ছে...</div>
          ) : dailyHadith ? (
            <div className="space-y-4">
              {(languageMode === "ar+bn" || languageMode === "all") && (
                <div className="rounded-2xl bg-amber-50/60 p-4 dark:bg-stone-800/80">
                  <p className="arabic text-xl sm:text-2xl leading-loose text-stone-900 dark:text-stone-100 text-right" dir="rtl">
                    {dailyHadith.arabic}
                  </p>
                </div>
              )}

              <div className="rounded-2xl bg-white/90 p-5 shadow-sm dark:bg-stone-800/60">
                <p className="text-sm sm:text-base leading-relaxed text-stone-800 dark:text-stone-100 font-semibold">
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
                    {dailyHadith.collectionName} • হাদিস #{dailyHadith.hadithNumber}
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
                    onClick={() => trackUserInteraction("hadith", `hadith-detail-${dailyHadith.hadithNumber}`)}
                    className="inline-flex items-center gap-1 rounded-xl bg-amber-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-amber-700"
                  >
                    বিস্তারিত পড়ুন <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </SpotlightTiltCard>

        {/* SMART PERSONALIZED "FOR YOU" RECOMMENDATION FEED */}
        <ForYouFeed />

        {/* CORE RESOURCE TILES WITH 3D SPOTLIGHT GESTURES */}
        <div className="my-16">
          <div className="text-center mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              DISCOVER ISLAMIC KNOWLEDGE
            </span>
            <h2 className="mt-2 text-2xl font-black text-stone-900 dark:text-stone-100 sm:text-4xl">
              ইসলামিক রিসোর্স ও জ্ঞানভাণ্ডার
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              সহজ ও সাবলীল উপস্থাপনায় সমৃদ্ধ কুরআন, হাদিস, সাহাবীদের জীবনী ও প্রাত্যহিক আমল।
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1. Interactive Quran */}
            <Link href="/quran" onClick={() => trackUserInteraction("quran", "tile-quran")} className="group">
              <SpotlightTiltCard
                spotlightColor="rgba(14, 165, 233, 0.2)"
                className="h-full border-sky-200/80 bg-gradient-to-b from-sky-50/80 to-white/95 p-7 shadow-md transition-all group-hover:border-sky-400 group-hover:shadow-2xl dark:border-sky-950 dark:from-sky-950/30 dark:to-stone-900/95"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-600 dark:bg-sky-500/25 dark:text-sky-400 shadow-sm transition-transform group-hover:scale-110">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-extrabold text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                        ১১৪ সূরা
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-stone-900 transition-colors group-hover:text-sky-700 dark:text-stone-100 dark:group-hover:text-sky-400">
                      ইন্টারেক্টিভ কুরআন মাজীদ
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                      আরবী তিলাওয়াত, বিশুদ্ধ বাংলা ও ইংরেজি অনুবাদ, একাধিক ক্বারীর অডিও এবং তাফসীর ইবনে কাসীর।
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-400">
                    কুরআন পাঠাগার খুলুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SpotlightTiltCard>
            </Link>

            {/* 2. Companions */}
            <Link href="/companions" onClick={() => trackUserInteraction("companion", "tile-companions")} className="group">
              <SpotlightTiltCard
                spotlightColor="rgba(16, 185, 129, 0.2)"
                className="h-full border-emerald-200/80 bg-gradient-to-b from-emerald-50/80 to-white/95 p-7 shadow-md transition-all group-hover:border-emerald-400 group-hover:shadow-2xl dark:border-emerald-950 dark:from-emerald-950/30 dark:to-stone-900/95"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/25 dark:text-emerald-400 shadow-sm transition-transform group-hover:scale-110">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        আলোকিত জীবন
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-stone-900 transition-colors group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400">
                      সাহাবায়ে কেরামের জীবনী
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                      হযরত আবু বকর, উমর, উসমান, আলী, বিলাল, খালিদ বিন ওয়ালিদ (রাঃ)-সহ সাহাবীদের গৌরবময় ইতিহাস।
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    সাহাবীদের জীবনী পাঠ করুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SpotlightTiltCard>
            </Link>

            {/* 3. 99 Names */}
            <Link href="/names-of-allah" onClick={() => trackUserInteraction("names", "tile-names")} className="group">
              <SpotlightTiltCard
                spotlightColor="rgba(245, 158, 11, 0.2)"
                className="h-full border-amber-200/80 bg-gradient-to-b from-amber-50/80 to-white/95 p-7 shadow-md transition-all group-hover:border-amber-400 group-hover:shadow-2xl dark:border-amber-950 dark:from-amber-950/30 dark:to-stone-900/95"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 dark:bg-amber-500/25 dark:text-amber-400 shadow-sm font-black text-lg transition-transform group-hover:scale-110">
                        ৯৯
                      </div>
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-800 dark:bg-emerald-950 dark:text-amber-300">
                        আসমাউল হুসনা
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-stone-900 transition-colors group-hover:text-amber-700 dark:text-stone-100 dark:group-hover:text-amber-400">
                      আল্লাহর ৯৯টি গুণবাচক নাম
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                      প্রতিটি নামের বিশুদ্ধ আরবী, বাংলা অর্থ, গভীর তাৎপর্য, কুরআনিক রেফারেন্স ও অডিও উচ্চারণ।
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                    আসমাউল হুসনা শিখুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SpotlightTiltCard>
            </Link>

            {/* 4. Duas */}
            <Link href="/duas" onClick={() => trackUserInteraction("dua", "tile-duas")} className="group">
              <SpotlightTiltCard
                spotlightColor="rgba(99, 102, 241, 0.2)"
                className="h-full border-indigo-200/80 bg-gradient-to-b from-indigo-50/80 to-white/95 p-7 shadow-md transition-all group-hover:border-indigo-400 group-hover:shadow-2xl dark:border-indigo-950 dark:from-indigo-950/30 dark:to-stone-900/95"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-600 dark:bg-indigo-500/25 dark:text-indigo-400 shadow-sm transition-transform group-hover:scale-110">
                        <Heart className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-extrabold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                        রাব্বানা দু&apos;আ
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-stone-900 transition-colors group-hover:text-indigo-700 dark:text-stone-100 dark:group-hover:text-indigo-400">
                      মাসনূন দু&apos;আ ও আযকার
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                      ৪০টি কুরআনী রাব্বানা দু&apos;আ, সকাল-সন্ধ্যার জিকির, বিপদ ও দুশ্চিন্তা মুক্তির সহীহ দু&apos;আ সংকলন।
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                    দু&apos;আ ভাণ্ডার দেখুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SpotlightTiltCard>
            </Link>

            {/* 5. Hisnul Muslim */}
            <Link href="/hisnul-muslim" onClick={() => trackUserInteraction("dua", "tile-hisnul")} className="group">
              <SpotlightTiltCard
                spotlightColor="rgba(20, 184, 166, 0.2)"
                className="h-full border-teal-200/80 bg-gradient-to-b from-teal-50/80 to-white/95 p-7 shadow-md transition-all group-hover:border-teal-400 group-hover:shadow-2xl dark:border-teal-950 dark:from-teal-950/30 dark:to-stone-900/95"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-600 dark:bg-teal-500/25 dark:text-teal-400 shadow-sm transition-transform group-hover:scale-110">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[10px] font-extrabold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                        মুমিনের দুর্গ
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-stone-900 transition-colors group-hover:text-teal-700 dark:text-stone-100 dark:group-hover:text-teal-400">
                      হিসনুল মুসলিম (দৈনন্দিন আমল)
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                      ঘুম, সালাত, আহার, সফর ও প্রাত্যহিক জীবনের সকল মুহূর্তের সহীহ মাসনূন দু&apos;আ ও জিকির।
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400">
                    অধ্যায়সমূহ পড়ুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SpotlightTiltCard>
            </Link>

            {/* 6. Digital Tasbih & Tools */}
            <Link href="/tasbih" onClick={() => trackUserInteraction("tools", "tile-tasbih")} className="group">
              <SpotlightTiltCard
                spotlightColor="rgba(244, 63, 94, 0.2)"
                className="h-full border-rose-200/80 bg-gradient-to-b from-rose-50/80 to-white/95 p-7 shadow-md transition-all group-hover:border-rose-400 group-hover:shadow-2xl dark:border-rose-950 dark:from-rose-950/30 dark:to-stone-900/95"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-600 dark:bg-rose-500/25 dark:text-rose-400 shadow-sm transition-transform group-hover:scale-110">
                        <Coins className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-extrabold text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                        স্মার্ট কাউন্টার
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-stone-900 transition-colors group-hover:text-rose-700 dark:text-stone-100 dark:group-hover:text-rose-400">
                      ডিজিটাল তাসবীহ ও যাকাত
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                      যিকির গণনার আধুনিক ডিজিটাল তাসবীহ এবং নিট সম্পদের সঠিক যাকাত নির্ধারণ টুল।
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400">
                    টুলস খুলুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SpotlightTiltCard>
            </Link>
          </div>
        </div>

        {/* Latest Blog Posts Section */}
        {latestPosts.length > 0 && (
          <div className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100">
                  সাম্প্রতিক ইসলামিক প্রবন্ধ ও আলোচনা
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  কুরআন-হাদিসের আলোকে সমসাময়িক জীবনঘনিষ্ঠ দিকনির্দেশনা
                </p>
              </div>
              <Link
                href="/blog"
                onClick={() => trackUserInteraction("blog", "home-blog-view-all")}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
              >
                সব প্রবন্ধ দেখুন <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  onClick={() => trackUserInteraction("blog", `post-${post.slug}`)}
                  className="group"
                >
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-stone-200/80 bg-white/90 p-6 transition-all hover:border-emerald-400 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900/90">
                    <div>
                      <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                        {post.category}
                      </span>
                      <h3 className="mt-3 text-base font-bold text-stone-900 transition-colors group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400">
                        {post.titleBn || post.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-[11px] text-stone-400 dark:border-stone-800">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="font-bold text-emerald-700 group-hover:underline dark:text-emerald-400">
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
    </div>
  )
}
