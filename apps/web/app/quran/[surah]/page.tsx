"use client"

import { use, useEffect, useState, useRef, useCallback } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Loader2,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  Heart,
  BookmarkCheck,
  Check,
  Copy,
  Share2,
  Volume2,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import type { SurahDetail, Ayah } from "@noor/types"

const RECITERS = [
  { name: "Mishary Rashid Alafasy", id: "ar.alafasy" },
  { name: "Abdul Rahman As-Sudais", id: "ar.abdurrahmaanassudais" },
  { name: "Abu Bakr Al Shatri", id: "ar.abubakrasshatri" },
  { name: "Saad Al-Ghamdi", id: "ar.saadalghamidi" },
]

type DisplayMode = "all" | "ar+bn" | "ar+en" | "ar" | "bn"

export default function SurahDetailPage({
  params,
}: {
  params: Promise<{ surah: string }>
}) {
  const { surah } = use(params)
  const num = parseInt(surah, 10)

  const [surahData, setSurahData] = useState<SurahDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Display and filter state
  const [displayMode, setDisplayMode] = useState<DisplayMode>("all")
  const [reciter, setReciter] = useState(RECITERS[0]?.id ?? "ar.alafasy")
  const [showTafsir, setShowTafsir] = useState(false)
  const [tafsirText, setTafsirText] = useState<string>("")

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAyahIndex, setCurrentAyahIndex] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Action statuses
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null)
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<Set<number>>(new Set())
  const [savedProgressAyah, setSavedProgressAyah] = useState<number | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    // Fetch cached surah detail from internal API
    fetch(`/api/quran/surah/${num}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load surah")
        return r.json()
      })
      .then((data) => {
        if (data.surah) {
          setSurahData(data.surah)
        } else {
          throw new Error("Surah not found")
        }
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || "Failed to load surah")
        setLoading(false)
      })

    // Fetch Tafsir
    fetch(`https://quran.com/api/qtls/v4/tafsirs/1?surah=${num}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    })
      .then((r) => r.json())
      .then((d) => {
        const t = d?.tafsirs?.[0]?.text
        if (typeof t === "string") setTafsirText(t)
      })
      .catch(() => undefined)
  }, [num])

  // Stop audio on unmount or surah change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [num])

  const playAyah = useCallback(
    (index: number) => {
      if (!surahData || index < 0 || index >= surahData.ayahs.length) {
        setIsPlaying(false)
        setCurrentAyahIndex(null)
        return
      }

      const ayah = surahData.ayahs[index]
      if (!ayah) {
        setIsPlaying(false)
        setCurrentAyahIndex(null)
        return
      }

      if (audioRef.current) {
        audioRef.current.pause()
      }

      setCurrentAyahIndex(index)
      setIsPlaying(true)

      const formattedNumber = String(ayah.globalNumber).padStart(6, "0")
      const src = `https://cdn.islamic.network/quran/audio/128/${reciter}/${formattedNumber}.mp3`
      const audio = new Audio(src)
      audioRef.current = audio

      audio.play().catch(() => {
        setIsPlaying(false)
      })

      audio.onended = () => {
        if (index + 1 < surahData.ayahs.length) {
          playAyah(index + 1)
        } else {
          setIsPlaying(false)
          setCurrentAyahIndex(null)
        }
      }
    },
    [surahData, reciter],
  )

  const toggleFullSurahPlay = () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause()
      setIsPlaying(false)
    } else {
      playAyah(currentAyahIndex ?? 0)
    }
  }

  const handleCopy = async (ayah: Ayah) => {
    const text = [
      ayah.textArabic,
      ayah.translationBn ? `[বাংলা]: ${ayah.translationBn}` : null,
      ayah.translationEn ? `[English]: ${ayah.translationEn}` : null,
      `— Surah ${surahData?.meta.nameEnglish} (${num}:${ayah.numberInSurah})`,
    ]
      .filter(Boolean)
      .join("\n\n")

    try {
      await navigator.clipboard.writeText(text)
      setCopiedAyah(ayah.numberInSurah)
      setTimeout(() => setCopiedAyah(null), 2000)
    } catch {
      // Ignored
    }
  }

  const handleShare = async (ayah: Ayah) => {
    const text = `${ayah.textArabic}\n\n${ayah.translationBn || ayah.translationEn}\n— Surah ${surahData?.meta.nameEnglish} (${num}:${ayah.numberInSurah})`
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Surah ${surahData?.meta.nameEnglish} ${num}:${ayah.numberInSurah}`,
          text,
        })
      } catch {
        // Cancelled
      }
    } else {
      handleCopy(ayah)
    }
  }

  const handleBookmark = async (ayah: Ayah) => {
    if (!surahData) return
    try {
      const r = await fetch("/api/library/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surahNumber: num,
          ayahNumber: ayah.numberInSurah,
          surahName: surahData.meta.nameEnglish,
          textArabic: ayah.textArabic,
          translationEn: ayah.translationEn || "",
          translationBn: ayah.translationBn || "",
        }),
      })
      if (r.ok) {
        setBookmarkedAyahs((prev) => new Set(prev).add(ayah.numberInSurah))
      }
    } catch {
      // Ignored
    }
  }

  const handleSaveProgress = async (ayah: Ayah) => {
    if (!surahData) return
    try {
      const r = await fetch("/api/library/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surahNumber: num,
          ayahNumber: ayah.numberInSurah,
          surahName: surahData.meta.nameEnglish,
          totalAyahs: surahData.meta.ayahCount,
        }),
      })
      if (r.ok) {
        setSavedProgressAyah(ayah.numberInSurah)
        setTimeout(() => setSavedProgressAyah(null), 2500)
      }
    } catch {
      // Ignored
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600 dark:text-emerald-400" />
        <p className="text-sm text-stone-500">সূরা লোড হচ্ছে...</p>
      </div>
    )
  }

  if (error || !surahData) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">সূরা খুঁজে পাওয়া যায়নি</h2>
        <p className="mt-1 text-sm text-stone-500">{error || "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি।"}</p>
        <Link
          href="/quran"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" /> সূরার তালিকায় ফিরে যান
        </Link>
      </div>
    )
  }

  const { meta, ayahs } = surahData

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Top Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/quran"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-emerald-600 dark:text-stone-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" /> আল-কুরআন সূচিপত্র
        </Link>
        <span className="text-xs font-semibold text-stone-400">
          সূরা {meta.number} / 114
        </span>
      </div>

      {/* Surah Hero Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-white via-emerald-50/20 to-white p-6 text-center shadow-sm sm:p-8 dark:border-emerald-500/30 dark:from-stone-900 dark:via-emerald-950/20 dark:to-stone-900">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" />
          {meta.revelationType === "Meccan" ? "মাক্কী সূরা" : "মাদানী সূরা"} · {meta.ayahCount} আয়াত
        </span>

        <h1 className="arabic my-3 text-4xl font-bold text-stone-900 dark:text-stone-100 sm:text-5xl">
          {meta.nameArabic}
        </h1>

        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-200">
          {meta.nameEnglish}
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {meta.nameTranslation}
        </p>

        {/* Audio & Display Toolbar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={toggleFullSurahPlay}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "বিরতি (Pause)" : "সম্পূর্ণ তিলাওয়াত শুনুন"}
          </button>

          <select
            value={reciter}
            onChange={(e) => setReciter(e.target.value)}
            className="rounded-2xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-medium text-stone-700 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
          >
            {RECITERS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          {/* Display Mode Dropdown */}
          <select
            value={displayMode}
            onChange={(e) => setDisplayMode(e.target.value as DisplayMode)}
            className="rounded-2xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-medium text-stone-700 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
          >
            <option value="all">আরবি + বাংলা + English</option>
            <option value="ar+bn">আরবি + বাংলা (Ar + Bn)</option>
            <option value="ar+en">আরবি + English (Ar + En)</option>
            <option value="ar">শুধু আরবি (Arabic Only)</option>
            <option value="bn">শুধু বাংলা (Bangla Only)</option>
          </select>

          {tafsirText && (
            <button
              onClick={() => setShowTafsir(!showTafsir)}
              className={`inline-flex items-center gap-1.5 rounded-2xl border px-3.5 py-2 text-xs font-medium transition-all ${
                showTafsir
                  ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                  : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
              }`}
            >
              {showTafsir ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              তাফসীর (Tafsir)
            </button>
          )}
        </div>
      </div>

      {/* Tafsir Card */}
      {showTafsir && tafsirText && (
        <div className="mb-8 rounded-3xl border border-amber-300/80 bg-amber-50/70 p-6 shadow-sm dark:border-amber-800/60 dark:bg-amber-950/30">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-700 dark:text-amber-400" />
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
              তাফসীর ইবনে কাসীর (Tafsir Ibn Kathir) — সারসংক্ষেপ
            </h3>
          </div>
          <div
            className="prose prose-sm max-w-none leading-relaxed text-stone-800 dark:text-stone-200"
            dangerouslySetInnerHTML={{
              __html: tafsirText
                .replace(/\n/g, "<br/>")
                .replace(/\(.*?\)/g, '<span class="text-amber-700 dark:text-amber-400 font-medium">$&</span>'),
            }}
          />
        </div>
      )}

      {/* Bismillah Header (for all Surahs except Surah 9 At-Tawbah) */}
      {num !== 9 && (
        <div className="mb-8 text-center">
          <p className="arabic text-3xl text-emerald-800 dark:text-emerald-400">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            পরম করুণাময় অসীম দয়ালু আল্লাহর নামে
          </p>
        </div>
      )}

      {/* Ayahs List */}
      <div className="space-y-5">
        {ayahs.map((ayah, idx) => {
          const isCurrent = currentAyahIndex === idx && isPlaying
          const isBookmarked = bookmarkedAyahs.has(ayah.numberInSurah)
          const isSavedProgress = savedProgressAyah === ayah.numberInSurah

          return (
            <div
              key={ayah.numberInSurah}
              id={`ayah-${ayah.numberInSurah}`}
              className={`group relative rounded-3xl border p-5 sm:p-6 transition-all duration-200 ${
                isCurrent
                  ? "border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20 dark:border-emerald-500/60 dark:bg-emerald-950/30"
                  : "border-stone-200/80 bg-white hover:border-emerald-300 dark:border-stone-800 dark:bg-stone-900"
              }`}
            >
              {/* Ayah Number & Controls */}
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-100 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                  {ayah.numberInSurah}
                </span>

                <div className="flex items-center gap-1">
                  {/* Play Ayah Audio */}
                  <button
                    onClick={() => playAyah(idx)}
                    title="এই আয়াত শুনুন"
                    className="rounded-xl p-2 text-stone-400 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>

                  {/* Bookmark Ayah */}
                  <button
                    onClick={() => handleBookmark(ayah)}
                    title="বুকমার্ক করুন"
                    className={`rounded-xl p-2 transition-colors ${
                      isBookmarked
                        ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                        : "text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                  </button>

                  {/* Save Progress */}
                  <button
                    onClick={() => handleSaveProgress(ayah)}
                    title="পড়ার অগ্রগতি সংরক্ষণ করুন"
                    className={`rounded-xl p-2 transition-colors ${
                      isSavedProgress
                        ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
                        : "text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                    }`}
                  >
                    {isSavedProgress ? <BookmarkCheck className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                  </button>

                  {/* Copy Ayah */}
                  <button
                    onClick={() => handleCopy(ayah)}
                    title="কপি করুন"
                    className="rounded-xl p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                  >
                    {copiedAyah === ayah.numberInSurah ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>

                  {/* Share Ayah */}
                  <button
                    onClick={() => handleShare(ayah)}
                    title="শেয়ার করুন"
                    className="rounded-xl p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Arabic Text */}
              {displayMode !== "bn" && (
                <p
                  className="arabic mb-4 text-right text-2xl font-medium leading-loose text-stone-900 sm:text-3xl dark:text-stone-50"
                  dir="rtl"
                >
                  {ayah.textArabic}
                </p>
              )}

              {/* Bangla Translation */}
              {(displayMode === "all" || displayMode === "ar+bn" || displayMode === "bn") && ayah.translationBn && (
                <p className="bengali mb-2 text-sm sm:text-base leading-relaxed text-emerald-950 dark:text-emerald-100">
                  {ayah.translationBn}
                </p>
              )}

              {/* English Translation */}
              {(displayMode === "all" || displayMode === "ar+en") && ayah.translationEn && (
                <p className="text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {ayah.translationEn}
                </p>
              )}

              {/* Ayah Meta Info */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500">
                <span>
                  {meta.nameEnglish} {meta.number}:{ayah.numberInSurah} · পারা/Juz {ayah.juz} · পৃষ্ঠা {ayah.page}
                </span>
                {ayah.sajda && (
                  <span className="rounded bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    সিজদাহ (Sajda)
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Prev / Next Navigation */}
      <div className="mt-10 flex items-center justify-between border-t border-stone-200 pt-6 dark:border-stone-800">
        {num > 1 ? (
          <Link
            href={`/quran/${num - 1}`}
            className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
          >
            <ArrowLeft className="h-4 w-4" /> পূর্ববর্তী সূরা ({num - 1})
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/quran"
          className="rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
        >
          সূচিপত্র (All Surahs)
        </Link>

        {num < 114 ? (
          <Link
            href={`/quran/${num + 1}`}
            className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
          >
            পরবর্তী সূরা ({num + 1}) <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
