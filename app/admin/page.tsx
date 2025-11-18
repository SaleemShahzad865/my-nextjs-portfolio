import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { FileText, Settings, MessageSquare, Plus } from 'lucide-react'
import { Project, BlogPost, ContactSubmission } from '@/lib/supabase'

async function getStats() {
  const supabase = createServerComponentClient({ cookies })

  const [projectsResult, postsResult, contactsResult] = await Promise.all([
    supabase.from('projects').select('id', { count: 'exact' }),
    supabase.from('blog_posts').select('id', { count: 'exact' }),
    supabase.from('contact_submissions').select('id', { count: 'exact' })
  ])

  return {
    projects: projectsResult.count || 0,
    posts: postsResult.count || 0,
    contacts: contactsResult.count || 0,
  }
}

async function getRecentPosts() {
  const supabase = createServerComponentClient({ cookies })

  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return data || []
}

async function getRecentContacts() {
  const supabase = createServerComponentClient({ cookies })

  const { data } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return data || []
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const recentPosts = await getRecentPosts()
  const recentContacts = await getRecentContacts()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="space-x-4">
          <Link
            href="/admin/projects/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Link>
          <Link
            href="/admin/blog/new"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 inline-flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Blog Post
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Settings className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold">{stats.projects}</h3>
              <p className="text-gray-600">Projects</p>
            </div>
          </div>
          <Link href="/admin/projects" className="text-blue-600 hover:underline mt-4 inline-block">
            Manage Projects →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <FileText className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold">{stats.posts}</h3>
              <p className="text-gray-600">Blog Posts</p>
            </div>
          </div>
          <Link href="/admin/blog" className="text-green-600 hover:underline mt-4 inline-block">
            Manage Posts →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <MessageSquare className="h-10 w-10 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold">{stats.contacts}</h3>
              <p className="text-gray-600">Contact Submissions</p>
            </div>
          </div>
          <Link href="/admin/contact" className="text-purple-600 hover:underline mt-4 inline-block">
            View Messages →
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Blog Posts</h2>
          <div className="space-y-4">
            {recentPosts.length > 0 ? (
              recentPosts.map((post: BlogPost) => (
                <div key={post.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No blog posts yet.</p>
            )}
          </div>
          <Link href="/admin/blog/new" className="text-blue-600 hover:underline mt-4 inline-block">
            + Create New Post
          </Link>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Contact Submissions</h2>
          <div className="space-y-4">
            {recentContacts.length > 0 ? (
              recentContacts.map((contact: ContactSubmission) => (
                <div key={contact.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    <p className="text-sm">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={`/admin/contact/${contact.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No contact submissions yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
