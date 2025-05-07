import { useState } from 'react';
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
  const { apiUrl, apiToken, pollInterval, setConfig } = useConfig();
  const [url, setUrl] = useState(apiUrl);
  const [token, setToken] = useState(apiToken);
  const [interval, setInterval] = useState(pollInterval);
  const [showToken, setShowToken] = useState(false);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!isValidUrl(url)) {
      setError('Please enter a valid API URL.');
      return;
    }
    if (!token) {
      setError('API token is required.');
      return;
    }
    if (interval < 5) {
      setError('Polling interval must be at least 5 seconds.');
      return;
    }
    setConfig({ apiUrl: url, apiToken: token, pollInterval: interval });
    setError('');
    onClose();
  };

  const handleReset = () => {
    setUrl(apiUrl);
    setToken(apiToken);
    setInterval(pollInterval);
    setError('');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">FortiManager API Configuration</h2>
        <div className="mb-2 text-sm text-yellow-600 dark:text-yellow-400">
          <strong>Warning:</strong> The API token is stored in your browser's localStorage for
          convenience. Do not use personal or highly privileged tokens in shared environments.
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">API URL</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-fortimanager.example.com"
            type="url"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">API Token</label>
          <div className="flex items-center gap-2">
            <input
              className="w-full border rounded px-2 py-1"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="API Token"
              type={showToken ? 'text' : 'password'}
              autoComplete="off"
            />
            <button
              type="button"
              className="text-xs px-2 py-1 border rounded"
              onClick={() => setShowToken((v) => !v)}
            >
              {showToken ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Polling Interval (seconds)</label>
          <input
            className="w-full border rounded px-2 py-1"
            type="number"
            min={5}
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
          />
        </div>
        {error && <div className="mb-2 text-red-600 dark:text-red-400 text-sm">{error}</div>}
        <div className="flex justify-between items-center gap-2 mt-2">
          <button
            className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700"
            onClick={handleReset}
            type="button"
          >
            Reset
          </button>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white"
              onClick={handleSave}
              type="button"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
