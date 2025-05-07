/* eslint-disable @typescript-eslint/no-explicit-any */
// Workaround: react-table v7 lacks up-to-date TypeScript types for React 19. We use Record<string, unknown> for row/cell types and a local module declaration to suppress type errors for this import.
import {
  useDevices,
  useDeviceMonitor,
  useFortiSwitches,
  useFortiAPs,
  useSwitchMonitor,
  useAPMonitor,
} from '../../hooks/useFortiManager';
import { memo, useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useSortBy, useFilters } from 'react-table';
import DeviceHealthTrendModal from './DeviceHealthTrendModal';
import { saveAs } from 'file-saver';

interface DeviceTableProps {
  adom: string;
  deviceType: string;
  thresholds: { cpu: number; mem: number };
}

const LATEST_FIRMWARE = '7.2.5'; // Placeholder, make user-configurable in future

const HealthCell = memo(function HealthCell({
  deviceName,
  deviceType,
  thresholds,
}: {
  deviceName: string;
  deviceType: string;
  thresholds: { cpu: number; mem: number };
}) {
  // Call all hooks unconditionally
  const deviceMonitor = useDeviceMonitor(deviceName);
  const switchMonitor = useSwitchMonitor(deviceName);
  const apMonitor = useAPMonitor(deviceName);
  let hook;
  if (deviceType === 'fortigate') hook = deviceMonitor;
  else if (deviceType === 'fortiswitch') hook = switchMonitor;
  else if (deviceType === 'fortiap') hook = apMonitor;
  else hook = { data: null, isLoading: false, error: false };
  const { data, isLoading, error } = hook;
  if (isLoading) return <span className="text-gray-400">Loading...</span>;
  if (error || !data) return <span className="text-red-500">!</span>;
  const cpu = data.cpu;
  const mem = data.mem;
  const cpuCritical = cpu >= thresholds.cpu;
  const memCritical = mem >= thresholds.mem;
  return (
    <span>
      <span
        className={
          cpuCritical
            ? 'text-red-600 font-bold'
            : cpu >= thresholds.cpu - 20
              ? 'text-yellow-600'
              : 'text-green-600'
        }
      >
        CPU: {cpu}%
        {cpuCritical && (
          <span title="Critical CPU" className="ml-1">
            &#9888;
          </span>
        )}
      </span>
      <span className="mx-1">|</span>
      <span
        className={
          memCritical
            ? 'text-red-600 font-bold'
            : mem >= thresholds.mem - 20
              ? 'text-yellow-600'
              : 'text-green-600'
        }
      >
        MEM: {mem}%
        {memCritical && (
          <span title="Critical Memory" className="ml-1">
            &#9888;
          </span>
        )}
      </span>
    </span>
  );
});

function FirmwareStatusCell({ version }: { version?: string }) {
  if (!version) return <span className="text-gray-400">Unknown</span>;
  const upToDate = version === LATEST_FIRMWARE;
  return upToDate ? (
    <span className="text-green-600">Up-to-date</span>
  ) : (
    <span className="text-red-600 font-bold">Outdated ({version})</span>
  );
}

function HAStatusCell({ ha }: { ha?: string }) {
  if (!ha) return <span className="text-gray-400">Unknown</span>;
  if (ha.toLowerCase() === 'standalone') return <span className="text-blue-600">Standalone</span>;
  if (ha.toLowerCase() === 'active') return <span className="text-green-600">Active</span>;
  if (ha.toLowerCase() === 'passive') return <span className="text-yellow-600">Passive</span>;
  return <span className="text-red-600 font-bold">{ha}</span>;
}

function exportToCSV(data: any[], columns: any[]) {
  const header = columns.map((col: any) => col.Header).join(',');
  const rows = data.map((row: any) =>
    columns
      .map((col: any) => {
        const val = row[col.accessor];
        return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
      })
      .join(',')
  );
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'devices.csv');
}

export default function DeviceTable({ adom, deviceType, thresholds }: DeviceTableProps) {
  // Call all hooks unconditionally
  const devicesData = useDevices(adom);
  const switchesData = useFortiSwitches(adom);
  const apsData = useFortiAPs(adom);

  let devices;
  if (deviceType === 'fortigate') {
    devices = devicesData.data;
  } else if (deviceType === 'fortiswitch') {
    devices = switchesData.data;
  } else if (deviceType === 'fortiap') {
    devices = apsData.data;
  } else {
    devices = [];
  }
  const [globalFilter, setGlobalFilter] = useState('');
  const [trendModal, setTrendModal] = useState<{ open: boolean; deviceName: string | null }>({
    open: false,
    deviceName: null,
  });

  const columns = useMemo(() => {
    const base = [
      { Header: 'Name', accessor: 'name' },
      { Header: 'IP', accessor: 'ip' },
      { Header: 'Serial', accessor: 'sn' },
      { Header: 'Firmware', accessor: 'os_ver' },
      {
        Header: 'Firmware Status',
        accessor: 'os_ver',
        Cell: ({ value }: { value?: string }) => <FirmwareStatusCell version={value} />,
        disableSortBy: true,
      },
      { Header: 'Status', accessor: 'status' },
    ];
    if (deviceType === 'fortigate')
      base.splice(5, 0, {
        Header: 'HA Status',
        accessor: 'ha_mode',
        Cell: ({ value }: { value?: string }) => <HAStatusCell ha={value} />,
        disableSortBy: true,
      });
    return [
      ...base,
      {
        Header: 'Health',
        accessor: 'name',
        Cell: ({ value }: { value: string }) => (
          <HealthCell deviceName={value} deviceType={deviceType} thresholds={thresholds} />
        ),
        disableSortBy: true,
      },
      {
        Header: 'Trends',
        accessor: 'name',
        Cell: ({ value }: { value: string }) => (
          <button
            className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
            onClick={() => setTrendModal({ open: true, deviceName: value })}
          >
            Show Trends
          </button>
        ),
        disableSortBy: true,
      },
    ];
  }, [deviceType, thresholds]);

  const data = useMemo(() => devices || [], [devices]);

  const {
    /* getTableProps, getTableBodyProps, headerGroups, */ rows,
    prepareRow,
    setGlobalFilter: setTableGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);

  // Sync local search input with react-table's global filter
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
    setTableGlobalFilter(e.target.value);
  };

  return (
    <div className="mt-8 bg-surface/90 dark:bg-surface/90 rounded-2xl shadow-lg border border-border p-6 animate-fade-in overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          className="px-4 py-2 rounded-full border-2 border-input bg-surface-foreground/10 text-primary focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all w-64"
          placeholder="Search devices..."
          value={globalFilter}
          onChange={handleSearch}
        />
        <button
          className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 active:scale-95"
          onClick={() => exportToCSV(data as any[], columns as any[])}
        >
          Export CSV
        </button>
      </div>
      <table className="min-w-full divide-y divide-border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.Header as string}
                className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider bg-surface-foreground/5 border-b-2 border-border"
              >
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <tr key={row.id} className="hover:bg-primary/5 transition-all">
                {row.cells.map((cell: any) => (
                  <td key={cell.column.id} className="px-4 py-3 text-foreground/90 text-sm">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {trendModal.open && trendModal.deviceName && (
        <DeviceHealthTrendModal
          open={trendModal.open}
          deviceName={trendModal.deviceName}
          deviceType={deviceType}
          onClose={() => setTrendModal({ open: false, deviceName: null })}
        />
      )}
    </div>
  );
}
