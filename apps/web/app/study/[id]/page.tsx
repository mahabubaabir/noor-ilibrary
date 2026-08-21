import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type {
  Ayah,
  HadithRecord,
  StudyAyahRef,
  StudyHadithRef,
  StudyTheme,
} from '@noor/types'
import { content } from '@/lib/providers'
import { getHadith } from '@/lib/hadith'
import { augmentAllWithBangla } from '@/lib/hadith-bn'
import { countAyahRefs, getStudyTheme, studyThemes } from '@/lib/study/themes'
import { themeAccents } from '@/lib/study/accents'

export const dynamic = 'force-dynamic'
import { ThemeIcon } from '@/components/study/theme-icon'
import { Badge } from '@/components/ui/badge'
import { CheckIcon } from '@/components/icons'
import { HadithBookmarkButton } from '@/components/hadith/hadith-bookmark-button'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const theme = getStudyTheme(id)
  return {
    title: theme ? `${theme.title} — Study` : 'Study Theme',
  }
}

export default async function StudyThemePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const theme = getStudyTheme(id)
  if (!theme) notFound()

  const accent = themeAccents[theme.icon]

  const surahNumbers = [...new Set(theme.lessons.flatMap((l) => l.ayahs.map((a) => a.surah)))]
  const surahList = await Promise.all(
    surahNumbers.map((n) => content.surah(n).catch(() => null)),
  )
  const surahMap = new Map(
    surahList.filter((s): s is NonNullable<typeof s> => s !== null).map((s) => [s.meta.number, s]),
  )

  const uniqueHadithRefs = new Map<string, StudyHadithRef>()
  for (const ref of theme.lessons.flatMap((l) => l.hadiths)) {
    uniqueHadithRefs.set(`${ref.collection}:${ref.number}`, ref)
  }
  const hadithRefs = [...uniqueHadithRefs.values()]
  const hadithList = await Promise.all(
    hadithRefs.map((h) => getHadith(h.collection, h.number).catch(() => null)),
  )
  const hadithMap = new Map<string, HadithRecord>()
  hadithList.forEach((record) => {
    if (record) hadithMap.set(`${record.collection}:${record.hadithNumber}`, record)
  })
  const hadithRecords = [...hadithMap.values()]
  const augmentedHadiths = await augmentAllWithBangla(hadithRecords)
  const hadithMapWithBn = new Map<string, HadithRecord>()
  augmentedHadiths.forEach((record) => {
    hadithMapWithBn.set(`${record.collection}:${record.hadithNumber}`, record)
  })

  const passageCount = countAyahRefs(theme)
  const hadithCount = hadithRefs.length
  const themeIndex = studyThemes.findIndex((t) => t.id === theme.id)
  const prevTheme = themeIndex > 0 ? studyThemes[themeIndex - 1] : null
  const nextTheme =
    themeIndex >= 0 && themeIndex < studyThemes.length - 1 ? studyThemes[themeIndex + 1] : null

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/study" className="text-sm text-emerald-700 hover:underline dark:text-emerald-400">
        ← All study themes
      </Link>

      <header className="mt-6">
        <div className="flex items-start gap-4">
          <span
            className={`hidden size-14 shrink-0 items-center justify-center rounded-2xl sm:inline-flex ${accent.chip}`}
          >
            <ThemeIcon icon={theme.icon} className="size-7" />
          </span>
          <div>
            <p className="font-arabic text-base text-stone-400 dark:text-stone-500">
              {theme.arabicTitle}
            </p>
            <h1 className={`text-3xl font-semibold ${accent.heading}`}>{theme.title}</h1>
            <p className="mt-1 text-lg text-stone-600 dark:text-stone-300">{theme.tagline}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge className={accent.badge}>{theme.difficulty}</Badge>
          <Badge>{theme.duration}</Badge>
          <Badge>
            {theme.lessons.length} lesson{theme.lessons.length === 1 ? '' : 's'}
          </Badge>
          <Badge>{passageCount} passages</Badge>
          <Badge>{hadithCount} hadiths</Badge>
        </div>

        <p className="mt-4 max-w-3xl leading-relaxed text-stone-700 dark:text-stone-200">
          {theme.description}
        </p>

        <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            What you will learn
          </p>
          <ul className="mt-3 space-y-2">
            {theme.objectives.map((objective) => (
              <li key={objective} className="flex items-start gap-2 text-sm text-stone-700 dark:text-stone-200">
                <CheckIcon className={`mt-0.5 size-4 shrink-0 ${accent.heading}`} />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="mt-10 space-y-10">
        {theme.lessons.map((lesson, lessonIndex) => (
          <LessonSection
            key={lesson.id}
            lesson={lesson}
            index={lessonIndex + 1}
            accent={accent}
            surahMap={surahMap}
            hadithMap={hadithMapWithBn}
          />
        ))}
      </div>

      <nav className="mt-12 flex flex-col gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-stone-800">
        {prevTheme ? (
          <Link
            href={`/study/${prevTheme.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
          >
            ← {prevTheme.title}
          </Link>
        ) : (
          <span />
        )}
        {nextTheme ? (
          <Link
            href={`/study/${nextTheme.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            Next theme: {nextTheme.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}

function LessonSection({
  lesson,
  index,
  accent,
  surahMap,
  hadithMap,
}: {
  lesson: StudyTheme['lessons'][number]
  index: number
  accent: (typeof themeAccents)[StudyTheme['icon']]
  surahMap: Map<number, { meta: { number: number; nameEnglish: string; nameTranslation: string }; ayahs: Ayah[] }>
  hadithMap: Map<string, HadithRecord>
}) {
  return (
    <section id={`lesson-${lesson.id}`} className="scroll-mt-20">
      <div className="flex items-baseline gap-3">
        <span className={`font-arabic text-3xl ${accent.heading}`}>{String(index).padStart(2, '0')}</span>
        <div>
          <h2 className="text-xl font-semibold">{lesson.title}</h2>
          {lesson.arabicTitle && (
            <p className="font-arabic text-sm text-stone-400 dark:text-stone-500">
              {lesson.arabicTitle}
            </p>
          )}
        </div>
      </div>

      <p className="mt-3 leading-relaxed text-stone-700 dark:text-stone-200">{lesson.overview}</p>

      {lesson.ayahs.length > 0 && (
        <div className="mt-5 space-y-4">
          {lesson.ayahs.map((item) => (
            <AyahCard key={`${item.surah}:${item.from}`} item={item} surah={surahMap.get(item.surah)} />
          ))}
        </div>
      )}

      {lesson.hadiths.length > 0 && (
        <div className="mt-4 space-y-4">
          {lesson.hadiths.map((item) => {
            const record = hadithMap.get(`${item.collection}:${item.number}`)
            return (
              <HadithCard
                key={`${item.collection}:${item.number}`}
                item={item}
                record={record}
              />
            )
          })}
        </div>
      )}

      <div className="mt-5 rounded-xl border border-emerald-700/20 bg-emerald-50 p-4 dark:border-emerald-400/20 dark:bg-emerald-950/30">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          What this lesson teaches
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-200">
          {lesson.takeaway}
        </p>
      </div>
    </section>
  )
}

function ayahLabel(item: StudyAyahRef): string {
  return item.to && item.to !== item.from
    ? `${item.surah}:${item.from}–${item.to}`
    : `${item.surah}:${item.from}`
}

function AyahCard({
  item,
  surah,
}: {
  item: StudyAyahRef
  surah?: { meta: { number: number; nameEnglish: string; nameTranslation: string }; ayahs: Ayah[] }
}) {
  const from = item.from
  const to = item.to ?? item.from
  const ayahs = surah ? surah.ayahs.slice(from - 1, to) : []

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-200">
          <span className="inline-flex size-7 items-center justify-center rounded-lg border border-emerald-700/30 font-semibold text-emerald-800 dark:border-emerald-400/30 dark:text-emerald-300">
            {ayahLabel(item)}
          </span>
          <span className="text-stone-500 dark:text-stone-400">{surah?.meta.nameEnglish ?? `Surah ${item.surah}`}</span>
        </span>
        {surah && (
          <Link
            href={`/quran/${item.surah}?ayah=${from}`}
            className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            Open in Quran →
          </Link>
        )}
      </div>

      {ayahs.length === 0 ? (
        <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">
          Could not load this passage right now. Please try again later.
        </p>
      ) : (
        <>
          {ayahs.map((ayah) => (
            <div key={ayah.numberInSurah} className="mt-4">
              <p className="arabic text-right text-2xl text-stone-900 dark:text-stone-50" dir="rtl">
                {ayah.textArabic}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-200">
                {ayah.translationEn}
              </p>
              <p className="bengali mt-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                {ayah.translationBn}
              </p>
            </div>
          ))}
          <div className="mt-4 border-l-2 border-emerald-600/40 pl-3">
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">Why it matters — </span>
              {item.note}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

function HadithCard({ item, record }: { item: StudyHadithRef; record: HadithRecord | null | undefined }) {
  if (!record) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Could not load this hadith right now. Please try again later.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
            {record.collectionName} · #{record.hadithNumber}
          </Badge>
          <Badge>Grade: {record.grade}</Badge>
        </div>
        <HadithBookmarkButton
          collection={record.collection}
          hadithNumber={record.hadithNumber}
          arabic={record.arabic}
          english={record.english}
          grade={record.grade}
        />
      </div>
      <p className="arabic mt-4 text-right text-2xl text-stone-900 dark:text-stone-50" dir="rtl">
        {record.arabic}
      </p>
      <p className="mt-3 leading-relaxed text-stone-700 dark:text-stone-200">{record.english}</p>
      {record.translationBn && (
        <>
          <p className="bengali mt-4 text-xs font-semibold uppercase tracking-wider text-stone-400">
            বাংলা অনুবাদ
          </p>
          <p className="bengali mt-2 leading-relaxed text-stone-700 dark:text-stone-200">
            {record.translationBn}
          </p>
        </>
      )}
      {item.note && (
        <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">Why it matters — </span>
          {item.note}
        </p>
      )}
      <Link
        href={`/hadith/${record.collection}?number=${record.hadithNumber}`}
        className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
      >
        Open full hadith →
      </Link>
    </div>
  )
}