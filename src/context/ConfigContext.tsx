import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface Config {
  apiUrl: string;
  username: string;
  sessionId: string;
  pollInterval: number;
}

interface ConfigContextType extends Config {
  password: string;
  setConfig: (c: Partial<ConfigContextType>) => void;
  login: (url: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const defaultConfig: Config = {
  apiUrl: '',
  username: '',
  sessionId: '',
  pollInterval: 30,
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfigState] = useState<Config>(() => {
    const stored = localStorage.getItem('fmg_config');
    return stored ? JSON.parse(stored) : defaultConfig;
  });
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Never persist password
    localStorage.setItem('fmg_config', JSON.stringify({ ...config }));
  }, [config]);

  const setConfig = (newConfig: Partial<ConfigContextType>) => {
    setConfigState((prev) => ({ ...prev, ...newConfig }));
    if (newConfig.password !== undefined) setPassword(newConfig.password);
  };

  const login = async (url: string, username: string, password: string) => {
    try {
      const res = await fetch(`${url}/jsonrpc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 1,
          method: 'exec',
          params: [{ url: '/sys/login/user', data: { user: username, passwd: password } }],
        }),
      });
      const data = await res.json();
      const sessionId = data.result?.[0]?.data?.session || '';
      if (sessionId) {
        setConfigState((prev) => ({ ...prev, apiUrl: url, username, sessionId }));
        setPassword(password);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setConfigState(defaultConfig);
    setPassword('');
    localStorage.removeItem('fmg_config');
  };

  return (
    <ConfigContext.Provider value={{ ...config, password, setConfig, login, logout }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider');
  return ctx;
};
