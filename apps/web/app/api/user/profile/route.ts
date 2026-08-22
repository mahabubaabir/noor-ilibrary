import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      avatar: true,
      bio: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          bookmarks: true,
          hadithBookmarks: true,
          highlights: true,
          notes: true,
        },
      },
    },
  })

  return NextResponse.json({ profile })
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json().catch(() => null)) as {
    name?: string
    username?: string | null
    avatar?: string | null
    bio?: string | null
  } | null

  if (!body) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const updates: {
    name?: string
    username?: string | null
    avatar?: string | null
    bio?: string | null
  } = {}

  if (typeof body.name === 'string') {
    updates.name = body.name.trim().slice(0, 70)
  }

  if (body.username !== undefined) {
    if (body.username === null || body.username.trim() === '') {
      updates.username = null
    } else {
      const sanitizedUsername = body.username
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_.-]/g, '')
        .slice(0, 30)

      if (sanitizedUsername.length < 3) {
        return NextResponse.json(
          { error: 'Username must be at least 3 characters and contain only letters, numbers, _, - or .' },
          { status: 400 }
        )
      }

      // Check if username is taken by someone else
      const existing = await prisma.user.findFirst({
        where: {
          username: sanitizedUsername,
          NOT: { id: user.id },
        },
      })

      if (existing) {
        return NextResponse.json({ error: 'Username is already taken' }, { status: 409 })
      }

      updates.username = sanitizedUsername
    }
  }

  if (body.avatar !== undefined) {
    updates.avatar = body.avatar ? body.avatar.trim() : null
  }

  if (body.bio !== undefined) {
    updates.bio = body.bio ? body.bio.trim().slice(0, 300) : null
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: updates,
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      avatar: true,
      bio: true,
      role: true,
    },
  })

  return NextResponse.json({ user: updatedUser })
}
