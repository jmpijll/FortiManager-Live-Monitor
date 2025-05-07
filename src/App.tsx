import { useState } from 'react';
import ConfigModal from './components/ConfigModal';
import { useConfig } from './context/ConfigContext';
import Dashboard from './features/dashboard/Dashboard';
import './App.css';

function App() {
  const [showConfig, setShowConfig] = useState(false);
  const { apiUrl, apiToken } = useConfig();
  const configIncomplete = !apiUrl || !apiToken;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">FortiManager Live Monitor</h1>
          {configIncomplete && (
            <span className="px-2 py-1 text-xs rounded bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100 animate-pulse">
              API config required
            </span>
          )}
        </div>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setShowConfig(true)}
        >
          API Config
        </button>
      </header>
      <ConfigModal open={showConfig} onClose={() => setShowConfig(false)} />
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
