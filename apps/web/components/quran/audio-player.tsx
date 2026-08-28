"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Loader2, RefreshCw } from "lucide-react"
import { RECITERS_LIST, getAyahAudioSources } from "@/lib/audio/audio-player-engine"

interface AudioPlayerProps {
  surahNumber: number
  totalAyahs: number
  reciter?: string
  onAyahChange?: (ayah: number) => void
}

export function AudioPlayer({
  surahNumber,
  totalAyahs,
  reciter: initialReciter = "ar.alafasy",
  onAyahChange,
}: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [currentAyah, setCurrentAyah] = useState(0)
  const [reciter, setReciter] = useState(initialReciter)
  const [muted, setMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!playing || currentAyah === 0) return

    setIsLoading(true)
    setHasError(false)

    const sources = getAyahAudioSources(surahNumber, currentAyah, reciter)
    const audio = new Audio(sources.primary)
    audioRef.current = audio
    audio.volume = muted ? 0 : 1

    audio.oncanplay = () => {
      setIsLoading(false)
    }

    audio.onerror = () => {
      // If primary CDN fails, switch to EveryAyah reciter folder
      if (audio.src !== sources.fallback) {
        audio.src = sources.fallback
        audio.play().catch(() => {
          // If secondary fallback fails, try default Alafasy fallback
          if (audio.src !== sources.altFallback) {
            audio.src = sources.altFallback
            audio.play().catch(() => {
              setIsLoading(false)
              setHasError(true)
              setPlaying(false)
            })
          } else {
            setIsLoading(false)
            setHasError(true)
            setPlaying(false)
          }
        })
      } else {
        setIsLoading(false)
        setHasError(true)
        setPlaying(false)
      }
    }

    audio.play().catch(() => {
      setIsLoading(false)
      setPlaying(false)
    })

    audio.onended = () => {
      if (currentAyah < totalAyahs) {
        const nextAyah = currentAyah + 1
        setCurrentAyah(nextAyah)
        onAyahChange?.(nextAyah)
      } else {
        setPlaying(false)
        setCurrentAyah(0)
      }
    }

    return () => {
      audio.pause()
      audio.onended = null
      audio.onerror = null
      audioRef.current = null
    }
  }, [currentAyah, surahNumber, totalAyahs, playing, muted, reciter, onAyahChange])

  const togglePlay = useCallback(() => {
    if (playing) {
      audioRef.current?.pause()
      setPlaying(false)
    } else {
      const startAyah = currentAyah === 0 ? 1 : currentAyah
      setCurrentAyah(startAyah)
      onAyahChange?.(startAyah)
      setPlaying(true)
    }
  }, [playing, currentAyah, onAyahChange])

  const prev = () => {
    if (currentAyah > 1) {
      const prevAyah = currentAyah - 1
      setCurrentAyah(prevAyah)
      onAyahChange?.(prevAyah)
    }
  }

  const next = () => {
    if (currentAyah < totalAyahs) {
      const nextAyah = currentAyah + 1
      setCurrentAyah(nextAyah)
      onAyahChange?.(nextAyah)
    }
  }

  return (
    <div className="rounded-3xl border border-stone-200/80 bg-white/90 p-5 shadow-lg backdrop-blur-xl dark:border-stone-800/80 dark:bg-stone-900/90">
      {/* Reciter Selector */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <label className="text-xs font-bold text-stone-500 dark:text-stone-400">
          ক্বারী নির্বাচন করুন:
        </label>
        <select
          value={reciter}
          onChange={(e) => {
            setReciter(e.target.value)
            if (playing && audioRef.current) {
              audioRef.current.pause()
              setPlaying(true)
            }
          }}
          className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-800 transition-all focus:border-emerald-500 focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
        >
          {RECITERS_LIST.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nameBn} ({r.nameEn})
            </option>
          ))}
        </select>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-2 border-t border-stone-100 pt-3 dark:border-stone-800">
        <div className="flex items-center gap-1.5">
          <button
            onClick={prev}
            disabled={currentAyah <= 1}
            title="পূর্ববর্তী আয়াত"
            className="rounded-xl p-2.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 disabled:opacity-30 dark:hover:bg-stone-800 dark:text-stone-400"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <button
            onClick={togglePlay}
            disabled={isLoading && !playing}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : playing ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={next}
            disabled={currentAyah >= totalAyahs}
            title="পরবর্তী আয়াত"
            className="rounded-xl p-2.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 disabled:opacity-30 dark:hover:bg-stone-800 dark:text-stone-400"
          >
            <SkipForward className="h-4 w-4" />
          </button>
        </div>

        {/* Current status display */}
        <div className="text-right">
          {hasError ? (
            <span className="text-[11px] font-bold text-red-500">অডিও লোড ব্যর্থ</span>
          ) : currentAyah > 0 ? (
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              আয়াত {currentAyah} / {totalAyahs}
            </div>
          ) : (
            <span className="text-xs text-stone-400">সম্পূর্ণ সূরা শুনুন</span>
          )}
        </div>

        {/* Mute Button */}
        <button
          onClick={() => setMuted(!muted)}
          title={muted ? "আনমিউট করুন" : "মিউট করুন"}
          className="rounded-xl p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-300"
        >
          {muted ? <VolumeX className="h-4 w-4 text-red-500" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
