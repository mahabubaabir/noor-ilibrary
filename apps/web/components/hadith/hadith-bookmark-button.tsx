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
        await fetch("/api/library/hadith-bookmarks", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ collection, hadithNumber }),
        })
        setBookmarked(false)
      } else {
        await fetch("/api/library/hadith-bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ collection, hadithNumber, text }),
        })
        setBookmarked(true)
      }
    } catch {}
    setLoading(false)
  }

  return (
    <button onClick={toggle} disabled={loading} title={bookmarked ? "Remove bookmark" : "Add bookmark"}
      className={`rounded-xl p-2 transition-all ${bookmarked ? "bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400" : "text-stone-400 hover:bg-stone-100 hover:text-stone-600 dark:hover:bg-stone-800"}`}>
      <Heart className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
    </button>
  )
}
