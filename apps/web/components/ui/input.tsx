import type { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>
}

function Input({ className = "", ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      className={`flex h-10 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900/30 focus:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:ring-white/30 dark:focus:border-white ${className}`}
      {...props}
    />
  )
}

export { Input }
