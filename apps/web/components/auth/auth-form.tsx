'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
    }

    const res = await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null
      setError(body?.error ?? 'Authentication failed')
      setLoading(false)
      return
    }

    router.push('/library')
    router.refresh()
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardBody>
        <h1 className="text-2xl font-semibold">{mode === 'login' ? 'Login' : 'Create account'}</h1>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Save bookmarks and reading progress across your devices.
        </p>

        <form action={onSubmit} className="mt-6 space-y-3">
          {mode === 'register' && <Input name="name" placeholder="Name (optional)" />}
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" minLength={8} required />
          {error && <p className="text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account'}
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
