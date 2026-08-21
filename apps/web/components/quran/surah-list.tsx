'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SurahMeta } from '@noor/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

type Filter = 'all' | 'Meccan' | 'Medinan'

export function SurahList({ surahs }: { surahs: SurahMeta[] }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = surahs.filter((s) => {
    if (filter !== 'all' && s.revelationType !== filter) return false
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      s.nameEnglish.toLowerCase().includes(q) ||
      s.nameTranslation.toLowerCase().includes(q) ||
      s.nameArabic.includes(query.trim())
    )
  })

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <Input
          type="search"
          placeholder="Search surah…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="sm:max-w-xs"
        />
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Filter)}
          className="sm:w-44"
        >
          <option value="all">All surahs</option>
          <option value="Meccan">Meccan</option>
          <option value="Medinan">Medinan</option>
        </Select>
        <p className="text-sm text-stone-500 sm:ml-auto dark:text-stone-400">
          {filtered.length} / {surahs.length} surahs
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((surah) => (
          <Link key={surah.number} href={`/quran/${surah.number}`} className="group">
            <Card className="h-full transition-colors group-hover:border-emerald-600/40">
              <CardBody className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-emerald-700/10 text-sm font-semibold text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
                  {surah.number}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-arabic text-2xl text-stone-800 dark:text-stone-100">
                      {surah.nameArabic}
                    </p>
                    <span className="text-xs text-stone-400">· {surah.ayahCount} ayahs</span>
                  </div>
                  <p className="truncate font-medium text-stone-800 dark:text-stone-100">
                    {surah.nameEnglish}
                    <span className="text-stone-400"> — {surah.nameTranslation}</span>
                  </p>
                  <div className="mt-1.5">
                    <Badge className="bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
                      {surah.revelationType}
                    </Badge>
                    <span className="ml-2 text-xs text-stone-400">
                      Pages {surah.pageStart}–{surah.pageEnd}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}