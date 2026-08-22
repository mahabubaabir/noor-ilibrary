import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [bookmarks, hadithBookmarks, progress, highlights, notes, userProfile] = await Promise.all([
    prisma.bookmark.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.hadithBookmark.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.readingProgress.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.userHighlight.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.userNote.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        avatar: true,
        bio: true,
      },
    }),
  ])

  return NextResponse.json({
    user: userProfile,
    bookmarks,
    hadithBookmarks,
    progress,
    highlights,
    notes,
    syncedAt: new Date().toISOString(),
  })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json().catch(() => null)) as {
    highlights?: Array<{
      targetId: string
      targetType?: string
      text: string
      color?: string
      note?: string
    }>
    notes?: Array<{
      targetId: string
      targetType?: string
      title?: string
      content: string
      color?: string
    }>
  } | null

  if (body?.highlights && Array.isArray(body.highlights)) {
    for (const h of body.highlights) {
      if (h.targetId && h.text) {
        // Find if already exists with same target and text
        const existing = await prisma.userHighlight.findFirst({
          where: {
            userId: user.id,
            targetId: h.targetId,
            text: h.text,
          },
        })
        if (!existing) {
          await prisma.userHighlight.create({
            data: {
              userId: user.id,
              targetId: h.targetId,
              targetType: h.targetType || 'story',
              text: h.text,
              color: h.color || 'yellow',
              note: h.note || null,
            },
          })
        }
      }
    }
  }

  if (body?.notes && Array.isArray(body.notes)) {
    for (const n of body.notes) {
      if (n.targetId && n.content) {
        const existing = await prisma.userNote.findFirst({
          where: {
            userId: user.id,
            targetId: n.targetId,
            content: n.content,
          },
        })
        if (!existing) {
          await prisma.userNote.create({
            data: {
              userId: user.id,
              targetId: n.targetId,
              targetType: n.targetType || 'story',
              title: n.title || null,
              content: n.content,
              color: n.color || 'emerald',
            },
          })
        }
      }
    }
  }

  // Return fresh data after push
  const [highlights, notes] = await Promise.all([
    prisma.userHighlight.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.userNote.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return NextResponse.json({
    success: true,
    highlights,
    notes,
    syncedAt: new Date().toISOString(),
  })
}
