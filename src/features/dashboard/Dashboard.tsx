import { useState, useEffect, Suspense, lazy } from 'react';
import Sidebar from './Sidebar';
import DeviceTabs from './DeviceTabs';
// import DeviceTable from './DeviceTable';
// import DeviceStatusCharts from './DeviceStatusCharts';
import SystemStatusCard from './SystemStatusCard';
import ThresholdsModal from './ThresholdsModal';
// import DeviceStatusCharts from './DeviceStatusCharts';
import { useDevices, useFortiSwitches, useFortiAPs } from '../../hooks/useFortiManager';

const DeviceTable = lazy(() => import('./DeviceTable'));
const DeviceStatusCharts = lazy(() => import('./DeviceStatusCharts'));

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
    <div className="flex h-[calc(100vh-64px)] bg-background text-foreground">
      <Sidebar selectedAdom={selectedAdom} onSelectAdom={setSelectedAdom} />
      <main className="flex-1 p-8 overflow-auto bg-surface/80 dark:bg-surface/80 rounded-3xl shadow-2xl border border-border mx-6 my-8 animate-fade-in backdrop-blur-md">
        <div className="flex justify-between items-center mb-6">
          <SystemStatusCard />
          <button
            className="ml-4 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-lg hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 active:scale-95"
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
        <Suspense fallback={<div>Loading charts...</div>}>
          <DeviceStatusCharts devices={allDevices} />
        </Suspense>
        <DeviceTabs selectedType={selectedType} onSelectType={setSelectedType} />
        {selectedAdom ? (
          <Suspense fallback={<div>Loading table...</div>}>
            <DeviceTable adom={selectedAdom} deviceType={selectedType} thresholds={thresholds} />
          </Suspense>
        ) : (
          <div className="text-foreground/60 text-lg mt-8">Select an ADOM to view devices.</div>
        )}
      </main>
    </div>
  );
}
