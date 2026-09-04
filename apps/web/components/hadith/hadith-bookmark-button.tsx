"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

interface HadithBookmarkButtonProps {
  collection: string
  hadithNumber: number
  text?: string
}

export function HadithBookmarkButton({ collection, hadithNumber, text }: HadithBookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggle = async () => {
    setLoading(true)
    try {
      if (bookmarked) {
        const res = await fetch("/api/library/hadith-bookmarks", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ collection, hadithNumber }),
        })
        if (res.status === 401) {
          const redirect = encodeURIComponent(window.location.pathname + window.location.search)
          window.location.href = `/login?redirect=${redirect}&intent=hadith`
          return
        }
        setBookmarked(false)
      } else {
        const res = await fetch("/api/library/hadith-bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ collection, hadithNumber, text }),
        })
        if (res.status === 401) {
          const redirect = encodeURIComponent(window.location.pathname + window.location.search)
          window.location.href = `/login?redirect=${redirect}&intent=hadith`
          return
        }
        if (res.ok) {
          setBookmarked(true)
        }
      }
    } catch {}
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={bookmarked ? "বুকমার্ক মুছে ফেলুন" : "হাদিস বুকমার্ক করুন"}
      className={`rounded-xl p-2 transition-all ${
        bookmarked
          ? "border border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black"
          : "border border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-black dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white"
      }`}
    >
      <Heart className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
    </button>
  )
}
