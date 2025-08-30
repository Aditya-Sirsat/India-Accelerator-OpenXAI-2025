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

  // Function to detect and style different text elements
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      // Detect different heading levels
      if (trimmedLine.match(/^[A-Z][A-Z\s]+:$/)) {
        // Main heading (e.g., "INTRODUCTION:", "CONCLUSION:")
        return (
          <h1 
            key={index}
            className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-6 first:mt-0"
            style={{
              lineHeight: '1.3',
              letterSpacing: '-0.02em'
            }}
          >
            {trimmedLine}
          </h1>
        );
      } else if (trimmedLine.match(/^\d+\.\s+[A-Z][A-Za-z\s]+/)) {
        // Numbered section heading (e.g., "1. Analysis", "2. Discussion")
        return (
          <h2 
            key={index}
            className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-5"
            style={{
              lineHeight: '1.4',
              letterSpacing: '-0.01em'
            }}
          >
            {trimmedLine}
          </h2>
        );
      } else if (trimmedLine.match(/^[A-Z][a-z\s]+:$/)) {
        // Sub-heading (e.g., "Background:", "Methods:")
        return (
          <h3 
            key={index}
            className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4"
            style={{
              lineHeight: '1.4',
              letterSpacing: '-0.01em'
            }}
          >
            {trimmedLine}
          </h3>
        );
      } else if (trimmedLine.match(/^•\s+[A-Z]/) || trimmedLine.match(/^-\s+[A-Z]/)) {
        // Bullet points with capital letters (likely sub-sections)
        return (
          <h4 
            key={index}
            className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2 mt-3"
            style={{
              lineHeight: '1.5'
            }}
          >
            {trimmedLine}
          </h4>
        );
      } else if (trimmedLine.length > 0) {
        // Regular paragraph
        return (
          <p 
            key={index}
            className="mb-4 text-base leading-7 font-normal text-gray-900 dark:text-gray-100 last:mb-0"
            style={{
              lineHeight: '1.75',
              letterSpacing: '0.01em',
              wordSpacing: '0.05em'
            }}
          >
            {trimmedLine}
          </p>
        );
      } else {
        // Empty line for spacing
        return <div key={index} className="h-2"></div>;
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="text-gray-900 dark:text-gray-100 leading-relaxed">
          {renderContent(article)}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span className="font-medium">{new Date(createdAt).toLocaleString()}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
          aria-label="Copy article to clipboard"
        >
          <Clipboard size={14} />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
}
