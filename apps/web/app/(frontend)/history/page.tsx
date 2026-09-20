import Link from "next/link"
import { ArrowRight, BookOpen, Landmark } from "lucide-react"
import { HISTORY_BOOKS } from "@/lib/history-books"

export const metadata = {
  title: "ইসলামের ইতিহাস ও কিতাব — Islamic History Library | Noor",
  description:
    "Classical Islamic history books with references — Seerah, Stories of the Prophets and Tarikh al-Tabari, with a page-by-page reader in Bangla and English.",
}

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
          <Landmark className="h-3.5 w-3.5" />
          <span>ইসলামের ইতিহাস • Islamic History Library</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          History Books
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Big classical books in concise, referenced chapters — read page by page, jump to any chapter,
          and check every source at the end. বাংলা ও English.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {HISTORY_BOOKS.map((book) => (
          <Link key={book.id} href={`/history/${book.slug}`} className="group h-full">
            <div className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{book.titleBn}</h2>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                {book.titleEn}
              </p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {book.authorBn} · {book.eraBn}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {book.descriptionBn}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs font-bold text-neutral-900 dark:border-neutral-800 dark:text-white">
                <span>{book.chapters.length} অধ্যায় + গ্রন্থপঞ্জি</span>
                <span className="inline-flex items-center gap-1.5">
                  পড়া শুরু করুন
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-center text-xs leading-relaxed text-neutral-400">
        All chapters are written from public-domain classical sources (Ibn Hisham, Ibn Kathir, al-Tabari)
        and referenced to the Quran and authenticated hadith collections.
      </p>
    </div>
  )
}
