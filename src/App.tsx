import { useState, useEffect } from 'react';
import ConfigModal from './components/ConfigModal';
import { useConfig } from './context/ConfigContext';
import Dashboard from './features/dashboard/Dashboard';
import './App.css';
import { useTranslation } from 'react-i18next';
import FeedbackButton from './components/FeedbackButton';

function App() {
  const [showConfig, setShowConfig] = useState(false);
  const { apiUrl, sessionId } = useConfig();
  const configIncomplete = !apiUrl || !sessionId;
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
    <>
      {/* Ensure Tailwind JIT picks up custom classes */}
      <div className="hidden bg-(--background) border-(--border) text-(--foreground)"></div>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center transition-colors duration-300">
        <header className="w-full max-w-4xl mx-auto mt-8 mb-6 flex justify-between items-center px-8 py-4 rounded-2xl shadow-lg bg-surface/80 dark:bg-surface/80 backdrop-blur-md border border-border">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary drop-shadow-sm">
              {t('FortiManager Live Monitor')}
            </h1>
            {configIncomplete && (
              <span className="px-3 py-1 text-xs rounded-full bg-accent text-accent-foreground font-semibold shadow animate-pulse">
                {t('API config required')}
              </span>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 active:scale-95"
              onClick={() => setShowConfig(true)}
            >
              {t('API Config')}
            </button>
            <button
              className="ml-2 px-4 py-2 rounded-full bg-surface-foreground/10 text-primary font-medium border border-border shadow hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              aria-label="Toggle dark/light mode"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
            <select
              className="ml-2 px-3 py-2 rounded-full bg-surface-foreground/10 text-primary font-medium border border-border shadow focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              aria-label="Select language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="nl">NL</option>
            </select>
          </div>
        </header>
        <ConfigModal open={configIncomplete || showConfig} onClose={() => setShowConfig(false)} />
        <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
          {!configIncomplete && <Dashboard />}
        </main>
        <FeedbackButton />
      </div>
    </>
  );
}

export default App;
