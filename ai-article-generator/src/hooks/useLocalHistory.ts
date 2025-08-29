'use client';

import { useEffect, useState } from 'react';
import type { ArticleResponse } from '@/types';

const STORAGE_KEY = 'ai-article-history';

export function useLocalHistory() {
  const [history, setHistory] = useState<ArticleResponse[]>([]);

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  }, []);

  // Add new article to history
  const addToHistory = (article: ArticleResponse) => {
    const updated = [article, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { history, addToHistory, clearHistory };
}
