import { useState } from 'react';
import Sidebar from './Sidebar';
import DeviceTabs from './DeviceTabs';
import DeviceTable from './DeviceTable';
import SystemStatusCard from './SystemStatusCard';

export default function Dashboard() {
  const [selectedAdom, setSelectedAdom] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('fortigate');

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar selectedAdom={selectedAdom} onSelectAdom={setSelectedAdom} />
      <main className="flex-1 p-6 overflow-auto">
        <SystemStatusCard />
        <DeviceTabs selectedType={selectedType} onSelectType={setSelectedType} />
        {selectedAdom ? (
          <DeviceTable adom={selectedAdom} deviceType={selectedType} />
        ) : (
          <div className="text-gray-500">Select an ADOM to view devices.</div>
        )}
      </main>
    </div>
  );
}
