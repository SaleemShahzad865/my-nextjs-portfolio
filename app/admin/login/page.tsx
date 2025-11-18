'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage your portfolio content
          </p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: {
                background: '#3b82f6',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                fontSize: '14px',
              },
              input: {
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                padding: '12px',
                fontSize: '14px',
              },
            }
          }}
          providers={[]}
          redirectTo={`${window.location.origin}/admin`}
        />
        <div className="text-sm text-center">
          <p className="text-gray-600">
            Don't have an account? Please create one via Supabase dashboard first.
          </p>
        </div>
      </div>
    </div>
  )
}
