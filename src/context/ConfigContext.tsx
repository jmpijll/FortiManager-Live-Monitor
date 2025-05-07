import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface Config {
  apiUrl: string;
  apiToken: string;
  pollInterval: number;
}

interface ConfigContextType {
  apiUrl: string;
  apiToken: string;
  pollInterval: number;
  setConfig: (c: Partial<ConfigContextType>) => void;
  login: (
    url: string,
    apiToken: string,
    disableSSL?: boolean
  ) => Promise<{ success: boolean; error?: string; details?: unknown }>;
  logout: () => void;
}

const defaultConfig: Config = {
  apiUrl: '',
  apiToken: '',
  pollInterval: 30,
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfigState] = useState<Config>(() => {
    const stored = localStorage.getItem('fmg_config');
    return stored ? JSON.parse(stored) : defaultConfig;
  });

  useEffect(() => {
    // Never persist password
    localStorage.setItem('fmg_config', JSON.stringify({ ...config }));
  }, [config]);

  const setConfig = (newConfig: Partial<ConfigContextType>) => {
    setConfigState((prev) => ({ ...prev, ...newConfig }));
  };

  const login = async (
    url: string,
    apiToken: string,
    disableSSL?: boolean
  ): Promise<{ success: boolean; error?: string; details?: unknown }> => {
    if (disableSSL) {
      return {
        success: false,
        error:
          'Disabling SSL checks is only possible in Node.js scripts or with special browser flags. Browsers always enforce SSL certificate validation for security reasons.',
        details: { disableSSL },
      };
    }
    try {
      const proxyUrl = 'http://localhost:4000/api/fortimanager';
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiUrl: url,
          apiToken,
          body: {
            id: 1,
            method: 'get',
            params: [{ url: '/sys/status' }],
          },
        }),
      });
      const data = await response.json();
      if (data.result && data.result[0]?.status?.code === 0) {
        setConfigState((prev) => ({ ...prev, apiUrl: url, apiToken }));
        return { success: true };
      }
      let errorMsg = 'API token login failed.';
      if (data.error) {
        errorMsg = data.error.message || errorMsg;
      } else if (data.result?.[0]?.status?.message) {
        errorMsg = data.result[0].status.message;
      }
      return { success: false, error: errorMsg, details: data };
    } catch (err: unknown) {
      let errorMsg = 'Network or server error';
      if (err instanceof Error) {
        errorMsg = err.message;
      } else if (typeof err === 'string') {
        errorMsg = err;
      }
      return { success: false, error: errorMsg, details: err };
    }
  };

  const logout = () => {
    setConfigState(defaultConfig);
    localStorage.removeItem('fmg_config');
  };

  return (
    <ConfigContext.Provider
      value={{
        apiUrl: config.apiUrl,
        apiToken: config.apiToken,
        pollInterval: config.pollInterval,
        setConfig,
        login,
        logout,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider');
  return ctx;
};

// Utility function to test credentials
export async function testFortiManagerCredentials(url: string, username: string, password: string) {
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
      console.log('✅ Credentials are valid. Session:', sessionId);
      return { success: true, sessionId };
    }
    let errorMsg = 'Login failed. Please check your credentials.';
    if (data.error) {
      errorMsg = data.error.message || errorMsg;
    } else if (data.result?.[0]?.status?.message) {
      errorMsg = data.result[0].status.message;
    }
    console.error('❌ Invalid credentials:', errorMsg, data);
    return { success: false, error: errorMsg, details: data };
  } catch (err: unknown) {
    console.error('❌ Network or server error:', err);
    return { success: false, error: err?.message || 'Network or server error', details: err };
  }
}
