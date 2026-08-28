"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import {
  BookOpen,
  Heart,
  Library,
  LogOut,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  User as UserIcon,
  X,
  Compass,
  Coins,
  ShieldCheck,
  ChevronDown,
  BookMarked,
  Layers,
  FileText,
} from "lucide-react"
import { NoorLogo } from "./ui/noor-logo"

interface NavDropdownGroup {
  id: string
  label: string
  items: {
    href: string
    title: string
    desc: string
    icon: React.ComponentType<{ className?: string }>
    badge?: string
  }[]
}

const navGroups: NavDropdownGroup[] = [
  {
    id: "scriptures",
    label: "কুরআন ও হাদিস",
    items: [
      {
        href: "/quran",
        title: "আল-কুরআনুল কারীম",
        desc: "১১৪টি সূরা, আরবী তিলাওয়াত, বাংলা ও ইংরেজি অনুবাদ",
        icon: BookOpen,
        badge: "অডিও",
      },
      {
        href: "/hadith",
        title: "বিশুদ্ধ হাদিস সংকলন",
        desc: "বুখারী, মুসলিমসহ ৭টি নির্ভরযোগ্য হাদিস গ্রন্থ",
        icon: Library,
        badge: "সহীহ",
      },
    ],
  },
  {
    id: "faith",
    label: "ঈমান ও ইতিহাস",
    items: [
      {
        href: "/companions",
        title: "সাহাবায়ে কেরাম",
        desc: "রাসূলুল্লাহ ﷺ ও চারপাশের সাহাবীদের আলোকিত জীবন",
        icon: ShieldCheck,
        badge: "জীবনী",
      },
      {
        href: "/names-of-allah",
        title: "আল্লাহর ৯৯টি সুন্দর নাম",
        desc: "আসমাউল হুসনার আরবী, অর্থ, ফজিলত ও তিলাওয়াত",
        icon: Sparkles,
      },
      {
        href: "/stories",
        title: "নবী ও রাসূলদের জীবনগাঁথা",
        desc: "কুরআন ও সুন্নাহর আলোকে নবীদের সত্য ঘটনা",
        icon: BookMarked,
      },
      {
        href: "/duas",
        title: "মাসনূন দু'আ ও যিকির",
        desc: "কুরআনী রাব্বানা ও প্রাত্যহিক জীবনের দু'আ",
        icon: Heart,
      },
      {
        href: "/hisnul-muslim",
        title: "হিসনুল মুসলিম (মুমিনের দুর্গ)",
        desc: "শায়েখ আল-ক্বাহত্বানী সংকলিত সহীহ দু'আ",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: "tools",
    label: "টুলস ও প্রবন্ধ",
    items: [
      {
        href: "/tasbih",
        title: "স্মার্ট ডিজিটাল তাসবীহ",
        desc: "প্রাত্যহিক যিকির ও ইসতিগফার গণনার কাউন্টার",
        icon: Compass,
      },
      {
        href: "/zakat-calculator",
        title: "যাকাত ক্যালকুলেটর",
        desc: "সম্পদ ও নিসাব হিসাব করে যাকাত নির্ধারণ",
        icon: Coins,
      },
      {
        href: "/blog",
        title: "ইসলামিক ব্লগ ও প্রবন্ধ",
        desc: "জীবন ঘনিষ্ঠ শিক্ষণীয় প্রবন্ধ ও চিন্তাধারা",
        icon: FileText,
      },
    ],
  },
]

export function Header() {
  const pathname = usePathname()
  const [user, setUser] = useState<{
    name: string | null
    username?: string | null
    email: string
    avatar?: string | null
    role?: string
  } | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>("scriptures")
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme")
    const isDark = saved ? saved === "dark" : true
    setDarkMode(isDark)
    document.documentElement.classList.toggle("dark", isDark)
    document.documentElement.classList.toggle("light", !isDark)
  }, [])

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => d.user && setUser(d.user))
      .catch(() => {})
  }, [pathname])

  // Close menus on page change
  useEffect(() => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)
  }, [pathname])

  const toggleTheme = () => {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.classList.toggle("dark", next)
    document.documentElement.classList.toggle("light", !next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    window.location.href = "/"
  }

  const handleMouseEnter = (id: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setActiveDropdown(id)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/60 bg-white/85 backdrop-blur-2xl transition-colors dark:border-stone-800/60 dark:bg-stone-900/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="transition-transform hover:scale-[1.02] active:scale-98">
          <NoorLogo size={36} />
        </Link>

        {/* Minimalist Desktop Dropdown Navigation */}
        <nav className="hidden items-center gap-1.5 md:flex" onMouseLeave={handleMouseLeave}>
          {navGroups.map((group) => {
            const isGroupActive = group.items.some(
              (item) => pathname === item.href || pathname?.startsWith(item.href + "/")
            )
            const isOpen = activeDropdown === group.id

            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(group.id)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(isOpen ? null : group.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    isGroupActive || isOpen
                      ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shadow-sm"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800/80 dark:hover:text-stone-100"
                  }`}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-600 dark:text-emerald-400" : "text-stone-400"
                    }`}
                  />
                </button>

                {/* Dropdown Menu Panel */}
                {isOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 w-80 rounded-3xl border border-stone-200/80 bg-white/95 p-2.5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 dark:border-stone-800/80 dark:bg-stone-900/95"
                    onMouseEnter={() => handleMouseEnter(group.id)}
                  >
                    <div className="flex flex-col gap-1">
                      {group.items.map((item) => {
                        const Icon = item.icon
                        const isCurrent = pathname === item.href || pathname?.startsWith(item.href + "/")

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-start gap-3 rounded-2xl p-2.5 transition-all ${
                              isCurrent
                                ? "bg-emerald-50/80 dark:bg-emerald-950/40"
                                : "hover:bg-stone-50 dark:hover:bg-stone-800/60"
                            }`}
                          >
                            <div
                              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-colors ${
                                isCurrent
                                  ? "bg-emerald-600 text-white"
                                  : "bg-stone-100 text-stone-600 group-hover:bg-emerald-600 group-hover:text-white dark:bg-stone-800 dark:text-stone-300"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`text-xs font-bold transition-colors ${
                                    isCurrent
                                      ? "text-emerald-800 dark:text-emerald-300"
                                      : "text-stone-900 group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400"
                                  }`}
                                >
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="mt-0.5 text-[11px] leading-tight text-stone-500 line-clamp-1 dark:text-stone-400">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Action Controls & User Section */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search */}
          <Link
            href="/search"
            title="অনুসন্ধান করুন"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
          >
            <Search className="h-4 w-4" />
          </Link>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              title={darkMode ? "লাইট মোড" : "ডার্ক মোড"}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          {/* User Auth Info */}
          {user ? (
            <div className="flex items-center gap-1.5">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="hidden items-center rounded-xl bg-amber-100/90 px-2.5 py-1 text-[11px] font-extrabold text-amber-800 transition-colors hover:bg-amber-200 dark:bg-amber-950/60 dark:text-amber-300 sm:flex"
                >
                  Admin
                </Link>
              )}

              <Link
                href="/library"
                className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50/80 px-2.5 py-1 text-xs font-bold text-stone-700 transition-all hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800/80 dark:text-stone-200"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User Avatar"}
                    className="h-5 w-5 rounded-full object-cover ring-1 ring-emerald-500/40"
                  />
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-black text-white">
                    {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <span className="max-w-[80px] truncate sm:max-w-[110px]">
                  {user.name || user.username || "প্রোফাইল"}
                </span>
              </Link>

              <button
                onClick={logout}
                title="লগআউট"
                className="hidden h-9 w-9 items-center justify-center rounded-xl text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 sm:flex"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden sm:block">
              <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-98">
                <UserIcon className="h-3.5 w-3.5" />
                <span>সাইন ইন</span>
              </button>
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="max-h-[85vh] overflow-y-auto border-t border-stone-200/80 bg-white/95 px-4 pb-6 pt-3 shadow-2xl backdrop-blur-2xl dark:border-stone-800/80 dark:bg-stone-900/95 md:hidden animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navGroups.map((group) => {
              const isExpanded = mobileExpandedGroup === group.id

              return (
                <div key={group.id} className="rounded-2xl border border-stone-200/60 bg-stone-50/50 dark:border-stone-800/60 dark:bg-stone-800/30 overflow-hidden">
                  <button
                    onClick={() => setMobileExpandedGroup(isExpanded ? null : group.id)}
                    className="flex w-full items-center justify-between p-3 text-xs font-bold text-stone-800 dark:text-stone-200"
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-stone-400 transition-transform ${isExpanded ? "rotate-180 text-emerald-600" : ""}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="flex flex-col gap-1 border-t border-stone-200/40 p-2 dark:border-stone-800/40">
                      {group.items.map((item) => {
                        const Icon = item.icon
                        const isCurrent = pathname === item.href || pathname?.startsWith(item.href + "/")

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 rounded-xl p-2.5 text-xs font-semibold transition-all ${
                              isCurrent
                                ? "bg-emerald-600 text-white"
                                : "text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5">
                                <span>{item.title}</span>
                                {item.badge && (
                                  <span className={`rounded-full px-1.5 py-0.2 text-[8px] font-bold ${isCurrent ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"}`}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}

            <div className="my-2 h-px bg-stone-200 dark:bg-stone-800" />

            {/* Mobile Auth Links */}
            {user ? (
              <div className="flex flex-col gap-2">
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl bg-amber-50 p-2.5 text-xs font-bold text-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  href="/library"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl bg-emerald-50 p-2.5 text-xs font-bold text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                >
                  <Heart className="h-4 w-4 text-emerald-600" />
                  আমার লাইব্রেরি ও বুকমার্ক
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center gap-3 rounded-xl p-2.5 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut className="h-4 w-4" />
                  সাইন আউট (Sign Out)
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/20"
              >
                <UserIcon className="h-4 w-4" />
                সাইন ইন করুন
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
