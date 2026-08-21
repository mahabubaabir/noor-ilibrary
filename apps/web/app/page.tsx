import Link from 'next/link'
import type { Metadata } from 'next'
import { content } from '@/lib/providers'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { BookIcon, SearchIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Noor — Islamic Knowledge Library',
  description:
    'Read, listen and study the Quran with Arabic, English and Bangla translations, tafsir and hadith.',
}

const MODULES = [
  {
    href: '/quran',
    title: 'Read the Quran',
    description: 'All 114 surahs in Arabic with English and Bangla translations, verse audio.',
    icon: BookIcon,
    available: true,
  },
  {
    href: '/search',
    title: 'Search the Quran',
    description: 'Find any verse across the whole Quran in English or Bangla.',
    icon: SearchIcon,
    available: true,
  },
  {
    href: '/hadith',
    title: 'Hadith Library',
    description: 'Sahih Bukhari, Muslim and more — with search across all collections.',
    available: true,
  },
  {
    href: '/study',
    title: 'Study & Themes',
    description: 'Guided themes: oneness of Allah, signs in creation, the unseen world, purpose of life.',
    available: true,
  },
]

export default async function HomePage() {
  const [surahs, randomAyah] = await Promise.all([
    content.surahs().catch(() => []),
    content.randomAyah().catch(() => null),
  ])

  const surahCount = surahs.length
  const ayahCount = surahs.reduce((sum, s) => sum + s.ayahCount, 0)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="text-center">
        <h1 className="text-arabic text-5xl text-emerald-800 sm:text-6xl dark:text-emerald-300">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </h1>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Read. Listen. Understand.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-stone-600 dark:text-stone-300">
          Your library for the Quran in Arabic, English and Bangla — with tafsir, hadith and study
          themes on the way. Built on verified, free open Islamic data sources.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Badge className="bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
            {surahCount} surahs
          </Badge>
          <Badge className="bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
            {ayahCount} ayahs
          </Badge>
          <Badge className="bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
            العربية · English · বাংলা
          </Badge>
        </div>
      </section>

      {randomAyah && (
        <Card className="mx-auto mt-10 max-w-2xl border-emerald-700/20">
          <CardBody>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Ayah of the day
            </p>
            <p className="arabic mt-3 text-right text-2xl text-stone-900 dark:text-stone-50" dir="rtl">
              {randomAyah.textArabic}
            </p>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
              {randomAyah.translationEn}
            </p>
            <p className="bengali mt-2 text-sm text-stone-600 dark:text-stone-300">
              {randomAyah.translationBn}
            </p>
            <Link
              href={`/quran/${randomAyah.surahNumber}?ayah=${randomAyah.numberInSurah}`}
              className="mt-4 inline-block text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
            >
              Read in surah {randomAyah.surahNumber} →
            </Link>
          </CardBody>
        </Card>
      )}

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {MODULES.map((module) => (
          <Link key={module.href} href={module.href} className={module.available ? '' : 'pointer-events-none'}>
            <Card
              className={`h-full transition-colors ${
                module.available ? 'group-hover:border-emerald-600/40' : 'opacity-60'
              }`}
            >
              <CardBody>
                <div className="flex items-start gap-3">
                  {module.icon && <module.icon className="mt-1 size-6 shrink-0 text-emerald-700 dark:text-emerald-400" />}
                  <div>
                    <h3 className="font-semibold">
                      {module.title}
                      {!module.available && (
                        <span className="ml-2 rounded-full bg-stone-200 px-2 py-0.5 text-xs font-normal text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                          Soon
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
                      {module.description}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}