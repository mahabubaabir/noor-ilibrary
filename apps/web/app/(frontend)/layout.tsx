import type { Metadata } from "next"
import { Inter, Noto_Naskh_Arabic, Noto_Sans_Bengali } from "next/font/google"
import "../globals.css"

import { Providers } from "../providers"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { BlurredGeometryBackground } from "../../components/ui/blurred-geometry-background"
import { MotionCursor } from "../../components/ui/motion-cursor"

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
    "Read and listen to the Quran with Arabic text, English and Bangla translations, explore Tafsir, Hadith collections, and study inspiring life stories in a minimal editorial setting.",
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
      <body className="relative min-h-screen bg-white font-sans text-neutral-900 antialiased dark:bg-black dark:text-neutral-100">
        <MotionCursor />
        <BlurredGeometryBackground />
        <Providers>
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
