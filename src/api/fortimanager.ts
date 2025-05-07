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
export interface Switch {
  name: string;
  ip: string;
  sn: string;
  platform_str?: string;
  os_ver?: string;
  status?: string;
}
export interface AP {
  name: string;
  ip: string;
  sn: string;
  platform_str?: string;
  os_ver?: string;
  status?: string;
}

// Helper for POST requests
async function fmgPost(apiUrl: string, sessionId: string, params: Record<string, unknown>) {
  const res = await fetch(`${apiUrl}/jsonrpc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 1, session: sessionId, ...params }),
  });
  const data = await res.json();
  return data.result?.[0]?.data || [];
}

export async function getADOMs(apiUrl: string, sessionId: string) {
  return fmgPost(apiUrl, sessionId, { method: 'get', params: [{ url: '/dvmdb/adom' }] });
}
export async function getDevices(apiUrl: string, sessionId: string, adom: string) {
  return fmgPost(apiUrl, sessionId, { method: 'get', params: [{ url: `/dvmdb/adom/${adom}/device` }] });
}
export async function getDeviceMonitor(apiUrl: string, sessionId: string, deviceName: string) {
  return fmgPost(apiUrl, sessionId, { method: 'get', params: [{ url: `/pm/device/${deviceName}/monitor` }] });
}
export async function getSystemStatus(apiUrl: string, sessionId: string) {
  return fmgPost(apiUrl, sessionId, { method: 'get', params: [{ url: '/sys/status' }] });
}
export async function getFortiSwitches(apiUrl: string, sessionId: string, adom: string) {
  return fmgPost(apiUrl, sessionId, { method: 'get', params: [{ url: `/dvmdb/adom/${adom}/switch` }] });
}
export async function getFortiAPs(apiUrl: string, sessionId: string, adom: string) {
  return fmgPost(apiUrl, sessionId, { method: 'get', params: [{ url: `/dvmdb/adom/${adom}/ap` }] });
}
export async function getSwitchMonitor(apiUrl: string, sessionId: string, deviceName: string) {
  return fmgPost(apiUrl, sessionId, { method: 'get', params: [{ url: `/pm/switch/${deviceName}/monitor` }] });
}
export async function getAPMonitor(apiUrl: string, sessionId: string, deviceName: string) {
  return fmgPost(apiUrl, sessionId, { method: 'get', params: [{ url: `/pm/ap/${deviceName}/monitor` }] });
}
