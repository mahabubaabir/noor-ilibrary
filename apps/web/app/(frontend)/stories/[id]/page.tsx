import { notFound } from "next/navigation"
import { Metadata } from "next"
import { STORIES_DATA } from "@/lib/stories-data"
import { PdfEbookReader } from "@/components/reader/pdf-ebook-reader"

interface StoryPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { id } = await params
  const story = STORIES_DATA.find((s) => s.id === id)
  if (!story) {
    return { title: "গল্প পাওয়া যায়নি - নূর লাইব্রেরি" }
  }

  return {
    title: `${story.titleBn} | ${story.figureNameBn} - নূর লাইব্রেরি`,
    description: story.subtitleBn,
  }
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { id } = await params
  const story = STORIES_DATA.find((s) => s.id === id)

  if (!story) {
    notFound()
  }

  return <PdfEbookReader story={story} />
}
