import { Posts } from "../posts";
import { getPosts } from "../get-posts";

export const revalidate = 60;

export const metadata = {
  title: 'Learning Log',
  description: 'Terry Lin\'s thoughts on technology, programming, and more',
  openGraph: {
    title: 'Learning Log',
    description: 'Terry Lin\'s thoughts on technology, programming, and more',
  }
}

export default async function WritingsPage() {
  const posts = await getPosts();
  return <Posts posts={posts} />;
} 