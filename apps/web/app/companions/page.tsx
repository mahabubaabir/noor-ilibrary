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
import { CompanionsGeometricGrid } from "@/components/companions/companions-geometric-grid"

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
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-stone-900/10 to-amber-950/20 p-6 sm:p-8 backdrop-blur-xl dark:border-emerald-500/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Users className="h-3.5 w-3.5" />
              সাহাবায়ে কেরাম (Companions of the Prophet)
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
              রাসূলুল্লাহ ﷺ ও চারপাশের সাহাবীদের আলোকিত জীবন
            </h1>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              সাহাবীদের কার্ডে স্পর্শ করুন এবং বিস্তারিত জীবনী ও অডিও বিবরণ শুনুন।
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

      {/* Interactive Companions Experience Widget */}
      <div className="mb-12">
        <CompanionsGeometricGrid />
      </div>
    </div>
  )
}
