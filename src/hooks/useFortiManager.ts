import { useQuery } from '@tanstack/react-query';
import { getADOMs, getDevices, getDeviceMonitor, getSystemStatus } from '../api/fortimanager';
import type { ADOM, Device, DeviceMonitor, SystemStatus } from '../api/fortimanager';
import { useConfig } from '../context/ConfigContext';

export function useADOMs() {
  const { pollInterval } = useConfig();
  return useQuery<ADOM[]>({
    queryKey: ['adoms'],
    queryFn: getADOMs,
    refetchInterval: pollInterval * 1000,
  });
}

export function useDevices(adom: string) {
  const { pollInterval } = useConfig();
  return useQuery<Device[]>({
    queryKey: ['devices', adom],
    queryFn: () => getDevices(adom),
    enabled: !!adom,
    refetchInterval: pollInterval * 1000,
  });
}

export function useDeviceMonitor(deviceName: string) {
  const { pollInterval } = useConfig();
  return useQuery<DeviceMonitor>({
    queryKey: ['deviceMonitor', deviceName],
    queryFn: () => getDeviceMonitor(deviceName),
    enabled: !!deviceName,
    refetchInterval: pollInterval * 1000,
  });
}

export function useSystemStatus() {
  const { pollInterval } = useConfig();
  return useQuery<SystemStatus>({
    queryKey: ['systemStatus'],
    queryFn: getSystemStatus,
    refetchInterval: pollInterval * 1000,
  });
}
