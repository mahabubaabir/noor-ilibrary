"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2, Bookmark, Heart, BookOpen, Mail } from "lucide-react"
import { NoorLogo } from "@/components/ui/noor-logo"

function RegisterForm() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/library"
  const intent = searchParams.get("intent")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const r = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const d = await r.json()
      if (d.error) {
        setError(d.error)
        setLoading(false)
        return
      }
      window.location.href = redirect
    } catch {
      setError("অ্যাকাউন্ট তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।")
      setLoading(false)
    }
  }

  const getIntentMessage = () => {
    if (intent === "bookmark") {
      return "কুরআনের আয়াত সংরক্ষণ ও বুকমার্ক করতে একটি নতুন অ্যাকাউন্ট তৈরি করুন।"
    }
    if (intent === "progress") {
      return "আপনার কুরআন পাঠের অগ্রগতি ট্র্যাক করতে একটি নতুন অ্যাকাউন্ট তৈরি করুন।"
    }
    if (intent === "hadith") {
      return "হাদিস বুকমার্ক ও সংরক্ষণ করতে একটি নতুন অ্যাকাউন্ট তৈরি করুন।"
    }
    if (redirect && redirect !== "/library") {
      return "আপনার সংরক্ষিত বিষয়বস্তু সংরক্ষণ করতে একটি নতুন অ্যাকাউন্ট তৈরি করুন।"
    }
    return null
  }

  const intentMessage = getIntentMessage()

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex justify-center">
          <NoorLogo size={42} showText={false} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          নতুন অ্যাকাউন্ট খুলুন
        </h1>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Create your account to track reading & save bookmarks
        </p>
      </div>

      {/* Auth-gated prompt banner */}
      {intentMessage && (
        <div className="mb-6 rounded-2xl border border-neutral-300 bg-neutral-50 p-4 text-xs dark:border-neutral-700 dark:bg-neutral-900">
          <div className="flex items-start gap-2.5">
            {intent === "progress" ? (
              <BookOpen className="h-4 w-4 flex-shrink-0 text-black dark:text-white mt-0.5" />
            ) : intent === "hadith" ? (
              <Heart className="h-4 w-4 flex-shrink-0 text-black dark:text-white mt-0.5" />
            ) : (
              <Bookmark className="h-4 w-4 flex-shrink-0 text-black dark:text-white mt-0.5" />
            )}
            <p className="leading-relaxed text-neutral-800 dark:text-neutral-200">
              {intentMessage}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </p>
        )}

        <div>
          <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
            আপনার পূর্ণ নাম
          </label>
          <input
            type="text"
            placeholder="আপনার নাম"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
            ইমেইল এড্রেস
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
            পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 pr-10 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black dark:hover:text-white"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black py-3 text-xs font-bold text-white shadow transition-all hover:bg-neutral-800 active:scale-95 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          {loading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "অ্যাকাউন্ট তৈরি করুন (Register)"}
        </button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
        <Mail className="h-3 w-3" />
        <span>অ্যাকাউন্ট খোলার সাথে সাথে কনফার্মেশন ইমেইল পাবেন</span>
      </div>

      <p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link
          href={`/login?redirect=${encodeURIComponent(redirect)}${intent ? `&intent=${intent}` : ""}`}
          className="font-bold text-black hover:underline dark:text-white"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <Suspense fallback={<Loader2 className="h-6 w-6 animate-spin text-neutral-400" />}>
        <RegisterForm />
      </Suspense>
    </div>
  )
}
