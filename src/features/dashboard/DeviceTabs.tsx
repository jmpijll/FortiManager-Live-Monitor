import React from 'react';

interface DeviceTabsProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const types = [
  { key: 'fortigate', label: 'FortiGate' },
  { key: 'fortiswitch', label: 'FortiSwitch' },
  { key: 'fortiap', label: 'FortiAP' },
];

const DeviceTabs: React.FC<DeviceTabsProps> = ({ selectedType, onSelectType }) => (
  <div className="flex gap-2 my-4">
    {types.map((t) => (
      <button
        key={t.key}
        className={`px-4 py-2 rounded ${selectedType === t.key ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
        onClick={() => onSelectType(t.key)}
      >
        {t.label}
      </button>
    ))}
  </div>
);

export default DeviceTabs;
