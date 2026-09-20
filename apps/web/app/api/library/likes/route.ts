import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

const TARGET_TYPES = new Set(['content', 'dua', 'name', 'companion', 'hadith', 'bookmark'])

function readTarget(request: Request) {
  const url = new URL(request.url)
  const targetType = (url.searchParams.get('targetType') ?? 'content').trim()
  const targetId = (url.searchParams.get('targetId') ?? '').trim()
  if (!TARGET_TYPES.has(targetType) || !targetId || targetId.length > 120) return null
  return { targetType, targetId }
}

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const target = readTarget(request)
  try {
    if (target) {
      const like = await prisma.like.findUnique({
        where: {
          userId_targetType_targetId: {
            userId: user.id,
            targetType: target.targetType,
            targetId: target.targetId,
          },
        },
      })
      return NextResponse.json({ liked: Boolean(like) })
    }

    const likes = await prisma.like.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ likes })
  } catch {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 })
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = (await request.json().catch(() => null)) as
    | { targetType?: string; targetId?: string }
    | null
  const targetType = (body?.targetType ?? 'content').trim()
  const targetId = (body?.targetId ?? '').trim()

  if (!TARGET_TYPES.has(targetType) || !targetId || targetId.length > 120) {
    return NextResponse.json({ error: 'Invalid like payload' }, { status: 400 })
  }

  try {
    const like = await prisma.like.upsert({
      where: { userId_targetType_targetId: { userId: user.id, targetType, targetId } },
      create: { userId: user.id, targetType, targetId },
      update: {},
    })
    return NextResponse.json({ liked: true, like })
  } catch {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 })
  }
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const target = readTarget(request)
  if (!target) {
    return NextResponse.json({ error: 'targetType and targetId are required' }, { status: 400 })
  }

  try {
    await prisma.like.deleteMany({
      where: { userId: user.id, targetType: target.targetType, targetId: target.targetId },
    })
    return NextResponse.json({ liked: false })
  } catch {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 })
  }
}
