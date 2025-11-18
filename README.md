### Deploying the Website

The project is ready for immediate deployment:

#### 1. **Deploy to Vercel** (Recommended)

**Live URL**: https://your-portfolio-site.vercel.app

**Repository**: https://github.com/yourusername/portfolio-website

1. Push the code to your GitHub repository
2. Connect your GitHub to Vercel
3. Vercel will auto-deploy with the `vercel.json` configuration

#### 2. **Deploy to Netlify**

1. Push code to GitHub
2. Connect Netlify to your repository
3. Set build command: `npm run build`
4. Set publish directory: `.next`

#### 3. **Contact Form Setup**

The contact form uses Formspree for email delivery. If you want functional email:

1. Sign up at [formspree.io](https://formspree.io/)
2. Get your form ID
3. Replace `'https://formspree.io/f/xeqyejjv'` in `app/contact/page.tsx` with your endpoint
4. Or set `FORMSPREE_FORM_ID` environment variable and update the code

**Sample Form ID**: `xeqyejjv` (from https://formspree.io/f/xeqyejjv)

#### Environment Variables

Copy `.env.example` to `.env.local` and add your variables:

```bash
FORMSPREE_FORM_ID=your-actual-form-id
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
my-website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── blog/              # Blog listing and posts
│   ├── contact/           # Contact page
│   └── projects/          # Projects page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Site footer
├── content/               # Content files
│   └── blog/              # MDX blog posts
├── data/                  # Static data files
│   └── projects.json      # Projects data
├── public/                # Static assets (add images here)
└── styles/               # Additional stylesheets
```

## Customization

### Adding Projects
Edit `data/projects.json` to add new projects:

```json
{
  "id": 7,
  "title": "Your Project",
  "description": "Project description",
  "image": "/images/project.jpg",
  "demo": "https://your-demo-link.com",
  "github": "https://github.com/yourusername/project",
  "tags": ["Tech1", "Tech2"]
}
```

### Writing Blog Posts
Create new `.mdx` files in `content/blog/`. Use this frontmatter format:

```markdown
---
title: "Your Blog Post Title"
date: "2023-11-18"
tags: ["tag1", "tag2"]
---

# Your content here...

Use standard Markdown with JSX components if needed.
```

### Styling
- Colors and theme variables can be customized in `tailwind.config.js`
- Global styles are in `app/globals.css`
- Component-specific styles are inline with Tailwind classes

## Deployment

This site can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages** (with static export)

For Vercel deployment, simply push to a GitHub repo and connect it to Vercel.

## License

This project is open source. Feel free to use it as a template for your own portfolio.

## Sample Content

The website comes with sample content including:
- 6 sample projects
- 1 sample blog post
- Placeholder images (gray backgrounds)
- Demo text that you can replace with your own

Replace all placeholder content with your actual information, images, and links.
