import Link from 'next/link'
import type { Metadata } from 'next'
import { getHadithCollections, searchHadith } from '@/lib/hadith'
import { augmentAllWithBangla } from '@/lib/hadith-bn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { HadithBookmarkButton } from '@/components/hadith/hadith-bookmark-button'

export const metadata: Metadata = {
  title: 'Hadith Library',
  description: 'Browse and search verified hadith collections.',
}

export const dynamic = 'force-dynamic'

export default async function HadithPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; collection?: string }>
}) {
  const { q = '', collection = '' } = await searchParams
  const collections = await getHadithCollections().catch(() => [])
  const query = q.trim()
  const selectedCollection = collection || ''
  const result =
    query.length >= 2
      ? await searchHadith(query, selectedCollection || undefined, 8).catch(() => null)
      : null

  const resultHadiths =
    result && result.hadiths.length > 0 ? await augmentAllWithBangla(result.hadiths) : []

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Hadith Library</h1>
      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        Verified collections with Arabic text, English translation and grading. Bangla text is a
        machine translation for easy reading.
      </p>

      <form method="get" action="/hadith" className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_auto]">
        <Input
          name="q"
          defaultValue={query}
          placeholder="Search by keyword, e.g. patience, prayer, charity"
          minLength={2}
        />
        <Select name="collection" defaultValue={selectedCollection} aria-label="Filter collection">
          <option value="">All collections</option>
          {collections.map((item) => (
            <option key={item.key} value={item.key}>
              {item.name}
            </option>
          ))}
        </Select>
        <Button type="submit">Search</Button>
      </form>

      {query.length >= 2 && (
        <div className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Search results</h2>
            <span className="text-sm text-stone-500 dark:text-stone-400">
              {result ? `${result.totalFound} found` : 'Loading failed'}
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {resultHadiths.map((hadith) => (
              <Card key={hadith.id} className="transition-colors hover:border-emerald-600/40">
                <CardBody>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <Badge className="bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
                        {hadith.collectionName}
                      </Badge>
                      <span className="text-stone-400">Hadith {hadith.hadithNumber}</span>
                      <span className="text-stone-400">Grade: {hadith.grade}</span>
                    </div>
                    <HadithBookmarkButton
                      collection={hadith.collection}
                      hadithNumber={hadith.hadithNumber}
                      arabic={hadith.arabic}
                      english={hadith.english}
                      grade={hadith.grade}
                    />
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-700 dark:text-stone-200">
                    {hadith.english}
                  </p>
                  {hadith.translationBn && (
                    <p className="bengali mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                      {hadith.translationBn}
                    </p>
                  )}
                  <Link
                    href={`/hadith/${hadith.collection}?number=${hadith.hadithNumber}`}
                    className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                  >
                    Read full hadith →
                  </Link>
                </CardBody>
              </Card>
            ))}
            {result && result.hadiths.length === 0 && (
              <p className="text-sm text-stone-500 dark:text-stone-400">No hadith found.</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Collections</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {collections.length} collections available
        </p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {collections.map((collection) => (
          <Link key={collection.key} href={`/hadith/${collection.key}?number=1`}>
            <Card className="h-full transition-colors hover:border-emerald-600/40">
              <CardBody>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{collection.name}</h3>
                    <p className="bengali mt-1 text-sm text-stone-500 dark:text-stone-400">
                      {collection.arabicName}
                    </p>
                  </div>
                  <Badge className="bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                    {collection.reliability}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
                  Author: {collection.author}
                </p>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
                  {collection.totalHadiths.toLocaleString()} hadiths
                </p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
