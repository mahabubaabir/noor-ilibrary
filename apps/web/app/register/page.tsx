"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react"

export default function RegisterPage() {
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
      if (d.error) { setError(d.error); setLoading(false); return }
      window.location.href = "/library"
    } catch { setError("Registration failed"); setLoading(false) }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Create account</h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Join Noor to save your progress</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</p>}
          <input type="text" placeholder="Name" required value={name} onChange={e => setName(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100" />
          <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100" />
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password (min 6 chars)" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 pr-10 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <button type="submit" disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition-all active:scale-[0.98]">
            {loading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Create Account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-emerald-600 hover:underline dark:text-emerald-400">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
