import { Code, Palette, Server, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-gray-600">
            Passionate developer creating digital experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <p className="text-gray-600 mb-6">
              Hi! I'm a full-stack developer with a passion for creating beautiful, functional web applications.
              I love working with modern technologies and solving complex problems.
            </p>
            <p className="text-gray-600">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
              or experimenting with new design trends.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Experience</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 5+ years in web development</li>
              <li>• Full-stack applications</li>
              <li>• Team leadership experience</li>
              <li>• Open-source contributions</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Skills & Technologies</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Code className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Frontend</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>React/Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
              </ul>
            </div>
            <div className="text-center">
              <Server className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h3 className="font-semibold mb-2">Backend</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Node.js</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>API Design</li>
              </ul>
            </div>
            <div className="text-center">
              <Palette className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h3 className="font-semibold mb-2">Design</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>UI/UX Design</li>
                <li>Responsive Design</li>
                <li>Figma</li>
                <li>Accessibility</li>
              </ul>
            </div>
            <div className="text-center">
              <Users className="mx-auto h-12 w-12 text-orange-600 mb-4" />
              <h3 className="font-semibold mb-2">Tools</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Git/GitHub</li>
                <li>Docker</li>
                <li>AWS</li>
                <li>Vercel</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Download Resume
          </button>
        </div>
      </div>
    </div>
  )
}
