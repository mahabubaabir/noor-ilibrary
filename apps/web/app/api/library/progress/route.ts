import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const progressList = await prisma.readingProgress.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
  })
  return NextResponse.json({ progress: progressList })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = (await request.json().catch(() => null)) as
    | { surahNumber?: number; ayahNumber?: number; surahName?: string; totalAyahs?: number }
    | null
  const surahNumber = Number(body?.surahNumber)
  const ayahNumber = Number(body?.ayahNumber)
  const surahName = body?.surahName || undefined
  const totalAyahs = Number(body?.totalAyahs) || 7

  if (!Number.isInteger(surahNumber) || !Number.isInteger(ayahNumber)) {
    return NextResponse.json({ error: 'surahNumber and ayahNumber are required' }, { status: 400 })
  }

  const progress = await prisma.readingProgress.upsert({
    where: { userId_scope: { userId: user.id, scope: 'quran' } },
    create: { userId: user.id, scope: 'quran', surahNumber, ayahNumber, surahName, totalAyahs },
    update: { surahNumber, ayahNumber, surahName, totalAyahs },
  })

  return NextResponse.json({ progress })
}
