"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Play,
  Pause,
  Copy,
  Check,
  Share2,
  BookOpen,
  Volume2,
  ChevronDown,
  Sparkles,
  Search,
  ArrowRight,
  RefreshCw,
  Loader2,
} from "lucide-react"
import { audioManager } from "@/lib/audio/audio-player-engine"
import { trackUserInteraction } from "@/lib/recommendation/engine"

interface FeaturedAyah {
  surahNumber: number
  surahNameBn: string
  surahNameAr: string
  surahNameEn: string
  ayahNumber: number
  arabic: string
  bangla: string
  english: string
  theme: string
}

const FEATURED_AYAHS: FeaturedAyah[] = [
  {
    surahNumber: 94,
    surahNameBn: "আল-ইনশিরাহ",
    surahNameAr: "الشرح",
    surahNameEn: "Ash-Sharh",
    ayahNumber: 6,
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    bangla: "নিশ্চয়ই কষ্টের সাথেই রয়েছে স্বস্তি ও পরম প্রশান্তি।",
    english: "Indeed, with hardship comes ease.",
    theme: "আশা ও নির্ভরতা • Hope & Solace",
  },
  {
    surahNumber: 24,
    surahNameBn: "আন-নূর",
    surahNameAr: "النور",
    surahNameEn: "An-Nur",
    ayahNumber: 35,
    arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ ۚ مَثَلُ نُورِهِ كَمِشْكَاةٍ فِيهَا مِصْبَاحٌ",
    bangla: "আল্লাহ নভোমণ্ডল ও ভূমণ্ডলের জ্যোতি; তাঁর জ্যোতির দৃষ্টান্ত যেন একটি কুলঙ্গি, যাতে রয়েছে একটি প্রদীপ।",
    english: "Allah is the Light of the heavens and the earth. The example of His light is like a niche within which is a lamp.",
    theme: "আল্লাহর নূর ও হেদায়াত • Light of the Heavens",
  },
  {
    surahNumber: 2,
    surahNameBn: "আল-বাক্বারাহ (আয়াতুল কুরসী)",
    surahNameAr: "البقرة",
    surahNameEn: "Al-Baqarah",
    ayahNumber: 255,
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    bangla: "আল্লাহ, তিনি ব্যতীত অন্য কোনো উপাস্য নেই; তিনি চিরঞ্জীব, সবকিছুর ধারক। তন্দ্রা বা নিদ্রা তাঁকে স্পর্শ করে না।",
    english: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.",
    theme: "আল্লাহর মহিমা ও তাওহীদ • Supreme Majesty",
  },
  {
    surahNumber: 18,
    surahNameBn: "আল-কাহাফ",
    surahNameAr: "الكهف",
    surahNameEn: "Al-Kahf",
    ayahNumber: 64,
    arabic: "قَالَ ذَٰلِكَ مَا كُنَّا نَبْغِ ۚ فَارْتَدَّا عَلَىٰ آثَارِهِمَا قَصَصًا",
    bangla: "মূসা বললেন, আমরা তো সে স্থানটিরই অনুসন্ধান করছিলাম। তারপর তারা নিজেদের পদচিহ্ন ধরে ফিরে চলল।",
    english: "Moses said, 'That is what we were seeking.' So they returned, following their footprints.",
    theme: "অনুসন্ধান ও হেদায়াত • The Divine Search",
  },
  {
    surahNumber: 55,
    surahNameBn: "আর-রহমান",
    surahNameAr: "الرحمن",
    surahNameEn: "Ar-Rahman",
    ayahNumber: 13,
    arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    bangla: "অতএব, তোমরা তোমাদের রবের কোন কোন নিয়ামতকে অস্বীকার করবে?",
    english: "So which of the favors of your Lord would you deny?",
    theme: "আল্লাহর অসীম নেয়ামত • Divine Blessings",
  },
  {
    surahNumber: 93,
    surahNameBn: "আদ-দুহা",
    surahNameAr: "الضحى",
    surahNameEn: "Ad-Duha",
    ayahNumber: 5,
    arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
    bangla: "আর অচিরেই আপনার রব আপনাকে এমন দান করবেন যে আপনি সন্তুষ্ট হয়ে যাবেন।",
    english: "And your Lord is going to give you, and you will be satisfied.",
    theme: "সুসংবাদ ও পরম করুণা • Glad Tidings",
  },
]

export function CinematicHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const currentAyah = FEATURED_AYAHS[currentIndex]!

  // Dynamic Ambient Monochrome Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.3 - 0.05,
      opacity: Math.random() * 0.4 + 0.1,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY

        if (p.y < 0) p.y = height
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 180, 180, ${p.opacity})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Audio cleanup on index change
  useEffect(() => {
    audioManager.stop()
    setIsPlayingAudio(false)
    setIsLoadingAudio(false)
  }, [currentIndex])

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      audioManager.pause()
      setIsPlayingAudio(false)
      return
    }

    setIsLoadingAudio(true)

    audioManager.setListeners({
      stateChange: (state) => {
        if (state === "playing") {
          setIsPlayingAudio(true)
          setIsLoadingAudio(false)
        } else if (state === "paused" || state === "idle") {
          setIsPlayingAudio(false)
          setIsLoadingAudio(false)
        } else if (state === "error") {
          setIsPlayingAudio(false)
          setIsLoadingAudio(false)
        }
      },
      ended: () => {
        setIsPlayingAudio(false)
        setIsLoadingAudio(false)
      },
      error: () => {
        setIsPlayingAudio(false)
        setIsLoadingAudio(false)
      },
    })

    audioManager
      .playAyah(currentAyah.surahNumber, currentAyah.ayahNumber, "ar.alafasy")
      .catch(() => {
        setIsLoadingAudio(false)
        setIsPlayingAudio(false)
      })

    trackUserInteraction("quran", `hero-audio-${currentAyah.surahNumber}-${currentAyah.ayahNumber}`)
  }

  const handleNextAyah = () => {
    const next = (currentIndex + 1) % FEATURED_AYAHS.length
    setCurrentIndex(next)
    trackUserInteraction("quran", `hero-ayah-${FEATURED_AYAHS[next]?.surahNumber}`)
  }

  const handleCopy = async () => {
    const text = `${currentAyah.arabic}\n\n"${currentAyah.bangla}"\n— সূরা ${currentAyah.surahNameBn} [${currentAyah.surahNumber}:${currentAyah.ayahNumber}]\nনূর ইসলামিক লাইব্রেরি`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const scrollToContent = () => {
    const el = document.getElementById("main-feed-section")
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative flex min-h-[92vh] w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white select-none dark:border-neutral-800">
      {/* Background Subtle Monochrome Dust Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
      />

      {/* Subtle Radial Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

      {/* Top Header Tag */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8 sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/80 px-3.5 py-1 text-[11px] font-mono font-semibold text-neutral-300 backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5 text-white animate-pulse" />
          <span>নূর ইসলামিক লাইব্রেরি • MINIMALIST EDITION</span>
        </div>

        <button
          onClick={handleNextAyah}
          title="পরবর্তী নির্বাচিত আয়াত"
          className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900/80 px-3 py-1 text-xs font-semibold text-neutral-300 transition-all hover:border-neutral-500 hover:text-white active:scale-95"
        >
          <RefreshCw className="h-3 w-3" />
          <span>পরবর্তী আয়াত ({currentIndex + 1}/{FEATURED_AYAHS.length})</span>
        </button>
      </div>

      {/* Center Stage: Hero Featured Ayah (Editorial Swiss Style) */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-12 text-center sm:px-8 sm:py-16">
        {/* Theme Tag */}
        <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-widest text-neutral-400">
          {currentAyah.theme}
        </span>

        {/* Grand Arabic Calligraphy with High Contrast */}
        <h1
          dir="rtl"
          className="arabic text-3xl font-medium leading-[2.4] tracking-wide sm:text-5xl lg:text-6xl text-white drop-shadow-sm max-w-3xl"
        >
          {currentAyah.arabic}
        </h1>

        {/* Bengali Translation */}
        <p className="bengali mt-6 max-w-2xl text-base sm:text-xl font-medium leading-relaxed text-neutral-200">
          &ldquo;{currentAyah.bangla}&rdquo;
        </p>

        {/* English Translation */}
        <p className="mt-2 max-w-xl text-xs sm:text-sm italic leading-relaxed text-neutral-400">
          {currentAyah.english}
        </p>

        {/* Surah Citation */}
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-neutral-400">
          <span className="text-white font-bold font-mono">
            সূরা {currentAyah.surahNameBn} [{currentAyah.surahNumber}:{currentAyah.ayahNumber}]
          </span>
          <span>•</span>
          <span className="text-neutral-500">{currentAyah.surahNameEn}</span>
        </div>

        {/* Audio Recitation & Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Audio Recitation Button */}
          <button
            onClick={handleToggleAudio}
            disabled={isLoadingAudio}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-black shadow-lg transition-all hover:bg-neutral-200 active:scale-95 disabled:opacity-60"
          >
            {isLoadingAudio ? (
              <Loader2 className="h-4 w-4 animate-spin text-black" />
            ) : isPlayingAudio ? (
              <Pause className="h-4 w-4 fill-current text-black" />
            ) : (
              <Volume2 className="h-4 w-4 text-black" />
            )}
            <span>{isPlayingAudio ? "তিলাওয়াত থামান" : "তিলাওয়াত শুনুন (Listen)"}</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            title="আয়াত কপি করুন"
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900/90 px-4 py-2.5 text-xs font-semibold text-neutral-300 transition-all hover:border-neutral-500 hover:text-white"
          >
            {copied ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "কপি হয়েছে" : "কপি"}</span>
          </button>

          {/* Read Surah Link */}
          <Link
            href={`/quran/${currentAyah.surahNumber}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900/90 px-4 py-2.5 text-xs font-semibold text-neutral-300 transition-all hover:border-neutral-500 hover:text-white"
          >
            <BookOpen className="h-4 w-4" />
            <span>সম্পূর্ণ সূরা পড়ুন</span>
          </Link>
        </div>

        {/* Instant Search Bar */}
        <div className="mt-10 w-full max-w-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (searchQuery.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
              }
            }}
            className="relative flex items-center"
          >
            <Search className="absolute left-4 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder="কুরআনের আয়াত, সূরা, হাদিস বা সাহাবীদের জীবনী খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/90 py-3 pl-11 pr-24 text-xs text-white placeholder:text-neutral-500 backdrop-blur-xl focus:border-neutral-500 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 rounded-xl bg-white px-3.5 py-1.5 text-xs font-bold text-black hover:bg-neutral-200 transition-all"
            >
              অনুসন্ধান
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] text-neutral-400">
            <span className="text-neutral-600">জনপ্রিয়:</span>
            <Link href="/quran/67" className="hover:text-white underline-offset-2 hover:underline">
              সূরা মুলক
            </Link>
            <span>•</span>
            <Link href="/quran/36" className="hover:text-white underline-offset-2 hover:underline">
              সূরা ইয়াসীন
            </Link>
            <span>•</span>
            <Link href="/quran/18" className="hover:text-white underline-offset-2 hover:underline">
              সূরা কাহাফ
            </Link>
            <span>•</span>
            <Link href="/hadith/bukhari" className="hover:text-white underline-offset-2 hover:underline">
              সহীহ বুখারী
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 flex w-full justify-center pb-6">
        <button
          onClick={scrollToContent}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition-colors hover:text-white"
        >
          <span>নিচে আরও অন্বেষণ করুন</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
        </button>
      </div>
    </div>
  )
}
