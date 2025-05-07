import { useState } from 'react';
import { useConfig } from '../context/ConfigContext';

export default function ConfigModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { apiUrl, apiToken, pollInterval, setConfig } = useConfig();
  const [url, setUrl] = useState(apiUrl);
  const [token, setToken] = useState(apiToken);
  const [interval, setInterval] = useState(pollInterval);

  const handleSave = () => {
    setConfig({ apiUrl: url, apiToken: token, pollInterval: interval });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">FortiManager API Configuration</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">API URL</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-fortimanager.example.com"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">API Token</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="API Token"
            type="password"
          />
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
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
