import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'AI Article Generator',
  description: 'Generate short, unique articles with Llama 3.2:1B',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar (future features placeholder) */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="h-12 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="font-semibold text-lg">AI Article Generator</h1>
            <ThemeToggle />
          </header>

          {/* Page content */}
          <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
