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

export async function getADOMs() {
  const res = await api.post('/jsonrpc', {
    id: 1,
    method: 'get',
    params: [{ url: '/dvmdb/adom' }],
  });
  return res.data.result?.[0]?.data || [];
}

export async function getDevices(adom: string) {
  const res = await api.post('/jsonrpc', {
    id: 1,
    method: 'get',
    params: [{ url: `/dvmdb/adom/${adom}/device` }],
  });
  return res.data.result?.[0]?.data || [];
}

export async function getFortiSwitches(adom: string) {
  const res = await api.post('/jsonrpc', {
    id: 1,
    method: 'get',
    params: [{ url: `/dvmdb/adom/${adom}/switch` }],
  });
  return res.data.result?.[0]?.data || [];
}

export async function getFortiAPs(adom: string) {
  const res = await api.post('/jsonrpc', {
    id: 1,
    method: 'get',
    params: [{ url: `/dvmdb/adom/${adom}/fap` }],
  });
  return res.data.result?.[0]?.data || [];
}

export async function getDeviceMonitoring(adom: string, device: string) {
  const res = await api.post('/jsonrpc', {
    id: 1,
    method: 'get',
    params: [{ url: `/dvmdb/adom/${adom}/device/${device}` }],
  });
  return res.data.result?.[0]?.data || {};
}

export async function getSystemStatus() {
  const res = await api.post('/jsonrpc', {
    id: 1,
    method: 'get',
    params: [{ url: '/sys/status' }],
  });
  return res.data.result?.[0]?.data || {};
}
