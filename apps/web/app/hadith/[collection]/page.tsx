"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Loader2,
  Heart,
  Copy,
  Check,
  Share2,
  Sparkles,
  Search,
} from "lucide-react"
import type { HadithRecord, HadithCollection } from "@noor/types"

export default function CollectionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>
  searchParams: Promise<{ n?: string }>
}) {
  const { collection } = use(params)
  const { n } = use(searchParams)

  const [hadiths, setHadiths] = useState<HadithRecord[]>([])
  const [collectionMeta, setCollectionMeta] = useState<HadithCollection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [rangeStart, setRangeStart] = useState(() => {
    if (n) {
      const parsed = parseInt(n, 10)
      if (!isNaN(parsed) && parsed > 0) return parsed
    }
    return 1
  })

  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set())
  const [jumpInput, setJumpInput] = useState("")

  const pageSize = 10
  const rangeEnd = rangeStart + pageSize - 1

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`/api/hadith/${collection}?start=${rangeStart}&limit=${pageSize}`)
      .then((r) => {
        if (!r.ok) throw new Error("হাদিস লোড করতে সমস্যা হয়েছে")
        return r.json()
      })
      .then((d) => {
        if (d.hadiths) {
          setHadiths(d.hadiths)
          setCollectionMeta(d.collection || null)
        } else {
          setHadiths([])
        }
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || "হাদিস লোড ব্যর্থ হয়েছে")
        setLoading(false)
      })
  }, [collection, rangeStart])

  const handleCopy = async (h: HadithRecord) => {
    const text = [
      h.arabic,
      h.translationBn ? `[বাংলা অনুবাদ]: ${h.translationBn}` : null,
      h.english ? `[English]: ${h.english}` : null,
      `— ${h.collectionName || collection} (হাদিস নং: ${h.hadithNumber}) [মান: ${h.grade || "সহীহ"}]`,
    ]
      .filter(Boolean)
      .join("\n\n")

    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(h.hadithNumber)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Ignored
    }
  }

  const handleShare = async (h: HadithRecord) => {
    const text = `${h.arabic}\n\n${h.translationBn || h.english}\n— ${h.collectionName || collection} #${h.hadithNumber}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${h.collectionName || collection} Hadith #${h.hadithNumber}`,
          text,
        })
      } catch {
        // Cancelled
      }
    } else {
      handleCopy(h)
    }
  }

  const handleBookmark = async (h: HadithRecord) => {
    try {
      const r = await fetch("/api/library/hadith-bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection,
          hadithNumber: h.hadithNumber,
          arabic: h.arabic || "",
          english: h.english || "",
          grade: h.grade || "Sahih",
          translationBn: h.translationBn || "",
        }),
      })
      if (r.ok) {
        setBookmarkedIds((prev) => new Set(prev).add(h.hadithNumber))
      }
    } catch {
      // Ignored
    }
  }

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault()
    const target = parseInt(jumpInput, 10)
    if (!isNaN(target) && target > 0) {
      setRangeStart(target)
      setJumpInput("")
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back Link */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/hadith"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
        >
          <ArrowLeft className="h-4 w-4" /> হাদিস সংকলনে ফিরে যান
        </Link>
      </div>

      {/* Collection Hero Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-b from-white via-amber-50/20 to-white p-6 text-center shadow-sm sm:p-8 dark:border-amber-500/30 dark:from-stone-900 dark:via-amber-950/20 dark:to-stone-900">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
          <Sparkles className="h-3.5 w-3.5" />
          {collectionMeta?.reliability || "বিশুদ্ধ হাদিস সংকলন"}
        </span>

        <h1 className="arabic my-3 text-3xl font-bold text-stone-900 dark:text-stone-100 sm:text-4xl">
          {collectionMeta?.arabicName || collection}
        </h1>

        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-200 capitalize">
          {collectionMeta?.name || collection}
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {collectionMeta?.author} · মোট {collectionMeta?.totalHadiths?.toLocaleString() || "হাজারো"} হাদিস
        </p>

        {/* Jump to number form */}
        <form onSubmit={handleJump} className="mx-auto mt-5 flex max-w-xs items-center gap-2">
          <input
            type="number"
            placeholder="হাদিস নং (যেমন: 1)..."
            min={1}
            value={jumpInput}
            onChange={(e) => setJumpInput(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
          />
          <button
            type="submit"
            className="rounded-xl bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 active:scale-95"
          >
            Jump
          </button>
        </form>
      </div>

      {/* Hadith List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-44 animate-pulse rounded-3xl bg-stone-200/70 dark:bg-stone-800/70" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">{error}</p>
        </div>
      ) : hadiths.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white/40 p-12 text-center dark:border-stone-800 dark:bg-stone-900/40">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-stone-400" />
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">হাদিস পাওয়া যায়নি</h3>
          <p className="mt-1 text-xs text-stone-500">অন্য কোনো হাদিস নম্বর দিয়ে চেষ্টা করুন।</p>
        </div>
      ) : (
        <div className="space-y-6">
          {hadiths.map((h) => {
            const isBookmarked = bookmarkedIds.has(h.hadithNumber)

            return (
              <div
                key={h.id || h.hadithNumber}
                id={`hadith-${h.hadithNumber}`}
                className="group relative rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all hover:border-amber-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
              >
                {/* Header bar */}
                <div className="mb-4 flex items-center justify-between gap-2 border-b border-stone-100 pb-3 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 items-center justify-center rounded-xl bg-amber-50 px-3 text-xs font-bold text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                      হাদিস নং: {h.hadithNumber}
                    </span>
                    {h.grade && (
                      <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                        {h.grade}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleBookmark(h)}
                      title="বুকমার্ক করুন"
                      className={`rounded-xl p-2 transition-colors ${
                        isBookmarked
                          ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                          : "text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={() => handleCopy(h)}
                      title="কপি করুন"
                      className="rounded-xl p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                    >
                      {copiedId === h.hadithNumber ? (
                        <Check className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleShare(h)}
                      title="শেয়ার করুন"
                      className="rounded-xl p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                {h.arabic && (
                  <p
                    className="arabic mb-4 text-right text-xl font-medium leading-loose text-stone-900 sm:text-2xl dark:text-stone-50"
                    dir="rtl"
                  >
                    {h.arabic}
                  </p>
                )}

                {/* Bangla Translation */}
                {h.translationBn && (
                  <div className="mb-3 rounded-2xl bg-amber-50/40 p-4 dark:bg-amber-950/20">
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      বাংলা অনুবাদ
                    </span>
                    <p className="bengali text-sm sm:text-base leading-relaxed text-stone-900 dark:text-stone-100">
                      {h.translationBn}
                    </p>
                  </div>
                )}

                {/* English Translation */}
                {h.english && (
                  <div className="text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      English
                    </span>
                    <p>{h.english}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-10 flex items-center justify-between border-t border-stone-200 pt-6 dark:border-stone-800">
        <button
          onClick={() => setRangeStart(Math.max(1, rangeStart - pageSize))}
          disabled={rangeStart <= 1 || loading}
          className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-50 disabled:opacity-40 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
        >
          <ArrowLeft className="h-4 w-4" /> পূর্ববর্তী ({Math.max(1, rangeStart - pageSize)} - {rangeStart - 1})
        </button>

        <span className="text-xs font-semibold text-stone-500">
          হাদিস {rangeStart} - {rangeEnd}
        </span>

        <button
          onClick={() => setRangeStart(rangeStart + pageSize)}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-50 disabled:opacity-40 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
        >
          পরবর্তী ({rangeStart + pageSize} - {rangeEnd + pageSize}) <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
