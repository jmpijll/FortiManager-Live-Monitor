import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

interface ThresholdsModalProps {
  open: boolean;
  onClose: () => void;
  thresholds: { cpu: number; mem: number };
  setThresholds: (t: { cpu: number; mem: number }) => void;
}

export default function ThresholdsModal({
  open,
  onClose,
  thresholds,
  setThresholds,
}: ThresholdsModalProps) {
  const [cpu, setCpu] = useState(thresholds.cpu);
  const [mem, setMem] = useState(thresholds.mem);

  useEffect(() => {
    setCpu(thresholds.cpu);
    setMem(thresholds.mem);
  }, [thresholds, open]);

  const handleSave = () => {
    setThresholds({ cpu, mem });
    onClose();
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black bg-opacity-40" aria-hidden="true" />
      <Dialog.Panel className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm z-10">
        <Dialog.Title className="text-lg font-bold mb-4">Set Critical Thresholds</Dialog.Title>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">CPU Critical Threshold (%)</label>
          <input
            type="number"
            min={1}
            max={100}
            className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-700"
            value={cpu}
            onChange={(e) => setCpu(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Memory Critical Threshold (%)</label>
          <input
            type="number"
            min={1}
            max={100}
            className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-700"
            value={mem}
            onChange={(e) => setMem(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={handleSave}>
            Save
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
