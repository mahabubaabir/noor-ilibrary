import { prisma } from '@/lib/db'
import { content } from '@/lib/providers'
import { SURAH_VERSE_COUNTS } from '@/lib/audio/audio-player-engine'
import { SURAH_NAMES_BN } from '@/lib/surah-names-bn'

/**
 * Daily Ayah engine.
 *
 * A deterministic, DB-backed "algorithmic loop" over the whole Quran:
 * every calendar day maps to exactly one ayah, the same all day for every
 * visitor, and the sequence walks the entire 6236-ayah collection exactly
 * once before repeating (~17 years) - no duplicate ayahs, no flat curated
 * list, no random reshuffling on reload.
 */

export const TOTAL_QURAN_AYAHS = SURAH_VERSE_COUNTS.reduce((sum, n) => sum + n, 0)

// A step coprime with TOTAL_QURAN_AYAHS (6236 = 4 x 1559, 997 is prime)
// guarantees the modular walk visits every ayah before wrapping around.
const STEP = 997

// Fixed epoch so the cycle is stable and reproducible across deploys.
const EPOCH_UTC = Date.UTC(2026, 0, 1)

export interface DailyAyahItem {
  date: string
  globalNumber: number
  surahNumber: number
  ayahNumber: number
  surahNameEn: string
  surahNameBn: string
  textArabic: string
  translationEn: string
  translationBn: string
}

/** UTC day number since the epoch. */
function dayNumberFor(date: Date): number {
  const utcMidnight = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  return Math.floor((utcMidnight - EPOCH_UTC) / 86_400_000)
}

/** The 1-based global ayah number selected for a given date. */
export function dailyGlobalNumber(date: Date = new Date()): number {
  const index = ((dayNumberFor(date) * STEP) % TOTAL_QURAN_AYAHS + TOTAL_QURAN_AYAHS) % TOTAL_QURAN_AYAHS
  return index + 1
}

/** Map a 1-based global ayah number back to surah + ayah numbers. */
export function resolveSurahAyah(globalNumber: number): { surahNumber: number; ayahNumber: number } {
  let remaining = Math.min(Math.max(globalNumber, 1), TOTAL_QURAN_AYAHS)
  for (let i = 0; i < SURAH_VERSE_COUNTS.length; i++) {
    const count = SURAH_VERSE_COUNTS[i] ?? 0
    if (remaining <= count) {
      return { surahNumber: i + 1, ayahNumber: remaining }
    }
    remaining -= count
  }
  return { surahNumber: 114, ayahNumber: 6 }
}

function toItem(row: {
  date: string
  globalNumber: number
  surahNumber: number
  ayahNumber: number
  surahNameEn: string
  surahNameBn: string
  textArabic: string
  translationEn: string
  translationBn: string
}): DailyAyahItem {
  return {
    date: row.date,
    globalNumber: row.globalNumber,
    surahNumber: row.surahNumber,
    ayahNumber: row.ayahNumber,
    surahNameEn: row.surahNameEn,
    surahNameBn: row.surahNameBn,
    textArabic: row.textArabic,
    translationEn: row.translationEn,
    translationBn: row.translationBn,
  }
}

/**
 * Today's ayah. Once persisted for a date it never changes for that date,
 * so reloads and revisits always show the same ayah. The next day the
 * modular walk advances to the next unique ayah.
 */
export async function getDailyAyah(dateStr?: string): Promise<DailyAyahItem> {
  const date = dateStr || (new Date().toISOString().split('T')[0] ?? '2026-01-01')

  // 1. Database first: the day's selection is immutable once stored.
  try {
    const existing = await prisma.dailyAyah.findUnique({ where: { date } })
    if (existing) return toItem(existing)
  } catch {
    // DB unavailable - compute below and skip persistence
  }

  // 2. Deterministic selection via the full-cycle algorithm.
  const [year, month, day] = date.split('-').map(Number)
  const dateUtc = new Date(Date.UTC(year ?? 2026, (month ?? 1) - 1, day ?? 1))
  const globalNumber = dailyGlobalNumber(dateUtc)
  const { surahNumber, ayahNumber } = resolveSurahAyah(globalNumber)

  const [ayah, surahs] = await Promise.all([
    content.ayah(surahNumber, ayahNumber),
    content.surahs().catch(() => null),
  ])
  if (!ayah) {
    throw new Error('Daily ayah content unavailable')
  }

  const meta = surahs?.find((s) => s.number === surahNumber)
  const item: DailyAyahItem = {
    date,
    globalNumber,
    surahNumber,
    ayahNumber,
    surahNameEn: meta?.nameEnglish ?? `Surah ${surahNumber}`,
    surahNameBn: SURAH_NAMES_BN[surahNumber]?.bnName ?? `সূরা ${surahNumber}`,
    textArabic: ayah.textArabic,
    translationEn: ayah.translationEn,
    translationBn: ayah.translationBn,
  }

  // 3. Persist for the day. Upsert keeps concurrent first-visitors safe.
  try {
    const saved = await prisma.dailyAyah.upsert({
      where: { date },
      create: item,
      update: {},
    })
    return toItem(saved)
  } catch {
    return item
  }
}
