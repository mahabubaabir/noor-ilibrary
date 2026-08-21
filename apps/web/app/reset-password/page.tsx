"use client"

import { use, useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { KeyRound, Eye, EyeOff, Loader2, CheckCircle2, ArrowRight } from "lucide-react"

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!token) {
      setError("রিসেট টোকেন পাওয়া যায়নি। অনুগ্রহ করে নতুন করে আবেদন করুন।")
      return
    }

    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।")
      return
    }

    if (password !== confirmPassword) {
      setError("উভয় পাসওয়ার্ড মেলেনি। আবার যাচাই করুন।")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || "পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে")
      } else {
        setSuccess(true)
      }
    } catch {
      setError("নেটওয়ার্ক ত্রুটি। পুনরায় চেষ্টা করুন।")
    }
    setLoading(false)
  }

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-sm font-semibold text-red-600 dark:text-red-400">
          অবৈধ লিঙ্ক বা মেয়াদোত্তীর্ণ টোকেন।
        </p>
        <Link
          href="/forgot-password"
          className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
        >
          নতুন লিঙ্ক সংগ্রহ করুন <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="rounded-2xl bg-emerald-50 p-6 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
          <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base font-bold">পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!</h2>
          <p className="mt-1 text-xs">আপনার নতুন পাসওয়ার্ড দিয়ে এখন লগইন করতে পারেন।</p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700"
        >
          এখনই লগইন করুন <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-2xl bg-red-50 p-4 text-xs font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-stone-700 dark:text-stone-300">
          নতুন পাসওয়ার্ড (New Password)
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="কমপক্ষে ৬ অক্ষর"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 pr-10 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-stone-700 dark:text-stone-300">
          নতুন পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="পুনরায় পাসওয়ার্ড লিখুন"
          required
          minLength={6}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "পাসওয়ার্ড সংরক্ষণ করুন"}
      </button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-stone-200/80 bg-white p-8 shadow-xl dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
            <KeyRound className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            নতুন পাসওয়ার্ড সেট করুন
          </h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Set and confirm your new secure password
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-6 text-xs text-stone-400">টোকেন যাচাই হচ্ছে...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
