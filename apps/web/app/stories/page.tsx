"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  Heart,
  ShieldCheck,
  Utensils,
  Coins,
  Smile,
  Gift,
  Scale,
  Briefcase,
  Languages,
} from "lucide-react"
import { STORIES_DATA, StoryItem } from "@/lib/stories-data"

const CATEGORIES = [
  { key: "all", labelBn: "সকল বিষয়", labelEn: "All Topics" },
  { key: "lifestyle", labelBn: "দৈনন্দিন জীবন", labelEn: "Daily Routine" },
  { key: "food", labelBn: "খাদ্যাভ্যাস", labelEn: "Food & Diet" },
  { key: "health", labelBn: "স্বাস্থ্য ও চিকিৎসা", labelEn: "Health & Hygiene" },
  { key: "family", labelBn: "দাম্পত্য ও পরিবার", labelEn: "Family & Wives" },
  { key: "children", labelBn: "সন্তান ও শিশু", labelEn: "Children & Youth" },
  { key: "finance", labelBn: "ব্যবসা ও অর্থ", labelEn: "Finance & Trade" },
  { key: "charity", labelBn: "মানবসেবা ও দান", labelEn: "Charity & Mercy" },
  { key: "honesty", labelBn: "সততা ও চরিত্র", labelEn: "Honesty & Morals" },
]

export default function StoriesCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [lang, setLang] = useState<"bn" | "en">("bn")

  const filteredStories = STORIES_DATA.filter((story) => {
    const matchCat = selectedCategory === "all" || story.category === selectedCategory
    const matchQuery =
      story.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.figureNameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.figureNameEn.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchQuery
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero Header */}
      <div className="mb-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-stone-900/10 to-amber-950/10 p-6 sm:p-10 backdrop-blur-xl dark:border-emerald-500/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              {lang === "bn" ? "জীবনগাঁথা ও ঐতিহাসিক কাহিনী" : "Life Stories & History Hub"}
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl lg:text-4xl dark:text-stone-100">
              {lang === "bn"
                ? "রাসূলুল্লাহ ﷺ ও মহামানবদের আদর্শ জীবনগাঁথা"
                : "Inspiring Life Stories of the Prophet ﷺ & Great Personalities"}
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              {lang === "bn"
                ? "দীন, স্বাস্থ্য, খাদ্যাভ্যাস, দাম্পত্য, সন্তান প্রতিপালন, হালাল অর্থব্যবস্থা, সততা ও মানবসেবার বাস্তব গল্প—সবাই যেন সহজে বুঝতে ও অনুসরণ করতে পারে।"
                : "Practical, heartwarming lessons on spirituality, daily routine, health, diet, spousal love, parenting, finance, honesty, and charity in an accessible PDF-style reader."}
            </p>
          </div>

          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-white/80 px-4 py-2.5 text-xs font-bold text-emerald-800 shadow-sm backdrop-blur hover:bg-white dark:bg-stone-900/80 dark:text-emerald-300"
          >
            <Languages className="h-4 w-4" />
            <span>{lang === "bn" ? "English Version" : "বাংলা সংস্করণ"}</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === cat.key
                    ? "bg-emerald-600 text-white shadow-md"
                    : "border border-stone-200 bg-white/70 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900/70 dark:text-stone-300"
                }`}
              >
                {lang === "bn" ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder={lang === "bn" ? "গল্প বা বিষয় খুঁজুন..." : "Search stories..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-white/80 py-2 pl-9 pr-4 text-xs font-medium backdrop-blur focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-100"
            />
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStories.map((story) => (
          <Link
            key={story.id}
            href={`/stories/${story.id}`}
            className="group relative flex flex-col justify-between rounded-3xl border border-stone-200/80 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900/80"
          >
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-xl bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {lang === "bn" ? story.categoryLabelBn : story.categoryLabelEn}
                </span>
                <span className="text-xs text-stone-400 font-medium">{story.readTime}</span>
              </div>

              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                {lang === "bn" ? story.figureNameBn : story.figureNameEn}
              </span>

              <h2 className="text-base font-bold text-stone-900 transition-colors group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400">
                {lang === "bn" ? story.titleBn : story.titleEn}
              </h2>

              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                {lang === "bn" ? story.subtitleBn : story.subtitleEn}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4 text-xs font-bold text-emerald-600 dark:border-stone-800 dark:text-emerald-400">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                {lang === "bn" ? "ই-বুক রিডারে পড়ুন" : "Read in E-Book Reader"}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
