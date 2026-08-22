import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const targetId = searchParams.get('targetId')
  const targetType = searchParams.get('targetType')

  const where: { userId: string; targetId?: string; targetType?: string } = {
    userId: user.id,
  }
  if (targetId) where.targetId = targetId
  if (targetType) where.targetType = targetType

  const highlights = await prisma.userHighlight.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ highlights })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json().catch(() => null)) as {
    targetId?: string
    targetType?: string
    text?: string
    color?: string
    note?: string
  } | null

  if (!body?.targetId || !body?.text?.trim()) {
    return NextResponse.json({ error: 'targetId and text are required' }, { status: 400 })
  }

  const highlight = await prisma.userHighlight.create({
    data: {
      userId: user.id,
      targetId: body.targetId,
      targetType: body.targetType || 'story',
      text: body.text.trim(),
      color: body.color || 'yellow',
      note: body.note?.trim() || null,
    },
  })

  return NextResponse.json({ highlight }, { status: 201 })
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Highlight ID is required' }, { status: 400 })
  }

  await prisma.userHighlight.deleteMany({
    where: { id, userId: user.id },
  })

  return NextResponse.json({ success: true })
}
