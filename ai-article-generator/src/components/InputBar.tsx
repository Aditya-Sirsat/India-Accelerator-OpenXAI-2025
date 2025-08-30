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
      className="flex items-center w-full"
    >
      <div className="flex-1 relative border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        {/* Input field */}
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          disabled={loading}
          className="w-full px-4 py-3 pr-32 bg-transparent border-none outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
          aria-label="Topic input"
          style={{ 
            overflow: 'auto',
            whiteSpace: 'nowrap'
          }}
        />
        
        {/* Buttons container inside the bar */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <button
            type="submit"
            disabled={loading}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
            title="Generate Article"
          >
            {loading ? (
              <LoadingDots />
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={onClear}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
            title="Clear All"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {error && <p className="ml-2 text-red-500 text-sm">{error}</p>}
    </form>
  );
}
