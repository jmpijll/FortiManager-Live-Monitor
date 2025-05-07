import { useSystemStatus } from '../../hooks/useFortiManager';

export default function SystemStatusCard() {
  const { data, isLoading, error } = useSystemStatus();
  const CRITICAL_CPU = 80;
  const CRITICAL_MEM = 80;

  if (isLoading) return <div className="mb-6">Loading FortiManager status...</div>;
  if (error || !data)
    return <div className="mb-6 text-red-500">Failed to load FortiManager status</div>;

  const cpuCritical = data.cpu >= CRITICAL_CPU;
  const memCritical = data.mem >= CRITICAL_MEM;

  function formatUptime(seconds: number) {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
  }

  return (
    <div className="mb-6 p-4 rounded-lg shadow bg-blue-50 dark:bg-blue-900 flex flex-wrap gap-6 items-center">
      <div>
        <div className="font-bold text-blue-900 dark:text-blue-100">FortiManager</div>
        <div className="text-xs text-blue-700 dark:text-blue-200">{data.hostname}</div>
      </div>
      <div>
        <span className="font-semibold">Version:</span> {data.version}
      </div>
      <div>
        <span className="font-semibold">Uptime:</span> {formatUptime(data.up_time)}
      </div>
      <div>
        <span className="font-semibold">CPU:</span>{' '}
        <span
          className={
            cpuCritical
              ? 'text-red-600 font-bold'
              : data.cpu >= 60
                ? 'text-yellow-600'
                : 'text-green-600'
          }
        >
          {data.cpu}%
          {cpuCritical && (
            <span title="Critical CPU" className="ml-1">
              &#9888;
            </span>
          )}
        </span>
      </div>
      <div>
        <span className="font-semibold">Memory:</span>{' '}
        <span
          className={
            memCritical
              ? 'text-red-600 font-bold'
              : data.mem >= 60
                ? 'text-yellow-600'
                : 'text-green-600'
          }
        >
          {data.mem}%
          {memCritical && (
            <span title="Critical Memory" className="ml-1">
              &#9888;
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
