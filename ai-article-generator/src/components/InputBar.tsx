'use client';

import { useState } from 'react';
import { LoadingDots } from './LoadingDots';
import type { ArticleResponse } from '@/types';

interface Props {
  onNewArticle: (article: ArticleResponse) => void;
  onClear: () => void;
}

export function InputBar({ onNewArticle, onClear }: Props) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate article');

      onNewArticle(data);
      setTopic('');
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t-2 border-gray-300 dark:border-gray-700 p-4 flex items-center space-x-2"
    >
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic..."
        disabled={loading}
        className="flex-1 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Topic input"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-3 py-2 border rounded-xl border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 shadow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <LoadingDots /> : 'Generate'}
      </button>

      <button
        type="button"
        onClick={onClear}
        className="px-3 py-2 border rounded-xl border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 shadow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear
      </button>

      {error && <p className="ml-2 text-red-500 text-sm">{error}</p>}
    </form>
  );
}
