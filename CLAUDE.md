# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies (note: uses legacy peer deps for React 19 RC)
npm install --legacy-peer-deps

# Start development server with Turbopack on all interfaces
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy to staging
vc

# Deploy to production
vc --prod
```

## Architecture Overview

This is a Next.js 15 personal blog with the following key architectural patterns:

### File-based Blog System
- Posts are MDX files located in `app/(post)/[year]/[post-slug]/page.mdx`
- Post metadata is centralized in `app/posts.json` for listings and navigation
- Each post can import custom React components and has automatic code splitting

### Post Components System
- All reusable post styling components are in `app/(post)/components/`
- These components form the style guide: `blockquote.tsx`, `code.tsx`, `figure.tsx`, etc.
- Components support dark mode via Tailwind's `dark:` classes

### Navigation Structure
The site follows this navigation flow:
1. `/` (redirects to `/now`) - Homepage redirects to Now page
2. `/now` - Current focus landing page
3. `/writings` - Blog post listings (called "Learning Log")  
4. `/about` - About page
5. `/[year]/[post-slug]` - Individual posts

### View Tracking
- Uses Redis (Upstash) for post view counters via `app/redis.ts`
- View counts are fetched in `app/get-posts.ts` and displayed on post listings
- Requires `UPSTASH_REDIS_REST_TOKEN` environment variable

### Styling and Theming
- Tailwind CSS with custom dark mode implementation
- Theme toggle in `app/theme-toggle.tsx` with system preference detection
- Custom theme variant `theme-system` for system preference styling

## Key Files to Understand

- `app/posts.json` - Central post metadata index
- `app/get-posts.ts` - Post data fetching with view counts
- `app/(post)/layout.tsx` - Post page wrapper with view tracking
- `app/writings/page.tsx` - Post listings page
- `next.config.js` - MDX configuration and image optimization
- `mdx-components.ts` - Global MDX component mapping

## Creating New Posts

1. Add metadata to `app/posts.json`
2. Create directory: `app/(post)/[year]/[post-id]/`
3. Create `page.mdx` with MDX content
4. Post automatically appears in `/writings` listings

## Technology Stack

- Next.js 15 with App Router
- React 19 RC
- MDX for rich content authoring
- Tailwind CSS for styling
- Redis (Upstash) for analytics
- TypeScript throughout
- Vercel for deployment