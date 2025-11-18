export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: number
          slug: string
          title: string
          content: string | null
          excerpt: string | null
          tags: Json | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          slug: string
          title: string
          content?: string | null
          excerpt?: string | null
          tags?: Json | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          slug?: string
          title?: string
          content?: string | null
          excerpt?: string | null
          tags?: Json | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          id: number
          name: string
          email: string
          message: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          message?: string | null
          created_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: number
          title: string
          description: string | null
          image_url: string | null
          demo_url: string | null
          github_url: string | null
          tags: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description?: string | null
          image_url?: string | null
          demo_url?: string | null
          github_url?: string | null
          tags?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string | null
          image_url?: string | null
          demo_url?: string | null
          github_url?: string | null
          tags?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
