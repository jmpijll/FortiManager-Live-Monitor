import React from 'react';

interface SidebarProps {
  selectedAdom: string | null;
  onSelectAdom: (adom: string) => void;
}

// Placeholder ADOMs; in a real app, fetch from API or context
const adoms = [{ name: 'root' }, { name: 'adom1' }, { name: 'adom2' }];

const Sidebar: React.FC<SidebarProps> = ({ selectedAdom, onSelectAdom }) => (
  <aside className="w-48 bg-gray-100 dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700">
    <h2 className="text-lg font-semibold mb-4">ADOMs</h2>
    <ul>
      {adoms.map((adom) => (
        <li key={adom.name}>
          <button
            className={`w-full text-left px-2 py-1 rounded mb-1 ${selectedAdom === adom.name ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            onClick={() => onSelectAdom(adom.name)}
          >
            {adom.name}
          </button>
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;
