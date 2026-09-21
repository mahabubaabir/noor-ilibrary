"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Share2, Copy, Check, Sparkles, BookOpen, Loader2 } from "lucide-react"

function renderMarkdown(content: string) {
  if (!content) return ""
  return content
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl sm:text-3xl font-bold mt-8 mb-4 text-neutral-900 dark:text-neutral-100">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl sm:text-2xl font-bold mt-6 mb-3 text-neutral-900 dark:text-neutral-100">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">$1</h3>')
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-neutral-500 bg-neutral-50/50 dark:bg-neutral-950/20 px-4 py-3 my-4 italic text-neutral-950 dark:text-neutral-200 rounded-r-2xl">$1</blockquote>')
    .replace(/^\- (.*$)/gim, '<li class="ml-5 list-disc mb-1 text-neutral-700 dark:text-neutral-300">$1</li>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-neutral-900 dark:text-neutral-100">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
    .replace(/\n\n/gim, '<p class="my-4 leading-relaxed text-neutral-700 dark:text-neutral-300"></p>')
    .replace(/\n/gim, '<br/>')
}

interface BlogPost {
  slug: string
  title: string
  titleBn?: string | null
  excerpt?: string | null
  content: string
  category?: string | null
  createdAt: string
  author?: { name?: string | null } | null
}

export default function BlogPostReaderPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.post) setPost(d.post)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.titleBn || post.title,
        text: post.excerpt || undefined,
        url: window.location.href,
      }).catch(() => undefined)
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-600 dark:text-neutral-400" />
        <p className="text-sm text-neutral-500">প্রবন্ধ লোড হচ্ছে...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">প্রবন্ধটি খুঁজে পাওয়া যায়নি</h2>
        <p className="mt-2 text-sm text-neutral-500">হয়তো লিংকটি পরিবর্তন করা হয়েছে বা মুছে ফেলা হয়েছে।</p>
        <Link
          href="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-neutral-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-700"
        >
          <ArrowLeft className="h-4 w-4" /> ব্লগে ফিরে যান
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back Link */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-400"
        >
          <ArrowLeft className="h-4 w-4" /> ব্লগ তালিকায় ফিরে যান
        </Link>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-2xl border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-neutral-600" /> : <Share2 className="h-3.5 w-3.5" />}
          {copied ? "লিঙ্ক কপি হয়েছে" : "শেয়ার"}
        </button>
      </div>

      {/* Article Header */}
      <div className="mb-8 rounded-3xl border border-neutral-500/20 bg-gradient-to-b from-white via-neutral-50/20 to-white p-6 sm:p-10 shadow-sm dark:border-neutral-500/30 dark:from-neutral-900 dark:via-neutral-950/20 dark:to-neutral-900">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100/80 px-3 py-1 text-xs font-bold text-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-300">
          <Sparkles className="h-3.5 w-3.5" />
          {post.category}
        </span>

        <h1 className="mt-4 text-2xl font-extrabold text-neutral-900 sm:text-4xl dark:text-neutral-100">
          {post.titleBn || post.title}
        </h1>

        {post.titleBn && post.title && (
          <h2 className="mt-1 text-base text-neutral-500 dark:text-neutral-400">
            {post.title}
          </h2>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-neutral-100 pt-4 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4 text-neutral-600" /> {post.author?.name || "নূর সম্পাদকীয়"}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-neutral-600" /> {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <article className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-10 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div
          className="prose prose-emerald max-w-none text-base leading-relaxed text-neutral-800 dark:text-neutral-200"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />
      </article>
    </div>
  )
}
