import { useQuery } from '@tanstack/react-query';
import {
  getADOMs,
  getDevices,
  getDeviceMonitor,
  getSystemStatus,
  getFortiSwitches,
  getFortiAPs,
  getSwitchMonitor,
  getAPMonitor,
} from '../api/fortimanager';
import type { ADOM, Device, DeviceMonitor, SystemStatus, Switch, AP } from '../api/fortimanager';
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

export function useFortiSwitches(adom: string) {
  const { pollInterval } = useConfig();
  return useQuery<Switch[]>({
    queryKey: ['switches', adom],
    queryFn: () => getFortiSwitches(adom),
    enabled: !!adom,
    refetchInterval: pollInterval * 1000,
  });
}

export function useFortiAPs(adom: string) {
  const { pollInterval } = useConfig();
  return useQuery<AP[]>({
    queryKey: ['aps', adom],
    queryFn: () => getFortiAPs(adom),
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

export function useSwitchMonitor(deviceName: string) {
  const { pollInterval } = useConfig();
  return useQuery<DeviceMonitor>({
    queryKey: ['switchMonitor', deviceName],
    queryFn: () => getSwitchMonitor(deviceName),
    enabled: !!deviceName,
    refetchInterval: pollInterval * 1000,
  });
}

export function useAPMonitor(deviceName: string) {
  const { pollInterval } = useConfig();
  return useQuery<DeviceMonitor>({
    queryKey: ['apMonitor', deviceName],
    queryFn: () => getAPMonitor(deviceName),
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
