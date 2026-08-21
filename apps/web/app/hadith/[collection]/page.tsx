"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Loader2 } from "lucide-react"

interface Hadith { id: number; collection: string; hadithNumber: number; text: string; narrator?: string }

export default function CollectionPage({ params, searchParams }: { params: Promise<{ collection: string }>; searchParams: Promise<{ n?: string }> }) {
  const { collection } = use(params)
  const { n } = use(searchParams)
  const [hadiths, setHadiths] = useState<Hadith[]>([])
  const [loading, setLoading] = useState(true)
  const [rangeStart, setRangeStart] = useState(() => {
    if (n) return Math.max(1, parseInt(n) - 5)
    return 1
  })
  const rangeEnd = rangeStart + 9

  useEffect(() => {
    setLoading(true)
    fetch(`/api/hadith/${collection}?start=${rangeStart}&end=${rangeEnd}`)
      .then(r => r.json())
      .then(d => { setHadiths(d.hadiths || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [collection, rangeStart])

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/hadith" className="mb-6 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-emerald-600 dark:text-stone-400">
        <ArrowLeft className="h-4 w-4" /> Back to Collections
      </Link>

      <div className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-100 p-2.5 dark:bg-amber-900/30">
            <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 capitalize">{collection}</h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">Hadith {rangeStart} - {rangeEnd}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {hadiths.map((h) => (
            <div key={h.id} className="rounded-2xl border border-stone-200 bg-white p-5 transition-all hover:border-amber-200 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-lg bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">#{h.hadithNumber}</span>
                {h.narrator && <span className="text-xs text-stone-400">{h.narrator}</span>}
              </div>
              <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">{h.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button onClick={() => setRangeStart(Math.max(1, rangeStart - 10))} disabled={rangeStart <= 1}
          className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
          <ArrowLeft className="h-4 w-4" /> Previous
        </button>
        <button onClick={() => setRangeStart(rangeStart + 10)}
          className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
          Next <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
