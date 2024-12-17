import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlogPost } from '@/lib/api/blogs';

export function useBlogEditor() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const saveBlogPost = async (title: string, content: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createBlogPost(title, content);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save blog post');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    saveBlogPost,
  };
}