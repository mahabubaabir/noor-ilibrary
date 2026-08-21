"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, Heart, Library, Loader2, Trash2 } from "lucide-react"

interface Bookmark { id: string; surahNumber: number; surahName: string; ayahNumber: number; text?: string; createdAt: string }
interface HadithBookmark { id: string; collection: string; hadithNumber: number; text?: string; createdAt: string }
interface Progress { surahNumber: number; lastAyah: number; totalAyahs: number; updatedAt: string }

export default function LibraryPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [hadithBookmarks, setHadithBookmarks] = useState<HadithBookmark[]>([])
  const [progress, setProgress] = useState<Progress[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then(r => r.json()),
      fetch("/api/library/bookmarks").then(r => r.json()),
      fetch("/api/library/hadith-bookmarks").then(r => r.json()),
      fetch("/api/library/progress").then(r => r.json()),
    ]).then(([userData, bmData, hmData, pData]) => {
      setUser(userData.user || null)
      setBookmarks(bmData.bookmarks || [])
      setHadithBookmarks(hmData.bookmarks || [])
      setProgress(pData.progress || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
    </div>
  )

  if (!user) return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 dark:bg-stone-800">
          <BookOpen className="h-6 w-6 text-stone-400" />
        </div>
        <h2 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">Sign in to view your library</h2>
        <p className="mb-4 text-sm text-stone-500 dark:text-stone-400">Save bookmarks, track reading progress, and more</p>
        <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700">
          Sign In
        </Link>
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">My Library</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">Welcome back, {user.name}</p>
      </div>

      {bookmarks.length > 0 && (
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-300">Quran Bookmarks</h2>
          </div>
          <div className="space-y-2">
            {bookmarks.map(bm => (
              <Link key={bm.id} href={`/quran/${bm.surahNumber}?ayah=${bm.ayahNumber}`}>
                <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-emerald-200 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900">
                  <div>
                    <span className="text-sm font-medium text-stone-900 dark:text-stone-100">Surah {bm.surahName}</span>
                    <span className="ml-2 text-xs text-stone-400">Ayah {bm.ayahNumber}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {hadithBookmarks.length > 0 && (
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Library className="h-4 w-4 text-amber-500" />
            <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-300">Hadith Bookmarks</h2>
          </div>
          <div className="space-y-2">
            {hadithBookmarks.map(hm => (
              <Link key={hm.id} href={`/hadith/${hm.collection}?n=${hm.hadithNumber}`}>
                <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-amber-200 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900">
                  <div>
                    <span className="text-sm font-medium capitalize text-stone-900 dark:text-stone-100">{hm.collection}</span>
                    <span className="ml-2 text-xs text-stone-400">#{hm.hadithNumber}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {progress.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-500" />
            <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-300">Reading Progress</h2>
          </div>
          <div className="space-y-2">
            {progress.map(p => {
              const pct = Math.round((p.lastAyah / p.totalAyahs) * 100)
              return (
                <Link key={p.surahNumber} href={`/quran/${p.surahNumber}`}>
                  <div className="rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-emerald-200 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-stone-900 dark:text-stone-100">Surah {p.surahNumber}</span>
                      <span className="text-xs text-stone-400">{pct}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                      <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {bookmarks.length === 0 && hadithBookmarks.length === 0 && progress.length === 0 && (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white/50 p-12 text-center dark:border-stone-700 dark:bg-stone-900/50">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-stone-300 dark:text-stone-600" />
          <h3 className="mb-1 text-sm font-medium text-stone-900 dark:text-stone-100">Your library is empty</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">Start reading to build your collection</p>
        </div>
      )}
    </div>
  )
}
