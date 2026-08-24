"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Newspaper, Search, Sparkles, ArrowRight, Calendar, User, BookOpen } from "lucide-react"

const CATEGORIES = ["All", "Quran Reflection", "Hadith Studies", "Spiritual Reminders", "General"]

export default function BlogListingPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [search, setSearch] = useState("")

  useEffect(() => {
    setLoading(true)
    let url = "/api/blog"
    const params = new URLSearchParams()
    if (selectedCategory !== "All") params.set("category", selectedCategory)
    if (search.trim()) params.set("search", search.trim())
    if (params.toString()) url += `?${params.toString()}`

    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        setPosts(d.posts || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [selectedCategory, search])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Blog Hero */}
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 via-emerald-800/5 to-amber-500/5 p-6 sm:p-8 dark:border-emerald-500/30 dark:from-emerald-950/40 dark:via-stone-900/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              ইসলামিক প্রবন্ধ ও গবেষণা (Articles & Blog)
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
              Noor Islamic Blog
            </h1>
            <p className="mt-1 max-w-xl text-sm text-stone-600 dark:text-stone-400">
              Deepen your Islamic knowledge through curated articles on Quranic contemplation, Hadith authenticity, and daily spiritual life.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-white/80 p-4 text-center backdrop-blur dark:border-emerald-500/30 dark:bg-stone-900/80">
            <span className="block text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              {posts.length}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">প্রকাশিত প্রবন্ধ</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 rounded-2xl bg-stone-100 p-1 dark:bg-stone-800/80">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-white text-emerald-800 shadow-sm dark:bg-stone-900 dark:text-emerald-400"
                  : "text-stone-600 hover:text-stone-900 dark:text-stone-400"
              }`}
            >
              {cat === "All" ? "সকল (All)" : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="প্রবন্ধ খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white py-2 pl-10 pr-4 text-xs text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
          />
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 animate-pulse rounded-3xl bg-stone-200/70 dark:bg-stone-800/70" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white/40 p-12 text-center dark:border-stone-800 dark:bg-stone-900/40">
          <Newspaper className="mx-auto mb-3 h-8 w-8 text-stone-400" />
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">কোনো প্রবন্ধ পাওয়া যায়নি</h3>
          <p className="mt-1 text-xs text-stone-500">অন্য কোনো ক্যাটাগরি বা কিওয়ার্ড দিয়ে অনুসন্ধান করুন।</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-bold leading-snug text-stone-900 transition-colors group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400">
                    {post.titleBn || post.title}
                  </h2>

                  {post.titleBn && post.title && (
                    <p className="mt-1 text-xs text-stone-400">{post.title}</p>
                  )}

                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4 text-xs font-semibold text-stone-500 dark:border-stone-800 dark:text-stone-400">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {post.author?.name || "নূর সম্পাদকীয়"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 group-hover:underline dark:text-emerald-400">
                    সম্পূর্ণ পড়ুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
