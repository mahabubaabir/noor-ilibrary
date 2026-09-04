import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes } from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 dark:focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm dark:bg-white dark:text-black dark:hover:bg-neutral-200",
        destructive: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black",
        outline: "border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800",
        secondary: "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700",
        ghost: "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-sm",
        lg: "h-12 rounded-xl px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  ref?: React.Ref<HTMLButtonElement>
}

function Button({ className, variant, size, ref, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      ref={ref}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
