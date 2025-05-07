import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DeviceTabs from './DeviceTabs';
import DeviceTable from './DeviceTable';
import SystemStatusCard from './SystemStatusCard';
import ThresholdsModal from './ThresholdsModal';
import DeviceStatusCharts from './DeviceStatusCharts';
import { useDevices, useFortiSwitches, useFortiAPs } from '../../hooks/useFortiManager';

const DEFAULT_THRESHOLDS = { cpu: 80, mem: 80 };

export default function Dashboard() {
  const [selectedAdom, setSelectedAdom] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('fortigate');
  const [showThresholds, setShowThresholds] = useState(false);
  const [thresholds, setThresholdsState] = useState(DEFAULT_THRESHOLDS);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allDevices, setAllDevices] = useState<any[]>([]);

  const devicesData = useDevices(selectedAdom || '');
  const switchesData = useFortiSwitches(selectedAdom || '');
  const apsData = useFortiAPs(selectedAdom || '');

  useEffect(() => {
    const stored = localStorage.getItem('fmg_thresholds');
    if (stored) setThresholdsState(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!selectedAdom) {
      setAllDevices([]);
      return;
    }
    // Map health and firmware status for charting
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapHealth = (d: any) => {
      let health: 'ok' | 'warning' | 'critical' = 'ok';
      let firmwareStatus: 'upToDate' | 'outdated' = 'upToDate';
      if (typeof d.cpu === 'number' && typeof d.mem === 'number') {
        if (d.cpu >= thresholds.cpu || d.mem >= thresholds.mem) health = 'critical';
        else if (d.cpu >= thresholds.cpu - 20 || d.mem >= thresholds.mem - 20) health = 'warning';
      }
      if (d.os_ver && d.os_ver !== '7.2.5') firmwareStatus = 'outdated';
      return { ...d, health, firmwareStatus };
    };

    const all = [
      ...(devicesData.data || []).map(mapHealth),
      ...(switchesData.data || []).map(mapHealth),
      ...(apsData.data || []).map(mapHealth),
    ];
    setAllDevices(all);
  }, [selectedAdom, devicesData.data, switchesData.data, apsData.data, thresholds]);

  const setThresholds = (t: { cpu: number; mem: number }) => {
    setThresholdsState(t);
    localStorage.setItem('fmg_thresholds', JSON.stringify(t));
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar selectedAdom={selectedAdom} onSelectAdom={setSelectedAdom} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-2">
          <SystemStatusCard />
          <button
            className="ml-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setShowThresholds(true)}
          >
            Thresholds
          </button>
        </div>
        <ThresholdsModal
          open={showThresholds}
          onClose={() => setShowThresholds(false)}
          thresholds={thresholds}
          setThresholds={setThresholds}
        />
        <DeviceStatusCharts devices={allDevices} />
        <DeviceTabs selectedType={selectedType} onSelectType={setSelectedType} />
        {selectedAdom ? (
          <DeviceTable adom={selectedAdom} deviceType={selectedType} thresholds={thresholds} />
        ) : (
          <div className="text-gray-500">Select an ADOM to view devices.</div>
        )}
      </main>
    </div>
  );
}
