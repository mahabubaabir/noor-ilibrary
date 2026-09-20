import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { HISTORY_BOOKS, getHistoryBook } from "@/lib/history-books"
import { BookReader } from "@/components/history/book-reader"

export function generateStaticParams() {
  return HISTORY_BOOKS.map((book) => ({ slug: book.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const book = getHistoryBook(slug)
  if (!book) return { title: "Book not found — Noor" }
  return {
    title: `${book.titleBn} (${book.titleEn}) — Noor History Library`,
    description: book.descriptionEn,
  }
}

export default async function HistoryBookPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = getHistoryBook(slug)
  if (!book) notFound()
  return <BookReader book={book} />
}
