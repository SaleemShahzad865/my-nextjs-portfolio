import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Settings, Grid, FileText, Upload, MessageSquare } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_project_url_here') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-4">Admin Panel Setup Required</h2>
          <p className="text-gray-600 mb-6">
            The admin panel requires Supabase configuration to work.
          </p>
          <div className="space-y-3">
            <p>⚠️ <strong>To enable admin functionality:</strong></p>
            <ol className="list-decimal ml-4 space-y-2 text-sm text-gray-700">
              <li>Create a free account at <a href="https://supabase.com" className="text-blue-600 underline" target="_blank">supabase.com</a></li>
              <li>Create a new project</li>
              <li>Copy your URL and anon key to <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code></li>
              <li>Run the database schema from README.md</li>
            </ol>
          </div>
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500 mb-4">Preview mode - main portfolio still works!</p>
            <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              View Public Portfolio →
            </a>
          </div>
        </div>
      </div>
    )
  }

  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/admin/login')
  }

  const handleSignOut = async () => {
    const supabase = createServerComponentClient({ cookies })
    await supabase.auth.signOut()
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center px-6 border-b">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Grid className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/projects"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Settings className="mr-3 h-5 w-5" />
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/admin/blog"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FileText className="mr-3 h-5 w-5" />
                Blog Posts
              </Link>
            </li>
            <li>
              <Link
                href="/admin/uploads"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Upload className="mr-3 h-5 w-5" />
                Media Library
              </Link>
            </li>
            <li>
              <Link
                href="/admin/contact"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                Contact Submissions
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center w-full px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <div className="py-8 px-8">
          {children}
        </div>
      </div>
    </div>
  )
}
