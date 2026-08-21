import type { Metadata } from 'next'
import Link from 'next/link'
import { content } from '@/lib/providers'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

export const metadata: Metadata = {
  title: 'Search the Quran',
  description: 'Search any verse in the Quran in English or Bangla.',
}

export const dynamic = 'force-dynamic'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; lang?: string }>
}) {
  const { q = '', lang = 'en' } = await searchParams
  const language = lang === 'bn' ? 'bn' : 'en'
  const query = q.trim()

  const matches =
    query.length >= 3 ? await content.search(query, language).catch(() => []) : []

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Search the Quran</h1>
      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        Search across the whole Quran. Results open the surah at the matched verse.
      </p>

      <form method="get" action="/search" className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="e.g. mercy, patience, সৃষ্টি…"
          minLength={3}
          required
          className="flex-1"
        />
        <Select name="lang" defaultValue={language} aria-label="Search language" className="sm:w-44">
          <option value="en">English</option>
          <option value="bn">Bangla</option>
        </Select>
        <Button type="submit">Search</Button>
      </form>

      {query && query.length < 3 && (
        <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">
          Type at least 3 characters to search.
        </p>
      )}

      {query.length >= 3 && (
        <>
          <p className="mt-6 text-sm text-stone-500 dark:text-stone-400">
            {matches.length} result{matches.length === 1 ? '' : 's'} for “{query}”
          </p>
          <div className="mt-4 space-y-3">
            {matches.map((match) => (
              <Link key={match.globalNumber} href={`/quran/${match.surahNumber}?ayah=${match.numberInSurah}`}>
                <Card className="transition-colors hover:border-emerald-600/40">
                  <CardBody>
                    <p className={language === 'bn' ? 'bengali leading-relaxed' : ''}>
                      {match.text}
                    </p>
                    <p className="mt-2 text-xs text-stone-400">
                      Surah {match.surahNumber} · ayah {match.numberInSurah}
                    </p>
                  </CardBody>
                </Card>
              </Link>
            ))}
            {matches.length === 0 && (
              <p className="text-sm text-stone-500 dark:text-stone-400">
                No results found. Try another word.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}