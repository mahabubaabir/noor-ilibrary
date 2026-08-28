"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Sparkles,
  BookOpen,
  Library,
  ShieldCheck,
  Heart,
  Compass,
  ArrowRight,
  TrendingUp,
  Flame,
  CheckCircle2,
  RefreshCw,
} from "lucide-react"
import {
  ContentCategory,
  RecommendationItem,
  getPersonalizedRecommendations,
  trackUserInteraction,
} from "@/lib/recommendation/engine"
import { SpotlightTiltCard } from "../ui/spotlight-tilt-card"

const iconMap = {
  book: BookOpen,
  library: Library,
  shield: ShieldCheck,
  heart: Heart,
  sparkles: Sparkles,
  compass: Compass,
  sun: Sparkles,
  moon: BookOpen,
}

const filterTabs: { id: ContentCategory | "all"; label: string }[] = [
  { id: "all", label: "আপনার জন্য (For You)" },
  { id: "quran", label: "কুরআন" },
  { id: "hadith", label: "হাদিস" },
  { id: "companion", label: "সাহাবী" },
  { id: "dua", label: "দু'আ" },
  { id: "names", label: "৯৯ নাম" },
]

export function ForYouFeed() {
  const [activeFilter, setActiveFilter] = useState<ContentCategory | "all">("all")
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([])
  const [dominantTopic, setDominantTopic] = useState("")
  const [interactionCount, setInteractionCount] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const loadFeed = (filter = activeFilter) => {
    const data = getPersonalizedRecommendations(filter, 4)
    setRecommendations(data.items)
    setDominantTopic(data.dominantTopicBn)
    setInteractionCount(data.userActivityCount)
  }

  useEffect(() => {
    loadFeed(activeFilter)
  }, [activeFilter])

  const handleTabClick = (tabId: ContentCategory | "all") => {
    setActiveFilter(tabId)
    if (tabId !== "all") {
      trackUserInteraction(tabId, `filter-${tabId}`)
    }
  }

  const handleManualRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      loadFeed()
      setRefreshing(false)
    }, 300)
  }

  return (
    <div className="relative my-14 overflow-hidden rounded-3xl border border-stone-200/80 bg-white/70 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl dark:border-stone-800/80 dark:bg-stone-900/70">
      {/* Dynamic Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/80 px-3.5 py-1 text-xs font-black text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Flame className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            স্মার্ট পার্সোনালাইজড ফিড • FOR YOU
          </div>
          <h2 className="mt-2.5 text-2xl sm:text-3xl font-black tracking-tight text-stone-900 dark:text-stone-100">
            আপনার আগ্রহের আলোকে প্রস্তাবিত বিষয়সমূহ
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            {interactionCount > 0 ? (
              <span>
                আপনার পছন্দের বিষয় <span className="font-bold text-emerald-700 dark:text-emerald-400">“{dominantTopic}”</span> ও সাম্প্রতিক পাঠ্যাভ্যাসের উপর ভিত্তি করে প্রস্তাবিত।
              </span>
            ) : (
              <span>
                নূর লাইব্রেরির সর্বাধিক পঠিত ও বরকতময় বিষয়াবলি থেকে আপনার জন্য সংকলিত।
              </span>
            )}
          </p>
        </div>

        {/* Refresh Feed Button */}
        <button
          onClick={handleManualRefresh}
          title="নতুন সুপারিশ লোড করুন"
          className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-2xl border border-stone-200 bg-stone-50/80 px-3.5 py-2 text-xs font-bold text-stone-700 transition-all hover:bg-stone-100 active:scale-95 dark:border-stone-700 dark:bg-stone-800/80 dark:text-stone-300"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-emerald-600" : ""}`} />
          <span>রিফ্রেশ</span>
        </button>
      </div>

      {/* Filter Tabs / Topic Selector */}
      <div className="mb-7 flex flex-wrap items-center gap-2">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`rounded-2xl px-4 py-2 text-xs font-extrabold transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25 scale-[1.02]"
                  : "border border-stone-200/80 bg-white/80 text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-800/60 dark:text-stone-300 dark:hover:bg-stone-700"
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Recommended Content Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recommendations.map((item) => {
          const Icon = iconMap[item.iconName] || BookOpen

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => trackUserInteraction(item.category, item.id)}
              className="group h-full"
            >
              <SpotlightTiltCard
                tiltIntensity={7}
                spotlightColor="rgba(16, 185, 129, 0.22)"
                className="h-full border-stone-200/80 bg-gradient-to-b from-stone-50/80 to-white/95 p-6 shadow-md transition-all duration-300 group-hover:border-emerald-400 group-hover:shadow-2xl dark:border-stone-800/90 dark:from-stone-800/50 dark:to-stone-900/95"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-50/90 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/80 dark:text-emerald-300">
                        {item.badgeBn}
                      </span>
                    </div>

                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {item.categoryLabelBn}
                    </span>

                    <h3 className="mt-1 text-base font-black text-stone-900 transition-colors group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400">
                      {item.titleBn}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-2">
                      {item.subtitleBn}
                    </p>
                  </div>

                  {/* Recommendation Reason & CTA */}
                  <div className="mt-5 border-t border-stone-100 pt-3 dark:border-stone-800/80">
                    <p className="text-[10px] font-semibold text-stone-400 dark:text-stone-500 line-clamp-1 italic mb-2">
                      💡 {item.reasonBn}
                    </p>
                    <div className="flex items-center justify-between text-xs font-black text-emerald-700 dark:text-emerald-400">
                      <span>অধ্যয়ন করুন</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </SpotlightTiltCard>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
