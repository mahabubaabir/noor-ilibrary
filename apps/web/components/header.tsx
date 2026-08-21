'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon } from '@/components/icons'

const NAV = [
  { href: '/quran', label: 'Quran' },
  { href: '/search', label: 'Search' },
  { href: '/hadith', label: 'Hadith' },
  { href: '/study', label: 'Study' },
]

export function Header() {
  const [dark, setDark] = useState(false)
  const [user, setUser] = useState<{ email: string; name: string | null } | null>(null)

  useEffect(() => {
    // Sync with the class the inline <script> already set on <html>
    setDark(document.documentElement.classList.contains('dark')) // eslint-disable-line react-hooks/set-state-in-effect
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((body) => setUser(body.user ?? null))
      .catch(() => setUser(null))
  }, [])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/80 backdrop-blur dark:border-stone-800 dark:bg-stone-950/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="font-arabic text-emerald-700 dark:text-emerald-400">نور</span>
          <span>Noor</span>
        </Link>
        <nav className="ml-auto flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                'text-stone-600 hover:bg-stone-100 hover:text-stone-900',
                'dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100',
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={user ? '/library' : '/login'}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              'text-stone-600 hover:bg-stone-100 hover:text-stone-900',
              'dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100',
            )}
          >
            {user ? 'Library' : 'Login'}
          </Link>
        </nav>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="rounded-lg p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
        >
          {dark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
        </button>
      </div>
    </header>
  )
}
