"use client"

import { use, useEffect, useState, useCallback } from "react"
import {
  Play,
  Pause,
  Volume2,
  BookmarkCheck,
  Heart,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Loader2,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react"
import Link from "next/link"
import type { SurahDetail, Ayah } from "@noor/types"
import {
  RECITERS_LIST,
  audioManager,
} from "@/lib/audio/audio-player-engine"

const RECITERS = RECITERS_LIST.map((r) => ({ name: `${r.nameBn} (${r.nameEn})`, id: r.id }))

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
      audioManager.stop()
      setIsPlaying(false)
      setCurrentAyahIndex(null)
    }
  }, [num])

  const playAyah = useCallback(
    (index: number, targetReciter = reciter) => {
      if (!surahData || index < 0 || index >= surahData.ayahs.length) {
        setIsPlaying(false)
        setCurrentAyahIndex(null)
        audioManager.stop()
        return
      }

      const ayah = surahData.ayahs[index]
      if (!ayah) return

      setCurrentAyahIndex(index)
      setIsPlaying(true)

      // Auto-scroll playing ayah into view
      const el = document.getElementById(`ayah-${ayah.numberInSurah}`)
      el?.scrollIntoView({ behavior: "smooth", block: "center" })

      audioManager.setListeners({
        stateChange: (state) => {
          setIsPlaying(state === "playing" || state === "loading")
        },
        ended: () => {
          if (index + 1 < surahData.ayahs.length) {
            playAyah(index + 1, targetReciter)
          } else {
            setIsPlaying(false)
            setCurrentAyahIndex(null)
          }
        },
        error: () => {
          setIsPlaying(false)
        },
      })

      audioManager.playAyah(num, ayah.numberInSurah, targetReciter)
    },
    [surahData, reciter, num]
  )

  const handleReciterChange = (newReciterId: string) => {
    setReciter(newReciterId)
    if (isPlaying && currentAyahIndex !== null) {
      playAyah(currentAyahIndex, newReciterId)
    }
  }

  const toggleFullSurahPlay = () => {
    if (isPlaying) {
      audioManager.pause()
      setIsPlaying(false)
    } else {
      playAyah(currentAyahIndex ?? 0)
    }
  }

  const toggleSingleAyah = (index: number) => {
    if (currentAyahIndex === index && isPlaying) {
      audioManager.pause()
      setIsPlaying(false)
    } else {
      playAyah(index)
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
          title: `Surah ${surahData?.meta.nameEnglish} : ${ayah.numberInSurah}`,
          text,
        })
      } catch {
        // Ignored
      }
    } else {
      handleCopy(ayah)
    }
  }

  // Auth Guard for Bookmark Ayah
  const handleBookmark = async (ayah: Ayah) => {
    try {
      const res = await fetch("/api/library/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surahNumber: num,
          ayahNumber: ayah.numberInSurah,
          arabicText: ayah.textArabic,
          translationBn: ayah.translationBn,
          surahNameBn: surahData?.meta.nameTranslation,
        }),
      })

      if (res.status === 401) {
        const redirect = encodeURIComponent(window.location.pathname)
        window.location.href = `/login?redirect=${redirect}&intent=bookmark`
        return
      }

      if (res.ok) {
        setBookmarkedAyahs((prev) => new Set(prev).add(ayah.numberInSurah))
      }
    } catch {
      // Ignored
    }
  }

  // Auth Guard for Save Progress Tracking
  const handleSaveProgress = async (ayah: Ayah) => {
    try {
      const res = await fetch("/api/library/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surahNumber: num,
          lastAyah: ayah.numberInSurah,
          totalAyahs: surahData?.meta.ayahCount ?? 0,
        }),
      })

      if (res.status === 401) {
        const redirect = encodeURIComponent(window.location.pathname)
        window.location.href = `/login?redirect=${redirect}&intent=progress`
        return
      }

      if (res.ok) {
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
        <Loader2 className="h-7 w-7 animate-spin text-neutral-900 dark:text-neutral-100" />
        <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">সূরা লোড হচ্ছে...</p>
      </div>
    )
  }

  if (error || !surahData) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">সূরা খুঁজে পাওয়া যায়নি</h2>
        <p className="mt-1 text-xs text-neutral-500">{error || "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি।"}</p>
        <Link
          href="/quran"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          <ArrowLeft className="h-4 w-4" /> সূরার তালিকায় ফিরে যান
        </Link>
      </div>
    )
  }

  const { meta, ayahs } = surahData

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-8 pb-32">
      {/* Top Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/quran"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> আল-কুরআন সূচিপত্র
        </Link>
        <span className="text-xs font-mono text-neutral-600 dark:text-neutral-300">
          সূরা {meta.number} / 114
        </span>
      </div>

      {/* Surah Hero Header (Monochrome Minimalism) */}
      <div className="relative mb-8 rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm sm:p-8 dark:border-neutral-800 dark:bg-neutral-950">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
          <Sparkles className="h-3 w-3" />
          {meta.revelationType === "Meccan" ? "মাক্কী সূরা" : "মাদানী সূরা"} · {meta.ayahCount} আয়াত
        </span>

        <h1 className="arabic my-4 text-4xl font-bold text-neutral-900 dark:text-white sm:text-5xl">
          {meta.nameArabic}
        </h1>

        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          {meta.nameEnglish}
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {meta.nameTranslation}
        </p>

        {/* Audio & Display Toolbar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={toggleFullSurahPlay}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
            {isPlaying ? "বিরতি (Pause)" : "সম্পূর্ণ তিলাওয়াত শুনুন"}
          </button>

          <select
            value={reciter}
            onChange={(e) => handleReciterChange(e.target.value)}
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-800 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
          >
            {RECITERS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          <select
            value={displayMode}
            onChange={(e) => setDisplayMode(e.target.value as DisplayMode)}
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-800 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
          >
            <option value="all">সব দেখুন (আরবি+বাংলা+ইংরেজি)</option>
            <option value="ar+bn">আরবি + বাংলা</option>
            <option value="ar+en">আরবি + ইংরেজি</option>
            <option value="ar">শুধু আরবি</option>
            <option value="bn">শুধু বাংলা</option>
          </select>

          {tafsirText && (
            <button
              onClick={() => setShowTafsir(!showTafsir)}
              className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                showTafsir
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
              }`}
            >
              তাফসীর {showTafsir ? "লুকান" : "দেখুন"}
            </button>
          )}
        </div>
      </div>

      {/* Tafsir Accordion View */}
      {showTafsir && tafsirText && (
        <div className="mb-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-8">
          <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
              তাফসীর ইবনে কাসীর — সূরা {meta.nameTranslation}
            </h3>
            <span className="rounded border border-neutral-300 px-2 py-0.5 text-[10px] font-mono text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">
              আল-কুরআন একাডেমি
            </span>
          </div>
          <div
            className="prose prose-neutral dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: tafsirText
                .replace(/\n/g, "<br/>")
                .replace(/\(.*?\)/g, '<span class="font-semibold">$&</span>'),
            }}
          />
        </div>
      )}

      {/* Bismillah Header (for all Surahs except Surah 9 At-Tawbah) */}
      {num !== 9 && (
        <div className="mb-8 text-center">
          <p className="arabic text-3xl text-neutral-900 dark:text-white">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
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
              className={`group relative rounded-2xl border p-5 sm:p-6 transition-all duration-200 ${
                isCurrent
                  ? "border-neutral-900 bg-neutral-100 shadow-md ring-1 ring-neutral-900 dark:border-white dark:bg-neutral-900 dark:ring-white"
                  : "border-neutral-200 bg-white hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
              }`}
            >
              {/* Ayah Number & Controls */}
              <div className="mb-4 flex items-center justify-between gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-mono font-bold transition-colors ${
                    isCurrent
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                  }`}
                >
                  {ayah.numberInSurah}
                </span>

                <div className="flex items-center gap-1">
                  {/* Play Ayah Audio */}
                  <button
                    onClick={() => toggleSingleAyah(idx)}
                    title={isCurrent ? "তিলাওয়াত থামান" : "এই আয়াত শুনুন"}
                    className={`rounded-xl border p-2 transition-all ${
                      isCurrent
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-black dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white"
                    }`}
                  >
                    {isCurrent ? <Pause className="h-4 w-4 fill-current" /> : <Volume2 className="h-4 w-4" />}
                  </button>

                  {/* Bookmark Ayah */}
                  <button
                    onClick={() => handleBookmark(ayah)}
                    title="বুকমার্ক করুন"
                    className={`rounded-xl border p-2 transition-colors ${
                      isBookmarked
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-black dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                  </button>

                  {/* Save Progress */}
                  <button
                    onClick={() => handleSaveProgress(ayah)}
                    title="পড়ার অগ্রগতি সংরক্ষণ করুন"
                    className={`rounded-xl border p-2 transition-colors ${
                      isSavedProgress
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-black dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white"
                    }`}
                  >
                    {isSavedProgress ? <BookmarkCheck className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                  </button>

                  {/* Copy Ayah */}
                  <button
                    onClick={() => handleCopy(ayah)}
                    title="কপি করুন"
                    className="rounded-xl border border-neutral-200 p-2 text-neutral-400 hover:border-neutral-300 hover:text-black dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:text-white"
                  >
                    {copiedAyah === ayah.numberInSurah ? (
                      <Check className="h-4 w-4 text-black dark:text-white" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>

                  {/* Share Ayah */}
                  <button
                    onClick={() => handleShare(ayah)}
                    title="শেয়ার করুন"
                    className="rounded-xl border border-neutral-200 p-2 text-neutral-400 hover:border-neutral-300 hover:text-black dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:text-white"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Arabic Text */}
              {displayMode !== "bn" && (
                <p
                  className={`arabic mb-4 text-2xl sm:text-3xl leading-[2.2] tracking-wide text-right transition-colors ${
                    isCurrent
                      ? "text-black dark:text-white font-bold"
                      : "text-neutral-900 dark:text-neutral-100"
                  }`}
                  dir="rtl"
                >
                  {ayah.textArabic}
                </p>
              )}

              {/* Bengali Translation */}
              {(displayMode === "all" || displayMode === "ar+bn" || displayMode === "bn") &&
                ayah.translationBn && (
                  <p className="mb-2 text-sm sm:text-base leading-relaxed text-neutral-900 dark:text-neutral-100 font-medium">
                    {ayah.translationBn}
                  </p>
                )}

              {/* English Translation */}
              {(displayMode === "all" || displayMode === "ar+en") && ayah.translationEn && (
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {ayah.translationEn}
                </p>
              )}

              {/* Ayah Meta Info */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-300">
                <span>
                  {meta.nameEnglish} {meta.number}:{ayah.numberInSurah} · পারা/Juz {ayah.juz} · পৃষ্ঠা {ayah.page}
                </span>
                {ayah.sajda && (
                  <span className="rounded border border-neutral-300 px-1.5 py-0.2 font-semibold text-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                    সিজদাহ (Sajda)
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Prev / Next Navigation */}
      <div className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
        {num > 1 ? (
          <Link
            href={`/quran/${num - 1}`}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-800 shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
          >
            <ArrowLeft className="h-4 w-4" /> পূর্ববর্তী সূরা ({num - 1})
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/quran"
          className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
        >
          সূচিপত্র (All Surahs)
        </Link>

        {num < 114 ? (
          <Link
            href={`/quran/${num + 1}`}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-800 shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
          >
            পরবর্তী সূরা ({num + 1}) <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Sticky Bottom Floating Quran Player Bar */}
      {isPlaying && currentAyahIndex !== null && (
        <div className="fixed bottom-4 left-1/2 z-50 w-[95%] max-w-2xl -translate-x-1/2 rounded-2xl border border-neutral-300 bg-white/95 p-3.5 shadow-2xl backdrop-blur-2xl dark:border-neutral-700 dark:bg-neutral-950/95 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between gap-3">
            {/* Current Ayah Info */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-black text-white font-mono font-bold text-xs shadow dark:bg-white dark:text-black">
                {currentAyahIndex + 1}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                  সূরা {meta.nameTranslation} • আয়াত {currentAyahIndex + 1} / {meta.ayahCount}
                </div>
                <div className="text-[10px] text-neutral-500 truncate">
                  {RECITERS.find((r) => r.id === reciter)?.name}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => playAyah(Math.max(0, currentAyahIndex - 1))}
                disabled={currentAyahIndex <= 0}
                title="পূর্ববর্তী আয়াত"
                className="rounded-xl border border-neutral-200 p-2 text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 dark:border-neutral-800 dark:text-neutral-400"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                onClick={() => toggleSingleAyah(currentAyahIndex)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white shadow hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-black"
              >
                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => playAyah(Math.min(ayahs.length - 1, currentAyahIndex + 1))}
                disabled={currentAyahIndex >= ayahs.length - 1}
                title="পরবর্তী আয়াত"
                className="rounded-xl border border-neutral-200 p-2 text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 dark:border-neutral-800 dark:text-neutral-400"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>

            {/* Reciter quick switch & close */}
            <div className="flex items-center gap-1.5">
              <select
                value={reciter}
                onChange={(e) => handleReciterChange(e.target.value)}
                className="hidden sm:block rounded-xl border border-neutral-200 bg-neutral-50 px-2 py-1 text-[11px] font-semibold text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 max-w-[140px] truncate"
              >
                {RECITERS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  audioManager.stop()
                  setIsPlaying(false)
                  setCurrentAyahIndex(null)
                }}
                title="প্লেয়ার বন্ধ করুন"
                className="rounded-xl border border-neutral-200 p-2 text-neutral-500 hover:bg-neutral-100 hover:text-black dark:border-neutral-800 dark:hover:bg-neutral-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
