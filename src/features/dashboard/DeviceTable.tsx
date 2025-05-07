import { useDevices } from '../../hooks/useFortiManager';

interface DeviceTableProps {
  adom: string;
  deviceType: string;
}

export default function DeviceTable({ adom, deviceType }: DeviceTableProps) {
  // For now, only FortiGate devices are supported
  const { data: devices, isLoading, error } = useDevices(adom);

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">
        {deviceType === 'fortigate' ? 'FortiGate Devices' : 'Devices'}
      </h3>
      {isLoading && <div>Loading devices...</div>}
      {error && <div className="text-red-500">Failed to load devices</div>}
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="px-2 py-1 text-left">Name</th>
            <th className="px-2 py-1 text-left">IP</th>
            <th className="px-2 py-1 text-left">Serial</th>
            <th className="px-2 py-1 text-left">Firmware</th>
            <th className="px-2 py-1 text-left">HA</th>
            <th className="px-2 py-1 text-left">Status</th>
            <th className="px-2 py-1 text-left">Health</th>
          </tr>
        </thead>
        <tbody>
          {devices?.map((d) => (
            <tr key={d.sn} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-2 py-1">{d.name}</td>
              <td className="px-2 py-1">{d.ip}</td>
              <td className="px-2 py-1">{d.sn}</td>
              <td className="px-2 py-1">{d.os_ver}</td>
              <td className="px-2 py-1">{d.ha_mode}</td>
              <td className="px-2 py-1">{d.status}</td>
              <td className="px-2 py-1">
                {/* Health metrics placeholder */}
                <span className="italic text-gray-400">(metrics)</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
