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
    everyAyahFolder: "Abu_Bakr_Ash-Shatri_128kbps",
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

// Cumulative verses count up to each surah (1 to 114) for fast global ayah mapping
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
  5, 4, 5, 6
]

export function getGlobalAyahNumber(surahNumber: number, ayahNumber: number): number {
  let global = 0
  for (let i = 0; i < surahNumber - 1; i++) {
    global += SURAH_VERSE_COUNTS[i] ?? 0
  }
  return global + ayahNumber
}

export function getAyahAudioSources(
  surahNumber: number,
  ayahNumber: number,
  reciterId: string = "ar.alafasy"
): { primary: string; fallback: string; altFallback: string } {
  const globalNumber = getGlobalAyahNumber(surahNumber, ayahNumber)
  const reciter = RECITERS_LIST.find((r) => r.id === reciterId) || RECITERS_LIST[0]!

  const s = String(surahNumber).padStart(3, "0")
  const a = String(ayahNumber).padStart(3, "0")

  return {
    primary: `https://cdn.islamic.network/quran/audio/128/${reciter.id}/${globalNumber}.mp3`,
    fallback: `https://everyayah.com/data/${reciter.everyAyahFolder}/${s}${a}.mp3`,
    altFallback: `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`,
  }
}

export function playSafeSpeech({
  text,
  lang = "ar-SA",
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
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onError?.(new Error("Web Speech API is not supported in this browser"))
    return { cancel: () => {} }
  }

  try {
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate

    utterance.onstart = () => onStart?.()
    utterance.onend = () => onEnd?.()
    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e)
      onError?.(e)
    }

    // Workaround for mobile browsers speech synthesis activation
    window.speechSynthesis.speak(utterance)

    return {
      cancel: () => window.speechSynthesis.cancel(),
    }
  } catch (err) {
    onError?.(err)
    return { cancel: () => {} }
  }
}
