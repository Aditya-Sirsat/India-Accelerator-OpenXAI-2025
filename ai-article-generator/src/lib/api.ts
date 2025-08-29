import type { ArticleRequest, ArticleResponse } from '@/types';

export async function generateArticle(
  payload: ArticleRequest
): Promise<ArticleResponse> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to generate article');
  }

  return res.json();
}
