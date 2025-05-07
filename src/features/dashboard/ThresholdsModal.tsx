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
      <Dialog.Panel className="relative bg-surface/80 dark:bg-surface/80 p-8 rounded-2xl shadow-2xl w-full max-w-sm z-10 border border-border animate-fade-in backdrop-blur-md">
        <Dialog.Title className="text-2xl font-extrabold mb-6 text-primary dark:text-primary tracking-tight">
          Set Critical Thresholds
        </Dialog.Title>
        <div className="mb-6 relative">
          <input
            type="number"
            min={1}
            max={100}
            className="peer w-full px-4 pt-7 pb-2 border-2 border-input rounded-xl bg-transparent text-lg focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder-transparent"
            value={cpu}
            onChange={(e) => setCpu(Number(e.target.value))}
            placeholder="CPU Critical Threshold (%)"
          />
          <label className="absolute left-4 top-2 text-base text-foreground/70 pointer-events-none transition-all peer-focus:text-primary peer-focus:top-0 peer-focus:text-xs peer-placeholder-shown:top-7 peer-placeholder-shown:text-lg bg-surface/80 px-1 rounded">
            CPU Critical Threshold (%)
          </label>
        </div>
        <div className="mb-6 relative">
          <input
            type="number"
            min={1}
            max={100}
            className="peer w-full px-4 pt-7 pb-2 border-2 border-input rounded-xl bg-transparent text-lg focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder-transparent"
            value={mem}
            onChange={(e) => setMem(Number(e.target.value))}
            placeholder="Memory Critical Threshold (%)"
          />
          <label className="absolute left-4 top-2 text-base text-foreground/70 pointer-events-none transition-all peer-focus:text-primary peer-focus:top-0 peer-focus:text-xs peer-placeholder-shown:top-7 peer-placeholder-shown:text-lg bg-surface/80 px-1 rounded">
            Memory Critical Threshold (%)
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-lg hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
            onClick={handleSave}
            type="button"
          >
            Save
          </button>
          <button
            className="px-8 py-3 rounded-full bg-surface-foreground/10 text-primary font-bold border border-border shadow hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
