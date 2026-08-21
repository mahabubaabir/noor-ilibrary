import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ bookmarks })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = (await request.json().catch(() => null)) as
    | {
        surahNumber?: number
        ayahNumber?: number
        surahName?: string
        textArabic?: string
        translationEn?: string
        translationBn?: string
      }
    | null

  if (!body?.surahNumber || !body.ayahNumber || !body.surahName) {
    return NextResponse.json({ error: 'Invalid bookmark payload' }, { status: 400 })
  }

  const bookmark = await prisma.bookmark.upsert({
    where: {
      userId_surahNumber_ayahNumber: {
        userId: user.id,
        surahNumber: body.surahNumber,
        ayahNumber: body.ayahNumber,
      },
    },
    create: {
      userId: user.id,
      surahNumber: body.surahNumber,
      ayahNumber: body.ayahNumber,
      surahName: body.surahName,
      textArabic: body.textArabic ?? '',
      translationEn: body.translationEn ?? '',
      translationBn: body.translationBn ?? '',
    },
    update: {
      surahName: body.surahName,
      textArabic: body.textArabic ?? '',
      translationEn: body.translationEn ?? '',
      translationBn: body.translationBn ?? '',
    },
  })

  return NextResponse.json({ bookmark })
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(request.url)
  const surahNumber = Number(url.searchParams.get('surah'))
  const ayahNumber = Number(url.searchParams.get('ayah'))

  if (!Number.isInteger(surahNumber) || !Number.isInteger(ayahNumber)) {
    return NextResponse.json({ error: 'surah and ayah query params are required' }, { status: 400 })
  }

  await prisma.bookmark.deleteMany({ where: { userId: user.id, surahNumber, ayahNumber } })
  return NextResponse.json({ ok: true })
}
