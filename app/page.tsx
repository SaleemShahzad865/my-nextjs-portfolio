import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full"></div>
              <h1 className="text-4xl sm:text-6xl font-bold mb-4">
                Hi, I'm <span className="text-blue-600">Your Name</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Full Stack Developer passionate about creating amazing web experiences
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/projects"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Download Resume
                <Download className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Sections - can be expanded */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 dark:bg-opacity-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What I Do</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              I specialize in modern web development technologies
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Frontend Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Creating responsive and interactive user interfaces with React, Next.js, and TypeScript.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Backend Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Building robust server-side applications and APIs with Node.js and various databases.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">DevOps & Deployment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Implementing CI/CD pipelines, containerization, and cloud deployment strategies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
