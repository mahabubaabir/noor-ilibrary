'use client'

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from 'react'
import type { TafsirChapter, TranslationLanguage } from '@noor/types'
import { Card, CardBody } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

interface TafsirPanelProps {
  surahNumber: number
  totalAyahs: number
}

export function TafsirPanel({ surahNumber, totalAyahs }: TafsirPanelProps) {
  const [lang, setLang] = useState<TranslationLanguage>('en')
  const [data, setData] = useState<TafsirChapter | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [openAyah, setOpenAyah] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setData(null)
    setOpenAyah(null)

    fetch(`/api/tafsir/${surahNumber}?lang=${lang}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Tafsir API ${res.status}`)
        const json = await res.json()
        if (!cancelled) setData(json.tafsir)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load tafsir')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [surahNumber, lang])

  return (
    <Card className="mt-6">
      <CardBody>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Tafsir (Explanation)</h2>
          <Select
            value={lang}
            onChange={(e) => setLang(e.target.value as TranslationLanguage)}
            aria-label="Tafsir language"
            className="w-56"
          >
            <option value="en">Ibn Kathir (English)</option>
            <option value="bn">Ahsanul Bayaan (Bangla)</option>
          </Select>
        </div>

        {loading && (
          <div className="flex items-center gap-2 py-8 text-stone-500 dark:text-stone-400">
            <Spinner className="size-4" />
            <span className="text-sm">Loading tafsir…</span>
          </div>
        )}

        {error && (
          <p className="py-4 text-sm text-amber-600 dark:text-amber-400">
            {error}
          </p>
        )}

        {data && !loading && (
          <>
            <p className="mt-2 text-xs text-stone-400">
              Source: {data.source}
            </p>
            <div className="mt-4 space-y-2">
              {Array.from({ length: totalAyahs }, (_, i) => i + 1).map((ayahNum) => {
                const text = data.entries[ayahNum]
                const isOpen = openAyah === ayahNum
                return (
                  <div key={ayahNum} className="border-b border-stone-100 last:border-0 dark:border-stone-800">
                    <button
                      type="button"
                      onClick={() => setOpenAyah(isOpen ? null : ayahNum)}
                      className={cn(
                        'flex w-full items-center justify-between py-3 text-left text-sm font-medium transition-colors',
                        isOpen ? 'text-emerald-700 dark:text-emerald-400' : 'text-stone-700 hover:text-stone-900 dark:text-stone-200 dark:hover:text-stone-100',
                      )}
                    >
                      <span>Ayah {ayahNum}</span>
                      <span className="text-xs text-stone-400">{isOpen ? '▲' : '▼'}</span>
                    </button>
                    {isOpen && (
                      <div className="pb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                        {text ? (
                          <div dangerouslySetInnerHTML={{ __html: text }} />
                        ) : (
                          <span className="italic text-stone-400">Tafsir not available for this ayah.</span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </CardBody>
    </Card>
  )
}