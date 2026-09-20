"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Loader2, RefreshCw } from "lucide-react"
import { SURAH_VERSE_COUNTS } from "@/lib/audio/audio-player-engine"

interface RandomAyah {
  surahNumber: number
  numberInSurah: number
  globalNumber: number
  textArabic: string
  translationEn: string
  translationBn: string
}

function surahFromGlobalNumber(globalNumber: number): number {
  let remaining = globalNumber
  for (let i = 0; i < SURAH_VERSE_COUNTS.length; i++) {
    const count = SURAH_VERSE_COUNTS[i] ?? 0
    if (remaining <= count) return i + 1
    remaining -= count
  }
  return 114
}

export function AyahOfTheDay() {
  const [ayah, setAyah] = useState<RandomAyah | null>(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  const load = () => {
    setLoading(true)
    setFailed(false)
    fetch("/api/quran/random")
      .then(async (r) => {
        const d = await r.json()
        if (!r.ok) throw new Error(d.error || "Failed to load ayah")
        return d.ayah as RandomAyah
      })
      .then((a) => setAyah(a))
      .catch(() => setFailed(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    // Deferred so the initial render is not treated as a cascading update.
    queueMicrotask(load)
  }, [])

  const surahNumber = ayah
    ? ayah.surahNumber && ayah.surahNumber > 0
      ? ayah.surahNumber
      : surahFromGlobalNumber(ayah.globalNumber)
    : 0

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Ayah of the Day</h3>
        <button
          onClick={load}
          disabled={loading}
          aria-label="Load another ayah"
          className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-40 dark:hover:bg-neutral-900 dark:hover:text-white"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {loading && !ayah ? (
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading ayah…
        </div>
      ) : failed && !ayah ? (
        <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          A reminder from the Quran could not be loaded right now.
        </p>
      ) : ayah ? (
        <div>
          <p dir="rtl" className="arabic mb-3 text-right text-xl leading-loose text-neutral-900 dark:text-neutral-100">
            {ayah.textArabic}
          </p>
          <p className="mb-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {ayah.translationEn}
          </p>
          {ayah.translationBn && (
            <p className="bengali mb-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {ayah.translationBn}
            </p>
          )}
          <Link
            href={`/quran/${surahNumber}#ayah-${ayah.numberInSurah}`}
            className="text-xs font-semibold text-neutral-900 underline-offset-2 hover:underline dark:text-white"
          >
            Surah {surahNumber}, Ayah {ayah.numberInSurah} →
          </Link>
        </div>
      ) : null}
    </div>
  )
}
