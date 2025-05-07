import { useState } from 'react';
import ConfigModal from './components/ConfigModal';
import './App.css';

function App() {
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold">FortiManager Live Monitor</h1>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setShowConfig(true)}
        >
          API Config
        </button>
      </header>
      <main className="p-4">
        {/* Dashboard and features will go here */}
        <p className="text-lg">Welcome! Configure your FortiManager API to get started.</p>
      </main>
      <ConfigModal open={showConfig} onClose={() => setShowConfig(false)} />
    </div>
  );
}

export default App;
