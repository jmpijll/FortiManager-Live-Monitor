import axios from 'axios';

const FMG_API_URL = import.meta.env.VITE_FMG_API_URL;
const FMG_API_TOKEN = import.meta.env.VITE_FMG_API_TOKEN;

const api = axios.create({
  baseURL: FMG_API_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(FMG_API_TOKEN ? { Authorization: `Bearer ${FMG_API_TOKEN}` } : {}),
  },
});

// Types
export interface ADOM {
  name: string;
  desc?: string;
  os_ver?: string;
}
export interface Device {
  name: string;
  ip: string;
  sn: string;
  platform_str?: string;
  ha_mode?: string;
  os_ver?: string;
  status?: string;
}
export interface DeviceMonitor {
  cpu: number;
  mem: number;
  up_time: number;
  version: string;
  ha: string;
  update: string;
}
export interface SystemStatus {
  version: string;
  hostname: string;
  up_time: number;
  cpu: number;
  mem: number;
}

// API functions
export async function getADOMs(): Promise<ADOM[]> {
  const res = await api.post('/jsonrpc', {
    id: 1,
    method: 'get',
    params: [{ url: '/dvmdb/adom' }],
  });
  return res.data.result?.[0]?.data || [];
}

export async function getDevices(adom: string): Promise<Device[]> {
  const res = await api.post('/jsonrpc', {
    id: 1,
    method: 'get',
    params: [{ url: `/dvmdb/adom/${adom}/device` }],
  });
  return res.data.result?.[0]?.data || [];
}

export async function getDeviceMonitor(deviceName: string): Promise<DeviceMonitor> {
  const res = await api.post('/jsonrpc', {
    id: 1,
    method: 'get',
    params: [{ url: `/pm/device/${deviceName}/monitor` }],
  });
  return res.data.result?.[0]?.data || {};
}

export async function getSystemStatus(): Promise<SystemStatus> {
  const res = await api.post('/jsonrpc', {
    id: 1,
    method: 'get',
    params: [{ url: '/sys/status' }],
  });
  return res.data.result?.[0]?.data || {};
}
