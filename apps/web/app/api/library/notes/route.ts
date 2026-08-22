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

  const notes = await prisma.userNote.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ notes })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json().catch(() => null)) as {
    targetId?: string
    targetType?: string
    title?: string
    content?: string
    color?: string
  } | null

  if (!body?.targetId || !body?.content?.trim()) {
    return NextResponse.json({ error: 'targetId and content are required' }, { status: 400 })
  }

  const note = await prisma.userNote.create({
    data: {
      userId: user.id,
      targetId: body.targetId,
      targetType: body.targetType || 'story',
      title: body.title?.trim() || null,
      content: body.content.trim(),
      color: body.color || 'emerald',
    },
  })

  return NextResponse.json({ note }, { status: 201 })
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Note ID is required' }, { status: 400 })
  }

  await prisma.userNote.deleteMany({
    where: { id, userId: user.id },
  })

  return NextResponse.json({ success: true })
}
