import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Line } from 'react-chartjs-2';
import { useDeviceMonitor, useSwitchMonitor, useAPMonitor } from '../../hooks/useFortiManager';

interface DeviceHealthTrendModalProps {
  deviceName: string;
  deviceType: string;
  open: boolean;
  onClose: () => void;
}

const HISTORY_LIMIT = 20;

function getHistoryFromStorage(key: string) {
  const raw = localStorage.getItem(key);
  if (!raw) return { cpu: [], mem: [], labels: [] };
  try {
    return JSON.parse(raw);
  } catch {
    return { cpu: [], mem: [], labels: [] };
  }
}

function setHistoryToStorage(
  key: string,
  history: { cpu: number[]; mem: number[]; labels: string[] }
) {
  localStorage.setItem(key, JSON.stringify(history));
}

export default function DeviceHealthTrendModal({
  deviceName,
  deviceType,
  open,
  onClose,
}: DeviceHealthTrendModalProps) {
  const deviceMonitor = useDeviceMonitor(deviceName);
  const switchMonitor = useSwitchMonitor(deviceName);
  const apMonitor = useAPMonitor(deviceName);
  let hook;
  if (deviceType === 'fortigate') hook = deviceMonitor;
  else if (deviceType === 'fortiswitch') hook = switchMonitor;
  else if (deviceType === 'fortiap') hook = apMonitor;
  else hook = { data: null };

  const key = `trend:${deviceType}:${deviceName}`;
  const [history, setHistory] = useState<{ cpu: number[]; mem: number[]; labels: string[] }>(() =>
    getHistoryFromStorage(key)
  );

  useEffect(() => {
    if (!open) return;
    const now = new Date().toLocaleTimeString();
    if (hook.data) {
      const hist = getHistoryFromStorage(key);
      hist.cpu.push(hook.data.cpu);
      hist.mem.push(hook.data.mem);
      hist.labels.push(now);
      // Keep only last N points
      if (hist.cpu.length > HISTORY_LIMIT) {
        hist.cpu.shift();
        hist.mem.shift();
        hist.labels.shift();
      }
      setHistoryToStorage(key, hist);
      setHistory({ ...hist });
    }
  }, [hook.data, open, deviceName, deviceType]);

  useEffect(() => {
    if (open) setHistory(getHistoryFromStorage(key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, deviceName, deviceType]);

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40" aria-hidden="true" />
      <Dialog.Panel className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-xl z-10">
        <Dialog.Title className="text-lg font-bold mb-2">{deviceName} Health Trends</Dialog.Title>
        <Line
          data={{
            labels: history.labels,
            datasets: [
              {
                label: 'CPU %',
                data: history.cpu,
                borderColor: 'rgb(37, 99, 235)',
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                fill: false,
              },
              {
                label: 'Memory %',
                data: history.mem,
                borderColor: 'rgb(220, 38, 38)',
                backgroundColor: 'rgba(220, 38, 38, 0.2)',
                fill: false,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { y: { min: 0, max: 100 } },
          }}
        />
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={onClose}>
          Close
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}
