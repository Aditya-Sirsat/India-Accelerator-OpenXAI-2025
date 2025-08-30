'use client';

import { useState } from 'react';
import { ChatContainer } from '@/components/ChatContainer';
import { useLocalHistory } from '@/hooks/useLocalHistory';
import type { ArticleResponse } from '@/types';

export default function HomePage() {
  const [messages, setMessages] = useState<ArticleResponse[]>([]);
  const { addToHistory } = useLocalHistory();

  const handleNewArticle = (article: ArticleResponse) => {
    setMessages((prev) => [...prev, article]);
    addToHistory(article);
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat area with integrated floating input bar */}
      <ChatContainer 
        messages={messages} 
        onNewArticle={handleNewArticle} 
        onClear={handleClear} 
      />
    </div>
  );
}
