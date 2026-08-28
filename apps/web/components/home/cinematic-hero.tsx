"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Play,
  Pause,
  RefreshCw,
  Copy,
  Check,
  Share2,
  BookOpen,
  Volume2,
  ChevronDown,
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  Heart,
} from "lucide-react"
import { getAyahAudioSources } from "@/lib/audio/audio-player-engine"
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
  bgImage: string
}

const FEATURED_AYAHS: FeaturedAyah[] = [
  {
    surahNumber: 18,
    surahNameBn: "আল-কাহাফ",
    surahNameAr: "الكهف",
    surahNameEn: "Al-Kahf",
    ayahNumber: 64,
    arabic: "قَالَ ذَٰلِكَ مَا كُنَّا نَبْغِ ۚ فَارْتَدَّا عَلَىٰ آثَارِهِمَا قَصَصًا",
    bangla: "মূসা বললেন, আমরা তো সে স্থানটিরই অনুসন্ধান করছিলাম। তারপর তারা নিজেদের পদচিহ্ন ধরে ফিরে চলল।",
    english: "Moses said, 'That is what we were seeking.' So they returned, following their footprints.",
    theme: "অনুসন্ধান ও হেদায়াত",
    bgImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2560&q=85",
  },
  {
    surahNumber: 94,
    surahNameBn: "আল-ইনশিরাহ",
    surahNameAr: "الشرح",
    surahNameEn: "Ash-Sharh",
    ayahNumber: 6,
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    bangla: "নিশ্চয়ই কষ্টের সাথেই রয়েছে স্বস্তি ও পরম প্রশান্তি।",
    english: "Indeed, with hardship comes ease.",
    theme: "আশা ও নির্ভরতা",
    bgImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2560&q=85",
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
    theme: "আল্লাহর নূর ও হেদায়াত",
    bgImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2560&q=85",
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
    theme: "আল্লাহর মহিমা ও তাওহীদ",
    bgImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85",
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
    theme: "আল্লাহর অসীম নেয়ামত",
    bgImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=85",
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
    theme: "সুসংবাদ ও পরম করুণা",
    bgImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2560&q=85",
  },
]

export function CinematicHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const currentAyah = FEATURED_AYAHS[currentIndex]!

  // Parallax mouse gesture tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 20
      const y = (e.clientY / innerHeight - 0.5) * 20
      setMouseOffset({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Audio cleanup on index change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setIsPlayingAudio(false)
    setIsLoadingAudio(false)
  }, [currentIndex])

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      audioRef.current?.pause()
      setIsPlayingAudio(false)
      return
    }

    setIsLoadingAudio(true)
    const sources = getAyahAudioSources(currentAyah.surahNumber, currentAyah.ayahNumber, "ar.alafasy")
    const audio = new Audio(sources.primary)
    audioRef.current = audio

    audio.oncanplay = () => {
      setIsLoadingAudio(false)
    }

    audio.onerror = () => {
      if (audio.src !== sources.fallback) {
        audio.src = sources.fallback
        audio.play().catch(() => {
          setIsLoadingAudio(false)
          setIsPlayingAudio(false)
        })
      } else {
        setIsLoadingAudio(false)
        setIsPlayingAudio(false)
      }
    }

    audio.onended = () => {
      setIsPlayingAudio(false)
    }

    audio
      .play()
      .then(() => {
        setIsPlayingAudio(true)
        setIsLoadingAudio(false)
        trackUserInteraction("quran", `hero-audio-${currentAyah.surahNumber}-${currentAyah.ayahNumber}`)
      })
      .catch(() => {
        setIsLoadingAudio(false)
        setIsPlayingAudio(false)
      })
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
    <div
      ref={containerRef}
      className="relative flex min-h-[92vh] w-full flex-col justify-between overflow-hidden bg-stone-950 text-white"
    >
      {/* Cinematic Background with Smooth Parallax */}
      <div
        className="absolute inset-0 z-0 scale-105 bg-cover bg-center transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url('${currentAyah.bgImage}')`,
          transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0) scale(1.06)`,
        }}
      />

      {/* Layered Cinematic Vignette & Ambient Radial Glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/40 to-stone-950" />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(800px circle at ${50 + mouseOffset.x * 0.5}% ${
            45 + mouseOffset.y * 0.5
          }%, rgba(16, 185, 129, 0.25), transparent 70%)`,
        }}
      />

      {/* Top Floating Mini Header / Badge Bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold text-white/90 backdrop-blur-xl shadow-lg">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
          <span>নূর ইসলামিক লাইব্রেরি • NOOR LIBRARY</span>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-[11px] font-bold text-emerald-300 backdrop-blur-md">
            {currentAyah.theme}
          </span>
          <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[11px] font-medium text-white/75 backdrop-blur-md">
            সূরা {currentAyah.surahNameBn} • আয়াত {currentAyah.ayahNumber}
          </span>
        </div>
      </div>

      {/* Centerpiece: Grand Quranic Calligraphy & Bengali Reflection */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 py-10 text-center sm:px-10">
        {/* Arabic Calligraphy with Luminous Aura */}
        <div className="mb-6 max-w-3xl">
          <p
            className="arabic text-3xl font-black leading-relaxed tracking-wide text-stone-50 drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)] sm:text-5xl sm:leading-[1.8] lg:text-6xl"
            dir="rtl"
          >
            {currentAyah.arabic}
            <span className="inline-block mx-2 text-2xl sm:text-4xl text-amber-400/90 font-serif">
              ﴿{currentAyah.ayahNumber}﴾
            </span>
          </p>
        </div>

        {/* Bengali Translation */}
        <div className="max-w-2xl">
          <p className="text-base font-bold leading-relaxed text-emerald-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-xl lg:text-2xl">
            “{currentAyah.bangla}”
          </p>
          <p className="mt-2 text-xs italic text-stone-300/80 drop-shadow sm:text-sm">
            {currentAyah.english}
          </p>
        </div>

        {/* Surah Reference Badge */}
        <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-black/40 border border-white/15 px-4 py-1.5 text-xs font-semibold text-stone-200 backdrop-blur-md">
          <span>সূরা {currentAyah.surahNameBn} ({currentAyah.surahNameEn})</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">আয়াত {currentAyah.ayahNumber}</span>
        </div>

        {/* Grand Floating Glass Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Audio Recitation Button */}
          <button
            onClick={handleToggleAudio}
            disabled={isLoadingAudio}
            className={`inline-flex items-center gap-2.5 rounded-2xl px-5 py-3 text-xs font-black backdrop-blur-xl shadow-xl transition-all hover:scale-105 active:scale-95 ${
              isPlayingAudio
                ? "bg-emerald-600 text-white ring-4 ring-emerald-500/30 animate-pulse"
                : "bg-white/15 text-white border border-white/20 hover:bg-white/25"
            }`}
          >
            {isLoadingAudio ? (
              <RefreshCw className="h-4 w-4 animate-spin text-emerald-300" />
            ) : isPlayingAudio ? (
              <Pause className="h-4 w-4 fill-current text-white" />
            ) : (
              <Play className="h-4 w-4 fill-current text-emerald-400" />
            )}
            <span>{isPlayingAudio ? "তিলাওয়াত থামান" : "কুরআন তিলাওয়াত শুনুন"}</span>
          </button>

          {/* Next Verse Button */}
          <button
            onClick={handleNextAyah}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-xs font-bold text-white backdrop-blur-xl transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
          >
            <RefreshCw className="h-3.5 w-3.5 text-amber-400" />
            <span>অন্য আয়াত ({currentIndex + 1}/{FEATURED_AYAHS.length})</span>
          </button>

          {/* Copy Verse */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-xs font-bold text-white backdrop-blur-xl transition-all hover:bg-white/20 active:scale-95"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "কপি হয়েছে" : "কপি"}</span>
          </button>

          {/* Read Full Surah Link */}
          <Link
            href={`/quran/${currentAyah.surahNumber}`}
            onClick={() => trackUserInteraction("quran", `hero-read-surah-${currentAyah.surahNumber}`)}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-xs font-black text-white shadow-xl shadow-emerald-900/40 transition-all hover:scale-105 active:scale-95"
          >
            <BookOpen className="h-4 w-4" />
            <span>সম্পূর্ণ সূরা পড়ুন</span>
          </Link>
        </div>
      </div>

      {/* Bottom Bar: Search & Scroll Indicator */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 pb-8 sm:flex-row sm:px-8">
        {/* Floating Quick Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/quran"
            className="rounded-xl bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-semibold text-stone-200 backdrop-blur-md transition-all hover:bg-white/20"
          >
            📖 ১১৪ সূরা
          </Link>
          <Link
            href="/hadith"
            className="rounded-xl bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-semibold text-stone-200 backdrop-blur-md transition-all hover:bg-white/20"
          >
            📚 সহীহ হাদিস
          </Link>
          <Link
            href="/companions"
            className="rounded-xl bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-semibold text-stone-200 backdrop-blur-md transition-all hover:bg-white/20"
          >
            🛡️ সাহাবী জীবনী
          </Link>
          <Link
            href="/names-of-allah"
            className="rounded-xl bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-semibold text-stone-200 backdrop-blur-md transition-all hover:bg-white/20"
          >
            ✨ ৯৯ নাম
          </Link>
          <Link
            href="/duas"
            className="rounded-xl bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-semibold text-stone-200 backdrop-blur-md transition-all hover:bg-white/20"
          >
            🤲 মাসনূন দু&apos;আ
          </Link>
        </div>

        {/* Scroll Gesture Button */}
        <button
          onClick={scrollToContent}
          className="group inline-flex items-center gap-2 text-xs font-bold text-stone-300 transition-colors hover:text-white"
        >
          <span>নিচে স্ক্রোল করুন • Explore</span>
          <ChevronDown className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:translate-y-1 animate-bounce" />
        </button>
      </div>
    </div>
  )
}
