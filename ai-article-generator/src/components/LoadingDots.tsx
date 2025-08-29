'use client';

export function LoadingDots() {
  return (
    <span className="flex space-x-1 items-center justify-center">
      <span className="w-1.5 h-1.5 bg-gray-700 dark:bg-white rounded-full animate-bounce"></span>
      <span
        className="w-1.5 h-1.5 bg-gray-700 dark:bg-white rounded-full animate-bounce [animation-delay:0.2s]"
      ></span>
      <span
        className="w-1.5 h-1.5 bg-gray-700 dark:bg-white rounded-full animate-bounce [animation-delay:0.4s]"
      ></span>
    </span>
  );
}
