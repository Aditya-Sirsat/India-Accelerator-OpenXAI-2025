'use client';

import { motion } from 'framer-motion';
import { MessageBubble } from './MessageBubble';
import { InputBar } from './InputBar';
import type { ArticleResponse } from '@/types';

interface Props {
  messages: ArticleResponse[];
  onNewArticle: (article: ArticleResponse) => void;
  onClear: () => void;
}

export function ChatContainer({ messages, onNewArticle, onClear }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-950 relative">
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center min-h-[400px] text-center px-6"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl"
          >
            <svg 
              className="w-16 h-16 text-blue-600 dark:text-blue-400" 
              fill="none" 
              viewBox="0 0 16 16" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" 
                clipRule="evenodd" 
                fill="currentColor" 
                fillRule="evenodd"
              />
            </svg>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
          >
            Ready to Create Amazing Articles?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-md leading-relaxed"
          >
            Enter any topic below and watch as AI transforms your ideas into engaging, well-structured articles in seconds.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg mb-8"
          >
            {[
              { icon: "⚡", text: "Lightning Fast" },
              { icon: "🎯", text: "Topic Focused" },
              { icon: "✨", text: "AI Powered" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
              >
                <span className="text-2xl mb-2">{feature.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex items-center space-x-2 font-bold text-gray-900 dark:text-white mb-8"
          >
            <span className="text-lg">👇</span>
            <span>Start typing below to get started!</span>
          </motion.div>

          {/* Floating Input Bar for Empty State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-full max-w-4xl"
          >
            <div className="bg-white dark:bg-gray-950 rounded-2xl">
              <InputBar onNewArticle={onNewArticle} onClear={onClear} />
            </div>
          </motion.div>
        </motion.div>
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

      {/* Floating Input Bar at Bottom when there are messages */}
      {messages.length > 0 && (
        <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-950 dark:via-gray-950 dark:to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-950 rounded-2xl">
              <InputBar onNewArticle={onNewArticle} onClear={onClear} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
