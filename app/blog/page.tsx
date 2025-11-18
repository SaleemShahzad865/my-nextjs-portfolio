import Link from 'next/link'
import matter from 'gray-matter'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
}

function getPosts(): Post[] {
  const postsDirectory = join(process.cwd(), 'content', 'blog')
  const filenames = readdirSync(postsDirectory)

  return filenames.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const fullPath = join(postsDirectory, filename)
    const fileContents = readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      excerpt: fileContents.split('---')[2]?.split('\n').slice(1, 4).join(' ').substring(0, 150) + '...'
    }
  })
}

export default function Blog() {
  const posts = getPosts()

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600">
            Thoughts on development, design, and technology
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-600">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>
              <div className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString()}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
