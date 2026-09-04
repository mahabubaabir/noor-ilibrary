"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  Languages,
} from "lucide-react"
import { STORIES_DATA } from "@/lib/stories-data"
import { Prophets3DCosmos } from "@/components/stories/prophets-3d-cosmos"

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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Hero Header */}
      <div className="mb-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950 sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-bold text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{lang === "bn" ? "জীবনগাঁথা ও ঐতিহাসিক কাহিনী" : "Life Stories & History Hub"}</span>
            </div>
            <h1 className="mt-3 text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl dark:text-white">
              {lang === "bn"
                ? "রাসূলুল্লাহ ﷺ ও মহামানবদের আদর্শ জীবনগাঁথা"
                : "Inspiring Life Stories of the Prophet ﷺ & Great Personalities"}
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {lang === "bn"
                ? "দীন, স্বাস্থ্য, খাদ্যাভ্যাস, দাম্পত্য, সন্তান প্রতিপালন, হালাল অর্থব্যবস্থা, সততা ও মানবসেবার বাস্তব গল্প—সবাই যেন সহজে বুঝতে ও অনুসরণ করতে পারে।"
                : "Practical, heartwarming lessons on spirituality, daily routine, health, diet, spousal love, parenting, finance, honesty, and charity in an accessible PDF-style reader."}
            </p>
          </div>

          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="inline-flex items-center gap-2 rounded-2xl border border-neutral-900 bg-neutral-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            <Languages className="h-4 w-4" />
            <span>{lang === "bn" ? "English Version" : "বাংলা সংস্করণ"}</span>
          </button>
        </div>
      </div>

      {/* 3D MULTI-DIRECTIONAL PROPHETS UNIVERSE (NOBIDER JIBONI) */}
      <Prophets3DCosmos />

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
                    ? "bg-neutral-900 text-white shadow dark:bg-white dark:text-black"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                {lang === "bn" ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder={lang === "bn" ? "গল্প বা বিষয় খুঁজুন..." : "Search stories..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-neutral-300 bg-white py-2 pl-9 pr-4 text-xs font-medium text-neutral-900 transition-colors focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
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
            className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
          >
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-xl border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-bold text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                  {lang === "bn" ? story.categoryLabelBn : story.categoryLabelEn}
                </span>
                <span className="text-xs font-medium text-neutral-400">{story.readTime}</span>
              </div>

              <span className="mb-1 block text-xs font-bold text-neutral-600 dark:text-neutral-400">
                {lang === "bn" ? story.figureNameBn : story.figureNameEn}
              </span>

              <h2 className="text-base font-bold text-neutral-900 transition-colors group-hover:text-black dark:text-neutral-100 dark:group-hover:text-white">
                {lang === "bn" ? story.titleBn : story.titleEn}
              </h2>

              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                {lang === "bn" ? story.subtitleBn : story.subtitleEn}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs font-bold text-neutral-900 dark:border-neutral-900 dark:text-white">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                <span>{lang === "bn" ? "ই-বুক রিডারে পড়ুন" : "Read in E-Book Reader"}</span>
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
