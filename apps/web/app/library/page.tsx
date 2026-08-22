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
  Edit3,
  RefreshCw,
  Highlighter,
  MessageSquare,
  Camera,
  AtSign,
  CheckCircle2,
  X,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface UserHighlight {
  id: string
  targetId: string
  targetType: string
  text: string
  color: string
  note?: string
  createdAt: string
}

interface UserNote {
  id: string
  targetId: string
  targetType: string
  title?: string
  content: string
  color?: string
  createdAt: string
}

interface UserProfile {
  id: string
  name: string | null
  username?: string | null
  email: string
  avatar?: string | null
  bio?: string | null
  role?: string
  createdAt?: string
}

const PRESET_AVATARS = [
  { id: "emerald_star", label: "মরু তারকা", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=150&auto=format&fit=crop&q=80" },
  { id: "golden_dome", label: "স্বর্ণালী গম্বুজ", url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=80" },
  { id: "serene_dawn", label: "প্রশান্ত প্রভাত", url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=150&auto=format&fit=crop&q=80" },
  { id: "sacred_arch", label: "নকশী মেহরাব", url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=150&auto=format&fit=crop&q=80" },
  { id: "celestial_sky", label: "নীলিমার চাঁদ", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80" },
]

export default function LibraryProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [bookmarks, setBookmarks] = useState<QuranBookmark[]>([])
  const [hadithBookmarks, setHadithBookmarks] = useState<HadithBookmark[]>([])
  const [progressList, setProgressList] = useState<ProgressRecord[]>([])
  const [highlights, setHighlights] = useState<UserHighlight[]>([])
  const [notes, setNotes] = useState<UserNote[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"progress" | "quran" | "hadith" | "annotations" | "profile">("progress")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)
  const [syncSuccess, setSyncSuccess] = useState(false)

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editName, setEditName] = useState("")
  const [editUsername, setEditUsername] = useState("")
  const [editAvatar, setEditAvatar] = useState("")
  const [editBio, setEditBio] = useState("")
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const [userData, bmData, hmData, pData, hlData, ntData] = await Promise.all([
        fetch("/api/auth/me").then((r) => r.json()),
        fetch("/api/library/bookmarks").then((r) => r.json()),
        fetch("/api/library/hadith-bookmarks").then((r) => r.json()),
        fetch("/api/library/progress").then((r) => r.json()),
        fetch("/api/library/highlights").then((r) => r.json()).catch(() => ({ highlights: [] })),
        fetch("/api/library/notes").then((r) => r.json()).catch(() => ({ notes: [] })),
      ])

      if (userData.user) {
        setUser(userData.user)
        setEditName(userData.user.name || "")
        setEditUsername(userData.user.username || "")
        setEditAvatar(userData.user.avatar || "")
        setEditBio(userData.user.bio || "")
      }
      setBookmarks(bmData.bookmarks || [])
      setHadithBookmarks(hmData.bookmarks || [])
      setProgressList(pData.progress || (pData.data ? [pData.data] : []))
      setHighlights(hlData.highlights || [])
      setNotes(ntData.notes || [])
    } catch {
      // Ignored
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Manual Trigger Full Auto-Sync
  const handleAutoSync = async () => {
    setSyncing(true)
    try {
      const res = await fetch("/api/library/sync")
      const data = await res.json()
      if (data.bookmarks) setBookmarks(data.bookmarks)
      if (data.hadithBookmarks) setHadithBookmarks(data.hadithBookmarks)
      if (data.progress) setProgressList(data.progress)
      if (data.highlights) setHighlights(data.highlights)
      if (data.notes) setNotes(data.notes)
      if (data.user) setUser(data.user)

      setSyncSuccess(true)
      setTimeout(() => setSyncSuccess(false), 3000)
    } catch {
      // Ignored
    }
    setSyncing(false)
  }

  // Save Profile Changes
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileSaving(true)
    setProfileError(null)

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          username: editUsername || null,
          avatar: editAvatar || null,
          bio: editBio || null,
        }),
      })

      const d = await res.json()
      if (!res.ok) {
        setProfileError(d.error || "প্রোফাইল আপডেট ব্যর্থ হয়েছে")
      } else {
        setUser(d.user)
        setIsEditingProfile(false)
      }
    } catch {
      setProfileError("সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি")
    }
    setProfileSaving(false)
  }

  const deleteQuranBookmark = async (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await fetch(`/api/library/bookmarks?id=${id}`, { method: "DELETE" })
      setBookmarks((prev) => prev.filter((b) => b.id !== id))
    } catch {}
  }

  const deleteHadithBookmark = async (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await fetch(`/api/library/hadith-bookmarks?id=${id}`, { method: "DELETE" })
      setHadithBookmarks((prev) => prev.filter((b) => b.id !== id))
    } catch {}
  }

  const deleteHighlight = async (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await fetch(`/api/library/highlights?id=${id}`, { method: "DELETE" })
      setHighlights((prev) => prev.filter((h) => h.id !== id))
    } catch {}
  }

  const deleteNote = async (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await fetch(`/api/library/notes?id=${id}`, { method: "DELETE" })
      setNotes((prev) => prev.filter((n) => n.id !== id))
    } catch {}
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
        <p className="text-sm text-stone-500">প্রোফাইল ও লাইব্রেরি লোড হচ্ছে...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-stone-200/80 bg-white/90 p-8 text-center shadow-xl backdrop-blur-xl dark:border-stone-800 dark:bg-stone-900/90">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            <BookOpen className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            প্রোফাইল ও পার্সোনাল লাইব্রেরি
          </h2>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            আপনার নাম, ইউজারনেম, পছন্দের ছবি এবং হাইলাইট ও বুকমার্ক সংরক্ষণ করতে সাইন ইন করুন।
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

  const latestProgress = progressList[0] || null
  const progressPercent = latestProgress
    ? Math.min(100, Math.round(((latestProgress.ayahNumber || 1) / (latestProgress.totalAyahs || 7)) * 100))
    : 0

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Profile Overview Card */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/15 via-stone-900/10 to-amber-950/10 p-6 sm:p-8 backdrop-blur-xl dark:border-emerald-500/30">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "Avatar"}
                  className="h-18 w-18 sm:h-20 sm:w-20 rounded-3xl object-cover ring-4 ring-emerald-500/20 shadow-xl"
                />
              ) : (
                <div className="flex h-18 w-18 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-emerald-600 text-3xl font-bold text-white shadow-xl">
                  {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                </div>
              )}

              <button
                onClick={() => setIsEditingProfile(true)}
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-xl bg-white text-stone-700 shadow-md ring-2 ring-stone-200 hover:bg-stone-50 dark:bg-stone-800 dark:text-stone-200 dark:ring-stone-700"
                title="প্রোফাইল ছবি পরিবর্তন করুন"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
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

              <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                {user.username && (
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    @{user.username}
                  </span>
                )}
                <span>•</span>
                <span>{user.email}</span>
              </div>

              {user.bio && (
                <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-300 max-w-md line-clamp-2">
                  {user.bio}
                </p>
              )}

              {/* Auto Sync Indicator */}
              <div className="mt-2.5 flex items-center gap-3">
                <button
                  onClick={handleAutoSync}
                  disabled={syncing}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 transition-all hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300"
                  title="ক্লাউডের সাথে সকল ডেটা সিঙ্ক করুন"
                >
                  <RefreshCw className={`h-3 w-3 ${syncing ? "animate-spin text-emerald-600" : ""}`} />
                  {syncSuccess ? "সিঙ্ক সম্পন্ন হয়েছে!" : syncing ? "সিঙ্ক হচ্ছে..." : "স্বয়ংক্রিয় সিঙ্ক সক্রিয়"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsEditingProfile(true)}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-500/40 bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-all"
            >
              <Edit3 className="h-3.5 w-3.5" /> প্রোফাইল সম্পাদনা (Edit Profile)
            </button>

            <Link
              href="/forgot-password"
              className="inline-flex items-center gap-1.5 rounded-2xl border border-stone-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            >
              <KeyRound className="h-3.5 w-3.5" /> পাসওয়ার্ড পরিবর্তন
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-emerald-500/20 bg-white/80 p-4 backdrop-blur dark:border-emerald-500/20 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              {progressPercent}%
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">কুরআন তিলাওয়াত অগ্রগতি</span>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white/80 p-4 backdrop-blur dark:border-stone-800 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-stone-800 dark:text-stone-200">
              {bookmarks.length}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">সংরক্ষিত আয়াত</span>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-white/80 p-4 backdrop-blur dark:border-amber-500/20 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-amber-600 dark:text-amber-400">
              {hadithBookmarks.length}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">সংরক্ষিত হাদিস</span>
          </div>

          <div className="rounded-2xl border border-purple-500/20 bg-white/80 p-4 backdrop-blur dark:border-purple-500/20 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-purple-600 dark:text-purple-400">
              {highlights.length + notes.length}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">রিডার হাইলাইট ও নোটস</span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-stone-200 pb-3 dark:border-stone-800">
        <button
          onClick={() => setActiveTab("progress")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "progress"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
          }`}
        >
          <TrendingUp className="h-4 w-4" /> পড়ার অগ্রগতি
        </button>

        <button
          onClick={() => setActiveTab("quran")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "quran"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
          }`}
        >
          <Heart className="h-4 w-4" /> কুরআন বুকমার্ক ({bookmarks.length})
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

        <button
          onClick={() => setActiveTab("annotations")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "annotations"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
          }`}
        >
          <Highlighter className="h-4 w-4" /> হাইলাইট ও নোটস ({highlights.length + notes.length})
        </button>
      </div>

      {/* TAB 1: READING PROGRESS */}
      {activeTab === "progress" && (
        <div className="space-y-6">
          {latestProgress ? (
            <div className="rounded-3xl border border-emerald-500/30 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-emerald-500/20 dark:bg-stone-900/90">
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
                কুরআনের যেকোনো সূরা পড়ার সময় অগ্রগতি স্বয়ংক্রিয়ভাবে সংরক্ষিত হবে।
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

      {/* TAB 2: QURAN BOOKMARKS */}
      {activeTab === "quran" && (
        <div className="space-y-4">
          {bookmarks.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-white/40 p-12 text-center dark:border-stone-800 dark:bg-stone-900/40">
              <Heart className="mx-auto mb-3 h-10 w-10 text-stone-400" />
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
                কোনো কুরআন আয়াত বুকমার্ক করা হয়নি
              </h3>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="group rounded-3xl border border-stone-200/80 bg-white/90 p-5 shadow-sm backdrop-blur transition-all hover:border-emerald-300 dark:border-stone-800 dark:bg-stone-900/90"
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

      {/* TAB 3: HADITH BOOKMARKS */}
      {activeTab === "hadith" && (
        <div className="space-y-4">
          {hadithBookmarks.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-white/40 p-12 text-center dark:border-stone-800 dark:bg-stone-900/40">
              <Library className="mx-auto mb-3 h-10 w-10 text-stone-400" />
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
                কোনো হাদিস বুকমার্ক করা হয়নি
              </h3>
            </div>
          ) : (
            hadithBookmarks.map((hm) => (
              <div
                key={hm.id}
                className="group rounded-3xl border border-stone-200/80 bg-white/90 p-5 shadow-sm backdrop-blur transition-all hover:border-amber-300 dark:border-stone-800 dark:bg-stone-900/90"
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

      {/* TAB 4: HIGHLIGHTS & READER NOTES */}
      {activeTab === "annotations" && (
        <div className="space-y-6">
          {/* Highlights */}
          <div className="rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-900/90">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 mb-4">
              <Highlighter className="h-4 w-4 text-amber-500" />
              টেক্সট হাইলাইটসমূহ ({highlights.length})
            </h3>

            {highlights.length === 0 ? (
              <p className="text-xs text-stone-400 italic">এখনো কোনো পাঠ্য হাইলাইট করা হয়নি।</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {highlights.map((hl) => (
                  <div
                    key={hl.id}
                    className={`rounded-2xl border p-4 text-xs ${
                      hl.color === "yellow"
                        ? "border-yellow-300 bg-yellow-50/80 text-yellow-950 dark:bg-yellow-950/30 dark:text-yellow-100"
                        : hl.color === "green"
                        ? "border-emerald-300 bg-emerald-50/80 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100"
                        : hl.color === "blue"
                        ? "border-sky-300 bg-sky-50/80 text-sky-950 dark:bg-sky-950/30 dark:text-sky-100"
                        : hl.color === "purple"
                        ? "border-purple-300 bg-purple-50/80 text-purple-950 dark:bg-purple-950/30 dark:text-purple-100"
                        : "border-pink-300 bg-pink-50/80 text-pink-950 dark:bg-pink-950/30 dark:text-pink-100"
                    }`}
                  >
                    <p className="font-medium italic leading-relaxed">
                      &quot;{hl.text}&quot;
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-2 text-[10px] opacity-75">
                      <Link
                        href={`/stories/${hl.targetId}`}
                        className="font-bold underline hover:opacity-100"
                      >
                        গল্পে দেখুন →
                      </Link>
                      <button
                        onClick={(e) => deleteHighlight(hl.id, e)}
                        className="hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-900/90">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 mb-4">
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              ব্যক্তিগত মন্তব্য ও প্রতিফলনসমূহ ({notes.length})
            </h3>

            {notes.length === 0 ? (
              <p className="text-xs text-stone-400 italic">এখনো কোনো ব্যক্তিগত মন্তব্য বা নোট লিখা হয়নি।</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {notes.map((nt) => (
                  <div
                    key={nt.id}
                    className="rounded-2xl border border-stone-200 bg-stone-50/80 p-4 text-xs dark:border-stone-800 dark:bg-stone-800/80"
                  >
                    <span className="block font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                      📌 {nt.title || "নোট"}
                    </span>
                    <p className="leading-relaxed text-stone-800 dark:text-stone-200">
                      {nt.content}
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-2 text-[10px] text-stone-400 dark:border-stone-700">
                      <Link
                        href={`/stories/${nt.targetId}`}
                        className="font-bold text-emerald-600 hover:underline"
                      >
                        গল্পে দেখুন →
                      </Link>
                      <button
                        onClick={(e) => deleteNote(nt.id, e)}
                        className="hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <User className="h-5 w-5 text-emerald-600" />
                প্রোফাইল সম্পাদনা (Edit Profile)
              </h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {profileError && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">
                {profileError}
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  পুরো নাম (Full Name)
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="আপনার নাম লিখুন..."
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-2.5 text-xs font-medium focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  ইউজারনেম (Username / Handle)
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400" />
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_.-]/g, ""))}
                    placeholder="mahabub_abir"
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-2.5 pl-8 pr-3 text-xs font-medium focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
                  />
                </div>
                <p className="mt-1 text-[11px] text-stone-400">ইংরেজি ছোট হাতের অক্ষর, সংখ্যা ও _ ব্যবহার করুন।</p>
              </div>

              {/* Avatar Preset Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  প্রোফাইল অবতার নির্বাচন করুন (Preset Avatars)
                </label>
                <div className="flex gap-2.5 overflow-x-auto pb-2">
                  {PRESET_AVATARS.map((av) => (
                    <button
                      type="button"
                      key={av.id}
                      onClick={() => setEditAvatar(av.url)}
                      className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                        editAvatar === av.url ? "border-emerald-600 scale-105 shadow-md" : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img src={av.url} alt={av.label} className="h-full w-full object-cover" />
                      {editAvatar === av.url && (
                        <div className="absolute inset-0 flex items-center justify-center bg-emerald-600/40 text-white">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Avatar URL */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  অথবা নিজস্ব ইমেজ লিংক দিন (Custom Image URL)
                </label>
                <input
                  type="url"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-2.5 text-xs focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  বায়ো / ইসলামিক লক্ষ্য (Bio / Reading Goal)
                </label>
                <textarea
                  rows={2}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="প্রতিদিন সূরা মুলক পাঠ এবং হাদিস অধ্যয়ন..."
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-2.5 text-xs focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingProfile(false)}
                  className="rounded-xl text-xs"
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={profileSaving}
                  size="sm"
                  className="rounded-xl bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  {profileSaving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন (Save Changes)"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
