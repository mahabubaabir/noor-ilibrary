'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { HeartIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

interface HadithBookmarkButtonProps {
  collection: string
  hadithNumber: number
  arabic: string
  english: string
  grade: string
}

export function HadithBookmarkButton({
  collection,
  hadithNumber,
  arabic,
  english,
  grade,
}: HadithBookmarkButtonProps) {
  const router = useRouter()
  const [bookmarked, setBookmarked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/library/hadith-bookmarks')
      .then((res) => res.json())
      .then((data) => {
        const exists = data.hadithBookmarks?.some(
          (b: { collection: string; hadithNumber: number }) =>
            b.collection === collection && b.hadithNumber === hadithNumber,
        )
        setBookmarked(exists)
      })
      .catch(() => {})
  }, [collection, hadithNumber])

  async function toggle() {
    setLoading(true)
    if (bookmarked) {
      const res = await fetch(
        `/api/library/hadith-bookmarks?collection=${collection}&hadith=${hadithNumber}`,
        { method: 'DELETE' },
      )
      if (res.status === 401) {
        router.push('/login')
        setLoading(false)
        return
      }
      if (res.ok) setBookmarked(false)
    } else {
      const res = await fetch('/api/library/hadith-bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, hadithNumber, arabic, english, grade }),
      })
      if (res.status === 401) {
        router.push('/login')
        setLoading(false)
        return
      }
      if (res.ok) setBookmarked(true)
    }
    setLoading(false)
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle} disabled={loading}>
      <HeartIcon
        className={cn('mr-1.5 size-4', bookmarked ? 'fill-rose-500 text-rose-500' : 'text-stone-400')}
      />
      {bookmarked ? 'Saved' : 'Save'}
    </Button>
  )
}
