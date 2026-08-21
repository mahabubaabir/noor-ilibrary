import Link from "next/link"
import { BookOpen, Clock, Library, Search, Sparkles } from "lucide-react"

const modules = [
  {
    title: "Quran",
    description: "Read and listen to the complete Quran with translations in English and Bangla",
    href: "/quran",
    icon: BookOpen,
    color: "bg-emerald-500",
  },
  {
    title: "Hadith",
    description: "Explore authenticated hadith collections from Sahih Bukhari and Muslim",
    href: "/hadith",
    icon: Library,
    color: "bg-amber-500",
  },
  {
    title: "Search",
    description: "Search across the Quran and hadith collections",
    href: "/search",
    icon: Search,
    color: "bg-blue-500",
  },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          <Sparkles className="h-3.5 w-3.5" />
          Welcome to Noor
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl">
          Islamic Knowledge Library
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-stone-600 dark:text-stone-400">
          Read, listen, and study the Quran with translations, explore hadith collections,
          and deepen your understanding with curated study themes.
        </p>
      </div>

      <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => {
          const Icon = mod.icon
          return (
            <Link key={mod.href} href={mod.href}>
              <div className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:border-stone-300 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700">
                <div className={`mb-4 inline-flex rounded-xl p-2.5 ${mod.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">
                  {mod.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {mod.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-8 dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-amber-100 p-2 dark:bg-amber-900/30">
            <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Ayah of the Day
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          A daily reminder from the Quran to keep your heart connected to the divine message.
        </p>
      </div>
    </div>
  )
}
