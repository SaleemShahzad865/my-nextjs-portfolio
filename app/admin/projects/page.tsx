import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'
import { Project } from '@/lib/supabase'

async function getProjects() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return data || []
}

async function deleteProject(id: number) {
  'use server'
  const supabase = createServerComponentClient({ cookies })
  await supabase.from('projects').delete().eq('id', id)
}

export default async function AdminProjects() {
  const projects = await getProjects()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects Management</h1>
        <Link
          href="/admin/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">All Projects</h2>
        </div>
        <div className="p-6">
          {projects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Title</th>
                    <th className="text-left py-2 px-4">Description</th>
                    <th className="text-left py-2 px-4">Created</th>
                    <th className="text-center py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project: Project) => (
                    <tr key={project.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">{project.title}</td>
                      <td className="py-4 px-4">
                        {project.description ? project.description.slice(0, 100) + '...' : 'No description'}
                      </td>
                      <td className="py-4 px-4">
                        {new Date(project.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center space-x-2">
                          {project.demo_url && (
                            <a
                              href={project.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <form
                            action={deleteProject.bind(null, project.id)}
                            className="inline"
                            onSubmit={(e) => {
                              if (!confirm('Are you sure you want to delete this project?')) {
                                e.preventDefault()
                              }
                            }}
                          >
                            <button type="submit" className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-6">Get started by adding your first project.</p>
              <Link
                href="/admin/projects/new"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Your First Project
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
