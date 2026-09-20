import Link from "next/link"
import { ArrowRight, Crown, BookOpen, ShieldCheck } from "lucide-react"
import { COMPANIONS_COLLECTION } from "@/lib/companions-data"

export const metadata = {
  title: "খুলাফায়ে রাশেদীন — The Rightly Guided Caliphs | Noor",
  description:
    "The four rightly guided caliphs — Abu Bakr, Umar, Uthman and Ali (may Allah be pleased with them) — in English and Bangla with references.",
}

export default function KhulafaPage() {
  const caliphs = COMPANIONS_COLLECTION.filter((c) => c.category === "caliphs")

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
          <Crown className="h-3.5 w-3.5" />
          <span>খুলাফায়ে রাশেদীন • The Rightly Guided Caliphs</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          The Four Caliphs
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          After the Prophet ﷺ, four companions led the Muslim community with justice, humility and
          knowledge. Read their lives in Bangla and English — with their virtues and lessons.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {caliphs.map((caliph) => (
          <Link key={caliph.id} href={`/companions/${caliph.slug}`} className="group h-full">
            <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span dir="rtl" className="arabic text-lg text-neutral-800 dark:text-neutral-200">
                  {caliph.arabicName}
                </span>
              </div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white">{caliph.nameBn}</h2>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                {caliph.nameEn}
              </p>
              <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                {caliph.shortBioBn}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white">
                <BookOpen className="h-3.5 w-3.5" /> জীবনী পড়ুন
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
