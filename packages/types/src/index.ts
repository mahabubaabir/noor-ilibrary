export interface SurahMeta {
  number: number
  nameArabic: string
  nameEnglish: string
  nameTranslation: string
  revelationType: 'Meccan' | 'Medinan'
  ayahCount: number
  pageStart: number
  pageEnd: number
}

export interface Ayah {
  surahNumber: number
  numberInSurah: number
  globalNumber: number
  juz: number
  page: number
  sajda: boolean
  textArabic: string
  translationEn: string
  translationBn: string
}

export interface SurahDetail {
  meta: SurahMeta
  ayahs: Ayah[]
}

export interface SearchMatch {
  surahNumber: number
  numberInSurah: number
  globalNumber: number
  text: string
}

export interface Reciter {
  id: string
  name: string
}

export type TranslationLanguage = 'en' | 'bn'

export interface TafsirChapter {
  surahNumber: number
  language: TranslationLanguage
  source: string
  entries: Record<number, string>
}

export interface HadithCollection {
  key: string
  name: string
  arabicName: string
  author: string
  reliability: string
  totalHadiths: number
}

export interface HadithRecord {
  id: string
  collection: string
  collectionName: string
  hadithNumber: number
  arabic: string
  english: string
  grade: string
  translationBn: string | null
}

export interface HadithSearchResult {
  query: string
  collection: string | null
  limit: number
  totalFound: number
  hadiths: HadithRecord[]
}

export type StudyThemeIcon = 'star' | 'sparkles' | 'eye' | 'heart'

export type StudyDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface StudyAyahRef {
  surah: number
  from: number
  to?: number
  note: string
}

export interface StudyHadithRef {
  collection: string
  number: number
  note?: string
}

export interface StudyLesson {
  id: string
  title: string
  arabicTitle?: string
  overview: string
  ayahs: StudyAyahRef[]
  hadiths: StudyHadithRef[]
  takeaway: string
}

export interface StudyTheme {
  id: string
  title: string
  arabicTitle: string
  tagline: string
  description: string
  difficulty: StudyDifficulty
  duration: string
  icon: StudyThemeIcon
  objectives: string[]
  lessons: StudyLesson[]
}
