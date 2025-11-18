import matter from 'gray-matter'
import { readFileSync } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: { slug: string }
}

interface PostData {
  title: string
  date: string
  tags: string[]
}

export default async function BlogPost({ params }: PageProps) {
  try {
    const postsDirectory = join(process.cwd(), 'content', 'blog')
    const fullPath = join(postsDirectory, `${params.slug}.mdx`)
    const fileContents = readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <article className="bg-white rounded-lg p-6 shadow-lg">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {(data as PostData).tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold mb-2">{(data as PostData).title}</h1>
              <p className="text-gray-500">
                {new Date((data as PostData).date).toLocaleDateString()}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <pre className="whitespace-pre-wrap">{content}</pre>
            </div>
          </article>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
