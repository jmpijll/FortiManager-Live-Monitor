import { useState, useEffect, useRef } from 'react';
import { useConfig } from '../context/ConfigContext';

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default function ConfigModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { apiUrl, username, login } = useConfig();
  const [url, setUrl] = useState(apiUrl);
  const [user, setUser] = useState(username);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const initialFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [open]);

  const handleLogin = async () => {
    setError('');
    if (!isValidUrl(url)) {
      setError('Please enter a valid API URL.');
      return;
    }
    if (!user) {
      setError('Username is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    setLoading(true);
    const ok = await login(url, user, password);
    setLoading(false);
    if (ok) {
      setPassword('');
      setError('');
      onClose();
    } else {
      setError('Login failed. Please check your credentials.');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="config-modal-title"
      >
        <h2 id="config-modal-title" className="text-xl font-bold mb-4">FortiManager Login</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="api-url-input">API URL</label>
          <input
            id="api-url-input"
            ref={initialFocusRef}
            className="w-full border rounded px-2 py-1 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-fortimanager.example.com"
            type="url"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="username-input">Username</label>
          <input
            id="username-input"
            className="w-full border rounded px-2 py-1 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="API Username"
            type="text"
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="password-input">Password</label>
          <div className="flex items-center gap-2">
            <input
              id="password-input"
              className="w-full border rounded px-2 py-1 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="text-xs px-2 py-1 border rounded focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        {error && <div className="mb-2 text-red-600 dark:text-red-400 text-sm">{error}</div>}
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            onClick={handleLogin}
            type="button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
