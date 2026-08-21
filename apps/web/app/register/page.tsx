import Link from 'next/link'
import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth/auth-form'

export const metadata: Metadata = { title: 'Create account' }

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <AuthForm mode="register" />
      <p className="mt-4 text-center text-sm text-stone-500 dark:text-stone-400">
        Already have an account?{' '}
        <Link href="/login" className="text-emerald-700 hover:underline dark:text-emerald-400">
          Login
        </Link>
      </p>
    </div>
  )
}
