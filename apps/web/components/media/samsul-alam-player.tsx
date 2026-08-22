"use client"

import React, { useState } from "react"
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
  Radio,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ShamsulHaqueVideo {
  id: string
  videoId: string
  surahNumber: number
  titleBn: string
  titleEn: string
  category: "surah" | "taraweeh" | "adhkar" | "sleep"
  categoryLabelBn: string
  duration: string
  surahNameArabic?: string
  descriptionBn: string
  descriptionEn: string
}

export const SHAMSUL_HAQUE_CHANNEL_VIDEOS: ShamsulHaqueVideo[] = [
  {
    id: "shamsul-mulk",
    videoId: "A7mdEViEU8M",
    surahNumber: 67,
    titleBn: "সূরা আল-মুলক (Surah Al-Mulk)",
    titleEn: "Surah Al-Mulk - Heart Touching Recitation",
    category: "surah",
    categoryLabelBn: "সূরা তিলাওয়াত",
    duration: "07:45",
    surahNameArabic: "سورة الملك",
    descriptionBn: "শামসুল হকের সুললিত কণ্ঠে সূরা আল-মুলক। কবরের আযাব থেকে মুক্তির জন্য প্রতিদিন রাতে তিলাওয়াতযোগ্য।",
    descriptionEn: "Soulful recitation of Surah Al-Mulk by Shamsul haQue on his official channel.",
  },
  {
    id: "shamsul-quran-30para",
    videoId: "OwwIT4y4__4",
    surahNumber: 1,
    titleBn: "কুরআনুল কারীম তিলাওয়াত ও শান্তি",
    titleEn: "Quran Recitation for Peace & Serenity",
    category: "surah",
    categoryLabelBn: "সূরা তিলাওয়াত",
    duration: "15:20",
    surahNameArabic: "القرآن الكريم",
    descriptionBn: "শামসুল হক চ্যানেলের অত্যন্ত প্রশান্তিময় কুরআন তিলাওয়াত সংকলন।",
    descriptionEn: "Peaceful and serene Quran recitation by Shamsul haQue.",
  },
  {
    id: "shamsul-belali-yasin",
    videoId: "YnK7RNGWob4",
    surahNumber: 36,
    titleBn: "সূরা ইয়াসীন ও তিলাওয়াত (Surah Yaseen)",
    titleEn: "Surah Yaseen Recitation",
    category: "surah",
    categoryLabelBn: "সূরা তিলাওয়াত",
    duration: "24:10",
    surahNameArabic: "سورة يس",
    descriptionBn: "কুরআনের হৃদয় সূরা ইয়াসীনের ভাবগাম্ভীর্যপূর্ণ তিলাওয়াত।",
    descriptionEn: "Emotional and beautiful recitation of Surah Yaseen by Shamsul haQue.",
  },
  {
    id: "shamsul-panje-surah",
    videoId: "54d8S7sT7cI",
    surahNumber: 55,
    titleBn: "সূরা আর-রহমান ও গুরুত্বপূর্ণ সূরার সংকলন",
    titleEn: "Surah Ar-Rahman & Essential Surahs",
    category: "surah",
    categoryLabelBn: "সূরা তিলাওয়াত",
    duration: "42:00",
    surahNameArabic: "سورة الرحمن",
    descriptionBn: "সূরা আর-রহমান, আল-ওয়াক্বি'আহ ও আল-মুলকের বিশেষ তিলাওয়াত সংকলন।",
    descriptionEn: "Continuous recitation of Surah Ar-Rahman and essential chapters.",
  },
  {
    id: "shamsul-ruqyah-sleep",
    videoId: "KBEVB5Rnb90",
    surahNumber: 18,
    titleBn: "জুমার দিনের সূরা আল-কাহফ ও রুকইয়াহ",
    titleEn: "Surah Al-Kahf for Friday & Ruqyah",
    category: "taraweeh",
    categoryLabelBn: "জুমার তিলাওয়াত",
    duration: "38:30",
    surahNameArabic: "سورة الكهف",
    descriptionBn: "জুমার দিনের বরকত এবং আত্মিক শান্তির জন্য সূরা আল-কাহফের তিলাওয়াত।",
    descriptionEn: "Special Friday recitation of Surah Al-Kahf for peace, light, and protection.",
  },
  {
    id: "shamsul-baqarah-peace",
    videoId: "FqS_W1I7T30",
    surahNumber: 2,
    titleBn: "সূরা আল-বাক্বারাহ (ঘরের সুরক্ষায়)",
    titleEn: "Surah Al-Baqarah - Protection & Peace",
    category: "adhkar",
    categoryLabelBn: "রুকইয়াহ ও নিরাপত্তা",
    duration: "30:00",
    surahNameArabic: "سورة البقرة",
    descriptionBn: "ঘরকে শয়তানের প্রভাব ও অস্থিরতা থেকে মুক্ত রাখতে সূরা আল-বাক্বারাহর তিলাওয়াত।",
    descriptionEn: "Peaceful recitation of Surah Al-Baqarah for home blessings and protection.",
  },
]

export function SamsulAlamPlayer() {
  const [selectedVideo, setSelectedVideo] = useState<ShamsulHaqueVideo>(SHAMSUL_HAQUE_CHANNEL_VIDEOS[0] as ShamsulHaqueVideo)
  const [selectedCategory, setSelectedCategory] = useState<"all" | "surah" | "taraweeh" | "adhkar">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCinemaMode, setIsCinemaMode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [customInputUrl, setCustomInputUrl] = useState("")
  const [customError, setCustomError] = useState<string | null>(null)
  const [activeVideoId, setActiveVideoId] = useState(SHAMSUL_HAQUE_CHANNEL_VIDEOS[0]?.videoId || "A7mdEViEU8M")
  const [useChannelFeed, setUseChannelFeed] = useState(false)

  // Parse custom URLs from @shamsul_haque
  const parseYouTubeUrl = (url: string): { videoId: string | null; playlistId: string | null } => {
    try {
      const cleanUrl = url.trim()
      if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
        return { videoId: cleanUrl, playlistId: null }
      }
      if (cleanUrl.includes("list=")) {
        const listMatch = cleanUrl.match(/[?&]list=([a-zA-Z0-9_-]+)/)
        if (listMatch && listMatch[1]) {
          return { videoId: null, playlistId: listMatch[1] }
        }
      }
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

    const { videoId } = parseYouTubeUrl(customInputUrl)
    if (videoId) {
      setActiveVideoId(videoId)
      setUseChannelFeed(false)
      setSelectedVideo({
        id: "custom_" + Date.now(),
        videoId,
        surahNumber: 1,
        titleBn: "ইউটিউব ভিডিও (@shamsul_haque)",
        titleEn: "YouTube Video (@shamsul_haque)",
        category: "surah",
        categoryLabelBn: "কাস্টম ভিডিও",
        duration: "চলছে",
        descriptionBn: "Shamsul haQue ইউটিউব চ্যানেল থেকে লোড করা ভিডিও।",
        descriptionEn: "Loaded video from Shamsul haQue YouTube channel.",
      })
      setCustomInputUrl("")
    } else {
      setCustomError("সঠিক ইউটিউব ভিডিও লিংক দিন (যেমন: https://www.youtube.com/watch?v=...)")
    }
  }

  const handleSelectVideo = (item: ShamsulHaqueVideo) => {
    setSelectedVideo(item)
    setActiveVideoId(item.videoId)
    setUseChannelFeed(false)
  }

  const filteredVideos = SHAMSUL_HAQUE_CHANNEL_VIDEOS.filter((v) => {
    const matchCategory = selectedCategory === "all" || v.category === selectedCategory
    const matchQuery =
      v.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.descriptionBn.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchQuery
  })

  const handleCopyLink = () => {
    const url = `https://www.youtube.com/watch?v=${activeVideoId}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-6">
      {/* Official Channel Header Banner */}
      <div className="rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-950/20 via-stone-900/40 to-emerald-950/20 p-4 sm:p-6 backdrop-blur-xl dark:border-red-500/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg">
              <PlayCircle className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                  Shamsul haQue
                </h2>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-800 dark:bg-red-950/60 dark:text-red-300">
                  Official YouTube Channel
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                অফিসিয়াল ইউটিউব হ্যান্ডেল:{" "}
                <a
                  href="https://www.youtube.com/@shamsul_haque"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-red-600 hover:underline dark:text-red-400"
                >
                  @shamsul_haque
                </a>
              </p>
            </div>
          </div>

          <a
            href="https://www.youtube.com/@shamsul_haque"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-all active:scale-95"
          >
            <ExternalLink className="h-4 w-4" />
            সরাসরি @shamsul_haque চ্যানেলে যান
          </a>
        </div>
      </div>

      {/* Main Video Player Showcase */}
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
                {selectedVideo.titleBn}
                {selectedVideo.surahNameArabic && (
                  <span className="arabic text-sm text-emerald-700 dark:text-emerald-400">
                    ({selectedVideo.surahNameArabic})
                  </span>
                )}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                চ্যানেল: @shamsul_haque • {selectedVideo.categoryLabelBn} • {selectedVideo.duration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Open on YouTube */}
            <a
              href={`https://www.youtube.com/watch?v=${activeVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 transition-all"
              title="ইউটিউবে সরাসরি ওপেন করুন"
            >
              <PlayCircle className="h-3.5 w-3.5 text-red-600" />
              <span>ইউটিউবে চালান</span>
              <ExternalLink className="h-3 w-3" />
            </a>

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

        {/* Video Iframe Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-stone-950 shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
            title={selectedVideo.titleBn}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        {/* Action Controls & Quran Read Link */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/60 pt-4 dark:border-stone-800/60">
          <div className="flex flex-wrap items-center gap-2">
            {selectedVideo.surahNumber > 0 && (
              <Link
                href={`/quran/${selectedVideo.surahNumber}`}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all active:scale-95"
              >
                <BookOpen className="h-4 w-4" /> কুরআনে পাঠ করুন (Read in Quran)
              </Link>
            )}

            <a
              href="https://www.youtube.com/@shamsul_haque"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              চ্যানেলের সব ভিডিও দেখুন
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="inline-flex items-center gap-1 font-medium">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Shamsul haQue অফিসিয়াল কন্টেন্ট
            </span>
          </div>
        </div>
      </div>

      {/* Custom Link Input from @shamsul_haque */}
      <div className="rounded-3xl border border-stone-200/80 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-900/80">
        <div className="flex items-center gap-2 mb-2">
          <Link2 className="h-4 w-4 text-emerald-600" />
          <h3 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
            @shamsul_haque চ্যানেলের অন্য যেকোনো ভিডিও লিংক দিন
          </h3>
        </div>
        <p className="text-[11px] text-stone-500 mb-3">
          <a
            href="https://www.youtube.com/@shamsul_haque/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 underline dark:text-emerald-400 font-semibold"
          >
            https://www.youtube.com/@shamsul_haque
          </a>{" "}
          থেকে যেকোনো ভিডিও লিংক পেস্ট করলে সরাসরি এখানে দেখতে পারবেন।
        </p>

        <form onSubmit={handleApplyCustomUrl} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="উদাহরণ: https://www.youtube.com/watch?v=A7mdEViEU8M..."
            value={customInputUrl}
            onChange={(e) => setCustomInputUrl(e.target.value)}
            className="flex-1 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-medium focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
          />
          <Button
            type="submit"
            className="rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700"
          >
            ভিডিও চালান (Play)
          </Button>
        </form>

        {customError && (
          <p className="mt-2 text-xs font-semibold text-red-600 dark:text-red-400">{customError}</p>
        )}
      </div>

      {/* Videos Catalog from Shamsul haQue */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Shamsul haQue চ্যানেলের নির্বাচিত ভিডিওসমূহ ({filteredVideos.length})
            </h3>
            <p className="text-xs text-stone-500">
              যেকোনো ভিডিওতে ক্লিক করে সরাসরি উপরে উপভোগ করুন।
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="ভিডিও বা সূরা খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-white/80 py-2 pl-9 pr-4 text-xs font-medium backdrop-blur focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-100"
            />
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((item) => {
            const isPlaying = activeVideoId === item.videoId
            return (
              <div
                key={item.id}
                onClick={() => handleSelectVideo(item)}
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
                      {item.surahNumber || "▶"}
                    </span>

                    <span className="rounded-lg bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-800 dark:bg-red-950/60 dark:text-red-300">
                      @shamsul_haque
                    </span>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                      {item.titleBn}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{item.titleEn}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                      {item.descriptionBn}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-stone-200/50 pt-3 text-xs font-medium text-stone-500 dark:border-stone-800/50">
                  <span>{item.categoryLabelBn}</span>
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
