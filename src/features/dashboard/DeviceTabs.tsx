import React, { useRef } from 'react';

interface DeviceTabsProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const types = [
  { key: 'fortigate', label: 'FortiGate' },
  { key: 'fortiswitch', label: 'FortiSwitch' },
  { key: 'fortiap', label: 'FortiAP' },
];

const DeviceTabs: React.FC<DeviceTabsProps> = ({ selectedType, onSelectType }) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = types.findIndex((t) => t.key === selectedType);
    if (e.key === 'ArrowRight') {
      const next = (idx + 1) % types.length;
      onSelectType(types[next].key);
      tabRefs.current[next]?.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      const prev = (idx - 1 + types.length) % types.length;
      onSelectType(types[prev].key);
      tabRefs.current[prev]?.focus();
      e.preventDefault();
    }
  };

  return (
    <div
      className="flex gap-4 my-8 justify-center"
      role="tablist"
      aria-label="Device type tabs"
      onKeyDown={handleKeyDown}
    >
      {types.map((t, i) => (
        <button
          key={t.key}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          role="tab"
          aria-selected={selectedType === t.key}
          tabIndex={selectedType === t.key ? 0 : -1}
          aria-label={t.label}
          className={`px-6 py-2 rounded-full font-semibold text-lg outline-none transition-all duration-200 border-2 shadow-sm
            ${
              selectedType === t.key
                ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                : 'bg-surface-foreground/10 text-primary border-border hover:bg-primary/10'
            }
            focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
          onClick={() => onSelectType(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default DeviceTabs;
