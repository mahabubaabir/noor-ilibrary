"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  Play,
  Pause,
  Maximize2,
  Minimize2,
  BookOpen,
  Share2,
  Check,
  Search,
  Sparkles,
  ExternalLink,
  Volume2,
  Tv,
  ListVideo,
  Info,
  PlayCircle,
  Link2,
  PlusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export interface SurahVideoItem {
  id: string
  videoId: string
  surahNumber: number
  category: "shamsul" | "bangla" | "custom"
  categoryLabel: string
  nameBangla: string
  nameArabic: string
  nameEnglish: string
  reciterBn: string
  ayahCount: number
  revelation: "মাক্কী" | "মাদানী"
  duration: string
  descriptionBn: string
  descriptionEn: string
}

export const VERIFIED_SURAH_VIDEOS: SurahVideoItem[] = [
  // Shamsul Hoque Videos
  {
    id: "shamsul-mulk",
    videoId: "A7mdEViEU8M",
    surahNumber: 67,
    category: "shamsul",
    categoryLabel: "হাফেজ শামসুল হক",
    nameBangla: "সূরা আল-মূলক (তেলাওয়াত)",
    nameArabic: "سورة الملك",
    nameEnglish: "Surah Al-Mulk",
    reciterBn: "হাফেজ শামসুল হক",
    ayahCount: 30,
    revelation: "মাক্কী",
    duration: "07:45",
    descriptionBn: "হাফেজ শামসুল হক এর সুমিষ্ট ও হৃদয়গ্রাহী কণ্ঠে সূরা আল-মুলকের পূর্ণাঙ্গ তিলাওয়াত।",
    descriptionEn: "Beautiful recitation of Surah Al-Mulk recited by Hafez Shamsul Hoque.",
  },
  {
    id: "shamsul-quran-full",
    videoId: "OwwIT4y4__4",
    surahNumber: 1,
    category: "shamsul",
    categoryLabel: "হাফেজ শামসুল হক",
    nameBangla: "কুরআনুল কারীম তিলাওয়াত",
    nameArabic: "تلاوة القرآن الكريم",
    nameEnglish: "Quran Tilawat",
    reciterBn: "হাফেজ শামসুল হক",
    ayahCount: 7,
    revelation: "মাক্কী",
    duration: "15:20",
    descriptionBn: "হাফেজ শামসুল হক এর কণ্ঠে কুরআনের নির্বাচিত সুরময় তিলাওয়াত সংকলন।",
    descriptionEn: "Selected soul-stirring Quran recitation by Hafez Shamsul Hoque.",
  },
  {
    id: "shamsul-belali",
    videoId: "YnK7RNGWob4",
    surahNumber: 36,
    category: "shamsul",
    categoryLabel: "হাফেজ শামসুল হক",
    nameBangla: "কুরআন তিলাওয়াত ও বয়ান",
    nameArabic: "سورة يس والقرآن",
    nameEnglish: "Surah & Lecture",
    reciterBn: "হাফেজ ক্বারী শামসুল হক বেলালী",
    ayahCount: 83,
    revelation: "মাক্কী",
    duration: "24:10",
    descriptionBn: "হাফেজ ক্বারী শামসুল হক বেলালী (মাগুরা) এর সুললিত কণ্ঠের কুরআন তিলাওয়াত।",
    descriptionEn: "Melodious recitation by Hafez Qari Shamsul Hoque Belali.",
  },
  {
    id: "panje-surah-1",
    videoId: "54d8S7sT7cI",
    surahNumber: 36,
    category: "shamsul",
    categoryLabel: "পাঞ্জে সূরা সংকলন",
    nameBangla: "পাঞ্জে সূরা (ইয়াসিন, রহমান, মূলক, ওয়াকিয়াহ)",
    nameArabic: "القرآن الكريم",
    nameEnglish: "Panje Surah Collection",
    reciterBn: "নির্বাচিত কারীগণ",
    ayahCount: 287,
    revelation: "মাক্কী",
    duration: "42:00",
    descriptionBn: "দৈনন্দিন জীবনে অত্যন্ত ফজিলতপূর্ণ ৫টি প্রধান সূরার ধারাবাহিক অডিও-ভিডিও তিলাওয়াত।",
    descriptionEn: "Continuous recitation of the 5 essential surahs (Yasin, Ar-Rahman, Al-Waqi'ah, Al-Mulk, Al-Insan).",
  },
  {
    id: "panje-surah-2",
    videoId: "KBEVB5Rnb90",
    surahNumber: 55,
    category: "shamsul",
    categoryLabel: "পাঞ্জে সূরা সংকলন",
    nameBangla: "পাঞ্জে সূরা সংকলন ও অর্থ",
    nameArabic: "سورة الرحمن والواقعة",
    nameEnglish: "Panje Surah Audio",
    reciterBn: "বাংলা তরজমা সংকলন",
    ayahCount: 174,
    revelation: "মাক্কী",
    duration: "38:30",
    descriptionBn: "সূরা আর-রহমান ও সূরা আল-ওয়াক্বি'আহ সহ গুরুত্বপূর্ণ সূরাসমূহের সুন্দর সংকলন।",
    descriptionEn: "Complete audio-visual presentation of Surah Ar-Rahman and Surah Al-Waqi'ah.",
  },

  // Surahs with Bangla Translation
  {
    id: "fatihah-bn",
    videoId: "kYv0S2Jm1w0",
    surahNumber: 1,
    category: "bangla",
    categoryLabel: "বাংলা অর্থসহ",
    nameBangla: "সূরা আল-ফাতিহা (অর্থসহ)",
    nameArabic: "سورة الفاتحة",
    nameEnglish: "Surah Al-Fatihah",
    reciterBn: "মিশারী আল-আফাসী ও বাংলা অনুবাদ",
    ayahCount: 7,
    revelation: "মাক্কী",
    duration: "03:10",
    descriptionBn: "কুরআনুল কারীমের প্রথম সূরা ফাতিহার প্রাঞ্জল বাংলা অর্থসহ হৃদয়স্পর্শী তিলাওয়াত।",
    descriptionEn: "Surah Al-Fatihah with clear Bengali meaning and melodious recitation.",
  },
  {
    id: "yasin-bn",
    videoId: "p4vin5gaiVA",
    surahNumber: 36,
    category: "bangla",
    categoryLabel: "বাংলা অর্থসহ",
    nameBangla: "সূরা ইয়াসীন (বাংলা অর্থসহ)",
    nameArabic: "سورة يس",
    nameEnglish: "Surah Ya-Sin",
    reciterBn: "বাংলা অনুবাদসহ তিলাওয়াত",
    ayahCount: 83,
    revelation: "মাক্কী",
    duration: "19:45",
    descriptionBn: "কুরআনের হৃদয় সূরা ইয়াসীনের প্রতিটি আয়াতের শুদ্ধ আরবী ও সুস্পষ্ট বাংলা অনুবাদ।",
    descriptionEn: "Surah Ya-Sin verse-by-verse with clear Bengali translation and audio.",
  },
  {
    id: "yasin-full",
    videoId: "68S8b_jD350",
    surahNumber: 36,
    category: "bangla",
    categoryLabel: "বাংলা অর্থসহ",
    nameBangla: "সূরা ইয়াসীন সম্পূর্ণ",
    nameArabic: "سورة يس كاملة",
    nameEnglish: "Surah Ya-Sin Complete",
    reciterBn: "মিশারী আল-আফাসী",
    ayahCount: 83,
    revelation: "মাক্কী",
    duration: "18:20",
    descriptionBn: "বিশ্বখ্যাত তিলাওয়াতকারী মিশারী আল-আফাসীর কণ্ঠে সূরা ইয়াসীন সম্পূর্ণ।",
    descriptionEn: "Complete soulful recitation of Surah Ya-Sin by Mishary Rashid Alafasy.",
  },
  {
    id: "rahman-bn",
    videoId: "F00e3-F3V3s",
    surahNumber: 55,
    category: "bangla",
    categoryLabel: "বাংলা অর্থসহ",
    nameBangla: "সূরা আর-রহমান (বাংলা অর্থসহ)",
    nameArabic: "سورة الرحمن",
    nameEnglish: "Surah Ar-Rahman",
    reciterBn: "মিশারী আল-আফাসী ও বাংলা",
    ayahCount: 78,
    revelation: "মাক্কী",
    duration: "17:15",
    descriptionBn: "আল্লাহর অপার অনুগ্রহ ও নেয়ামতের স্মরণবাহী সূরা আর-রহমান বাংলা অনুবাদসহ।",
    descriptionEn: "Surah Ar-Rahman with beautiful Bengali narration and reflection.",
  },
  {
    id: "mulk-bn",
    videoId: "ZVoopQUQe-s",
    surahNumber: 67,
    category: "bangla",
    categoryLabel: "বাংলা অর্থসহ",
    nameBangla: "সূরা আল-মুলক (বাংলা অর্থসহ)",
    nameArabic: "سورة الملك",
    nameEnglish: "Surah Al-Mulk",
    reciterBn: "শুদ্ধ তিলাওয়াত ও বাংলা",
    ayahCount: 30,
    revelation: "মাক্কী",
    duration: "10:30",
    descriptionBn: "প্রতি রাতে পঠিতব্য বরকতময় সূরা আল-মুলকের প্রাঞ্জল বাংলা অর্থসহ তিলাওয়াত।",
    descriptionEn: "Surah Al-Mulk with lucid Bengali meaning for daily nighttime listening.",
  },
  {
    id: "baqarah-bn",
    videoId: "FqS_W1I7T30",
    surahNumber: 2,
    category: "bangla",
    categoryLabel: "বাংলা অর্থসহ",
    nameBangla: "সূরা আল-বাক্বারাহ (নির্বাচিত)",
    nameArabic: "سورة البقرة",
    nameEnglish: "Surah Al-Baqarah",
    reciterBn: "বাংলা তিলাওয়াত",
    ayahCount: 286,
    revelation: "মাদানী",
    duration: "30:00",
    descriptionBn: "আয়াতুল কুরসী সহ সূরা আল-বাক্বারাহর বরকতময় অংশসমূহের বিশুদ্ধ তিলাওয়াত।",
    descriptionEn: "Selected blessed passages of Surah Al-Baqarah with Bengali translation.",
  },
]

export function SamsulAlamPlayer() {
  const [selectedSurah, setSelectedSurah] = useState<SurahVideoItem>(VERIFIED_SURAH_VIDEOS[0] as SurahVideoItem)
  const [selectedCategory, setSelectedCategory] = useState<"all" | "shamsul" | "bangla">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCinemaMode, setIsCinemaMode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [customInputUrl, setCustomInputUrl] = useState("")
  const [customError, setCustomError] = useState<string | null>(null)
  const [activeVideoId, setActiveVideoId] = useState(VERIFIED_SURAH_VIDEOS[0]?.videoId || "A7mdEViEU8M")
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null)

  // Helper to extract video ID or playlist ID from YouTube URLs
  const parseYouTubeUrl = (url: string): { videoId: string | null; playlistId: string | null } => {
    try {
      const cleanUrl = url.trim()
      // Raw 11 char video ID
      if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
        return { videoId: cleanUrl, playlistId: null }
      }
      // Playlist link
      if (cleanUrl.includes("list=")) {
        const listMatch = cleanUrl.match(/[?&]list=([a-zA-Z0-9_-]+)/)
        if (listMatch && listMatch[1]) {
          return { videoId: null, playlistId: listMatch[1] }
        }
      }
      // Standard watch link or youtu.be link
      const videoMatch = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]{11})/)
      if (videoMatch && videoMatch[1]) {
        return { videoId: videoMatch[1], playlistId: null }
      }
    } catch {}
    return { videoId: null, playlistId: null }
  }

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault()
    setCustomError(null)
    if (!customInputUrl.trim()) return

    const { videoId, playlistId } = parseYouTubeUrl(customInputUrl)
    if (videoId) {
      setActiveVideoId(videoId)
      setActivePlaylistId(null)
      setSelectedSurah({
        id: "custom_" + Date.now(),
        videoId,
        surahNumber: 1,
        category: "custom",
        categoryLabel: "কাস্টম ভিডিও",
        nameBangla: "কাস্টম ইউটিউব ভিডিও",
        nameArabic: "مقطع مخصص",
        nameEnglish: "Custom YouTube Video",
        reciterBn: "ইউজার নির্বাচিত লিংক",
        ayahCount: 0,
        revelation: "মাক্কী",
        duration: "কাস্টম",
        descriptionBn: "আপনার প্রদত্ত ইউটিউব লিংক অনুযায়ী ভিডিও প্লে হচ্ছে।",
        descriptionEn: "Playing video from your custom YouTube link.",
      })
      setCustomInputUrl("")
    } else if (playlistId) {
      setActivePlaylistId(playlistId)
      setActiveVideoId("")
      setSelectedSurah({
        id: "custom_pl_" + Date.now(),
        videoId: "",
        surahNumber: 1,
        category: "custom",
        categoryLabel: "কাস্টম প্লেলিস্ট",
        nameBangla: "কাস্টম ইউটিউব প্লেলিস্ট",
        nameArabic: "قائمة تشغيل مخصصة",
        nameEnglish: "Custom YouTube Playlist",
        reciterBn: "ইউজার নির্বাচিত প্লেলিস্ট",
        ayahCount: 0,
        revelation: "মাক্কী",
        duration: "প্লেলিস্ট",
        descriptionBn: "আপনার প্রদত্ত ইউটিউব প্লেলিস্ট অনুযায়ী ভিডিও প্লে হচ্ছে।",
        descriptionEn: "Playing playlist from your custom YouTube playlist link.",
      })
      setCustomInputUrl("")
    } else {
      setCustomError("সঠিক ইউটিউব লিংক বা ভিডিও আইডি দিন (যেমন: https://www.youtube.com/watch?v=...)")
    }
  }

  const handleSelectSurah = (item: SurahVideoItem) => {
    setSelectedSurah(item)
    setActiveVideoId(item.videoId)
    setActivePlaylistId(null)
  }

  const filteredSurahs = VERIFIED_SURAH_VIDEOS.filter((s) => {
    const matchCategory = selectedCategory === "all" || s.category === selectedCategory
    const matchQuery =
      s.nameBangla.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.reciterBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(s.surahNumber).includes(searchQuery)
    return matchCategory && matchQuery
  })

  const handleCopyLink = () => {
    const url = activeVideoId
      ? `https://www.youtube.com/watch?v=${activeVideoId}`
      : window.location.href
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-6">
      {/* Player Showcase Card */}
      <div
        className={`transition-all duration-300 ${
          isCinemaMode
            ? "fixed inset-0 z-50 flex flex-col bg-black/95 p-4 sm:p-8 backdrop-blur-2xl"
            : "rounded-3xl border border-stone-200/80 bg-white/95 p-4 shadow-xl backdrop-blur-xl dark:border-stone-800 dark:bg-stone-900/95 sm:p-6"
        }`}
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <Tv className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                {selectedSurah.nameBangla}
                {selectedSurah.nameArabic && (
                  <span className="arabic text-sm text-emerald-700 dark:text-emerald-400">
                    ({selectedSurah.nameArabic})
                  </span>
                )}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                কণ্ঠ: {selectedSurah.reciterBn} • সূরা নং {selectedSurah.surahNumber || "—"} • {selectedSurah.ayahCount ? `${selectedSurah.ayahCount} আয়াত` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Watch Directly on YouTube */}
            {activeVideoId && (
              <a
                href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 transition-all"
                title="ইউটিউবে সরাসরি ওপেন করুন"
              >
                <PlayCircle className="h-3.5 w-3.5 text-red-600" />
                <span>ইউটিউবে দেখুন</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCinemaMode(!isCinemaMode)}
              className="gap-1.5 text-xs font-semibold rounded-xl"
              title="থিয়েটার মোড"
            >
              {isCinemaMode ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" /> সাধারণ ভিউ
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" /> থিয়েটার মোড
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyLink}
              title="ভিডিও লিংক কপি করুন"
              className="rounded-xl text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Video Iframe Frame with Verified Player Parameters */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-stone-950 shadow-2xl">
          {activePlaylistId ? (
            <iframe
              src={`https://www.youtube.com/embed/videoseries?list=${activePlaylistId}&autoplay=1&rel=0&modestbranding=1`}
              title="ইউটিউব প্লেলিস্ট"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
              title={selectedSurah.nameBangla}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          )}
        </div>

        {/* Action Controls & Quran Read Link */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/60 pt-4 dark:border-stone-800/60">
          <div className="flex flex-wrap items-center gap-2">
            {selectedSurah.surahNumber > 0 && (
              <Link
                href={`/quran/${selectedSurah.surahNumber}`}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all active:scale-95"
              >
                <BookOpen className="h-4 w-4" /> কুরআনে পাঠ করুন (Read in Quran)
              </Link>
            )}

            {activeVideoId && (
              <a
                href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                ইউটিউব উইন্ডোতে ওপেন করুন
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="inline-flex items-center gap-1 font-medium">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              এইচডি অডিও ও ভিডিও প্লেয়ার
            </span>
          </div>
        </div>
      </div>

      {/* Custom YouTube Link Input Box */}
      <div className="rounded-3xl border border-stone-200/80 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-900/80">
        <div className="flex items-center gap-2 mb-2">
          <Link2 className="h-4 w-4 text-emerald-600" />
          <h3 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
            যেকোনো ইউটিউব সূরা বা প্লেলিস্ট লিংক চালান (Custom YouTube URL / Playlist)
          </h3>
        </div>
        <p className="text-[11px] text-stone-500 mb-3">
          ইউটিউব থেকে যেকোনো সূরা বা প্লেলিস্ট লিংক কপি করে এখানে পেস্ট করলে সরাসরি এই প্লেয়ারেই প্লে হবে।
        </p>

        <form onSubmit={handleApplyCustomUrl} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="উদাহরণ: https://www.youtube.com/watch?v=A7mdEViEU8M অথবা প্লেলিস্ট লিংক..."
            value={customInputUrl}
            onChange={(e) => setCustomInputUrl(e.target.value)}
            className="flex-1 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-medium focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
          />
          <Button
            type="submit"
            className="rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700"
          >
            ভিডিও লোড করুন (Play Video)
          </Button>
        </form>

        {customError && (
          <p className="mt-2 text-xs font-semibold text-red-600 dark:text-red-400">{customError}</p>
        )}
      </div>

      {/* Playlist Grid & Surah Chooser */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              নির্বাচিত সূরা ও তিলাওয়াত সংকলন ({filteredSurahs.length})
            </h3>
            <p className="text-xs text-stone-500">
              যেকোনো সূরায় ক্লিক করলে সরাসরি উপরে ভিডিও প্লে হবে।
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="সূরা বা কারী খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-white/80 py-2 pl-9 pr-4 text-xs font-medium backdrop-blur focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-100"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === "all"
                ? "bg-emerald-600 text-white shadow-md"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
            }`}
          >
            সকল ভিডিও
          </button>
          <button
            onClick={() => setSelectedCategory("shamsul")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === "shamsul"
                ? "bg-emerald-600 text-white shadow-md"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
            }`}
          >
            🎙️ হাফেজ শামসুল হক তিলাওয়াত
          </button>
          <button
            onClick={() => setSelectedCategory("bangla")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === "bangla"
                ? "bg-emerald-600 text-white shadow-md"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
            }`}
          >
            📖 বাংলা অনুবাদসহ নির্বাচিত সূরা
          </button>
        </div>

        {/* Surahs Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSurahs.map((item) => {
            const isPlaying = activeVideoId === item.videoId && !activePlaylistId
            return (
              <div
                key={item.id}
                onClick={() => handleSelectSurah(item)}
                className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4 transition-all duration-200 hover:shadow-lg ${
                  isPlaying
                    ? "border-emerald-500 bg-emerald-50/80 shadow-md ring-2 ring-emerald-500/20 dark:border-emerald-500/80 dark:bg-emerald-950/30"
                    : "border-stone-200/80 bg-white/80 hover:border-emerald-300 dark:border-stone-800/80 dark:bg-stone-900/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                        isPlaying
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-stone-100 text-stone-700 group-hover:bg-emerald-100 group-hover:text-emerald-800 dark:bg-stone-800 dark:text-stone-300"
                      }`}
                    >
                      {item.surahNumber}
                    </span>

                    <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {item.categoryLabel}
                    </span>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                      {item.nameBangla}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">কণ্ঠ: {item.reciterBn}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                      {item.descriptionBn}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-stone-200/50 pt-3 text-xs font-medium text-stone-500 dark:border-stone-800/50">
                  <span>{item.ayahCount ? `${item.ayahCount} আয়াত` : "সংকলন"}</span>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>{isPlaying ? "চলছে" : item.duration}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
