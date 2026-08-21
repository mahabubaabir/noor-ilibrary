"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

interface AudioPlayerProps {
  surahNumber: number
  totalAyahs: number
  reciter?: string
}

const reciters = [
  { name: "Mishary Alafasy", id: "ar.alafasy" },
  { name: "Abdul Rahman As-Sudais", id: "ar.abdurrahmaanassudais" },
  { name: "Abu Bakr Al Shatri", id: "ar.abubakrasshatri" },
]

export function AudioPlayer({ surahNumber, totalAyahs, reciter: initialReciter = "ar.alafasy" }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [currentAyah, setCurrentAyah] = useState(0)
  const [reciter, setReciter] = useState(initialReciter)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!playing || currentAyah === 0) return
    const src = `https://cdn.islamic.network/quran/audio/128/${reciter}/${String(currentAyah).padStart(6, "0")}.mp3`
    const audio = new Audio(src)
    audioRef.current = audio
    audio.volume = muted ? 0 : 1
    audio.play().catch(() => {})
    audio.onended = () => {
      if (currentAyah < totalAyahs) setCurrentAyah(currentAyah + 1)
      else setPlaying(false)
    }
    return () => { audio.pause(); audioRef.current = null }
  }, [currentAyah, reciter, totalAyahs, playing, muted])

  const togglePlay = useCallback(() => {
    if (playing) { audioRef.current?.pause(); setPlaying(false) }
    else { setCurrentAyah(1); setPlaying(true) }
  }, [playing])

  const prev = () => { if (currentAyah > 1) setCurrentAyah(currentAyah - 1) }
  const next = () => { if (currentAyah < totalAyahs) setCurrentAyah(currentAyah + 1) }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
      <div className="mb-3 flex items-center gap-2">
        <select value={reciter} onChange={e => setReciter(e.target.value)}
          className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">
          {reciters.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button onClick={prev} disabled={currentAyah <= 1} className="rounded-xl p-2 text-stone-500 hover:bg-stone-100 disabled:opacity-30 dark:hover:bg-stone-800">
          <SkipBack className="h-4 w-4" />
        </button>
        <button onClick={togglePlay} className="rounded-xl bg-emerald-600 p-3 text-white hover:bg-emerald-700 transition-all active:scale-95">
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <button onClick={next} disabled={currentAyah >= totalAyahs} className="rounded-xl p-2 text-stone-500 hover:bg-stone-100 disabled:opacity-30 dark:hover:bg-stone-800">
          <SkipForward className="h-4 w-4" />
        </button>
        <button onClick={() => setMuted(!muted)} className="rounded-xl p-2 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800">
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
      {currentAyah > 0 && (
        <p className="mt-2 text-center text-xs text-stone-400">
          Ayah {currentAyah} of {totalAyahs}
        </p>
      )}
    </div>
  )
}
