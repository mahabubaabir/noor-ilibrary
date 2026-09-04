"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  BookOpen,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  Share2,
  Heart,
  Calendar,
  CheckCircle2,
  Coins,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import type { DailyHadithItem } from "@/lib/daily-hadith"
import { CinematicHero } from "@/components/home/cinematic-hero"
import { SalahTimeWidget } from "@/components/home/salah-time-widget"
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

      if (r.status === 401) {
        const redirect = encodeURIComponent("/")
        window.location.href = `/login?redirect=${redirect}&intent=hadith`
        return
      }

      if (r.ok) {
        setBookmarked(true)
        trackUserInteraction("hadith", `bookmark-hadith-${dailyHadith.hadithNumber}`)
      }
    } catch {
      // Ignored
    }
  }

  return (
    <div className="relative min-h-screen bg-white transition-colors dark:bg-black">
      {/* 1. Full-Screen Cinematic Hero with Calligraphy & Reciter Audio */}
      <CinematicHero />

      {/* 2. Content Sections Below the Fold */}
      <div id="main-feed-section" className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:py-12">
        
        {/* FRONT SALAH TIME WIDGET WITH LIVE WAQT SCHEDULE & SALAH TRACKER */}
        <SalahTimeWidget />

        {/* SMART PERSONALIZED "FOR YOU" RECOMMENDATION FEED */}
        <ForYouFeed />

        {/* Dynamic Hadith of the Day Card (Monochrome Editorial) */}
        <SpotlightTiltCard
          tiltIntensity={4}
          className="my-12 border-neutral-200 bg-white p-6 sm:p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4 dark:border-neutral-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                    দৈনিক নির্বাচিত হাদিস (Hadith of the Day)
                  </h2>
                  <span
                    className={`rounded border px-2 py-0.5 text-[10px] font-mono font-bold ${
                      isManual
                        ? "border-neutral-300 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
                        : "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black"
                    }`}
                  >
                    {isManual ? "ম্যানুয়াল" : "আজকের হাদিস"}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {dailyHadith?.topic || "দৈনন্দিন জীবনে রসূলুল্লাহ (ﷺ)-এর অমূল্য দিকনির্দেশনা"}
                </p>
              </div>
            </div>

            {/* Language & Rotation Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-xl border border-neutral-200 bg-neutral-50 p-1 dark:border-neutral-800 dark:bg-neutral-900">
                <button
                  onClick={() => setLanguageMode("bn")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    languageMode === "bn"
                      ? "bg-black text-white shadow dark:bg-white dark:text-black"
                      : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  বাংলা
                </button>
                <button
                  onClick={() => setLanguageMode("ar+bn")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    languageMode === "ar+bn"
                      ? "bg-black text-white shadow dark:bg-white dark:text-black"
                      : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  আরবি + বাংলা
                </button>
                <button
                  onClick={() => setLanguageMode("all")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    languageMode === "all"
                      ? "bg-black text-white shadow dark:bg-white dark:text-black"
                      : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  সব
                </button>
              </div>

              <button
                onClick={handleNextHadith}
                disabled={loadingHadith}
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-800 transition-all hover:bg-neutral-100 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
              >
                <RefreshCw className={`h-3 w-3 ${loadingHadith ? "animate-spin" : ""}`} />
                পরবর্তী ({hadithIndex + 1}/{totalHadiths})
              </button>

              {isManual && (
                <button
                  onClick={handleAutoReset}
                  className="rounded-xl border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                >
                  মূল হাদিস
                </button>
              )}
            </div>
          </div>

          {/* Hadith Content */}
          {loadingHadith && !dailyHadith ? (
            <div className="py-12 text-center text-xs font-mono text-neutral-400">হাদিস লোড হচ্ছে...</div>
          ) : dailyHadith ? (
            <div className="space-y-4">
              {(languageMode === "ar+bn" || languageMode === "all") && (
                <div className="rounded-xl bg-neutral-50 p-4 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-900">
                  <p className="arabic text-xl sm:text-2xl leading-loose text-neutral-900 dark:text-white text-right" dir="rtl">
                    {dailyHadith.arabic}
                  </p>
                </div>
              )}

              <div className="rounded-xl bg-white p-5 border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900/30">
                <p className="text-sm sm:text-base leading-relaxed text-neutral-900 dark:text-neutral-100 font-medium">
                  {dailyHadith.bangla}
                </p>
              </div>

              {languageMode === "all" && dailyHadith.english && (
                <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-900/20">
                  <p className="text-xs italic leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {dailyHadith.english}
                  </p>
                </div>
              )}

              {/* Hadith Meta & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4 text-xs dark:border-neutral-900">
                <div className="flex flex-wrap items-center gap-2 text-neutral-500 dark:text-neutral-400 font-mono">
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {dailyHadith.collectionName} #{dailyHadith.hadithNumber}
                  </span>
                  <span>•</span>
                  <span>{dailyHadith.narrator || "রাসূলুল্লাহ ﷺ"}</span>
                  <span>•</span>
                  <span className="rounded border border-neutral-200 px-1.5 py-0.2 text-[10px] text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                    {dailyHadith.grade || "সহীহ"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBookmarkHadith}
                    disabled={bookmarked}
                    className={`inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                      bookmarked
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    {bookmarked ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-white dark:text-black" /> সংরক্ষিত
                      </>
                    ) : (
                      <>
                        <Heart className="h-3.5 w-3.5 text-neutral-400" /> বুকমার্ক
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCopyHadith}
                    className="inline-flex items-center gap-1 rounded-xl border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:text-black dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-white"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-black dark:text-white" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "কপি হয়েছে" : "কপি"}
                  </button>

                  <button
                    onClick={handleShareHadith}
                    className="inline-flex items-center gap-1 rounded-xl border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:text-black dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-white"
                  >
                    <Share2 className="h-3.5 w-3.5" /> শেয়ার
                  </button>

                  <Link
                    href={`/hadith/${dailyHadith.collection}?n=${dailyHadith.hadithNumber}`}
                    onClick={() => trackUserInteraction("hadith", `hadith-detail-${dailyHadith.hadithNumber}`)}
                    className="inline-flex items-center gap-1 rounded-xl bg-black px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                  >
                    বিস্তারিত <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </SpotlightTiltCard>

        {/* CORE RESOURCE TILES WITH MONOCHROME MINIMALIST DESIGN */}
        <div className="my-16">
          <div className="text-center mb-10">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-neutral-500">
              DISCOVER ISLAMIC KNOWLEDGE
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
              ইসলামিক রিসোর্স ও জ্ঞানভাণ্ডার
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              সহজ ও সাবলীল উপস্থাপনায় সমৃদ্ধ কুরআন, হাদিস, সাহাবীদের জীবনী ও প্রাত্যহিক আমল।
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1. Interactive Quran */}
            <Link href="/quran" onClick={() => trackUserInteraction("quran", "tile-quran")} className="group">
              <SpotlightTiltCard className="h-full border-neutral-200 bg-white p-6 shadow-sm transition-all group-hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:group-hover:border-neutral-700">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800 transition-colors group-hover:bg-black group-hover:text-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:group-hover:bg-white dark:group-hover:text-black">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <span className="rounded border border-neutral-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                        ১১৪ সূরা
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 transition-colors group-hover:underline dark:text-white">
                      ইন্টারেক্টিভ কুরআন মাজীদ
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                      আরবী তিলাওয়াত, বিশুদ্ধ বাংলা ও ইংরেজি অনুবাদ, একাধিক ক্বারীর অডিও এবং তাফসীর ইবনে কাসীর।
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white">
                    কুরআন পাঠাগার <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SpotlightTiltCard>
            </Link>

            {/* 2. Companions */}
            <Link href="/companions" onClick={() => trackUserInteraction("companion", "tile-companions")} className="group">
              <SpotlightTiltCard className="h-full border-neutral-200 bg-white p-6 shadow-sm transition-all group-hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:group-hover:border-neutral-700">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800 transition-colors group-hover:bg-black group-hover:text-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:group-hover:bg-white dark:group-hover:text-black">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <span className="rounded border border-neutral-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                        আলোকিত জীবন
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 transition-colors group-hover:underline dark:text-white">
                      সাহাবায়ে কেরামের জীবনী
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                      হযরত আবু বকর, উমর, উসমান, আলী, বিলাল, খালিদ বিন ওয়ালিদ (রাঃ)-সহ সাহাবীদের গৌরবময় ইতিহাস।
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white">
                    জীবনী পাঠ করুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SpotlightTiltCard>
            </Link>

            {/* 3. 99 Names */}
            <Link href="/names-of-allah" onClick={() => trackUserInteraction("names", "tile-names")} className="group">
              <SpotlightTiltCard className="h-full border-neutral-200 bg-white p-6 shadow-sm transition-all group-hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:group-hover:border-neutral-700">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 font-mono font-bold text-sm text-neutral-800 transition-colors group-hover:bg-black group-hover:text-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:group-hover:bg-white dark:group-hover:text-black">
                        ৯৯
                      </div>
                      <span className="rounded border border-neutral-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                        আসমাউল হুসনা
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 transition-colors group-hover:underline dark:text-white">
                      আল্লাহর ৯৯টি গুণবাচক নাম
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                      প্রতিটি নামের বিশুদ্ধ আরবী, বাংলা অর্থ, গভীর তাৎপর্য, কুরআনিক রেফারেন্স ও অডিও উচ্চারণ।
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white">
                    নামসমূহ শিখুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SpotlightTiltCard>
            </Link>

            {/* 4. Duas */}
            <Link href="/duas" onClick={() => trackUserInteraction("dua", "tile-duas")} className="group">
              <SpotlightTiltCard className="h-full border-neutral-200 bg-white p-6 shadow-sm transition-all group-hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:group-hover:border-neutral-700">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800 transition-colors group-hover:bg-black group-hover:text-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:group-hover:bg-white dark:group-hover:text-black">
                        <Heart className="h-5 w-5" />
                      </div>
                      <span className="rounded border border-neutral-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                        রাব্বানা দু&apos;আ
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 transition-colors group-hover:underline dark:text-white">
                      মাসনূন দু&apos;আ ও আযকার
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                      ৪০টি কুরআনী রাব্বানা দু&apos;আ, সকাল-সন্ধ্যার জিকির, বিপদ ও দুশ্চিন্তা মুক্তির সহীহ দু&apos;আ সংকলন।
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white">
                    দু&apos;আ ভাণ্ডার <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SpotlightTiltCard>
            </Link>

            {/* 5. Hisnul Muslim */}
            <Link href="/hisnul-muslim" onClick={() => trackUserInteraction("dua", "tile-hisnul")} className="group">
              <SpotlightTiltCard className="h-full border-neutral-200 bg-white p-6 shadow-sm transition-all group-hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:group-hover:border-neutral-700">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800 transition-colors group-hover:bg-black group-hover:text-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:group-hover:bg-white dark:group-hover:text-black">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <span className="rounded border border-neutral-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                        মুমিনের দুর্গ
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 transition-colors group-hover:underline dark:text-white">
                      হিসনুল মুসলিম (দৈনন্দিন আমল)
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                      ঘুম, সালাত, আহার, সফর ও প্রাত্যহিক জীবনের সকল মুহূর্তের সহীহ মাসনূন দু&apos;আ ও জিকির।
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white">
                    অধ্যায়সমূহ <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SpotlightTiltCard>
            </Link>

            {/* 6. Digital Tasbih & Tools */}
            <Link href="/tasbih" onClick={() => trackUserInteraction("tools", "tile-tasbih")} className="group">
              <SpotlightTiltCard className="h-full border-neutral-200 bg-white p-6 shadow-sm transition-all group-hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:group-hover:border-neutral-700">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800 transition-colors group-hover:bg-black group-hover:text-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:group-hover:bg-white dark:group-hover:text-black">
                        <Coins className="h-5 w-5" />
                      </div>
                      <span className="rounded border border-neutral-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                        স্মার্ট কাউন্টার
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 transition-colors group-hover:underline dark:text-white">
                      ডিজিটাল তাসবীহ ও যাকাত
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                      যিকির গণনার আধুনিক ডিজিটাল তাসবীহ এবং নিট সম্পদের সঠিক যাকাত নির্ধারণ টুল।
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white">
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
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white sm:text-2xl">
                  সাম্প্রতিক ইসলামিক প্রবন্ধ ও আলোচনা
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  কুরআন-হাদিসের আলোকে সমসাময়িক জীবনঘনিষ্ঠ দিকনির্দেশনা
                </p>
              </div>
              <Link
                href="/blog"
                onClick={() => trackUserInteraction("blog", "home-blog-view-all")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-black hover:underline dark:text-white"
              >
                সব প্রবন্ধ <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  onClick={() => trackUserInteraction("blog", `post-${post.slug}`)}
                  className="group"
                >
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700">
                    <div>
                      <span className="rounded border border-neutral-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                        {post.category}
                      </span>
                      <h3 className="mt-3 text-sm font-bold text-neutral-900 transition-colors group-hover:underline dark:text-white">
                        {post.titleBn || post.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-[11px] text-neutral-400 dark:border-neutral-800">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="font-semibold text-black group-hover:underline dark:text-white">
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
