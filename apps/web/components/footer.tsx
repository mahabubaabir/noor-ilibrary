import React from "react"
import Link from "next/link"
import { Heart, BookOpen, Library, Sparkles, User, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-stone-200/80 bg-white/70 backdrop-blur-xl dark:border-stone-800/80 dark:bg-stone-950/70">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo & Vision */}
          <div className="flex flex-col items-center gap-1.5 sm:items-start">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white shadow-md shadow-emerald-600/20">
                ن
              </span>
              <span className="font-bold text-stone-900 dark:text-stone-100">
                নূর ইসলামিক লাইব্রেরি
              </span>
            </Link>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              জ্ঞানের আলো ছড়িয়ে পড়ুক বিশ্বজুড়ে • Spreading the Light of Islamic Knowledge
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 text-xs font-semibold text-stone-600 dark:text-stone-300">
            <Link href="/quran" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              কুরআন
            </Link>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <Link href="/hadith" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              হাদিস
            </Link>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <Link href="/names-of-allah" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              ৯৯ নাম
            </Link>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <Link href="/duas" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              দু&apos;আ ও আযকার
            </Link>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <Link href="/hisnul-muslim" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              হিসনুল মুসলিম
            </Link>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <Link href="/tasbih" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              তাসবীহ
            </Link>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <Link href="/zakat-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              যাকাত
            </Link>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <Link href="/companions" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              সাহাবীদের জীবনী
            </Link>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <Link href="/stories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              জীবনগাঁথা
            </Link>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <Link href="/library" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              লাইব্রেরি
            </Link>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <Link href="/studio" className="flex items-center gap-1 font-bold text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 transition-colors">
              <Sparkles className="h-3 w-3" />
              Content Studio
            </Link>
          </div>
        </div>

        {/* Creator Attribution */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-stone-200/60 pt-6 text-xs text-stone-500 dark:border-stone-800/60 sm:flex-row">
          <p className="flex items-center gap-1 font-medium">
            Made with{" "}
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500 animate-pulse inline" />{" "}
            |{" "}
            <a
              href="https://mahabub-aabir.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hover:underline transition-colors"
            >
              Mahabub H. Aabir
              <ExternalLink className="h-3 w-3 inline opacity-70" />
            </a>
          </p>

          <p className="text-[11px] text-stone-400 dark:text-stone-500">
            © {new Date().getFullYear()} Noor Islamic Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
