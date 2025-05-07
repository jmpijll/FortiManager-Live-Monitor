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
    <div className="mb-6 p-6 rounded-2xl shadow-lg bg-surface/90 dark:bg-surface/90 border border-border flex flex-wrap gap-8 items-center min-w-[320px] animate-fade-in">
      <div>
        <div className="font-extrabold text-primary text-lg">FortiManager</div>
        <div className="text-xs text-foreground/70">{data.hostname}</div>
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
            <span title="Critical CPU" className="ml-1 animate-pulse">
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
            <span title="Critical Memory" className="ml-1 animate-pulse">
              &#9888;
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
