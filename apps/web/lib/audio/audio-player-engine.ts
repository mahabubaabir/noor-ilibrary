export interface ReciterInfo {
  id: string
  nameEn: string
  nameBn: string
  style?: string
  everyAyahFolder: string
}

export const RECITERS_LIST: ReciterInfo[] = [
  {
    id: "ar.alafasy",
    nameEn: "Mishary Rashid Alafasy",
    nameBn: "মিশারি রাশিদ আল-আফাসি",
    style: "Murattal",
    everyAyahFolder: "Alafasy_128kbps",
  },
  {
    id: "ar.abdurrahmaanassudais",
    nameEn: "Abdul Rahman Al-Sudais",
    nameBn: "আব্দুর রহমান আস-সুদাইস (ইমামে কাবা)",
    style: "Murattal",
    everyAyahFolder: "Abdurrahmaan_As-Sudais_192kbps",
  },
  {
    id: "ar.abubakrasshatri",
    nameEn: "Abu Bakr Al-Shatri",
    nameBn: "আবু বকর আশ-শাতরি",
    style: "Murattal",
    everyAyahFolder: "Abu_Bakr_Ash-Shaatree_128kbps",
  },
  {
    id: "ar.minshawi",
    nameEn: "Mohamed Siddiq Al-Minshawi",
    nameBn: "মুহাম্মদ সিদ্দিক আল-মিনশাবি",
    style: "Mujawwad / Murattal",
    everyAyahFolder: "Minshawy_Murattal_128kbps",
  },
  {
    id: "ar.hudhaify",
    nameEn: "Ali Al-Hudhaify",
    nameBn: "আলী আল-হুযাইফী",
    style: "Murattal",
    everyAyahFolder: "Hudhaify_128kbps",
  },
  {
    id: "ar.husary",
    nameEn: "Mahmoud Khalil Al-Husary",
    nameBn: "মাহমুদ খলিল আল-হুসারি",
    style: "Tajweed Master",
    everyAyahFolder: "Husary_128kbps",
  },
]

// Cumulative verses count up to each surah (1 to 114) for global ayah mapping
export const SURAH_VERSE_COUNTS = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109,
  123, 111, 43, 52, 99, 128, 111, 110, 98, 135,
  112, 78, 118, 64, 77, 227, 93, 88, 69, 60,
  34, 30, 73, 54, 45, 83, 182, 88, 75, 85,
  54, 53, 89, 59, 37, 35, 38, 29, 18, 45,
  60, 49, 62, 55, 78, 96, 29, 22, 24, 13,
  14, 11, 11, 18, 12, 12, 30, 52, 52, 44,
  28, 28, 20, 56, 40, 31, 50, 40, 46, 42,
  29, 19, 36, 25, 22, 17, 19, 26, 30, 20,
  15, 21, 11, 8, 8, 19, 5, 8, 8, 11,
  11, 8, 3, 9, 5, 4, 7, 3, 6, 3,
  5, 4, 5, 6,
]

export function getGlobalAyahNumber(surahNumber: number, ayahNumber: number): number {
  let global = 0
  for (let i = 0; i < surahNumber - 1; i++) {
    global += SURAH_VERSE_COUNTS[i] ?? 0
  }
  return global + ayahNumber
}

export interface AyahAudioSources {
  primary: string
  fallback: string
  tertiary: string
  altFallback: string
}

export function getAyahAudioSources(
  surahNumber: number,
  ayahNumber: number,
  reciterId: string = "ar.alafasy"
): AyahAudioSources {
  const globalNumber = getGlobalAyahNumber(surahNumber, ayahNumber)
  const reciter = RECITERS_LIST.find((r) => r.id === reciterId) || RECITERS_LIST[0]!

  const s = String(surahNumber).padStart(3, "0")
  const a = String(ayahNumber).padStart(3, "0")

  return {
    primary: `https://cdn.islamic.network/quran/audio/128/${reciter.id}/${globalNumber}.mp3`,
    fallback: `https://everyayah.com/data/${reciter.everyAyahFolder}/${s}${a}.mp3`,
    tertiary: `https://verses.quran.com/Alafasy/mp3/${s}${a}.mp3`,
    altFallback: `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`,
  }
}

export type AudioPlaybackState = "idle" | "loading" | "playing" | "paused" | "error"

export interface AudioPlaybackEventMap {
  stateChange: (state: AudioPlaybackState) => void
  timeUpdate: (currentTime: number, duration: number) => void
  ended: () => void
  error: (err: unknown) => void
}

/**
 * Universal Unified Audio Manager (Singleton)
 * Prevents overlapping audio, handles AbortErrors cleanly, manages fallbacks, and tracks playback state.
 */
class UniversalAudioManager {
  private audio: HTMLAudioElement | null = null
  private currentPlayPromise: Promise<void> | null = null
  private fallbackChain: string[] = []
  private fallbackIndex = 0
  private listeners: {
    stateChange?: (state: AudioPlaybackState) => void
    timeUpdate?: (currentTime: number, duration: number) => void
    ended?: () => void
    error?: (err: unknown) => void
  } = {}

  private isMuted = false
  private volume = 1

  constructor() {
    if (typeof window !== "undefined") {
      this.initAudio()
    }
  }

  private initAudio() {
    if (this.audio) return
    this.audio = new Audio()
    this.audio.preload = "auto"

    this.audio.oncanplay = () => {
      this.listeners.stateChange?.("playing")
    }

    this.audio.ontimeupdate = () => {
      if (this.audio) {
        this.listeners.timeUpdate?.(this.audio.currentTime, this.audio.duration || 0)
      }
    }

    this.audio.onended = () => {
      this.listeners.stateChange?.("idle")
      this.listeners.ended?.()
    }

    this.audio.onerror = () => {
      this.handleSourceError()
    }
  }

  private handleSourceError() {
    this.fallbackIndex++
    if (this.fallbackIndex < this.fallbackChain.length && this.audio) {
      const nextSource = this.fallbackChain[this.fallbackIndex]!
      this.audio.src = nextSource
      this.audio.load()
      this.currentPlayPromise = this.audio
        .play()
        .then(() => {
          this.listeners.stateChange?.("playing")
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            this.handleSourceError()
          }
        })
    } else {
      this.listeners.stateChange?.("error")
      this.listeners.error?.(new Error("All audio sources failed to buffer"))
    }
  }

  public setListeners(listeners: typeof this.listeners) {
    this.listeners = listeners
  }

  public async playSources(sources: string[]) {
    this.initAudio()
    if (!this.audio) return

    // Safely interrupt any existing playback
    await this.stop()

    this.fallbackChain = sources.filter(Boolean)
    this.fallbackIndex = 0

    if (this.fallbackChain.length === 0) return

    this.listeners.stateChange?.("loading")
    this.audio.src = this.fallbackChain[0]!
    this.audio.volume = this.isMuted ? 0 : this.volume

    try {
      this.currentPlayPromise = this.audio.play()
      await this.currentPlayPromise
      this.listeners.stateChange?.("playing")
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        // Normal user interruption, ignore
        return
      }
      this.handleSourceError()
    }
  }

  public async playAyah(surahNumber: number, ayahNumber: number, reciterId: string = "ar.alafasy") {
    const sources = getAyahAudioSources(surahNumber, ayahNumber, reciterId)
    const list = [sources.primary, sources.fallback, sources.tertiary, sources.altFallback]
    await this.playSources(list)
  }

  public pause() {
    if (!this.audio) return
    this.audio.pause()
    this.listeners.stateChange?.("paused")
  }

  public async resume() {
    if (!this.audio || !this.audio.src) return
    try {
      this.currentPlayPromise = this.audio.play()
      await this.currentPlayPromise
      this.listeners.stateChange?.("playing")
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return
      this.listeners.stateChange?.("error")
    }
  }

  public async stop() {
    if (!this.audio) return
    try {
      if (this.currentPlayPromise) {
        await this.currentPlayPromise.catch(() => {})
      }
      this.audio.pause()
      this.audio.currentTime = 0
    } catch {
      // Ignored
    }
    this.listeners.stateChange?.("idle")
  }

  public seek(seconds: number) {
    if (this.audio) {
      this.audio.currentTime = seconds
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted
    if (this.audio) {
      this.audio.volume = muted ? 0 : this.volume
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol))
    if (this.audio && !this.isMuted) {
      this.audio.volume = this.volume
    }
  }

  public getAudioElement(): HTMLAudioElement | null {
    return this.audio
  }
}

// Global Singleton Instance
export const audioManager = new UniversalAudioManager()

/**
 * Universal Human-Voice Speech Narration Engine
 * High-fidelity sentence narrator with reliable Web Speech synthesis fallback.
 */
export function playSafeSpeech({
  text,
  lang = "bn-BD",
  rate = 0.9,
  onStart,
  onEnd,
  onError,
}: {
  text: string
  lang?: string
  rate?: number
  onStart?: () => void
  onEnd?: () => void
  onError?: (err?: unknown) => void
}): { cancel: () => void } {
  let isCancelled = false

  const cleanText = text.replace(/[\n\r\t]+/g, " ").trim()
  if (!cleanText) {
    onEnd?.()
    return { cancel: () => {} }
  }

  // Use browser native SpeechSynthesis for highest reliability and zero CORS errors
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.lang = lang
      utterance.rate = rate

      utterance.onstart = () => {
        if (!isCancelled) onStart?.()
      }
      utterance.onend = () => {
        if (!isCancelled) onEnd?.()
      }
      utterance.onerror = (e) => {
        if (!isCancelled) onError?.(e)
      }

      window.speechSynthesis.speak(utterance)

      return {
        cancel: () => {
          isCancelled = true
          window.speechSynthesis.cancel()
          onEnd?.()
        },
      }
    } catch (e) {
      onError?.(e)
    }
  }

  return {
    cancel: () => {
      isCancelled = true
      onEnd?.()
    },
  }
}
