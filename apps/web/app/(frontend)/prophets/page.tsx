"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, Sparkles, ArrowRight, BookOpen } from "lucide-react"
import { PROPHETS_COLLECTION } from "@/lib/prophets-data"

export default function ProphetsPage() {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return PROPHETS_COLLECTION
    return PROPHETS_COLLECTION.filter((p) =>
      [p.nameBn, p.nameEn, p.nameAr, p.titleBn, p.titleEn, p.summaryBn, p.summaryEn]
        .join(" ")
        .toLowerCase()
        .includes(q),
    )
  }, [search])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>নবীদের জীবনী • Stories of the Prophets</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Nobider Jiboni
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Walk with the prophets of Allah — from Adam to Muhammad ﷺ. Every profile carries the Quranic
          references so you can read the story in the Book itself, in বাংলা and English.
        </p>

        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a prophet…"
            className="w-full rounded-2xl border border-neutral-300 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((prophet) => (
          <Link key={prophet.id} href={`/prophets/${prophet.slug}`} className="group h-full">
            <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span dir="rtl" className="arabic text-lg text-neutral-800 dark:text-neutral-200">
                  {prophet.nameAr}
                </span>
              </div>

              <h2 className="text-base font-bold text-neutral-900 dark:text-white">{prophet.nameBn}</h2>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                {prophet.nameEn}
              </p>
              <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                {prophet.summaryBn}
              </p>

              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white">
                পড়ুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
          No prophet found for &ldquo;{search}&rdquo;.
        </p>
      )}
    </div>
  )
}
