import type { HTMLAttributes } from "react"

function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 ${className}`}
      {...props}
    />
  )
}

function CardHeader({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-5 ${className}`} {...props} />
}

function CardTitle({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`font-semibold text-stone-900 dark:text-stone-100 ${className}`} {...props} />
}

function CardDescription({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-sm text-stone-500 dark:text-stone-400 ${className}`} {...props} />
}

function CardContent({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-5 pb-5 ${className}`} {...props} />
}

function CardBody({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 ${className}`} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardBody }
