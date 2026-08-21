import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: { select: { name: true, email: true } },
      },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ post })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const post = await prisma.blogPost.findUnique({ where: { slug } })
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const body = await request.json()
    const updated = await prisma.blogPost.update({
      where: { id: post.id },
      data: {
        title: body.title !== undefined ? body.title : post.title,
        titleBn: body.titleBn !== undefined ? body.titleBn : post.titleBn,
        excerpt: body.excerpt !== undefined ? body.excerpt : post.excerpt,
        content: body.content !== undefined ? body.content : post.content,
        category: body.category !== undefined ? body.category : post.category,
        coverImage: body.coverImage !== undefined ? body.coverImage : post.coverImage,
        published: body.published !== undefined ? body.published : post.published,
      },
    })

    return NextResponse.json({ ok: true, post: updated })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    await prisma.blogPost.delete({ where: { slug } })
    return NextResponse.json({ ok: true, message: 'Post deleted successfully' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
