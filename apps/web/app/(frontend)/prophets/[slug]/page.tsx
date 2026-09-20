import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, GraduationCap } from "lucide-react"
import { PROPHETS_COLLECTION, getProphet } from "@/lib/prophets-data"

export function generateStaticParams() {
  return PROPHETS_COLLECTION.map((prophet) => ({ slug: prophet.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const prophet = getProphet(slug)
  if (!prophet) return { title: "Prophet not found — Noor" }
  return {
    title: `${prophet.nameBn} (${prophet.nameEn}) — Nobider Jiboni`,
    description: prophet.summaryEn || prophet.summaryBn,
  }
}

export default async function ProphetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const prophet = getProphet(slug)
  if (!prophet) notFound()

  const index = PROPHETS_COLLECTION.findIndex((p) => p.slug === prophet.slug)
  const prev = index > 0 ? PROPHETS_COLLECTION[index - 1] : null
  const next = index < PROPHETS_COLLECTION.length - 1 ? PROPHETS_COLLECTION[index + 1] : null

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link
        href="/prophets"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> সবার নবীগণ (All Prophets)
      </Link>

      {/* Header */}
      <header className="mb-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{prophet.eraBn}</span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {prophet.nameBn}
            </h1>
            <p className="mt-1 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
              {prophet.nameEn} — {prophet.titleEn}
            </p>
            <p className="text-xs text-neutral-400">{prophet.titleBn}</p>
          </div>
          <p dir="rtl" className="arabic text-3xl text-neutral-900 dark:text-white sm:text-4xl">
            {prophet.nameAr}
          </p>
        </div>

        <p className="mt-4 text-xs font-mono uppercase tracking-wider text-neutral-400">
          {prophet.quranMentions} · {prophet.quranMentionsEn}
        </p>
      </header>

      {/* Summary */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="mb-2 text-sm font-bold text-neutral-900 dark:text-white">সারসংক্ষেপ</h2>
          <p className="bengali text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {prophet.summaryBn}
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="mb-2 text-sm font-bold text-neutral-900 dark:text-white">Summary</h2>
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {prophet.summaryEn}
          </p>
        </div>
      </section>

      {/* Lessons */}
      <section className="mb-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
          <GraduationCap className="h-4 w-4" /> শিক্ষণীয় (Lessons)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <ul className="space-y-2">
            {prophet.lessons.map((lesson, i) => (
              <li key={i} className="bengali flex gap-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900 dark:bg-white" />
                {lesson}
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {prophet.lessonsEn.map((lesson, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900 dark:bg-white" />
                {lesson}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* References */}
      <section className="mb-8 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 sm:p-6">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
          <BookOpen className="h-4 w-4" /> কুরআনের সূত্র (Quran References)
        </h2>
        <div className="flex flex-wrap gap-2">
          {prophet.references.map((ref) => (
            <Link
              key={ref.label}
              href={`/quran/${ref.surah}${ref.ayah ? `#ayah-${ref.ayah}` : ""}`}
              className="rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
            >
              {ref.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Prev / Next */}
      <nav className="flex items-center justify-between gap-3">
        {prev ? (
          <Link
            href={`/prophets/${prev.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {prev.nameBn}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/prophets/${next.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white"
          >
            {next.nameBn} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </nav>
    </div>
  )
}
