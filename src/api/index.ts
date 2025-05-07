import { error as logError } from '../utils/logger';

export async function fetchDevices() {
  try {
    // ... fetch logic ...
  } catch (err) {
    logError('Failed to fetch devices', err);
    throw err;
  }
}
