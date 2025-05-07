import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Device {
  name: string;
  os_ver?: string;
  status?: string;
  health?: 'ok' | 'warning' | 'critical';
  firmwareStatus?: 'upToDate' | 'outdated';
}

interface DeviceStatusChartsProps {
  devices: Device[];
}

export default function DeviceStatusCharts({ devices }: DeviceStatusChartsProps) {
  // Count health status
  const healthCounts = { ok: 0, warning: 0, critical: 0 };
  const firmwareCounts = { upToDate: 0, outdated: 0 };
  devices.forEach((d) => {
    if (d.health) healthCounts[d.health]++;
    if (d.firmwareStatus) firmwareCounts[d.firmwareStatus]++;
  });

  const healthPie = {
    labels: ['OK', 'Warning', 'Critical'],
    datasets: [
      {
        data: [healthCounts.ok, healthCounts.warning, healthCounts.critical],
        backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
      },
    ],
  };

  const firmwareBar = {
    labels: ['Up-to-date', 'Outdated'],
    datasets: [
      {
        label: 'Firmware Status',
        data: [firmwareCounts.upToDate, firmwareCounts.outdated],
        backgroundColor: ['#22c55e', '#ef4444'],
      },
    ],
  };

  return (
    <div className="flex flex-wrap gap-8 mb-8">
      <div className="w-64">
        <h4 className="font-semibold mb-2">Device Health Status</h4>
        <Pie data={healthPie} />
      </div>
      <div className="w-64">
        <h4 className="font-semibold mb-2">Firmware Status</h4>
        <Bar
          data={firmwareBar}
          options={{
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } },
          }}
        />
      </div>
    </div>
  );
}
