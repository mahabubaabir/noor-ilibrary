import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300",
        primary: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        secondary: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        destructive: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        outline: "border border-stone-200 text-stone-600 dark:border-stone-700 dark:text-stone-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={badgeVariants({ variant, className })} {...props} />
}

export { Badge, badgeVariants }
