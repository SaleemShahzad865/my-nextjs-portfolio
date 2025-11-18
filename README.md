# Portfolio Website with Admin Panel

This is a full-stack portfolio website featuring:
- Modern Next.js frontend with admin panel
- Supabase database and authentication
- Image upload system
- Content management for projects and blog posts
- Responsive design with Tailwind CSS

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the database setup SQL (see below)
5. Enable authentication in Supabase

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the frontend
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel

### 4. Create Admin User

Go to Supabase Authentication → Users and create an admin account, then log in at `/admin/login`.

## Database Schema

Run this SQL in your Supabase SQL editor:

```sql
-- Projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  tags JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  excerpt TEXT,
  tags JSONB,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contact submissions
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admins only)
CREATE POLICY "Enable all operations for authenticated users" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for everyone on contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users on contact submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');
```

## Admin Panel Features

- **Dashboard**: Overview of projects, posts, and submissions
- **Projects Management**: Add, edit, delete projects with image uploads
- **Blog Management**: Create and edit blog posts with rich text
- **Media Library**: Upload and manage images
- **Contact Submissions**: View messages from visitors

## File Structure

```
portfolio-website/
├── app/
│   ├── admin/                 # Admin panel pages
│   │   ├── projects/         # Project CRUD
│   │   ├── blog/             # Blog post CRUD
│   │   ├── uploads/          # Media library
│   │   └── dashboard/        # Admin dashboard
│   ├── api/                  # API routes
│   ├── projects/             # Public project pages
│   ├── blog/                 # Public blog pages
│   ├── contact/              # Contact form
│   └── about/                # About page
├── components/               # Reusable UI components
├── lib/                      # Utility functions
├── types/                    # TypeScript types
└── styles/                   # CSS files
```

## Technologies Used

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Image Optimization**: Next.js Image component
- **Forms**: React Hook Form
- **UI Components**: Custom components with Lucide icons

## Development

### Local Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Database Migrations
Use Supabase dashboard or CLI for database changes.

## Deployment

This app is optimized for Vercel deployment. Connect your repository and it will automatically deploy on pushes to main.

## License

Open source, feel free to use for your portfolio.
