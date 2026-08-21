import Link from 'next/link'
import type { Metadata } from 'next'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { LogoutButton } from '@/components/auth/logout-button'

export const metadata: Metadata = { title: 'My Library' }
export const dynamic = 'force-dynamic'

export default async function LibraryPage() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">My Library</h1>
        <p className="mt-3 text-stone-600 dark:text-stone-300">
          Login to save bookmarks and reading progress.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Create account</Button>
          </Link>
        </div>
      </div>
    )
  }

  const [bookmarks, hadithBookmarks, progress] = await Promise.all([
    prisma.bookmark.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } }),
    prisma.hadithBookmark.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } }),
    prisma.readingProgress.findUnique({ where: { userId_scope: { userId: user.id, scope: 'quran' } } }),
  ])

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">My Library</h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Signed in as {user.name || user.email}
          </p>
        </div>
        <LogoutButton />
      </div>

      <Card className="mt-6">
        <CardBody>
          <h2 className="font-semibold">Reading progress</h2>
          {progress ? (
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
              Last marked: Surah {progress.surahNumber}, Ayah {progress.ayahNumber}.{' '}
              <Link
                href={`/quran/${progress.surahNumber}?ayah=${progress.ayahNumber}`}
                className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Continue reading
              </Link>
            </p>
          ) : (
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              No progress saved yet. Open a surah and mark an ayah.
            </p>
          )}
        </CardBody>
      </Card>

      <div className="mt-8 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Quran bookmarks</h2>
        <span className="text-sm text-stone-500 dark:text-stone-400">{bookmarks.length} saved</span>
      </div>
      <div className="mt-4 space-y-3">
        {bookmarks.map((bookmark) => (
          <Link
            key={bookmark.id}
            href={`/quran/${bookmark.surahNumber}?ayah=${bookmark.ayahNumber}`}
          >
            <Card className="transition-colors hover:border-emerald-600/40">
              <CardBody>
                <p className="text-sm font-medium">
                  {bookmark.surahName} {bookmark.surahNumber}:{bookmark.ayahNumber}
                </p>
                <p className="arabic mt-3 line-clamp-2 text-right text-2xl" dir="rtl">
                  {bookmark.textArabic}
                </p>
                <p className="mt-3 line-clamp-2 text-sm text-stone-600 dark:text-stone-300">
                  {bookmark.translationEn}
                </p>
              </CardBody>
            </Card>
          </Link>
        ))}
        {bookmarks.length === 0 && (
          <p className="text-sm text-stone-500 dark:text-stone-400">
            No bookmarks yet. Use the bookmark button on any ayah.
          </p>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Hadith bookmarks</h2>
        <span className="text-sm text-stone-500 dark:text-stone-400">{hadithBookmarks.length} saved</span>
      </div>
      <div className="mt-4 space-y-3">
        {hadithBookmarks.map((bookmark) => (
          <Link
            key={bookmark.id}
            href={`/hadith/${bookmark.collection}?number=${bookmark.hadithNumber}`}
          >
            <Card className="transition-colors hover:border-emerald-600/40">
              <CardBody>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <Badge className="bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                    {bookmark.collection} #{bookmark.hadithNumber}
                  </Badge>
                  <Badge>Grade: {bookmark.grade}</Badge>
                </div>
                <p className="arabic mt-3 line-clamp-2 text-right text-2xl" dir="rtl">
                  {bookmark.arabic}
                </p>
                <p className="mt-3 line-clamp-2 text-sm text-stone-600 dark:text-stone-300">
                  {bookmark.english}
                </p>
              </CardBody>
            </Card>
          </Link>
        ))}
        {hadithBookmarks.length === 0 && (
          <p className="text-sm text-stone-500 dark:text-stone-400">
            No hadith bookmarks yet. Use the save button on any hadith.
          </p>
        )}
      </div>
    </div>
  )
}
