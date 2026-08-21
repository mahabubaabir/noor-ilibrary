import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { content } from '@/lib/providers'
import { SurahViewer } from '@/components/quran/surah-viewer'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const number = Number(id)
  const surahs = await content.surahs().catch(() => [])
  const meta = surahs.find((s) => s.number === number)
  return {
    title: meta ? `${meta.nameEnglish} — ${meta.nameTranslation}` : 'Surah',
  }
}

export default async function SurahPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ ayah?: string }>
}) {
  const { id } = await params
  const number = Number(id)
  if (!Number.isInteger(number) || number < 1 || number > 114) notFound()

  const [surah, reciters] = await Promise.all([
    content.surah(number),
    content.audioEditions().catch(() => []),
  ])

  const { ayah } = await searchParams
  const initialAyah = ayah ? Number(ayah) : undefined

  return (
    <SurahViewer
      surah={surah}
      initialAyah={Number.isInteger(initialAyah) ? initialAyah : undefined}
      reciters={reciters}
    />
  )
}