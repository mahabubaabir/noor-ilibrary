"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  Shield,
  Heart,
  Scale,
  Zap,
  BookMarked,
  Award,
  Users,
  Compass,
} from "lucide-react"
import { COMPANIONS_COLLECTION, COMPANION_CATEGORIES, CompanionItem } from "@/lib/companions-data"

export default function CompanionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredCompanions = COMPANIONS_COLLECTION.filter((item) => {
    const matchCategory =
      selectedCategory === "all" || item.category === selectedCategory

    const q = searchQuery.toLowerCase().trim()
    const matchQuery =
      !q ||
      item.nameBn.toLowerCase().includes(q) ||
      item.nameEn.toLowerCase().includes(q) ||
      item.titleBn.toLowerCase().includes(q) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.arabicName.includes(q) ||
      item.shortBioBn.toLowerCase().includes(q) ||
      item.keyAttributesBn.some((attr) => attr.toLowerCase().includes(q))

    return matchCategory && matchQuery
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header Hero Banner */}
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-stone-900/10 to-amber-950/20 p-6 sm:p-10 backdrop-blur-xl dark:border-emerald-500/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Users className="h-3.5 w-3.5" />
              সাহাবায়ে কেরামের জীবনগাঁথা (Companions of the Prophet)
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
              রাসূলুল্লাহ ﷺ-এর সাহাবীদের আত্মত্যাগ ও সোনালী ইতিহাস
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              রাসূলুল্লাহ ﷺ বলেছেন: &ldquo;আমার সাহাবীগণ আকাশের তারকারাজির ন্যায়; তোমরা তাদের যাঁরই অনুসরণ করবে, হিদায়াতপ্রাপ্ত হবে।&rdquo; (মিশকাতুল মাসাবীহ)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all"
            >
              <BookOpen className="h-4 w-4" /> নবীজি ও নবীদের জীবনী
            </Link>
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {COMPANION_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition-all ${
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-md"
                    : "border border-stone-200 bg-white/80 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-300"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.labelBn}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="সাহাবীর নাম বা বৈশিষ্ট্য খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-white/80 py-2 pl-9 pr-4 text-xs font-medium backdrop-blur focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-100"
            />
          </div>
        </div>
      </div>

      {/* Grid of Companions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCompanions.map((companion) => (
          <Link
            key={companion.id}
            href={`/companions/${companion.slug}`}
            className="group flex flex-col justify-between rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-xl dark:border-stone-800/80 dark:bg-stone-900/90"
          >
            <div>
              {/* Card Top Pill */}
              <div className="flex items-center justify-between">
                <span className="rounded-xl bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {companion.categoryLabelBn}
                </span>
                <span className="text-[11px] font-medium text-stone-400">
                  {companion.readTime} পাঠ
                </span>
              </div>

              {/* Arabic Calligraphy & Name */}
              <div className="my-4">
                <p className="arabic text-lg font-bold text-emerald-700 dark:text-emerald-400" dir="rtl">
                  {companion.arabicName}
                </p>
                <h3 className="mt-1.5 text-lg font-bold text-stone-900 group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400">
                  {companion.nameBn}
                </h3>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  {companion.titleBn}
                </p>
              </div>

              {/* Short Bio */}
              <p className="text-xs leading-relaxed text-stone-600 line-clamp-3 dark:text-stone-300">
                {companion.shortBioBn}
              </p>

              {/* Key Attributes Highlights */}
              <div className="mt-4 space-y-1.5 border-t border-stone-100 pt-3 dark:border-stone-800">
                {companion.keyAttributesBn.slice(0, 2).map((attr, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">{attr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-3 text-xs font-bold text-emerald-600 dark:border-stone-800 dark:text-emerald-400">
              <span>সম্পূর্ণ জীবনী পড়ুন</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
