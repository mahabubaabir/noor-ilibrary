"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Eye, Loader2, Sparkles } from "lucide-react"

const CATEGORIES = ["Quran Reflection", "Hadith Studies", "Spiritual Reminders", "Islamic History", "General"]

export default function NewBlogPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [titleBn, setTitleBn] = useState("")
  const [category, setCategory] = useState("Quran Reflection")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [preview, setPreview] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          titleBn,
          category,
          excerpt: excerpt || title,
          content,
          published,
        }),
      })

      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || "পোস্ট তৈরি করতে সমস্যা হয়েছে")
      } else {
        router.push("/admin")
      }
    } catch {
      setError("নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।")
    }
    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back Link */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-emerald-600 dark:text-stone-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" /> অ্যাডমিন ড্যাশবোর্ডে ফিরে যান
        </Link>
      </div>

      <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-8 shadow-xl dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-6 border-b border-stone-100 pb-4 dark:border-stone-800">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" /> নতুন ইসলামিক প্রবন্ধ রচনা
          </span>
          <h1 className="mt-2 text-2xl font-extrabold text-stone-900 dark:text-stone-100">
            Create New Blog Post
          </h1>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 p-4 text-xs font-bold text-red-600 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-stone-700 dark:text-stone-300">
                বাংলা শিরোনাম (Bengali Title)
              </label>
              <input
                type="text"
                placeholder="যেমন: কুরআনের আলোয় আলোকিত জীবন..."
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-stone-700 dark:text-stone-300">
                ইংরেজি শিরোনাম (English Title) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Transformative Power of the Quran"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-stone-700 dark:text-stone-300">
                ক্যাটাগরি (Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-stone-700 dark:text-stone-300">
                সংক্ষিপ্ত সারসংক্ষেপ (Short Excerpt)
              </label>
              <input
                type="text"
                placeholder="প্রবন্ধের ১-২ লাইনের সারসংক্ষেপ..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                প্রবন্ধের মূল বিষয়বস্তু (Markdown Content) *
              </label>
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400"
              >
                <Eye className="h-3.5 w-3.5" />
                {preview ? "এডিটর মোড (Edit)" : "প্রিভিউ দেখুন (Preview)"}
              </button>
            </div>

            {preview ? (
              <div className="min-h-[250px] rounded-2xl border border-stone-200 bg-stone-50 p-5 text-sm leading-relaxed dark:border-stone-800 dark:bg-stone-800/50">
                <p className="whitespace-pre-wrap">{content || "কোনো কনটেন্ট লেখা হয়নি..."}</p>
              </div>
            ) : (
              <textarea
                required
                rows={12}
                placeholder="এখানে Markdown ফরম্যাটে লিখুন (যেমন: # শিরোনাম, **বোল্ড**, > কোটেশন, - পয়েন্ট)..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 bg-white p-4 font-mono text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
              />
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
            <label className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              সরাসরি প্রকাশ করুন (Published)
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 disabled:opacity-50 active:scale-95"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              পোস্ট সংরক্ষণ করুন (Save Post)
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
