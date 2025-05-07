import { useState } from 'react';
import Sidebar from './Sidebar';
import DeviceTabs from './DeviceTabs';

export default function Dashboard() {
  const [selectedAdom, setSelectedAdom] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('fortigate');

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar selectedAdom={selectedAdom} onSelectAdom={setSelectedAdom} />
      <main className="flex-1 p-6 overflow-auto">
        <DeviceTabs selectedType={selectedType} onSelectType={setSelectedType} />
        {selectedAdom ? (
          <div>
            {/* DeviceTable will go here */}
            <div className="mt-4">
              Device table for {selectedType} in ADOM {selectedAdom}
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Select an ADOM to view devices.</div>
        )}
      </main>
    </div>
  );
}
