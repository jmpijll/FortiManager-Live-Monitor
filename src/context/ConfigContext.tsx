import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface Config {
  apiUrl: string;
  apiToken: string;
  pollInterval: number;
}

interface ConfigContextType extends Config {
  setConfig: (config: Config) => void;
}

const defaultConfig: Config = {
  apiUrl: import.meta.env.VITE_FMG_API_URL || '',
  apiToken: import.meta.env.VITE_FMG_API_TOKEN || '',
  pollInterval: Number(import.meta.env.VITE_POLL_INTERVAL_SECONDS) || 30,
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfigState] = useState<Config>(() => {
    const stored = localStorage.getItem('fmg_config');
    return stored ? JSON.parse(stored) : defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem('fmg_config', JSON.stringify(config));
  }, [config]);

  const setConfig = (newConfig: Config) => {
    setConfigState(newConfig);
  };

  return (
    <ConfigContext.Provider value={{ ...config, setConfig }}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider');
  return ctx;
};
