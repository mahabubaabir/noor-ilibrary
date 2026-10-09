import { NextResponse } from 'next/server'
import { getDailyAyah } from '@/lib/daily-ayah'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const ayah = await getDailyAyah()

    // Include the signed-in visitor's bookmark state so the client can render
    // the correct toggle immediately (guests simply get false).
    let bookmarked = false
    try {
      const user = await getCurrentUser()
      if (user) {
        const found = await prisma.bookmark.findUnique({
          where: {
            userId_surahNumber_ayahNumber: {
              userId: user.id,
              surahNumber: ayah.surahNumber,
              ayahNumber: ayah.ayahNumber,
            },
          },
        })
        bookmarked = Boolean(found)
      }
    } catch {
      // Auth/database hiccup should never take the ayah down
    }

    return NextResponse.json({ ayah, bookmarked })
  } catch (error) {
    console.error('[quran/daily]', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 502 })
  }
}
