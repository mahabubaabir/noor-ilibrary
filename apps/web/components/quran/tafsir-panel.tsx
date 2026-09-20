"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { htmlToText } from "@/lib/tafsir-text"

export function TafsirPanel({ surahNumber }: { surahNumber: number }) {
  const [open, setOpen] = useState(false)
  const [entries, setEntries] = useState<Record<number, string>>({})
  const [source, setSource] = useState("")
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  const toggle = async () => {
    if (!open && Object.keys(entries).length === 0 && !failed) {
      setLoading(true)
      try {
        const r = await fetch(`/api/tafsir/${surahNumber}?lang=en`)
        const d = await r.json()
        if (!r.ok) throw new Error(d.error || "Failed to load tafsir")
        const raw = (d?.tafsir?.entries ?? {}) as Record<string, string>
        const cleaned: Record<number, string> = {}
        for (const [key, value] of Object.entries(raw)) {
          const ayah = Number(key)
          const text = htmlToText(value || "")
          if (Number.isInteger(ayah) && text) cleaned[ayah] = text
        }
        setEntries(cleaned)
        setSource(typeof d?.tafsir?.source === "string" ? d.tafsir.source : "")
      } catch {
        setFailed(true)
      }
      setLoading(false)
    }
    setOpen(!open)
  }

  const verseNumbers = Object.keys(entries)
    .map(Number)
    .sort((a, b) => a - b)

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <button
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between p-4 text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
      >
        <span>Tafsir{source ? ` — ${source}` : ""}</span>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && (
        <div className="border-t border-neutral-200 px-4 pb-4 dark:border-neutral-800">
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-neutral-900 dark:text-white" />
            </div>
          ) : failed ? (
            <p className="pt-4 text-sm text-neutral-500 dark:text-neutral-400">
              Tafsir could not be loaded right now.
            </p>
          ) : verseNumbers.length === 0 ? (
            <p className="pt-4 text-sm text-neutral-500 dark:text-neutral-400">Tafsir not available.</p>
          ) : (
            <div className="max-h-[28rem] space-y-4 overflow-y-auto pt-4">
              {verseNumbers.map((n) => (
                <div key={n}>
                  <p className="mb-1 text-xs font-semibold text-neutral-900 dark:text-white">
                    Verse {n}
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {entries[n]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
