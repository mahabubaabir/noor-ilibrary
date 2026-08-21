import type { Metadata, Viewport } from 'next'
import { Amiri, Inter, Noto_Sans_Bengali } from 'next/font/google'
import { Header } from '@/components/header'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-latin',
  display: 'swap',
})

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-arabic-family',
  display: 'swap',
})

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali-family',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Noor — Islamic Knowledge Library',
    template: '%s · Noor',
  },
  description:
    'Read, listen and study the Quran with Arabic, English and Bangla translations, tafsir and hadith.',
  applicationName: 'Noor',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0a09' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${amiri.variable} ${notoSansBengali.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 py-6 text-center text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
          <p className="mx-auto max-w-3xl px-4">
            Content sources: Tanzil / AlQuran Cloud, Quran.com, UmmahAPI — free open Islamic data.
            Read, learn and understand. {new Date().getFullYear()}
          </p>
        </footer>
      </body>
    </html>
  )
}