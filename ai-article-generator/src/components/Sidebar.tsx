'use client';

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-56 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
      <h2 className="text-sm font-semibold mb-4">Menu</h2>
      <nav className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <p className="cursor-not-allowed opacity-50">History (coming)</p>
        <p className="cursor-not-allowed opacity-50">Settings (coming)</p>
      </nav>
    </aside>
  );
}
