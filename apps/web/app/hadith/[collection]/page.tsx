import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getHadith, getHadithCollections } from '@/lib/hadith'
import { augmentWithBangla } from '@/lib/hadith-bn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { HadithBookmarkButton } from '@/components/hadith/hadith-bookmark-button'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>
}): Promise<Metadata> {
  const { collection } = await params
  const collections = await getHadithCollections().catch(() => [])
  const match = collections.find((item) => item.key === collection)
  return {
    title: match ? match.name : 'Hadith Collection',
  }
}

export default async function HadithCollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>
  searchParams: Promise<{ number?: string }>
}) {
  const { collection } = await params
  const { number } = await searchParams
  const hadithNumber = Math.max(1, Number(number ?? '1') || 1)

  const collections = await getHadithCollections().catch(() => [])
  const summary = collections.find((item) => item.key === collection)
  if (!summary) notFound()

  const hadith = await getHadith(collection, hadithNumber).catch(() => null)
  if (!hadith) notFound()

  const hadithBn = await augmentWithBangla(hadith)

  const prev = hadithNumber > 1 ? hadithNumber - 1 : null
  const next = hadithNumber < summary.totalHadiths ? hadithNumber + 1 : null

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/hadith" className="text-sm text-emerald-700 hover:underline dark:text-emerald-400">
        ← Back to hadith collections
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{summary.name}</h1>
          <p className="mt-1 text-stone-500 dark:text-stone-400">{summary.arabicName}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className="bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
              {summary.reliability}
            </Badge>
            <Badge>{summary.totalHadiths.toLocaleString()} hadiths</Badge>
            <Badge>{summary.author}</Badge>
          </div>
        </div>

        <form method="get" className="flex items-end gap-2">
          <Input
            name="number"
            type="number"
            min={1}
            max={summary.totalHadiths}
            defaultValue={hadithNumber}
            className="w-28"
          />
          <Button type="submit">Go</Button>
        </form>
      </div>

      <div className="mt-4 flex gap-2">
        {prev ? (
          <Link
            href={`/hadith/${collection}?number=${prev}`}
            className="inline-flex items-center justify-center rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
          >
            Previous
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-400 dark:border-stone-700 dark:text-stone-600">
            Previous
          </span>
        )}
        {next ? (
          <Link
            href={`/hadith/${collection}?number=${next}`}
            className="inline-flex items-center justify-center rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
          >
            Next
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-400 dark:border-stone-700 dark:text-stone-600">
            Next
          </span>
        )}
      </div>

      <Card className="mt-6">
        <CardBody>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Badge className="bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                Hadith {hadithBn.hadithNumber}
              </Badge>
              <Badge className="bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                Grade: {hadithBn.grade}
              </Badge>
            </div>
            <HadithBookmarkButton
              collection={hadithBn.collection}
              hadithNumber={hadithBn.hadithNumber}
              arabic={hadithBn.arabic}
              english={hadithBn.english}
              grade={hadithBn.grade}
            />
          </div>

          <p className="arabic mt-5 text-right text-2xl text-stone-900 dark:text-stone-50" dir="rtl">
            {hadithBn.arabic}
          </p>

          <p className="mt-5 leading-relaxed text-stone-700 dark:text-stone-200">
            {hadithBn.english}
          </p>

          {hadithBn.translationBn && (
            <>
              <p className="bengali mt-5 text-xs font-semibold uppercase tracking-wider text-stone-400">
                বাংলা অনুবাদ
              </p>
              <p className="bengali mt-2 leading-relaxed text-stone-700 dark:text-stone-200">
                {hadithBn.translationBn}
              </p>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
