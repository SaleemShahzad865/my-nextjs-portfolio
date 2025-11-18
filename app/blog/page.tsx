import Link from 'next/link'
import { motion } from 'framer-motion'
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Thoughts on development, design, and technology
          </p>
        </motion.div>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.excerpt}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString()}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
