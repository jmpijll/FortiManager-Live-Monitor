import React from 'react';

interface SidebarProps {
  selectedAdom: string | null;
  onSelectAdom: (adom: string) => void;
}

// Placeholder ADOMs; in a real app, fetch from API or context
const adoms = [{ name: 'root' }, { name: 'adom1' }, { name: 'adom2' }];

const Sidebar: React.FC<SidebarProps> = ({ selectedAdom, onSelectAdom }) => (
  <aside
    className="w-48 bg-gray-100 dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700"
    role="navigation"
    aria-label="ADOM navigation sidebar"
  >
    <h2 className="text-lg font-semibold mb-4">ADOMs</h2>
    <ul role="list">
      {adoms.map((adom) => (
        <li key={adom.name} role="listitem">
          <button
            className={`w-full text-left px-2 py-1 rounded mb-1 outline-none transition-colors duration-150 border-2 ${selectedAdom === adom.name ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border-transparent'} focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2`}
            onClick={() => onSelectAdom(adom.name)}
            aria-current={selectedAdom === adom.name ? 'page' : undefined}
            aria-label={`Select ADOM ${adom.name}`}
          >
            {adom.name}
          </button>
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;
