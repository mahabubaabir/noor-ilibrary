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
} from "lucide-react"
import { Button } from "@/components/ui/button"

export interface SurahVideoItem {
  id: string
  videoId: string
  surahNumber: number
  nameBangla: string
  nameArabic: string
  nameEnglish: string
  ayahCount: number
  revelation: "মাক্কী" | "মাদানী"
  duration: string
  descriptionBn: string
  descriptionEn: string
}

export const SHAMSUL_HOQUE_SURAH_PLAYLIST: SurahVideoItem[] = [
  {
    id: "fatihah",
    videoId: "6DphFfW_9YQ",
    surahNumber: 1,
    nameBangla: "সূরা আল-ফাতিহা",
    nameArabic: "سورة الفاتحة",
    nameEnglish: "Al-Fatihah",
    ayahCount: 7,
    revelation: "মাক্কী",
    duration: "02:15",
    descriptionBn: "কুরআনুল কারীমের সূচনা ও উম্মুল কিতাব। সমগ্র মানবজাতির জন্য দোয়া ও হিদায়াতের আলোকবর্তিকা।",
    descriptionEn: "The Opening Chapter of the Holy Quran, containing the essence of prayer, guidance, and mercy.",
  },
  {
    id: "baqarah",
    videoId: "m9L0vT3GgEQ",
    surahNumber: 2,
    nameBangla: "সূরা আল-বাক্বারাহ (নির্বাচিত তিলাওয়াত)",
    nameArabic: "سورة البقرة",
    nameEnglish: "Al-Baqarah",
    ayahCount: 286,
    revelation: "মাদানী",
    duration: "45:30",
    descriptionBn: "কুরআনের দীর্ঘতম সূরা, যেখানে রয়েছে ঈমান, আইন, আয়াতুল কুরসী এবং শয়তানের প্ররোচনা থেকে সুরক্ষার বিধান।",
    descriptionEn: "The longest chapter, containing guidance on faith, legislation, Ayat al-Kursi, and protection from evil.",
  },
  {
    id: "kahf",
    videoId: "2Q9Z5b-w8jU",
    surahNumber: 18,
    nameBangla: "সূরা আল-কাহফ",
    nameArabic: "سورة الكهف",
    nameEnglish: "Al-Kahf",
    ayahCount: 110,
    revelation: "মাক্কী",
    duration: "28:40",
    descriptionBn: "জুমার দিনের বিশেষ বরকতময় সূরা। আসহাবে কাহাফের ঘটনা, মূসা (আঃ) ও খিজির (আঃ) এর শিক্ষণীয় ঘটনা।",
    descriptionEn: "The blessed Friday chapter containing stories of the youth in the cave, and Prophet Musa with Khidr.",
  },
  {
    id: "yasin",
    videoId: "q76bMs-NwRk",
    surahNumber: 36,
    nameBangla: "সূরা ইয়াসীন (কুরআনের হৃদয়)",
    nameArabic: "سورة يس",
    nameEnglish: "Ya-Sin",
    ayahCount: 83,
    revelation: "মাক্কী",
    duration: "18:20",
    descriptionBn: "কুরআনের হৃদয় হিসেবে পরিচিত ভাবগাম্ভীর্যপূর্ণ সূরা। তাওহীদ ও পরকালের অকাট্য প্রমাণের বিবরণ।",
    descriptionEn: "Known as the Heart of the Quran, emphasizing divine sovereignty, resurrection, and the universe.",
  },
  {
    id: "rahman",
    videoId: "W3tP6P_5cVE",
    surahNumber: 55,
    nameBangla: "সূরা আর-রহমান",
    nameArabic: "سورة الرحمن",
    nameEnglish: "Ar-Rahman",
    ayahCount: 78,
    revelation: "মাক্কী",
    duration: "16:50",
    descriptionBn: "কুরআনের সৌন্দর্য ও আল্লাহর অফুরন্ত নিয়ামতসমূহের স্মরণ। 'অতএব তোমরা তোমাদের প্রতিপালকের কোন অনুগ্রহ অস্বীকার করবে?'",
    descriptionEn: "The Bride of the Quran, a poetic reminder of Allah's countless bounties upon mankind and jinn.",
  },
  {
    id: "waqiah",
    videoId: "Y77T9s4D2Z8",
    surahNumber: 56,
    nameBangla: "সূরা আল-ওয়াক্বি'আহ",
    nameArabic: "سورة الواقعة",
    nameEnglish: "Al-Waqi'ah",
    ayahCount: 96,
    revelation: "মাক্কী",
    duration: "14:15",
    descriptionBn: "রিযিকের প্রাচুর্য ও কেয়ামতের ভয়াবহ দৃশ্য বর্ণনাকারী সূরা। মানুষের তিন ভাগে বিভক্ত হওয়ার বিশদ বিবরণ।",
    descriptionEn: "The Inevitable Day, describing the reality of the Hereafter, rewards of righteous, and divine sustenance.",
  },
  {
    id: "mulk",
    videoId: "kO2KqR9N_2A",
    surahNumber: 67,
    nameBangla: "সূরা আল-মুলক (কবরের আযাব থেকে মুক্তি)",
    nameArabic: "سورة الملك",
    nameEnglish: "Al-Mulk",
    ayahCount: 30,
    revelation: "মাক্কী",
    duration: "09:45",
    descriptionBn: "কবরের আযাব থেকে সুরক্ষাকারী এবং সুপারিশকারী সূরা। প্রতিদিন রাতে তিলাওয়াতের বিশেষ ফজিলত রয়েছে।",
    descriptionEn: "The Dominion, an intercessor for its reciter in the grave and an invitation to reflect on creation.",
  },
  {
    id: "insan",
    videoId: "7w0mY-8g5_Y",
    surahNumber: 76,
    nameBangla: "সূরা আল-ইনসান",
    nameArabic: "سورة الإنسان",
    nameEnglish: "Al-Insan",
    ayahCount: 31,
    revelation: "মাদানী",
    duration: "10:30",
    descriptionBn: "মানুষের সৃষ্টি, অভাবীদের খাদ্য দান ও জান্নাতের শান্তিময় নেয়ামতের অনুপম বর্ণনা।",
    descriptionEn: "Man, illuminating charity to the poor, orphans, and the serene eternal joy of Paradise.",
  },
  {
    id: "last10",
    videoId: "M5X5K8q0l0k",
    surahNumber: 105,
    nameBangla: "সর্বশেষ ১০টি সূরা (ফিল থেকে নাস)",
    nameArabic: "قصار السور",
    nameEnglish: "Last 10 Surahs",
    ayahCount: 42,
    revelation: "মাক্কী",
    duration: "12:00",
    descriptionBn: "দৈনন্দিন নামাজে পঠিত অত্যন্ত গুরুত্বপূর্ণ ছোট সূরাসমূহের অর্থসহ প্রাঞ্জল তিলাওয়াত।",
    descriptionEn: "Short chapters commonly recited in daily prayers, rich with deep spiritual protection and wisdom.",
  },
]

// Shamsul Hoque's complete YouTube Quran Recitation / Lecture playlist ID
const DEFAULT_PLAYLIST_ID = "PL_Q3M8XvX_Yf8kZ3bA6P3m8qX7L5e9k_r"

export function SamsulAlamPlayer() {
  const [selectedSurah, setSelectedSurah] = useState<SurahVideoItem>(
    SHAMSUL_HOQUE_SURAH_PLAYLIST[0] as SurahVideoItem
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [isCinemaMode, setIsCinemaMode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [useFullPlaylistEmbed, setUseFullPlaylistEmbed] = useState(false)
  const [customPlaylistId, setCustomPlaylistId] = useState(DEFAULT_PLAYLIST_ID)

  const filteredSurahs = SHAMSUL_HOQUE_SURAH_PLAYLIST.filter(
    (s) =>
      s.nameBangla.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(s.surahNumber).includes(searchQuery)
  )

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-6">
      {/* Player Showcase */}
      <div
        className={`transition-all duration-300 ${
          isCinemaMode
            ? "fixed inset-0 z-50 flex flex-col bg-black/95 p-4 sm:p-8 backdrop-blur-2xl"
            : "rounded-3xl border border-stone-200/80 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-stone-800 dark:bg-stone-900/90 sm:p-6"
        }`}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <Tv className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                {selectedSurah.nameBangla}{" "}
                <span className="arabic text-sm text-emerald-700 dark:text-emerald-400">
                  ({selectedSurah.nameArabic})
                </span>
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                শামসুল হক প্লেলিস্ট • সূরা নং {selectedSurah.surahNumber} • {selectedSurah.revelation} • {selectedSurah.ayahCount} আয়াত
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCinemaMode(!isCinemaMode)}
              className="gap-1.5 text-xs font-semibold rounded-xl"
              title="সিনেমা মোড"
            >
              {isCinemaMode ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" /> সাধারণ দৃশ্য
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

        {/* Video Iframe Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-stone-950 shadow-2xl">
          {useFullPlaylistEmbed ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/videoseries?list=${customPlaylistId}&autoplay=1&rel=0&modestbranding=1`}
              title="শামসুল হক কুরআন তিলাওয়াত ও আলোচনা প্লেলিস্ট"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selectedSurah.videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={`${selectedSurah.nameBangla} - শামসুল হক`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          )}
        </div>

        {/* Action Controls & Quran Read Link */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/60 pt-4 dark:border-stone-800/60">
          <div className="flex items-center gap-2">
            <Link
              href={`/quran/${selectedSurah.surahNumber}`}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all active:scale-95"
            >
              <BookOpen className="h-4 w-4" /> কুরআনে পাঠ করুন (Read in Quran)
            </Link>

            <button
              onClick={() => setUseFullPlaylistEmbed(!useFullPlaylistEmbed)}
              className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                useFullPlaylistEmbed
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <ListVideo className="h-3.5 w-3.5" />
                {useFullPlaylistEmbed ? "একক সূরা প্লেয়ার মোড" : "ইউটিউব সম্পূর্ণ প্লেলিস্ট মোড"}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="inline-flex items-center gap-1 font-medium">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              উচ্চ মানের অডিও ও ভিডিও তিলাওয়াত
            </span>
          </div>
        </div>
      </div>

      {/* Playlist Grid & Surah Chooser */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              শামসুল হক — সূরা ও তিলাওয়াত তালিকা ({filteredSurahs.length})
            </h3>
            <p className="text-xs text-stone-500">
              যে কোনো সূরায় ক্লিক করে সরাসরি শুনতে পারেন অথবা কুরআনে অনুবাদসহ পড়তে পারেন।
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="সূরা খুঁজুন (নাম বা নম্বর)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-white/80 py-2 pl-9 pr-4 text-xs font-medium backdrop-blur focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-100"
            />
          </div>
        </div>

        {/* Surahs Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSurahs.map((item) => {
            const isPlaying = selectedSurah.id === item.id && !useFullPlaylistEmbed
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedSurah(item)
                  setUseFullPlaylistEmbed(false)
                }}
                className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4 transition-all duration-200 hover:shadow-lg ${
                  isPlaying
                    ? "border-emerald-500 bg-emerald-50/70 shadow-md dark:border-emerald-500/80 dark:bg-emerald-950/30"
                    : "border-stone-200/80 bg-white/70 hover:border-emerald-300 dark:border-stone-800/80 dark:bg-stone-900/70"
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

                    <span className="arabic text-lg font-bold text-stone-900 dark:text-stone-100" dir="rtl">
                      {item.nameArabic}
                    </span>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                      {item.nameBangla}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{item.nameEnglish}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                      {item.descriptionBn}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-stone-200/50 pt-3 text-xs font-medium text-stone-500 dark:border-stone-800/50">
                  <span>{item.ayahCount} আয়াত • {item.revelation}</span>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>{item.duration}</span>
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
