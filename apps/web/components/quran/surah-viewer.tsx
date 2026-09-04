'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { SurahDetail } from '@noor/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { CheckIcon, CopyIcon, PlayIcon, ShareIcon } from '@/components/icons'
import { AudioPlayer } from './audio-player'
import { TafsirPanel } from './tafsir-panel'
import { cn } from '@/lib/utils'

export type ViewMode = 'ar+en' | 'ar+bn' | 'ar' | 'en' | 'bn'

const MODE_LABELS: Record<ViewMode, string> = {
  'ar+en': 'Arabic + English',
  'ar+bn': 'Arabic + Bangla',
  ar: 'Arabic only',
  en: 'English only',
  bn: 'Bangla only',
}

export interface PlayRequest {
  globalNumber: number
  nonce: number
}

interface SurahViewerProps {
  surah: SurahDetail
  initialAyah?: number
  reciters: { id: string; name: string }[]
}

export function SurahViewer({ surah, initialAyah, reciters }: SurahViewerProps) {
  const router = useRouter()
  const { meta, ayahs } = surah
  const [mode, setMode] = useState<ViewMode>('ar+en')
  const [playingGlobal, setPlayingGlobal] = useState<number | null>(null)
  const [playRequest, setPlayRequest] = useState<PlayRequest | null>(null)

  useEffect(() => {
    if (initialAyah == null) return
    const el = document.getElementById(`ayah-${initialAyah}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [initialAyah])

  function buildCopy(numberInSurah: number): string {
    const ayah = ayahs.find((a) => a.numberInSurah === numberInSurah)
    if (!ayah) return ''
    return [
      ayah.textArabic,
      ayah.translationEn,
      ayah.translationBn,
      `— Surah ${meta.nameEnglish} ${meta.number}:${ayah.numberInSurah}`,
    ].join('\n\n')
  }

  async function copyAyah(numberInSurah: number) {
    try {
      await navigator.clipboard.writeText(buildCopy(numberInSurah))
    } catch {
      /* clipboard unavailable */
    }
  }

  async function shareAyah(numberInSurah: number) {
    const text = buildCopy(numberInSurah)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${meta.nameEnglish} ${meta.number}:${numberInSurah}`,
          text,
        })
      } catch {
        /* user cancelled */
      }
    } else if (navigator.clipboard) {
      await copyAyah(numberInSurah)
    }
  }

  async function saveBookmark(numberInSurah: number): Promise<boolean> {
    const ayah = ayahs.find((item) => item.numberInSurah === numberInSurah)
    if (!ayah) return false
    const res = await fetch('/api/library/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surahNumber: meta.number,
        ayahNumber: ayah.numberInSurah,
        surahName: meta.nameEnglish,
        textArabic: ayah.textArabic,
        translationEn: ayah.translationEn,
        translationBn: ayah.translationBn,
      }),
    })
    if (res.status === 401) router.push('/login')
    return res.ok
  }

  async function saveProgress(numberInSurah: number): Promise<boolean> {
    const res = await fetch('/api/library/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ surahNumber: meta.number, ayahNumber: numberInSurah }),
    })
    if (res.status === 401) router.push('/login')
    return res.ok
  }

  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 pt-8">
        <p className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">
          Surah {meta.number} · {meta.revelationType} · {meta.ayahCount} ayahs
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="arabic text-4xl text-neutral-900 sm:text-5xl dark:text-white">
              {meta.nameArabic}
            </h1>
            <p className="mt-2 text-lg font-medium text-neutral-800 dark:text-neutral-200">
              {meta.nameEnglish}
              <span className="text-neutral-400"> — {meta.nameTranslation}</span>
            </p>
          </div>
          <Select
            value={mode}
            onChange={(e) => setMode(e.target.value as ViewMode)}
            aria-label="Display mode"
          >
            {(Object.keys(MODE_LABELS) as ViewMode[]).map((m) => (
              <option key={m} value={m}>
                {MODE_LABELS[m]}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        {ayahs.map((ayah) => (
          <AyahBlock
            key={ayah.numberInSurah}
            ayah={ayah}
            meta={meta}
            mode={mode}
            isPlaying={playingGlobal === ayah.globalNumber}
            onCopy={() => void copyAyah(ayah.numberInSurah)}
            onShare={() => void shareAyah(ayah.numberInSurah)}
            onBookmark={() => saveBookmark(ayah.numberInSurah)}
            onProgress={() => saveProgress(ayah.numberInSurah)}
            onPlay={() => setPlayRequest({ globalNumber: ayah.globalNumber, nonce: Date.now() })}
          />
        ))}
      </div>

      <div className="mx-auto max-w-3xl px-4">
        <TafsirPanel surahNumber={meta.number} />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6">
        <AudioPlayer surahNumber={meta.number} totalAyahs={meta.ayahCount} />
      </div>
    </div>
  )
}

interface AyahBlockProps {
  ayah: SurahDetail['ayahs'][number]
  meta: SurahDetail['meta']
  mode: ViewMode
  isPlaying: boolean
  onPlay: () => void
  onCopy: () => void
  onShare: () => void
  onBookmark: () => Promise<boolean>
  onProgress: () => Promise<boolean>
}

function AyahBlock({
  ayah,
  meta,
  mode,
  isPlaying,
  onPlay,
  onCopy,
  onShare,
  onBookmark,
  onProgress,
}: AyahBlockProps) {
  const [copied, setCopied] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [progressSaved, setProgressSaved] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <section
      id={`ayah-${ayah.numberInSurah}`}
      className={cn(
        'scroll-mt-20 rounded-2xl border border-neutral-200 bg-white p-5 transition-colors dark:border-neutral-800 dark:bg-neutral-950',
        isPlaying &&
          'border-neutral-900/60 bg-neutral-100 dark:border-neutral-100/40 dark:bg-neutral-900',
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-lg border border-neutral-300 font-semibold text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
          {ayah.numberInSurah}
        </span>
        <div className="flex items-center gap-1">
          {ayah.sajda && (
            <Badge className="bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">سجدة</Badge>
          )}
          <Button variant="ghost" size="sm" onClick={onPlay} aria-label="Play this verse">
            <PlayIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onCopy()
              setCopied(true)
            }}
            aria-label="Copy verse"
          >
            {copied ? (
              <CheckIcon className="size-4 text-neutral-900 dark:text-white" />
            ) : (
              <CopyIcon className="size-4" />
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={onShare} aria-label="Share verse">
            <ShareIcon className="size-4" />
          </Button>
        </div>
      </div>

      {(mode === 'ar' || mode === 'ar+en' || mode === 'ar+bn') && (
        <p
          className="arabic text-right text-2xl text-neutral-900 sm:text-3xl dark:text-white"
          dir="rtl"
        >
          {ayah.textArabic}
        </p>
      )}
      {(mode === 'en' || mode === 'ar+en') && (
        <p className="mt-3 text-neutral-700 dark:text-neutral-300">{ayah.translationEn}</p>
      )}
      {(mode === 'bn' || mode === 'ar+bn') && (
        <p className="bengali mt-3 leading-relaxed text-neutral-700 dark:text-neutral-300">
          {ayah.translationBn}
        </p>
      )}

      <p className="mt-3 text-xs text-neutral-400">
        {meta.nameEnglish} {meta.number}:{ayah.numberInSurah} · juz {ayah.juz} · page {ayah.page}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            void onBookmark().then(setBookmarked)
          }}
        >
          {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            void onProgress().then(setProgressSaved)
          }}
        >
          {progressSaved ? 'Progress saved' : 'Mark progress'}
        </Button>
      </div>
    </section>
  )
}

export function SurahBackLink({ surahNumber }: { surahNumber: number }) {
  return (
    <Link
      href={`/quran/${surahNumber}`}
      className="inline-flex items-center gap-1 text-sm text-neutral-900 hover:underline dark:text-white"
    >
      ← Back to surah
    </Link>
  )
}
