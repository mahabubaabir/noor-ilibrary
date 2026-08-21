import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const [userCount, bookmarkCount, hadithBookmarkCount, postCount, progressCount] = await Promise.all([
      prisma.user.count().catch(() => 0),
      prisma.bookmark.count().catch(() => 0),
      prisma.hadithBookmark.count().catch(() => 0),
      prisma.blogPost.count().catch(() => 0),
      prisma.readingProgress.count().catch(() => 0),
    ])

    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }).catch(() => [])

    const recentPosts = await prisma.blogPost.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, slug: true, title: true, category: true, published: true, createdAt: true },
    }).catch(() => [])

    return NextResponse.json({
      stats: {
        totalUsers: userCount,
        totalBookmarks: bookmarkCount,
        totalHadithBookmarks: hadithBookmarkCount,
        totalPosts: postCount,
        activeReaders: progressCount,
      },
      recentUsers,
      recentPosts,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
