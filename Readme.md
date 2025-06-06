# Terry Lin's Blog

A personal blog built with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com).

## Features

- **Now Page as Homepage** - Visitors land on the Now page to see what Terry is currently focused on
- **Clean Navigation** - Now → Learning Log → About flow
- **Personal Branding** - Custom "T" favicon and Terry Lin branding throughout
- **MDX-Powered Posts** - Rich content with Markdown + React components
- **View Tracking** - Redis-based post view counters
- **Responsive Design** - Works great on all devices

## How to run

### Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

The blog will be available at `http://localhost:3000` (redirects to `/now`)

### Deployment

#### Staging

```bash
vc
```

This is the equivalent of submitting a PR with the [GitHub integration](https://vercel.com/github)

#### Production

```bash
vc --prod
```

This is the equivalent of `git push` to `master` (or merging a PR to master)

## Site Structure

### Pages

- **`/` (Homepage)** - Redirects to `/now`
- **`/now`** - Now page showing current focus (default landing page)
- **`/writings`** - Learning log post listings 
- **`/about`** - About page with background and contact info
- **`/[year]/[post-slug]`** - Individual blog posts

### Navigation

The site navigation follows this order:
1. **Now** - Current focus and activities
2. **Learning Log** - Blog posts and articles  
3. **About** - Background and contact information

## How to Update Content

### Updating the Now Page

Edit `app/now/page.mdx` directly:

```mdx
# Now

*Last updated: June 2025*

## Current Focus

Add what you're currently working on...

## Recent Projects

List your recent projects...

## Currently Reading

What books/articles you're reading...

## Location

Where you're based...
```

### Updating the About Page

Edit `app/about/page.mdx`:

```mdx
# About

Add your personal introduction...

## Background

Your professional background...

## What I'm Working On

Current projects and interests...
```

## How to Create a New Post

This blog uses a file-based system where each post is an MDX file organized by year.

### Step 1: Add Post Metadata

First, add your post metadata to `app/posts.json`:

```json
{
  "posts": [
    {
      "id": "my-new-post",
      "date": "January 15, 2025",
      "title": "My Amazing New Post"
    },
    // ... existing posts
  ]
}
```

- **`id`**: Used for the URL slug (e.g., `/2025/my-new-post`)
- **`date`**: Display date for the post
- **`title`**: Post title shown in listings

### Step 2: Create Post Directory

Create a directory structure following this pattern:

```
app/(post)/[YEAR]/[POST-ID]/
```

Example for a 2025 post:
```bash
mkdir -p app/\(post\)/2025/my-new-post
```

### Step 3: Create the Post Content

Create `page.mdx` in your post directory:

```bash
touch app/\(post\)/2025/my-new-post/page.mdx
```

### Step 4: Write Your Post

Add content to `page.mdx` using MDX (Markdown + JSX):

```mdx
import { Tweet } from 'react-tweet'

# My Amazing New Post

This is my post content with **markdown** formatting.

## You can use React components:

<Tweet id="1234567890" />

## Or regular markdown:

- List items
- Code blocks
- Links to [other sites](https://example.com)

```jsx
// Code blocks work great
function hello() {
  return "Hello, world!"
}
```

That's it! Your post is now live at `/2025/my-new-post`
```

### Step 5: Test Your Post

1. Save all files
2. Visit `http://localhost:3000/2025/my-new-post`
3. Check that it appears in the post listings at `/writings`

### Example File Structure

```
app/
├── posts.json                 # Post metadata index
├── page.tsx                   # Homepage (redirects to /now)
├── now/
│   └── page.mdx              # Now page content
├── about/
│   └── page.mdx              # About page content  
├── writings/
│   └── page.tsx              # Learning log post listings
└── (post)/
    ├── 2025/
    │   └── my-new-post/
    │       └── page.mdx       # Your post content
    ├── 2024/
    │   └── another-post/
    │       └── page.mdx
    └── components/            # Reusable post components
```

## Architecture

### Pure components

Every stateless pure component is found under `./app/(post)/components/`.

Every component that has to do with styling the post's markup
is found under `./app/(post)/components/`

These components make up the _style guide_ of the application.

### Blog posts

Every blog post is a static page hosted under `app/(post)/[year]/[post-id]/`.

This allows every post to load arbitrary modules, have custom layouts
and take advantage of automatic code splitting and lazy loading.

This means that the bloat of a single post doesn't "rub off on" the
rest of the site.

An index of all posts is maintained in JSON format as `./app/posts.json`
for practical reasons.

### View Tracking

Posts use Redis (via Upstash) to track view counts. Make sure to set up your
`UPSTASH_REDIS_REST_TOKEN` environment variable for view tracking to work.

## Environment Variables

Create a `.env.local` file with:

```bash
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

## Customization

### Favicon

The site uses a custom SVG favicon with the letter "T" located at `app/icon.svg`.

### Social Links

Social media links in the header can be updated in `app/header.tsx`:
- Twitter/X: [@itsmeterrylin](https://x.com/itsmeterrylin)
- YouTube: [@terrysapartment](https://www.youtube.com/@terrysapartment)  
- LinkedIn: [itsmeterrylin](https://www.linkedin.com/in/itsmeterrylin/)

### Branding

All branding and metadata can be updated in:
- `app/layout.tsx` - Site title and meta descriptions
- `app/now/page.mdx` - Now page metadata
- `app/about/page.mdx` - About page metadata
- `app/writings/page.tsx` - Learning Log page metadata
