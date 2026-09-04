"use client"

import { useCallback, useEffect, useState } from "react"
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Loader2 } from "lucide-react"
import {
  RECITERS_LIST,
  audioManager,
  type AudioPlaybackState,
} from "@/lib/audio/audio-player-engine"

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
  const [playbackState, setPlaybackState] = useState<AudioPlaybackState>("idle")

  useEffect(() => {
    audioManager.setListeners({
      stateChange: (state) => {
        setPlaybackState(state)
        setPlaying(state === "playing" || state === "loading")
      },
      ended: () => {
        if (currentAyah < totalAyahs) {
          const nextAyah = currentAyah + 1
          setCurrentAyah(nextAyah)
          onAyahChange?.(nextAyah)
          audioManager.playAyah(surahNumber, nextAyah, reciter)
        } else {
          setPlaying(false)
          setCurrentAyah(0)
        }
      },
      error: () => {
        setPlaybackState("error")
        setPlaying(false)
      },
    })

    return () => {
      audioManager.stop()
    }
  }, [currentAyah, surahNumber, totalAyahs, reciter, onAyahChange])

  const togglePlay = useCallback(() => {
    if (playing) {
      audioManager.pause()
      setPlaying(false)
    } else {
      const startAyah = currentAyah === 0 ? 1 : currentAyah
      setCurrentAyah(startAyah)
      onAyahChange?.(startAyah)
      audioManager.playAyah(surahNumber, startAyah, reciter)
    }
  }, [playing, currentAyah, surahNumber, reciter, onAyahChange])

  const prev = () => {
    if (currentAyah > 1) {
      const prevAyah = currentAyah - 1
      setCurrentAyah(prevAyah)
      onAyahChange?.(prevAyah)
      audioManager.playAyah(surahNumber, prevAyah, reciter)
    }
  }

  const next = () => {
    if (currentAyah < totalAyahs) {
      const nextAyah = currentAyah + 1
      setCurrentAyah(nextAyah)
      onAyahChange?.(nextAyah)
      audioManager.playAyah(surahNumber, nextAyah, reciter)
    }
  }

  const handleMute = () => {
    const nextMute = !muted
    setMuted(nextMute)
    audioManager.setMute(nextMute)
  }

  const handleReciterChange = (newReciter: string) => {
    setReciter(newReciter)
    if (playing && currentAyah > 0) {
      audioManager.playAyah(surahNumber, currentAyah, newReciter)
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      {/* Reciter Selector */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          ক্বারী নির্বাচন করুন:
        </label>
        <select
          value={reciter}
          onChange={(e) => handleReciterChange(e.target.value)}
          className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-900 transition-all focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
        >
          {RECITERS_LIST.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nameBn} ({r.nameEn})
            </option>
          ))}
        </select>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-900">
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={currentAyah <= 1}
            title="পূর্ববর্তী আয়াত"
            className="rounded-xl border border-neutral-200 p-2.5 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black disabled:opacity-30 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <button
            onClick={togglePlay}
            disabled={playbackState === "loading" && !playing}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            {playbackState === "loading" ? (
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
            className="rounded-xl border border-neutral-200 p-2.5 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black disabled:opacity-30 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
          >
            <SkipForward className="h-4 w-4" />
          </button>
        </div>

        {/* Current status display */}
        <div className="text-center">
          {playbackState === "error" ? (
            <span className="text-[11px] font-bold text-red-500">অডিও লোড ব্যর্থ</span>
          ) : currentAyah > 0 ? (
            <div className="text-xs font-bold text-neutral-900 dark:text-white font-mono">
              আয়াত {currentAyah} / {totalAyahs}
            </div>
          ) : (
            <span className="text-xs text-neutral-600 dark:text-neutral-300">সম্পূর্ণ সূরা শুনুন</span>
          )}
        </div>

        {/* Mute Button */}
        <button
          onClick={handleMute}
          title={muted ? "আনমিউট করুন" : "মিউট করুন"}
          className="rounded-xl border border-neutral-200 p-2.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-black dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
        >
          {muted ? <VolumeX className="h-4 w-4 text-red-500" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
