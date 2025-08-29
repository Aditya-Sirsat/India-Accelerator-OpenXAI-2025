'use client';

import { motion } from 'framer-motion';
import { MessageBubble } from './MessageBubble';
import type { ArticleResponse } from '@/types';

interface Props {
  messages: ArticleResponse[];
}

export function ChatContainer({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-950">
      {messages.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          Enter a topic below to generate an article ✍️
        </p>
      )}

      {messages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MessageBubble article={msg.article} createdAt={msg.createdAt} />
        </motion.div>
      ))}
    </div>
  );
}
