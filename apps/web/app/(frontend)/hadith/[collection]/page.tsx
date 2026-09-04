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

      if (r.status === 401) {
        const redirect = encodeURIComponent(window.location.pathname + window.location.search)
        window.location.href = `/login?redirect=${redirect}&intent=hadith`
        return
      }

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
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> হাদিস সংকলনে ফিরে যান
        </Link>
      </div>

      {/* Collection Hero Header */}
      <div className="relative mb-8 rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm sm:p-8 dark:border-neutral-800 dark:bg-neutral-950">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-0.5 text-xs font-bold text-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
          <Sparkles className="h-3 w-3" />
          {collectionMeta?.reliability || "বিশুদ্ধ হাদিস সংকলন"}
        </span>

        <h1 className="arabic my-3 text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
          {collectionMeta?.arabicName || collection}
        </h1>

        <h2 className="text-xl font-bold text-neutral-900 dark:text-white capitalize">
          {collectionMeta?.name || collection}
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
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
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
          />
          <button
            type="submit"
            className="rounded-xl bg-black px-4 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            যান
          </button>
        </form>
      </div>

      {/* Hadith List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-44 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-900" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{error}</p>
        </div>
      ) : hadiths.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/40 p-12 text-center dark:border-neutral-800 dark:bg-neutral-900/40">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-neutral-400" />
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">হাদিস পাওয়া যায়নি</h3>
          <p className="mt-1 text-xs text-neutral-500">অন্য কোনো হাদিস নম্বর দিয়ে চেষ্টা করুন।</p>
        </div>
      ) : (
        <div className="space-y-6">
          {hadiths.map((h) => {
            const isBookmarked = bookmarkedIds.has(h.hadithNumber)

            return (
              <div
                key={h.id || h.hadithNumber}
                id={`hadith-${h.hadithNumber}`}
                className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
              >
                {/* Header bar */}
                <div className="mb-4 flex items-center justify-between gap-2 border-b border-neutral-100 pb-3 dark:border-neutral-900">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 text-xs font-mono font-bold text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100">
                      হাদিস #{h.hadithNumber}
                    </span>
                    {h.grade && (
                      <span className="rounded-md border border-neutral-300 px-2 py-0.5 text-[10px] font-semibold text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                        {h.grade}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleBookmark(h)}
                      title="বুকমার্ক করুন"
                      className={`rounded-xl border p-2 transition-colors ${
                        isBookmarked
                          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                          : "border-neutral-200 text-neutral-400 hover:border-neutral-300 hover:text-black dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:text-white"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={() => handleCopy(h)}
                      title="কপি করুন"
                      className="rounded-xl border border-neutral-200 p-2 text-neutral-400 hover:border-neutral-300 hover:text-black dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:text-white"
                    >
                      {copiedId === h.hadithNumber ? (
                        <Check className="h-4 w-4 text-black dark:text-white" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleShare(h)}
                      title="শেয়ার করুন"
                      className="rounded-xl border border-neutral-200 p-2 text-neutral-400 hover:border-neutral-300 hover:text-black dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:text-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                {h.arabic && (
                  <p
                    className="arabic mb-4 text-right text-xl font-medium leading-loose text-neutral-900 sm:text-2xl dark:text-neutral-100"
                    dir="rtl"
                  >
                    {h.arabic}
                  </p>
                )}

                {/* Bangla Translation */}
                {h.translationBn && (
                  <div className="mb-3 rounded-xl bg-neutral-50 p-4 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-900">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      বাংলা অনুবাদ
                    </span>
                    <p className="bengali text-sm sm:text-base leading-relaxed text-neutral-900 dark:text-neutral-100 font-medium">
                      {h.translationBn}
                    </p>
                  </div>
                )}

                {/* English Translation */}
                {h.english && (
                  <div className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-neutral-400">
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
      <div className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <button
          onClick={() => setRangeStart(Math.max(1, rangeStart - pageSize))}
          disabled={rangeStart <= 1 || loading}
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-800 shadow-sm hover:bg-neutral-50 disabled:opacity-40 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
        >
          <ArrowLeft className="h-4 w-4" /> পূর্ববর্তী ({Math.max(1, rangeStart - pageSize)} - {rangeStart - 1})
        </button>

        <span className="text-xs font-mono font-semibold text-neutral-500">
          হাদিস {rangeStart} - {rangeEnd}
        </span>

        <button
          onClick={() => setRangeStart(rangeStart + pageSize)}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-800 shadow-sm hover:bg-neutral-50 disabled:opacity-40 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
        >
          পরবর্তী ({rangeStart + pageSize} - {rangeEnd + pageSize}) <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
