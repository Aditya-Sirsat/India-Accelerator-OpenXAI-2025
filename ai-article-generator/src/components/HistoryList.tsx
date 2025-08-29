'use client';

import { motion } from 'framer-motion';
import type { ArticleResponse } from '@/types';

interface Props {
  history: ArticleResponse[];
  onSelect: (article: ArticleResponse) => void;
}

export function HistoryList({ history, onSelect }: Props) {
  if (history.length === 0) {
    return (
      <p className="text-xs text-gray-500 dark:text-gray-400">No history yet</p>
    );
  }

  return (
    <div className="space-y-2">
      {history.map((item, idx) => (
        <motion.button
          key={idx}
          onClick={() => onSelect(item)}
          whileHover={{ scale: 1.02 }}
          className="block w-full text-left text-sm p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="line-clamp-1">{item.article}</span>
          <span className="block text-xs text-gray-400">
            {new Date(item.createdAt).toLocaleTimeString()}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
