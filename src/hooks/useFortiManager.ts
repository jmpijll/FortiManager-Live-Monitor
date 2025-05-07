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
  const { apiUrl, sessionId, pollInterval } = useConfig();
  return useQuery<ADOM[]>({
    queryKey: ['adoms', apiUrl, sessionId],
    queryFn: () => getADOMs(apiUrl, sessionId),
    enabled: !!apiUrl && !!sessionId,
    refetchInterval: pollInterval * 1000,
  });
}

export function useDevices(adom: string) {
  const { apiUrl, sessionId, pollInterval } = useConfig();
  return useQuery<Device[]>({
    queryKey: ['devices', adom, apiUrl, sessionId],
    queryFn: () => getDevices(apiUrl, sessionId, adom),
    enabled: !!adom && !!apiUrl && !!sessionId,
    refetchInterval: pollInterval * 1000,
  });
}

export function useDeviceMonitor(deviceName: string) {
  const { apiUrl, sessionId, pollInterval } = useConfig();
  return useQuery<DeviceMonitor>({
    queryKey: ['deviceMonitor', deviceName, apiUrl, sessionId],
    queryFn: () => getDeviceMonitor(apiUrl, sessionId, deviceName),
    enabled: !!deviceName && !!apiUrl && !!sessionId,
    refetchInterval: pollInterval * 1000,
  });
}

export function useSystemStatus() {
  const { apiUrl, sessionId, pollInterval } = useConfig();
  return useQuery<SystemStatus>({
    queryKey: ['systemStatus', apiUrl, sessionId],
    queryFn: () => getSystemStatus(apiUrl, sessionId),
    enabled: !!apiUrl && !!sessionId,
    refetchInterval: pollInterval * 1000,
  });
}

export function useFortiSwitches(adom: string) {
  const { apiUrl, sessionId, pollInterval } = useConfig();
  return useQuery<Switch[]>({
    queryKey: ['switches', adom, apiUrl, sessionId],
    queryFn: () => getFortiSwitches(apiUrl, sessionId, adom),
    enabled: !!adom && !!apiUrl && !!sessionId,
    refetchInterval: pollInterval * 1000,
  });
}

export function useFortiAPs(adom: string) {
  const { apiUrl, sessionId, pollInterval } = useConfig();
  return useQuery<AP[]>({
    queryKey: ['aps', adom, apiUrl, sessionId],
    queryFn: () => getFortiAPs(apiUrl, sessionId, adom),
    enabled: !!adom && !!apiUrl && !!sessionId,
    refetchInterval: pollInterval * 1000,
  });
}

export function useSwitchMonitor(deviceName: string) {
  const { apiUrl, sessionId, pollInterval } = useConfig();
  return useQuery<DeviceMonitor>({
    queryKey: ['switchMonitor', deviceName, apiUrl, sessionId],
    queryFn: () => getSwitchMonitor(apiUrl, sessionId, deviceName),
    enabled: !!deviceName && !!apiUrl && !!sessionId,
    refetchInterval: pollInterval * 1000,
  });
}

export function useAPMonitor(deviceName: string) {
  const { apiUrl, sessionId, pollInterval } = useConfig();
  return useQuery<DeviceMonitor>({
    queryKey: ['apMonitor', deviceName, apiUrl, sessionId],
    queryFn: () => getAPMonitor(apiUrl, sessionId, deviceName),
    enabled: !!deviceName && !!apiUrl && !!sessionId,
    refetchInterval: pollInterval * 1000,
  });
}
