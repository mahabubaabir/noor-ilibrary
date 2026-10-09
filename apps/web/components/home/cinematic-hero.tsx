"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Pause,
  Copy,
  Check,
  BookOpen,
  Volume2,
  ChevronDown,
  Sparkles,
  Search,
  Loader2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react"
import { audioManager } from "@/lib/audio/audio-player-engine"
import { trackUserInteraction } from "@/lib/recommendation/engine"

interface DailyAyah {
  surahNumber: number
  surahNameBn: string
  surahNameEn: string
  ayahNumber: number
  globalNumber: number
  textArabic: string
  translationBn: string
  translationEn: string
}

// Graceful first-paint / offline fallback. In normal operation this is replaced
// by the same deterministic daily ayah every visitor sees today.
const FALLBACK_AYAH: DailyAyah = {
  surahNumber: 94,
  surahNameBn: "আল-ইনশিরাহ",
  surahNameEn: "Ash-Sharh",
  ayahNumber: 6,
  globalNumber: 6094,
  textArabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
  translationBn: "নিশ্চয়ই কষ্টের সাথেই রয়েছে স্বস্তি ও পরম প্রশান্তি।",
  translationEn: "Indeed, with hardship comes ease.",
}

export function CinematicHero() {
  const [dailyAyah, setDailyAyah] = useState<DailyAyah>(FALLBACK_AYAH)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [bookmarked, setBookmarked] = useState(false)
  const [bookmarkBusy, setBookmarkBusy] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Load today's ayah from the DB-backed deterministic daily-ayah engine.
  // Reloads and revisits always return the same ayah for the same day.
  useEffect(() => {
    let cancelled = false
    fetch("/api/quran/daily")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`status ${r.status}`))))
      .then((d) => {
        if (cancelled) return
        if (d?.ayah?.textArabic) {
          setDailyAyah(d.ayah as DailyAyah)
          setBookmarked(Boolean(d.bookmarked))
        }
      })
      .catch(() => {
        // Keep the fallback ayah - the hero must never look broken
      })
    return () => {
      cancelled = true
    }
  }, [])

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
      .playAyah(dailyAyah.surahNumber, dailyAyah.ayahNumber, "ar.alafasy")
      .catch(() => {
        setIsLoadingAudio(false)
        setIsPlayingAudio(false)
      })

    trackUserInteraction("quran", `hero-audio-${dailyAyah.surahNumber}-${dailyAyah.ayahNumber}`)
  }

  const handleCopy = async () => {
    const text = `${dailyAyah.textArabic}\n\n"${dailyAyah.translationBn}"\n— সূরা ${dailyAyah.surahNameBn} [${dailyAyah.surahNumber}:${dailyAyah.ayahNumber}]\nনূর ইসলামিক লাইব্রেরি`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  // Save today's ayah to the account library (Bookmark table). Guests are
  // redirected to login and come straight back, mirroring the hadith flow.
  const handleToggleBookmark = async () => {
    if (bookmarkBusy) return
    setBookmarkBusy(true)
    try {
      if (bookmarked) {
        const r = await fetch(
          `/api/library/bookmarks?surah=${dailyAyah.surahNumber}&ayah=${dailyAyah.ayahNumber}`,
          { method: "DELETE" }
        )
        if (r.ok) setBookmarked(false)
      } else {
        const r = await fetch("/api/library/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            surahNumber: dailyAyah.surahNumber,
            ayahNumber: dailyAyah.ayahNumber,
            surahName: dailyAyah.surahNameEn,
            textArabic: dailyAyah.textArabic,
            translationEn: dailyAyah.translationEn,
            translationBn: dailyAyah.translationBn,
          }),
        })
        if (r.status === 401) {
          const redirect = encodeURIComponent("/")
          window.location.href = `/login?redirect=${redirect}&intent=ayah`
          return
        }
        if (r.ok) {
          setBookmarked(true)
          trackUserInteraction(
            "quran",
            `bookmark-ayah-${dailyAyah.surahNumber}-${dailyAyah.ayahNumber}`
          )
        }
      }
    } catch {
      // Ignored - bookmark is a progressive enhancement
    } finally {
      setBookmarkBusy(false)
    }
  }

  const scrollToContent = () => {
    const el = document.getElementById("main-feed-section")
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative flex min-h-[92vh] w-full flex-col justify-between overflow-hidden border-b border-neutral-200 text-neutral-900 select-none dark:border-neutral-800 dark:text-white">
      {/* Background Subtle Monochrome Dust Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
      />

      {/* Subtle Radial Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(128,128,128,0.12),rgba(255,255,255,0))]" />

      {/* Top Header Tag */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8 sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-100/80 px-3.5 py-1 text-[11px] font-mono font-semibold text-neutral-700 backdrop-blur-xl dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-300">
          <Sparkles className="h-3.5 w-3.5 text-neutral-900 animate-pulse dark:text-white" />
          <span>নূর ইসলামিক লাইব্রেরি • MINIMALIST EDITION</span>
        </div>

        <div
          title="এই আয়াতটি আজ সারাদিন একই থাকবে — রিলোড বা পুনরায় ভিজিট করলেও পরিবর্তন হবে না"
          className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-100/80 px-3 py-1 text-xs font-semibold text-neutral-700 backdrop-blur-xl dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-300"
        >
          <Sparkles className="h-3 w-3" />
          <span>আজকের আয়াত • স্থির সারাদিন</span>
        </div>
      </div>

      {/* Center Stage: Hero Daily Ayah (Editorial Swiss Style) */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-12 text-center sm:px-8 sm:py-16">
        {/* Daily Tag */}
        <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          কুরআনের বাণী • DAILY QURAN AYAH
        </span>

        {/* Grand Arabic Calligraphy with High Contrast */}
        <h1
          dir="rtl"
          className="arabic text-3xl font-medium leading-[2.4] tracking-wide sm:text-5xl lg:text-6xl text-neutral-900 drop-shadow-sm dark:text-white max-w-3xl"
        >
          {dailyAyah.textArabic}
        </h1>

        {/* Bengali Translation */}
        <p className="bengali mt-6 max-w-2xl text-base sm:text-xl font-medium leading-relaxed text-neutral-700 dark:text-neutral-200">
          &ldquo;{dailyAyah.translationBn}&rdquo;
        </p>

        {/* English Translation */}
        <p className="mt-2 max-w-xl text-xs sm:text-sm italic leading-relaxed text-neutral-500 dark:text-neutral-400">
          {dailyAyah.translationEn}
        </p>

        {/* Surah Citation */}
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
          <span className="text-neutral-900 font-bold font-mono dark:text-white">
            সূরা {dailyAyah.surahNameBn} [{dailyAyah.surahNumber}:{dailyAyah.ayahNumber}]
          </span>
          <span>•</span>
          <span className="text-neutral-400 dark:text-neutral-500">{dailyAyah.surahNameEn}</span>
        </div>

        {/* Audio Recitation & Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Audio Recitation Button */}
          <button
            onClick={handleToggleAudio}
            disabled={isLoadingAudio}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-neutral-800 active:scale-95 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            {isLoadingAudio ? (
              <Loader2 className="h-4 w-4 animate-spin text-white dark:text-black" />
            ) : isPlayingAudio ? (
              <Pause className="h-4 w-4 fill-current text-white dark:text-black" />
            ) : (
              <Volume2 className="h-4 w-4 text-white dark:text-black" />
            )}
            <span>{isPlayingAudio ? "তিলাওয়াত থামান" : "তিলাওয়াত শুনুন (Listen)"}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleToggleBookmark}
            disabled={bookmarkBusy}
            title={bookmarked ? "বুকমার্ক থেকে সরান" : "আজকের আয়াতটি বুকমার্ক করুন"}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all active:scale-95 disabled:opacity-60 ${
              bookmarked
                ? "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                : "border-neutral-300 bg-neutral-50 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-white"
            }`}
          >
            {bookmarked ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            <span>{bookmarked ? "সংরক্ষিত" : "বুকমার্ক"}</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            title="আয়াত কপি করুন"
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-xs font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-white"
          >
            {copied ? <Check className="h-4 w-4 text-neutral-900 dark:text-white" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "কপি হয়েছে" : "কপি"}</span>
          </button>

          {/* Read Surah Link */}
          <Link
            href={`/quran/${dailyAyah.surahNumber}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-xs font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-white"
          >
            <BookOpen className="h-4 w-4" />
            <span>সম্পূর্ণ সূরা পড়ুন</span>
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
              placeholder="কুরআনের আয়াত, সূরা, হাদিস বা সাহাবীদের জীবনী খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-neutral-300 bg-white py-3 pl-11 pr-24 text-xs text-neutral-900 placeholder:text-neutral-400 backdrop-blur-xl focus:border-neutral-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-white dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              className="absolute right-2 rounded-xl bg-black px-3.5 py-1.5 text-xs font-bold text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              অনুসন্ধান
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
            <span className="text-neutral-400 dark:text-neutral-600">জনপ্রিয়:</span>
            <Link href="/quran/67" className="hover:text-neutral-900 underline-offset-2 hover:underline dark:hover:text-white">
              সূরা মুলক
            </Link>
            <span>•</span>
            <Link href="/quran/36" className="hover:text-neutral-900 underline-offset-2 hover:underline dark:hover:text-white">
              সূরা ইয়াসীন
            </Link>
            <span>•</span>
            <Link href="/quran/18" className="hover:text-neutral-900 underline-offset-2 hover:underline dark:hover:text-white">
              সূরা কাহাফ
            </Link>
            <span>•</span>
            <Link href="/hadith/bukhari" className="hover:text-neutral-900 underline-offset-2 hover:underline dark:hover:text-white">
              সহীহ বুখারী
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 flex w-full justify-center pb-6">
        <button
          onClick={scrollToContent}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-white"
        >
          <span>নিচে আরও অন্বেষণ করুন</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
        </button>
      </div>
    </div>
  )
}
