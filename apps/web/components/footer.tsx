import React from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { NoorLogo } from "./ui/noor-logo"

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo & Vision */}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link href="/" className="transition-opacity hover:opacity-90">
              <NoorLogo size={30} />
            </Link>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              জ্ঞানের আলো ছড়িয়ে পড়ুক বিশ্বজুড়ে • Spreading the Light of Islamic Knowledge
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-neutral-600 dark:text-neutral-400">
            <Link href="/quran" className="hover:text-black dark:hover:text-white transition-colors">
              কুরআন
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <Link href="/hadith" className="hover:text-black dark:hover:text-white transition-colors">
              হাদিস
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <Link href="/names-of-allah" className="hover:text-black dark:hover:text-white transition-colors">
              ৯৯ নাম
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <Link href="/duas" className="hover:text-black dark:hover:text-white transition-colors">
              দু&apos;আ ও আযকার
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <Link href="/hisnul-muslim" className="hover:text-black dark:hover:text-white transition-colors">
              হিসনুল মুসলিম
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <Link href="/tasbih" className="hover:text-black dark:hover:text-white transition-colors">
              তাসবীহ
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <Link href="/zakat-calculator" className="hover:text-black dark:hover:text-white transition-colors">
              যাকাত
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <Link href="/companions" className="hover:text-black dark:hover:text-white transition-colors">
              সাহাবীদের জীবনী
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <Link href="/stories" className="hover:text-black dark:hover:text-white transition-colors">
              জীবনগাঁথা
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <Link href="/library" className="hover:text-black dark:hover:text-white transition-colors">
              লাইব্রেরি
            </Link>
          </div>
        </div>

        {/* Creator Attribution */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-neutral-100 pt-6 text-xs text-neutral-500 dark:border-neutral-900 sm:flex-row">
          <p className="flex items-center gap-1 font-normal">
            Crafted for the Ummah |{" "}
            <a
              href="https://mahabub-aabir.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-black hover:underline dark:text-white transition-colors"
            >
              Mahabub H. Aabir
              <ExternalLink className="h-3 w-3 inline opacity-60" />
            </a>
          </p>

          <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            © {new Date().getFullYear()} Noor Islamic Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
