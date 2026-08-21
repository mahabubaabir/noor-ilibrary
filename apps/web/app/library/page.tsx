"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Heart,
  Library,
  Loader2,
  Trash2,
  Sparkles,
  TrendingUp,
  Bookmark,
  Award,
  KeyRound,
  User,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react"

interface QuranBookmark {
  id: string
  surahNumber: number
  surahName: string
  ayahNumber: number
  textArabic?: string
  translationBn?: string
  translationEn?: string
  createdAt: string
}

interface HadithBookmark {
  id: string
  collection: string
  hadithNumber: number
  arabic?: string
  translationBn?: string
  english?: string
  grade?: string
  createdAt: string
}

interface ProgressRecord {
  id: string
  surahNumber: number
  ayahNumber: number
  surahName?: string
  totalAyahs?: number
  updatedAt: string
}

interface UserProfile {
  id: string
  name: string | null
  email: string
  role?: string
  createdAt?: string
}

export default function LibraryProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [bookmarks, setBookmarks] = useState<QuranBookmark[]>([])
  const [hadithBookmarks, setHadithBookmarks] = useState<HadithBookmark[]>([])
  const [progressList, setProgressList] = useState<ProgressRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"progress" | "quran" | "hadith">("progress")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/library/bookmarks").then((r) => r.json()),
      fetch("/api/library/hadith-bookmarks").then((r) => r.json()),
      fetch("/api/library/progress").then((r) => r.json()),
    ])
      .then(([userData, bmData, hmData, pData]) => {
        setUser(userData.user || null)
        setBookmarks(bmData.bookmarks || [])
        setHadithBookmarks(hmData.bookmarks || [])
        setProgressList(pData.progress || (pData.data ? [pData.data] : []))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const deleteQuranBookmark = async (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await fetch(`/api/library/bookmarks?id=${id}`, { method: "DELETE" })
      setBookmarks((prev) => prev.filter((b) => b.id !== id))
    } catch {
      // Ignored
    }
  }

  const deleteHadithBookmark = async (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await fetch(`/api/library/hadith-bookmarks?id=${id}`, { method: "DELETE" })
      setHadithBookmarks((prev) => prev.filter((b) => b.id !== id))
    } catch {
      // Ignored
    }
  }

  const handleCopyText = (text: string, id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600 dark:text-emerald-400" />
        <p className="text-sm text-stone-500">প্রোফাইল লোড হচ্ছে...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-stone-200/80 bg-white p-8 text-center shadow-xl dark:border-stone-800 dark:bg-stone-900">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            <BookOpen className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            প্রোফাইল ও লাইব্রেরি অ্যাক্সেস
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            আপনার কুরআন পড়ার অগ্রগতি সংরক্ষণ ও পছন্দের বুকমার্কগুলো দেখতে একাউন্টে সাইন ইন করুন।
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href="/login"
              className="rounded-2xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-all"
            >
              সাইন ইন করুন (Sign In)
            </Link>
            <Link
              href="/register"
              className="rounded-2xl border border-stone-200 bg-stone-50 py-3 text-sm font-bold text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300 transition-all"
            >
              নতুন একাউন্ট তৈরি করুন
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Calculate stats
  const latestProgress = progressList[0] || null
  const progressPercent = latestProgress
    ? Math.min(100, Math.round(((latestProgress.ayahNumber || 1) / (latestProgress.totalAyahs || 7)) * 100))
    : 0

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Profile Overview Card */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 via-emerald-800/5 to-amber-500/5 p-6 sm:p-8 dark:border-emerald-500/30 dark:from-emerald-950/40 dark:via-stone-900/40">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-600 text-2xl font-bold text-white shadow-lg">
              {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {user.name || "সম্মানিত পাঠক"}
                </h1>
                {user.role === "admin" && (
                  <span className="rounded-lg bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">{user.email}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300">
                <span className="inline-flex items-center gap-1 font-semibold">
                  <Sparkles className="h-3.5 w-3.5" /> নূর লাইব্রেরি সদস্য
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/forgot-password"
              className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white/80 px-4 py-2 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            >
              <KeyRound className="h-4 w-4" /> পাসওয়ার্ড পরিবর্তন
            </Link>
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-2xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-700 transition-all"
              >
                অ্যাডমিন ড্যাশবোর্ড (Admin)
              </Link>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-emerald-500/20 bg-white/80 p-4 backdrop-blur dark:border-emerald-500/20 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              {progressPercent}%
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">বর্তমান সূরা অগ্রগতি</span>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white/80 p-4 backdrop-blur dark:border-stone-800 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-stone-800 dark:text-stone-200">
              {bookmarks.length}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">কুরআন বুকমার্ক</span>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-white/80 p-4 backdrop-blur dark:border-amber-500/20 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-amber-600 dark:text-amber-400">
              {hadithBookmarks.length}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">হাদিস বুকমার্ক</span>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-white/80 p-4 backdrop-blur dark:border-blue-500/20 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">
              {latestProgress ? `সূরা ${latestProgress.surahNumber}` : "শুরু হয়নি"}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">সর্বশেষ পড়া সূরা</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-stone-200 pb-3 dark:border-stone-800">
        <button
          onClick={() => setActiveTab("progress")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "progress"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
          }`}
        >
          <TrendingUp className="h-4 w-4" /> পড়ার অগ্রগতি (Reading Progress)
        </button>

        <button
          onClick={() => setActiveTab("quran")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "quran"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
          }`}
        >
          <Heart className="h-4 w-4" /> কুরআন আয়াতসমূহ ({bookmarks.length})
        </button>

        <button
          onClick={() => setActiveTab("hadith")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "hadith"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
          }`}
        >
          <Library className="h-4 w-4" /> সংরক্ষিত হাদিস ({hadithBookmarks.length})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "progress" && (
        <div className="space-y-6">
          {latestProgress ? (
            <div className="rounded-3xl border border-emerald-500/30 bg-white p-6 shadow-sm dark:border-emerald-500/20 dark:bg-stone-900">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                    সর্বশেষ পড়ার অবস্থান
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-stone-900 dark:text-stone-100">
                    সূরা {latestProgress.surahName || latestProgress.surahNumber} (সূরা নং {latestProgress.surahNumber})
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    আয়াত নং: {latestProgress.ayahNumber} / {latestProgress.totalAyahs || "—"}
                  </p>
                </div>
                <Link
                  href={`/quran/${latestProgress.surahNumber}#ayah-${latestProgress.ayahNumber}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all active:scale-95"
                >
                  পড়া চালিয়ে যান (Resume) <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-xs font-semibold text-stone-600 dark:text-stone-400">
                  <span>অগ্রগতি</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-white/40 p-12 text-center dark:border-stone-800 dark:bg-stone-900/40">
              <BookOpen className="mx-auto mb-3 h-10 w-10 text-stone-400" />
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
                এখনো কোনো পড়ার অগ্রগতি সংরক্ষণ করা হয়নি
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                যেকোনো সূরা পড়ার সময় &quot;পড়ার অগ্রগতি সংরক্ষণ করুন&quot; বোতামে চাপ দিলে এখানে সংরক্ষিত থাকবে।
              </p>
              <Link
                href="/quran"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-md"
              >
                কুরআন তেলাওয়াত শুরু করুন
              </Link>
            </div>
          )}
        </div>
      )}

      {activeTab === "quran" && (
        <div className="space-y-4">
          {bookmarks.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-white/40 p-12 text-center dark:border-stone-800 dark:bg-stone-900/40">
              <Heart className="mx-auto mb-3 h-10 w-10 text-stone-400" />
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
                কোনো কুরআন আয়াত বুকমার্ক করা হয়নি
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                পছন্দের আয়াত বুকমার্ক করে রাখতে আয়াতের পাশের হার্ট (Heart) আইকনে ক্লিক করুন।
              </p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="group rounded-3xl border border-stone-200/80 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                    সূরা {bm.surahName} ({bm.surahNumber}:{bm.ayahNumber})
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleCopyText(`${bm.textArabic}\n${bm.translationBn}`, bm.id, e)}
                      className="rounded-xl p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
                      title="কপি করুন"
                    >
                      {copiedId === bm.id ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={(e) => deleteQuranBookmark(bm.id, e)}
                      className="rounded-xl p-2 text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {bm.textArabic && (
                  <p className="arabic mb-2 text-right text-xl leading-relaxed text-stone-900 dark:text-stone-100" dir="rtl">
                    {bm.textArabic}
                  </p>
                )}
                {bm.translationBn && (
                  <p className="bengali text-sm text-emerald-950 dark:text-emerald-100">{bm.translationBn}</p>
                )}

                <div className="mt-3 flex justify-end">
                  <Link
                    href={`/quran/${bm.surahNumber}#ayah-${bm.ayahNumber}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
                  >
                    সূরায় আয়াতটি দেখুন <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "hadith" && (
        <div className="space-y-4">
          {hadithBookmarks.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-white/40 p-12 text-center dark:border-stone-800 dark:bg-stone-900/40">
              <Library className="mx-auto mb-3 h-10 w-10 text-stone-400" />
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
                কোনো হাদিস বুকমার্ক করা হয়নি
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                পছন্দের হাদিস সংরক্ষণ করতে হাদিসের পাশের হার্ট (Heart) আইকনে ক্লিক করুন।
              </p>
            </div>
          ) : (
            hadithBookmarks.map((hm) => (
              <div
                key={hm.id}
                className="group rounded-3xl border border-stone-200/80 bg-white p-5 shadow-sm transition-all hover:border-amber-300 dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-xl bg-amber-50 px-3 py-1 text-xs font-bold capitalize text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                    {hm.collection} (হাদিস নং: #{hm.hadithNumber})
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleCopyText(`${hm.arabic}\n${hm.translationBn || hm.english}`, hm.id, e)}
                      className="rounded-xl p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
                      title="কপি করুন"
                    >
                      {copiedId === hm.id ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={(e) => deleteHadithBookmark(hm.id, e)}
                      className="rounded-xl p-2 text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {hm.arabic && (
                  <p className="arabic mb-2 text-right text-lg leading-relaxed text-stone-900 dark:text-stone-100" dir="rtl">
                    {hm.arabic}
                  </p>
                )}
                {hm.translationBn && (
                  <p className="bengali text-sm text-stone-800 dark:text-stone-200">{hm.translationBn}</p>
                )}

                <div className="mt-3 flex justify-end">
                  <Link
                    href={`/hadith/${hm.collection}?n=${hm.hadithNumber}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline dark:text-amber-400"
                  >
                    হাদিসটি সম্পূর্ণ পড়ুন <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
