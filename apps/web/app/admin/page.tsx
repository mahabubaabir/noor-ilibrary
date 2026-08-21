"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ShieldAlert,
  Users,
  Heart,
  Library,
  Newspaper,
  Plus,
  ArrowRight,
  TrendingUp,
  Loader2,
  Trash2,
  Edit3,
  CheckCircle2,
} from "lucide-react"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any | null>(null)
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [recentPosts, setRecentPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadStats = () => {
    setLoading(true)
    fetch("/api/admin/stats")
      .then((r) => {
        if (r.status === 403 || r.status === 401) {
          throw new Error("অ্যাডমিন অ্যাক্সেস প্রয়োজন (Admin access required)")
        }
        return r.json()
      })
      .then((d) => {
        if (d.error) throw new Error(d.error)
        setStats(d.stats)
        setRecentUsers(d.recentUsers || [])
        setRecentPosts(d.recentPosts || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    loadStats()
  }, [])

  const deletePost = async (slug: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই পোস্টটি মুছে ফেলতে চান?")) return
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" })
      if (res.ok) {
        setRecentPosts((prev) => prev.filter((p) => p.slug !== slug))
      }
    } catch {
      // Ignored
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600 dark:text-amber-400" />
        <p className="text-sm text-stone-500">অ্যাডমিন ড্যাশবোর্ড লোড হচ্ছে...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">{error}</h2>
        <p className="mt-2 text-xs leading-relaxed text-stone-500">
          এই পেজটি শুধুমাত্র অনুমোদিত অ্যাডমিন ব্যবহারকারীদের জন্য উন্মুক্ত।
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
        >
          অ্যাডমিন একাউন্টে সাইন ইন করুন
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Admin Hero Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-stone-900/5 to-emerald-500/5 p-6 sm:p-8 dark:border-amber-500/30 dark:from-stone-900 dark:via-amber-950/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 dark:bg-amber-900/40 dark:text-amber-300">
              অ্যাডমিন কন্ট্রোল প্যানেল (Admin Panel)
            </span>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
              Noor Platform Management
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Manage blog posts, view registered users, and audit platform engagement.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all active:scale-95"
            >
              <Plus className="h-4 w-4" /> নতুন পোস্ট লিখুন (New Post)
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div className="rounded-2xl border border-stone-200/80 bg-white/80 p-4 backdrop-blur dark:border-stone-800 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-stone-900 dark:text-stone-100">
              {stats?.totalUsers ?? 0}
            </span>
            <span className="text-xs text-stone-500">মোট ইউজার</span>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-white/80 p-4 backdrop-blur dark:border-emerald-500/20 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              {stats?.totalBookmarks ?? 0}
            </span>
            <span className="text-xs text-stone-500">কুরআন বুকমার্ক</span>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-white/80 p-4 backdrop-blur dark:border-amber-500/20 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-amber-600 dark:text-amber-400">
              {stats?.totalHadithBookmarks ?? 0}
            </span>
            <span className="text-xs text-stone-500">হাদিস বুকমার্ক</span>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-white/80 p-4 backdrop-blur dark:border-blue-500/20 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats?.totalPosts ?? 0}
            </span>
            <span className="text-xs text-stone-500">প্রকাশিত প্রবন্ধ</span>
          </div>

          <div className="rounded-2xl border border-purple-500/20 bg-white/80 p-4 backdrop-blur dark:border-purple-500/20 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats?.activeReaders ?? 0}
            </span>
            <span className="text-xs text-stone-500">অ্যাক্টিভ পাঠক</span>
          </div>
        </div>
      </div>

      {/* Main Management Sections */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Posts Management (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              সাম্প্রতিক ব্লগ পোস্টসমূহ (Recent Posts)
            </h2>
            <Link
              href="/admin/posts/new"
              className="text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              + নতুন পোস্ট যোগ করুন
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-300 p-8 text-center dark:border-stone-800">
              <p className="text-xs text-stone-400">কোনো ব্লগ পোস্ট তৈরি করা হয়নি।</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                        {p.category}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="mt-1 font-bold text-stone-900 dark:text-stone-100 text-sm truncate">
                      {p.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 pl-3">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => deletePost(p.slug)}
                      className="rounded-xl p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Users List (1 col) */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            নিবন্ধিত সদস্যবৃন্দ (Users)
          </h2>
          <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 divide-y divide-stone-100 dark:divide-stone-800">
            {recentUsers.map((u) => (
              <div key={u.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                    {u.name || "নামহীন ব্যবহারকারী"}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      u.role === "admin"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                        : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                    }`}
                  >
                    {u.role}
                  </span>
                </div>
                <p className="text-[11px] text-stone-400">{u.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
