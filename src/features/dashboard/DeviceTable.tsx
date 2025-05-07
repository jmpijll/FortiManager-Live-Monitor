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

  let devices, isLoading, error;
  if (deviceType === 'fortigate') {
    devices = devicesData.data;
    isLoading = devicesData.isLoading;
    error = devicesData.error;
  } else if (deviceType === 'fortiswitch') {
    devices = switchesData.data;
    isLoading = switchesData.isLoading;
    error = switchesData.error;
  } else if (deviceType === 'fortiap') {
    devices = apsData.data;
    isLoading = apsData.isLoading;
    error = apsData.error;
  } else {
    devices = [];
    isLoading = false;
    error = false;
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
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter: setTableGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);

  // Sync local search input with react-table's global filter
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
    setTableGlobalFilter(e.target.value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">
        {deviceType === 'fortigate'
          ? 'FortiGate Devices'
          : deviceType === 'fortiswitch'
            ? 'FortiSwitch Devices'
            : deviceType === 'fortiap'
              ? 'FortiAP Devices'
              : 'Devices'}
      </h3>
      <div className="flex items-center justify-between mb-3">
        <input
          className="px-2 py-1 border rounded w-full dark:bg-gray-900 dark:border-gray-700"
          type="text"
          placeholder="Search by name, IP, or serial..."
          value={globalFilter}
          onChange={handleSearch}
          style={{ maxWidth: 300 }}
        />
        <button
          className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => exportToCSV(data as any[], columns)}
        >
          Export CSV
        </button>
      </div>
      {isLoading && <div>Loading devices...</div>}
      {error && <div className="text-red-500">Failed to load devices</div>}
      <table {...getTableProps()} className="min-w-full text-sm">
        <thead>
          {headerGroups.map((headerGroup: Record<string, unknown>) => (
            <tr
              {...(headerGroup as any).getHeaderGroupProps()}
              className="bg-gray-100 dark:bg-gray-700"
            >
              {(headerGroup as any).headers.map((column: Record<string, unknown>) => (
                <th
                  {...(column as any).getHeaderProps((column as any).getSortByToggleProps())}
                  className="px-2 py-1 text-left cursor-pointer"
                >
                  {(column as any).render('Header')}
                  {(column as any).isSorted ? ((column as any).isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: Record<string, unknown>) => {
            (prepareRow as any)(row);
            return (
              <tr
                {...(row as any).getRowProps()}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                {(row as any).cells.map((cell: Record<string, unknown>) => (
                  <td {...(cell as any).getCellProps()} className="px-2 py-1">
                    {(cell as any).render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <DeviceHealthTrendModal
        deviceName={trendModal.deviceName || ''}
        deviceType={deviceType}
        open={trendModal.open}
        onClose={() => setTrendModal({ open: false, deviceName: null })}
      />
    </div>
  );
}
