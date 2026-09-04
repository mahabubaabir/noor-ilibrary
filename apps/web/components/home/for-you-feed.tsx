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
    <div className="relative my-12 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      {/* Dynamic Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-0.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
            <Sparkles className="h-3 w-3 animate-pulse text-black dark:text-white" />
            স্মার্ট পার্সোনালাইজড ফিড
          </div>
          <h2 className="mt-2.5 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
            আপনার আগ্রহের আলোকে প্রস্তাবিত বিষয়সমূহ
          </h2>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {interactionCount > 0 ? (
              <span>
                আপনার পছন্দের বিষয় <span className="font-bold text-black dark:text-white">&ldquo;{dominantTopic}&rdquo;</span> ও সাম্প্রতিক পাঠ্যাভ্যাসের উপর ভিত্তি করে প্রস্তাবিত।
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
          className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs font-semibold text-neutral-700 transition-all hover:bg-neutral-100 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
          <span>রিফ্রেশ</span>
        </button>
      </div>

      {/* Filter Tabs / Topic Selector */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-95 ${
                isActive
                  ? "bg-black text-white shadow dark:bg-white dark:text-black"
                  : "border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Recommended Content Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                tiltIntensity={4}
                className="h-full border-neutral-200 bg-white p-5 shadow-sm transition-all group-hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900/60 dark:group-hover:border-neutral-700"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 transition-colors group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded border border-neutral-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                        {item.badgeBn}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-500">
                      {item.categoryLabelBn}
                    </span>

                    <h3 className="mt-1 text-base font-bold text-neutral-900 transition-colors group-hover:underline dark:text-white">
                      {item.titleBn}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {item.subtitleBn}
                    </p>
                  </div>

                  {/* Recommendation Reason & CTA */}
                  <div className="mt-5 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 line-clamp-1 italic mb-2">
                      • {item.reasonBn}
                    </p>
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-900 dark:text-white">
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
