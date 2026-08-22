import type { Metadata } from "next"
import { Inter, Noto_Naskh_Arabic, Noto_Sans_Bengali } from "next/font/google"
import "./globals.css"

import { Providers } from "./providers"
import { Header } from "../components/header"
import { BlurredGeometryBackground } from "../components/ui/blurred-geometry-background"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
})

const notoArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-family",
  weight: ["400", "700"],
})

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali-family",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Noor - Islamic Knowledge Library",
  description:
    "Read and listen to the Quran with Arabic text, English and Bangla translations, explore Tafsir, Hadith collections, watch Surah video recitations, and study inspiring life stories.",
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${notoArabic.variable} ${notoBengali.variable}`}
    >
      <body className="relative min-h-screen bg-stone-50/95 font-sans text-stone-800 antialiased dark:bg-stone-950/95 dark:text-stone-200">
        <BlurredGeometryBackground />
        <Providers>
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
