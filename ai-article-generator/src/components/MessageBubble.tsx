'use client';

import { Clipboard } from 'lucide-react';
import { useState } from 'react';

interface Props {
  article: string;
  createdAt: string;
}

export function MessageBubble({ article, createdAt }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(article);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-300 dark:border-gray-600">
      <div className="prose dark:prose-invert">
        <p>{article}</p>
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>{new Date(createdAt).toLocaleString()}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300"
          aria-label="Copy article to clipboard"
        >
          <Clipboard size={14} />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
}
