import { auth } from '../auth';
import type { BlogPost } from '@/types/blog';

export async function createBlogPost(title: string, content: string): Promise<BlogPost> {
  const response = await fetch('/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create blog post');
  }

  return response.json();
}