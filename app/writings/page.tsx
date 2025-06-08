import { Posts } from "../posts";
import { getPosts } from "../get-posts";

export const revalidate = 60;

export const metadata = {
  title: 'Retrospectives',
  description: 'Terry Lin\'s retrospectives on building, learning, and growing',
  openGraph: {
    title: 'Retrospectives',
    description: 'Terry Lin\'s retrospectives on building, learning, and growing',
  }
}

export default async function WritingsPage() {
  const posts = await getPosts();
  return <Posts posts={posts} />;
} 