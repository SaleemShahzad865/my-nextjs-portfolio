import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { href: 'https://github.com/yourusername', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/yourusername', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://twitter.com/yourusername', icon: Twitter, label: 'Twitter' },
    { href: 'mailto:your.email@example.com', icon: Mail, label: 'Email' },
  ]

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2023 Your Name. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link key={social.href} href={social.href} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
