export const ALQURAN_BASE = 'https://api.alquran.cloud/v1'
export const QURANCOM_BASE = 'https://api.quran.com/api/v4'
export const AUDIO_CDN = 'https://cdn.islamic.network/quran/audio/128'

export const EDITION_AR = 'quran-uthmani'
export const EDITION_EN = 'en.sahih'
export const EDITION_BN = 'bn.bengali'

export const DEFAULT_RECITER = 'ar.alafasy'

export const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

export function audioUrl(reciterId: string, globalAyahNumber: number): string {
  return `${AUDIO_CDN}/${reciterId}/${globalAyahNumber}.mp3`
}