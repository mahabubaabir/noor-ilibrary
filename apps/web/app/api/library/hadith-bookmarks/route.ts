import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const hadithBookmarks = await prisma.hadithBookmark.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ hadithBookmarks, bookmarks: hadithBookmarks })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = (await request.json().catch(() => null)) as
    | {
        collection?: string
        hadithNumber?: number
        arabic?: string
        english?: string
        grade?: string
        translationBn?: string
      }
    | null

  if (!body?.collection || !body.hadithNumber) {
    return NextResponse.json({ error: 'Invalid hadith bookmark payload' }, { status: 400 })
  }

  const hadithBookmark = await prisma.hadithBookmark.upsert({
    where: {
      userId_collection_hadithNumber: {
        userId: user.id,
        collection: body.collection,
        hadithNumber: body.hadithNumber,
      },
    },
    create: {
      userId: user.id,
      collection: body.collection,
      hadithNumber: body.hadithNumber,
      arabic: body.arabic ?? '',
      english: body.english ?? '',
      grade: body.grade ?? 'Sahih',
      translationBn: body.translationBn ?? null,
    },
    update: {
      arabic: body.arabic ?? '',
      english: body.english ?? '',
      grade: body.grade ?? 'Sahih',
      translationBn: body.translationBn ?? null,
    },
  })

  return NextResponse.json({ hadithBookmark })
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  if (id) {
    await prisma.hadithBookmark.deleteMany({ where: { id, userId: user.id } })
    return NextResponse.json({ ok: true })
  }

  const collection = url.searchParams.get('collection')
  const hadithNumber = Number(url.searchParams.get('hadith'))

  if (!collection || !Number.isInteger(hadithNumber)) {
    return NextResponse.json({ error: 'id or collection and hadith query params are required' }, { status: 400 })
  }

  await prisma.hadithBookmark.deleteMany({
    where: { userId: user.id, collection, hadithNumber },
  })
  return NextResponse.json({ ok: true })
}
