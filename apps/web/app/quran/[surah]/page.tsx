"use client"

import { use, useEffect, useState, useRef, useCallback } from "react"
import { ArrowLeft, ArrowRight, BookOpen, Loader2, Play, Pause, ChevronDown, ChevronUp, Heart } from "lucide-react"
import Link from "next/link"

interface Surah { number: number; name: string; englishName: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string }
interface Ayah { numberInSurah: number; text: string; number: number; translation?: string }
interface TafsirData { tafsirs?: { text: string }[] }

const reciters = [
  { name: "Mishary Rashid Alafasy", id: "ar.alafasy" },
  { name: "Abdul Rahman As-Sudais", id: "ar.abdurrahmaanassudais" },
  { name: "Abu Bakr Al Shatri", id: "ar.abubakrasshatri" },
]

export default function SurahPage({ params }: { params: Promise<{ surah: string }> }) {
  const { surah } = use(params)
  const num = parseInt(surah)
  const [data, setData] = useState<Surah | null>(null)
  const [arabic, setArabic] = useState<Ayah[]>([])
  const [english, setEnglish] = useState<Ayah[]>([])
  const [bangla, setBangla] = useState<Ayah[]>([])
  const [tafsir, setTafsir] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [currentAyah, setCurrentAyah] = useState(0)
  const [reciter, setReciter] = useState(reciters[0]?.id ?? "ar.alafasy")
  const [showTafsir, setShowTafsir] = useState(false)
  const [showTranslation, setShowTranslation] = useState(true)
  const [showBangla, setShowBangla] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch("https://api.alquran.cloud/v1/surah/" + num).then(r => r.json()),
      fetch("https://api.alquran.cloud/v1/surah/" + num + "/quran-uthmani").then(r => r.json()),
      fetch("https://api.alquran.cloud/v1/surah/" + num + "/en.sahih").then(r => r.json()),
      fetch("https://api.alquran.cloud/v1/surah/" + num + "/bn.bengali").then(r => r.json()),
      fetch("https://quran.com/api/qtls/v4/tafsirs/1?surah=" + num, {
        headers: { "User-Agent": "Mozilla/5.0" }
      }).then(r => r.json()),
    ]).then(([meta, ar, en, bn, tafsirData]) => {
      setData(meta.data)
      setArabic(ar.data.ayahs || [])
      setEnglish(en.data.ayahs || [])
      setBangla(bn.data.ayahs || [])
      const t = tafsirData?.tafsirs?.[0]?.text
      setTafsir(typeof t === "string" ? t : "")
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [num])

  useEffect(() => {
    if (!arabic.length) return
    const ayahNum = currentAyah
    setPlaying(true)
    const src = `https://cdn.islamic.network/quran/audio/128/${reciter}/${String(ayahNum).padStart(6, "0")}.mp3`
    const audio = new Audio(src)
    audioRef.current = audio
    audio.play().catch(() => {})
    audio.onended = () => { if (ayahNum < arabic.length) setCurrentAyah(ayahNum + 1); else setPlaying(false) }
    return () => { audio.pause(); audioRef.current = null }
  }, [currentAyah, reciter, arabic.length])

  const togglePlay = useCallback(() => {
    if (playing && audioRef.current) { audioRef.current.pause(); setPlaying(false) }
    else { setCurrentAyah(1); setPlaying(true) }
  }, [playing])

  if (loading) return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
    </div>
  )

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/quran" className="mb-6 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-emerald-600 dark:text-stone-400">
        <ArrowLeft className="h-4 w-4" /> Back to Quran
      </Link>

      <div className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 text-center dark:border-stone-800 dark:bg-stone-900">
        <p className="mb-1 text-2xl font-bold text-stone-900 dark:text-stone-100">{data?.name}</p>
        <p className="text-sm text-stone-600 dark:text-stone-400">{data?.englishName} - {data?.englishNameTranslation}</p>
        <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">{data?.numberOfAyahs} Ayahs · {data?.revelationType}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button onClick={togglePlay} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-all active:scale-95">
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? "Pause" : "Play Surah"}
          </button>
          <select value={reciter} onChange={e => setReciter(e.target.value)} className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">
            {reciters.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <button onClick={() => setShowTranslation(!showTranslation)} className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${showTranslation ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "border-stone-200 text-stone-500 dark:border-stone-700 dark:text-stone-400"}`}>
            English
          </button>
          <button onClick={() => setShowBangla(!showBangla)} className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${showBangla ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "border-stone-200 text-stone-500 dark:border-stone-700 dark:text-stone-400"}`}>
            Bangla
          </button>
          {tafsir && <button onClick={() => setShowTafsir(!showTafsir)} className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${showTafsir ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "border-stone-200 text-stone-500 dark:border-stone-700 dark:text-stone-400"}`}>
            {showTafsir ? <ChevronUp className="h-3 w-3 inline mr-1" /> : <ChevronDown className="h-3 w-3 inline mr-1" />}
            Tafsir
          </button>}
        </div>
      </div>

      {showTafsir && tafsir && (
        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/50 p-6 dark:border-amber-900/50 dark:bg-amber-950/20">
          <h3 className="mb-3 text-sm font-semibold text-amber-800 dark:text-amber-300">Tafsir - Ibn Kathir</h3>
          <div className="prose prose-sm max-w-none text-stone-700 dark:text-stone-300" dangerouslySetInnerHTML={{ __html: tafsir.replace(/\n/g, "<br/>").replace(/\(.*?\)/g, '<sup class="text-amber-500">$&</sup>') }} />
        </div>
      )}

      <div className="space-y-6">
        {arabic.map((ayah, i) => (
          <div key={ayah.numberInSurah} className={`group rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-200 hover:border-emerald-200 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900 dark:hover:border-emerald-800 ${currentAyah === ayah.numberInSurah && playing ? "ring-2 ring-emerald-500/30 border-emerald-300 dark:border-emerald-700" : ""}`}>
            <div className="mb-3 flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-xs font-bold text-stone-600 dark:bg-stone-800 dark:text-stone-400">{ayah.numberInSurah}</span>
              <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={() => { setCurrentAyah(ayah.numberInSurah); setPlaying(true) }} className="rounded-lg bg-emerald-50 p-1.5 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <Play className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <p className="mb-3 text-right font-arabic text-2xl leading-loose text-stone-900 dark:text-stone-100">{ayah.text}</p>
            {showTranslation && english[i] && <p className="mb-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{english[i].translation}</p>}
            {showBangla && bangla[i] && <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-500 bengali">{bangla[i].translation}</p>}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        {num > 1 ? <Link href={`/quran/${num - 1}`} className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"><ArrowLeft className="h-4 w-4" /> Previous</Link> : <div />}
        {num < 114 ? <Link href={`/quran/${num + 1}`} className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">Next <ArrowRight className="h-4 w-4" /></Link> : <div />}
      </div>
    </div>
  )
}
