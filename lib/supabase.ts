import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export type Project = {
  id: number
  title: string
  description: string | null
  image_url: string | null
  demo_url: string | null
  github_url: string | null
  tags: string[] | null
  created_at: string
  updated_at: string
}

export type BlogPost = {
  id: number
  slug: string
  title: string
  content: string | null
  excerpt: string | null
  tags: string[] | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export type ContactSubmission = {
  id: number
  name: string
  email: string
  message: string | null
  created_at: string
}

// Helper functions
export const uploadImage = async (file: File, bucket: string = 'images') => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `portfolio/${fileName}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return publicUrl
}
