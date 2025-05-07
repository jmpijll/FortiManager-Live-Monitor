import { useState, useEffect } from 'react';
import ConfigModal from './components/ConfigModal';
import { useConfig } from './context/ConfigContext';
import Dashboard from './features/dashboard/Dashboard';
import './App.css';
import { useTranslation } from 'react-i18next';

function App() {
  const [showConfig, setShowConfig] = useState(false);
  const { apiUrl, apiToken } = useConfig();
  const configIncomplete = !apiUrl || !apiToken;
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const { t } = useTranslation();
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{t('FortiManager Live Monitor')}</h1>
          {configIncomplete && (
            <span className="px-2 py-1 text-xs rounded bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100 animate-pulse">
              {t('API config required')}
            </span>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setShowConfig(true)}
          >
            {t('API Config')}
          </button>
          <button
            className="ml-2 px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            aria-label="Toggle dark/light mode"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <select
            className="ml-2 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            aria-label="Select language"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="en">EN</option>
            <option value="nl">NL</option>
          </select>
        </div>
      </header>
      <ConfigModal open={showConfig} onClose={() => setShowConfig(false)} />
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
