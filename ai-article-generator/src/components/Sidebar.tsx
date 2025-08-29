'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, History, Menu } from 'lucide-react';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`hidden md:flex flex-col border-r-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 ${
      isCollapsed ? 'w-16' : 'w-56'
    } transition-[width] duration-300 ease-in-out`}>
      {/* Header with toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
          <div className="flex items-center space-x-2">
            <Menu size={20} className="text-gray-600 dark:text-gray-300" />
            <h2 className="text-sm font-semibold whitespace-nowrap">Menu</h2>
          </div>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex-shrink-0"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <Menu size={20} className="text-gray-600 dark:text-gray-300" /> : <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />}
        </button>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          {isCollapsed ? (
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-not-allowed opacity-50"
                title="History (coming)"
              >
                <History size={16} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="cursor-not-allowed opacity-50 flex items-center space-x-2">
                <History size={16} className="text-gray-600 dark:text-gray-300" />
                <span>History</span>
              </p>
            </div>
          )}
        </div>
      </nav>

      {/* Settings section at bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {isCollapsed ? (
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={() => setIsCollapsed(false)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-not-allowed opacity-50"
              title="Settings (coming)"
            >
              <Settings size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        ) : (
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p className="cursor-not-allowed opacity-50 flex items-center space-x-2">
              <Settings size={16} className="text-gray-600 dark:text-gray-300" />
              <span>Settings</span>
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
