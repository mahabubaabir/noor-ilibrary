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
  Video,
  Eye,
  Sliders,
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
  videoSrc: string
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
    theme: "অনুসন্ধান ও হেদায়াত • The Divine Search",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-slow-motion-42686-large.mp4",
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
    theme: "আশা ও নির্ভরতা • Hope & Solace",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-golden-rays-of-sunlight-through-the-clouds-41551-large.mp4",
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
    theme: "আল্লাহর নূর ও হেদায়াত • Light of the Heavens",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-night-sky-with-stars-and-a-nebula-42687-large.mp4",
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
    theme: "আল্লাহর মহিমা ও তাওহীদ • Supreme Majesty",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-time-lapse-of-clouds-at-sunset-1002-large.mp4",
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
    theme: "আল্লাহর অসীম নেয়ামত • Divine Blessings",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-desert-sand-dunes-under-a-blue-sky-40432-large.mp4",
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
    theme: "সুসংবাদ ও পরম করুণা • Glad Tidings",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-2408-large.mp4",
    bgImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2560&q=85",
  },
]

export function CinematicHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [copied, setCopied] = useState(false)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [searchQuery, setSearchQuery] = useState("")
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const currentAyah = FEATURED_AYAHS[currentIndex]!

  // Parallax mouse gesture tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 24
      const y = (e.clientY / innerHeight - 0.5) * 24
      setMouseOffset({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Dynamic Ambient Golden Dust Particles Canvas
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

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.6 + 0.2,
      gold: Math.random() > 0.4,
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
        ctx.fillStyle = p.gold
          ? `rgba(245, 158, 11, ${p.opacity})`
          : `rgba(52, 211, 153, ${p.opacity * 0.8})`
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

  // Video reload and audio cleanup on index change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setIsPlayingAudio(false)
    setIsLoadingAudio(false)

    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => undefined)
    }
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
    <div className="relative flex min-h-[96vh] w-full flex-col justify-between overflow-hidden bg-stone-950 text-white select-none">
      {/* 1. Live Looping Cinematic Video Background with Parallax */}
      <div
        className="absolute inset-0 z-0 scale-105 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0) scale(1.05)`,
        }}
      >
        <video
          ref={videoRef}
          key={currentAyah.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          poster={currentAyah.bgImage}
          className="h-full w-full object-cover opacity-85 transition-opacity duration-1000"
        >
          <source src={currentAyah.videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* 2. Layered Vignette, Radiant Dark Gradients & Cursor Light Aura */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/45 to-stone-950/95" />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-50 mix-blend-screen transition-opacity duration-500"
        style={{
          background: `radial-gradient(900px circle at ${50 + mouseOffset.x * 0.6}% ${
            45 + mouseOffset.y * 0.6
          }%, rgba(5, 150, 105, 0.28), rgba(245, 158, 11, 0.12) 40%, transparent 75%)`,
        }}
      />

      {/* 3. Floating Golden Dust Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70"
      />

      {/* Top Floating Glass Bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 sm:px-8">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-black text-white/95 backdrop-blur-2xl shadow-xl">
          <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
          <span>নূর ইসলামিক লাইব্রেরি • NOOR DIGITAL LIBRARY</span>
        </div>

        {/* Live Theme Badge & Switcher */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-bold text-emerald-300 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{currentAyah.theme}</span>
          </div>

          <button
            onClick={handleNextAyah}
            title="অন্য সিনেমাটিক দৃশ্য ও আয়াত লোড করুন"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-bold text-white/90 backdrop-blur-xl transition-all hover:bg-white/25 active:scale-95 shadow-md"
          >
            <Video className="h-3.5 w-3.5 text-amber-400" />
            <span>দৃশ্য স্যুইচ ({currentIndex + 1}/{FEATURED_AYAHS.length})</span>
          </button>
        </div>
      </div>

      {/* Centerpiece: Grand Quranic Calligraphy & Multi-lingual Reflection */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 py-8 text-center sm:px-12">
        {/* Arabic Calligraphy with Grand Text Glow */}
        <div className="mb-6 max-w-4xl animate-in fade-in zoom-in-95 duration-700">
          <p
            className="arabic text-3xl font-black leading-[2.1] tracking-wide text-white drop-shadow-[0_8px_35px_rgba(0,0,0,0.95)] sm:text-5xl sm:leading-[2.2] lg:text-6xl"
            dir="rtl"
          >
            {currentAyah.arabic}
            <span className="inline-block mx-3 text-2xl sm:text-4xl text-amber-400/90 font-serif drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]">
              ﴿{currentAyah.ayahNumber}﴾
            </span>
          </p>
        </div>

        {/* Bengali Translation & English Meaning Card */}
        <div className="max-w-3xl rounded-3xl border border-white/15 bg-black/40 p-6 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-emerald-500/40 sm:p-7">
          <p className="text-base font-black leading-relaxed text-emerald-300 drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] sm:text-xl lg:text-2xl">
            “{currentAyah.bangla}”
          </p>
          <p className="mt-2.5 text-xs font-medium italic leading-relaxed text-stone-300/90 drop-shadow sm:text-sm">
            {currentAyah.english}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/10 px-3.5 py-1 text-xs font-bold text-amber-300">
            <span>পবিত্র কুরআন — সূরা {currentAyah.surahNameBn} ({currentAyah.surahNameEn})</span>
            <span>•</span>
            <span className="text-white font-extrabold">আয়াত {currentAyah.ayahNumber}</span>
          </div>
        </div>

        {/* Floating Audio & Interaction Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Audio Recitation Button */}
          <button
            onClick={handleToggleAudio}
            disabled={isLoadingAudio}
            className={`inline-flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-xs font-black backdrop-blur-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 ${
              isPlayingAudio
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white ring-4 ring-emerald-400/40 shadow-emerald-900/50"
                : "bg-white/20 text-white border border-white/25 hover:bg-white/30"
            }`}
          >
            {isLoadingAudio ? (
              <RefreshCw className="h-4 w-4 animate-spin text-emerald-300" />
            ) : isPlayingAudio ? (
              <>
                <Pause className="h-4 w-4 fill-current text-white" />
                <span>তিলাওয়াত বিরতি দিন</span>
                {/* Live Waveform Indicator */}
                <span className="flex items-center gap-0.5 ml-1">
                  <span className="h-3 w-1 bg-white rounded-full animate-bounce" />
                  <span className="h-4 w-1 bg-white rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="h-2 w-1 bg-white rounded-full animate-bounce [animation-delay:0.3s]" />
                </span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current text-emerald-300 ml-0.5" />
                <span>কুরআন তিলাওয়াত শুনুন</span>
              </>
            )}
          </button>

          {/* Next Verse */}
          <button
            onClick={handleNextAyah}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/15 border border-white/20 px-4 py-3.5 text-xs font-bold text-white backdrop-blur-2xl transition-all hover:bg-white/25 hover:scale-105 active:scale-95 shadow-lg"
          >
            <RefreshCw className="h-3.5 w-3.5 text-amber-400" />
            <span>অন্যান্য আয়াত</span>
          </button>

          {/* Copy Verse */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-white/15 border border-white/20 px-4 py-3.5 text-xs font-bold text-white backdrop-blur-2xl transition-all hover:bg-white/25 active:scale-95 shadow-lg"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "কপি হয়েছে" : "কপি"}</span>
          </button>

          {/* Read Full Surah Link */}
          <Link
            href={`/quran/${currentAyah.surahNumber}`}
            onClick={() => trackUserInteraction("quran", `hero-read-surah-${currentAyah.surahNumber}`)}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-3.5 text-xs font-black text-white shadow-xl shadow-emerald-950/60 transition-all hover:scale-105 active:scale-95"
          >
            <BookOpen className="h-4 w-4" />
            <span>সম্পূর্ণ সূরা পড়ুন</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Bottom Bar: Search & Scroll Indicator */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 pb-8 sm:flex-row sm:px-8">
        {/* Floating Quick Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/quran"
            className="rounded-2xl bg-white/15 border border-white/20 px-3.5 py-1.5 text-xs font-bold text-stone-100 backdrop-blur-xl transition-all hover:bg-white/25 hover:scale-105"
          >
            📖 ১১৪ সূরা
          </Link>
          <Link
            href="/hadith"
            className="rounded-2xl bg-white/15 border border-white/20 px-3.5 py-1.5 text-xs font-bold text-stone-100 backdrop-blur-xl transition-all hover:bg-white/25 hover:scale-105"
          >
            📚 ৭ সহীহ হাদিস
          </Link>
          <Link
            href="/companions"
            className="rounded-2xl bg-white/15 border border-white/20 px-3.5 py-1.5 text-xs font-bold text-stone-100 backdrop-blur-xl transition-all hover:bg-white/25 hover:scale-105"
          >
            🛡️ সাহাবী জীবনী
          </Link>
          <Link
            href="/names-of-allah"
            className="rounded-2xl bg-white/15 border border-white/20 px-3.5 py-1.5 text-xs font-bold text-stone-100 backdrop-blur-xl transition-all hover:bg-white/25 hover:scale-105"
          >
            ✨ ৯৯ আসমাউল হুসনা
          </Link>
          <Link
            href="/duas"
            className="rounded-2xl bg-white/15 border border-white/20 px-3.5 py-1.5 text-xs font-bold text-stone-100 backdrop-blur-xl transition-all hover:bg-white/25 hover:scale-105"
          >
            🤲 মাসনূন দু&apos;আ
          </Link>
        </div>

        {/* Scroll Gesture Button */}
        <button
          onClick={scrollToContent}
          className="group inline-flex items-center gap-2 text-xs font-bold text-stone-300 transition-colors hover:text-white"
        >
          <span>নিচে স্ক্রোল করুন • Scroll to Explore</span>
          <ChevronDown className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:translate-y-1 animate-bounce" />
        </button>
      </div>
    </div>
  )
}
