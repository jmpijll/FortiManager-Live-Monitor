/* eslint-disable @typescript-eslint/no-explicit-any */
// Workaround: react-table v7 lacks up-to-date TypeScript types for React 19. We use Record<string, unknown> for row/cell types and a local module declaration to suppress type errors for this import.
import { useDevices, useDeviceMonitor } from '../../hooks/useFortiManager';
import { memo, useMemo, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';

interface DeviceTableProps {
  adom: string;
  deviceType: string;
}

const CRITICAL_CPU = 80;
const CRITICAL_MEM = 80;

const HealthCell = memo(function HealthCell({ deviceName }: { deviceName: string }) {
  const { data, isLoading, error } = useDeviceMonitor(deviceName);
  if (isLoading) return <span className="text-gray-400">Loading...</span>;
  if (error || !data) return <span className="text-red-500">!</span>;
  const cpu = data.cpu;
  const mem = data.mem;
  const cpuCritical = cpu >= CRITICAL_CPU;
  const memCritical = mem >= CRITICAL_MEM;
  return (
    <span>
      <span
        className={
          cpuCritical ? 'text-red-600 font-bold' : cpu >= 60 ? 'text-yellow-600' : 'text-green-600'
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
          memCritical ? 'text-red-600 font-bold' : mem >= 60 ? 'text-yellow-600' : 'text-green-600'
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

export default function DeviceTable({ adom, deviceType }: DeviceTableProps) {
  const { data: devices, isLoading, error } = useDevices(adom);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'IP', accessor: 'ip' },
      { Header: 'Serial', accessor: 'sn' },
      { Header: 'Firmware', accessor: 'os_ver' },
      { Header: 'HA', accessor: 'ha_mode' },
      { Header: 'Status', accessor: 'status' },
      {
        Header: 'Health',
        accessor: 'name',
        Cell: ({ value }: { value: string }) => <HealthCell deviceName={value} />,
        disableSortBy: true,
      },
    ],
    []
  );

  const data = useMemo(() => devices || [], [devices]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter: setTableGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  // Sync local search input with react-table's global filter
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
    setTableGlobalFilter(e.target.value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">
        {deviceType === 'fortigate' ? 'FortiGate Devices' : 'Devices'}
      </h3>
      <input
        className="mb-3 px-2 py-1 border rounded w-full dark:bg-gray-900 dark:border-gray-700"
        type="text"
        placeholder="Search by name, IP, or serial..."
        value={globalFilter}
        onChange={handleSearch}
      />
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
                <th {...(column as any).getHeaderProps()} className="px-2 py-1 text-left">
                  {(column as any).render('Header')}
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
    </div>
  );
}
