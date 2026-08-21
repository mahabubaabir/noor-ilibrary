'use client'

import { useEffect, useRef, useState } from 'react'
import type { Ayah, Reciter } from '@noor/types'
import { audioUrl, DEFAULT_RECITER } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, RepeatIcon } from '@/components/icons'
import { cn } from '@/lib/utils'
import type { PlayRequest } from './surah-viewer'

export type RepeatMode = 'none' | 'verse' | 'surah'

interface AudioPlayerProps {
  ayahs: Ayah[]
  reciters: Reciter[]
  initialAyah?: number
  playRequest?: PlayRequest | null
  onCurrentChange?: (globalNumber: number | null) => void
}

export function AudioPlayer({
  ayahs,
  reciters,
  initialAyah,
  playRequest,
  onCurrentChange,
}: AudioPlayerProps) {
  const [index, setIndex] = useState<number | null>(() => {
    if (initialAyah == null) return null
    const found = ayahs.findIndex((a) => a.numberInSurah === initialAyah)
    return found >= 0 ? found : null
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [repeat, setRepeat] = useState<RepeatMode>('none')
  const [reciterId, setReciterId] = useState(DEFAULT_RECITER)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const current = index != null ? ayahs[index] : undefined

  useEffect(() => {
    if (!playRequest) return
    const nextIndex = ayahs.findIndex((a) => a.globalNumber === playRequest.globalNumber)
    if (nextIndex >= 0) playAt(nextIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playRequest?.nonce])

  function notify(nextIndex: number | null) {
    const global = nextIndex != null ? ayahs[nextIndex]?.globalNumber ?? null : null
    onCurrentChange?.(global)
  }

  function playAt(nextIndex: number | null) {
    setIndex(nextIndex)
    notify(nextIndex)
    const audio = audioRef.current
    if (nextIndex == null || !audio) {
      setIsPlaying(false)
      return
    }
    const next = ayahs[nextIndex]
    if (!next) return
    audio.src = audioUrl(reciterId, next.globalNumber)
    void audio.play().catch(() => setIsPlaying(false))
    setIsPlaying(true)
  }

  function togglePlay() {
    if (index == null) {
      playAt(0)
      return
    }
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      void audio.play().catch(() => undefined)
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  function handleEnded() {
    if (index == null) return
    if (repeat === 'verse') {
      playAt(index)
      return
    }
    if (index < ayahs.length - 1) {
      playAt(index + 1)
      return
    }
    if (repeat === 'surah') {
      playAt(0)
      return
    }
    setIsPlaying(false)
    setIndex(null)
    notify(null)
  }

  function onReciterChange(id: string) {
    setReciterId(id)
    const audio = audioRef.current
    if (index != null && audio) {
      audio.src = audioUrl(id, ayahs[index]!.globalNumber)
      if (isPlaying) void audio.play().catch(() => undefined)
    }
  }

  const repeatLabels: Record<RepeatMode, string> = {
    none: 'Repeat off',
    verse: 'Repeat verse',
    surah: 'Repeat surah',
  }

  return (
    <div className="sticky bottom-0 z-30 border-t border-stone-200 bg-white/95 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => playAt(index != null ? index - 1 : null)} disabled={index == null || index <= 0} aria-label="Previous verse">
            <PrevIcon className="size-4" />
          </Button>
          <Button variant="primary" size="sm" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => playAt(index != null ? index + 1 : 0)} disabled={index != null && index >= ayahs.length - 1} aria-label="Next verse">
            <NextIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setRepeat(repeat === 'none' ? 'verse' : repeat === 'verse' ? 'surah' : 'none')}
            aria-label={repeatLabels[repeat]}
            title={repeatLabels[repeat]}
            className={cn(repeat !== 'none' && 'text-emerald-700 dark:text-emerald-400')}
          >
            <RepeatIcon className="size-4" />
          </Button>
        </div>

        <div className="min-w-0 flex-1 text-sm text-stone-600 dark:text-stone-300">
          {current ? (
            <span>
              {current.surahNumber}:{current.numberInSurah}
              <span className="text-stone-400"> · juz {current.juz}</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => playAt(0)}
              className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
            >
              Play entire surah ▸
            </button>
          )}
        </div>

        <audio
          ref={audioRef}
          onEnded={handleEnded}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          preload="none"
        />

        <Select
          value={reciterId}
          onChange={(e) => onReciterChange(e.target.value)}
          className="max-w-56 py-1.5 text-xs"
          aria-label="Reciter"
        >
          {reciters.map((reciter) => (
            <option key={reciter.id} value={reciter.id}>
              {reciter.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}