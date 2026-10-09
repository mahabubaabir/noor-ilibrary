"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react"

interface DailyAyah {
  surahNumber: number
  surahNameBn: string
  surahNameEn: string
  ayahNumber: number
  globalNumber: number
  textArabic: string
  translationEn: string
  translationBn: string
}

export function AyahOfTheDay() {
  const [ayah, setAyah] = useState<DailyAyah | null>(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [bookmarkBusy, setBookmarkBusy] = useState(false)

  useEffect(() => {
    let cancelled = false
    // Same DB-backed daily ayah as the hero: stable for the whole day.
    fetch("/api/quran/daily")
      .then(async (r) => {
        const d = await r.json()
        if (!r.ok) throw new Error(d.error || "Failed to load ayah")
        return d as { ayah: DailyAyah; bookmarked: boolean }
      })
      .then((d) => {
        if (cancelled) return
        setAyah(d.ayah)
        setBookmarked(Boolean(d.bookmarked))
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const toggleBookmark = async () => {
    if (!ayah || bookmarkBusy) return
    setBookmarkBusy(true)
    try {
      if (bookmarked) {
        const r = await fetch(
          `/api/library/bookmarks?surah=${ayah.surahNumber}&ayah=${ayah.ayahNumber}`,
          { method: "DELETE" }
        )
        if (r.ok) setBookmarked(false)
      } else {
        const r = await fetch("/api/library/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            surahNumber: ayah.surahNumber,
            ayahNumber: ayah.ayahNumber,
            surahName: ayah.surahNameEn,
            textArabic: ayah.textArabic,
            translationEn: ayah.translationEn,
            translationBn: ayah.translationBn,
          }),
        })
        if (r.status === 401) {
          const redirect = encodeURIComponent("/")
          window.location.href = `/login?redirect=${redirect}&intent=ayah`
          return
        }
        if (r.ok) setBookmarked(true)
      }
    } catch {
      // Ignored
    } finally {
      setBookmarkBusy(false)
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Ayah of the Day</h3>
          <span className="rounded border border-neutral-300 px-1.5 py-0.5 text-[10px] font-bold text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
            আজকের আয়াত
          </span>
        </div>
        <button
          onClick={toggleBookmark}
          disabled={!ayah || bookmarkBusy}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark this ayah"}
          title={bookmarked ? "বুকমার্ক থেকে সরান" : "আজকের আয়াতটি বুকমার্ক করুন"}
          className={`rounded-lg p-1.5 transition-colors disabled:opacity-40 ${
            bookmarked
              ? "text-neutral-900 dark:text-white"
              : "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-white"
          }`}
        >
          {bookmarked ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
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
            href={`/quran/${ayah.surahNumber}#ayah-${ayah.ayahNumber}`}
            className="text-xs font-semibold text-neutral-900 underline-offset-2 hover:underline dark:text-white"
          >
            সূরা {ayah.surahNameBn} ({ayah.surahNameEn}) — {ayah.surahNumber}:{ayah.ayahNumber} →
          </Link>
        </div>
      ) : null}
    </div>
  )
}
