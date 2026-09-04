"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"

export function TafsirPanel({ surahNumber }: { surahNumber: number }) {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const toggle = async () => {
    if (!open && !content) {
      setLoading(true)
      try {
        const r = await fetch(`https://quran.com/api/qtls/v4/tafsirs/1?surah=${surahNumber}`, {
          headers: { "User-Agent": "Mozilla/5.0" },
        })
        const d = await r.json()
        const t = d?.tafsirs?.[0]?.text
        setContent(typeof t === "string" ? t : "Tafsir not available")
      } catch {
        setContent("Failed to load tafsir")
      }
      setLoading(false)
    }
    setOpen(!open)
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <button onClick={toggle} className="flex w-full items-center justify-between p-4 text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white">
        <span>Tafsir - Ibn Kathir</span>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && (
        <div className="border-t border-neutral-200 px-4 pb-4 dark:border-neutral-800">
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-neutral-900 dark:text-white" />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none pt-4 text-neutral-700 dark:text-neutral-300" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br/>") }} />
          )}
        </div>
      )}
    </div>
  )
}
