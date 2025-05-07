jest.mock('../../env', () => ({
  FMG_API_URL: 'http://localhost:8080',
  FMG_API_TOKEN: 'test-token',
  FMG_POLL_INTERVAL_SECONDS: '30',
}));

import { getADOMs } from '../fortimanager';

describe('FortiManager API', () => {
  it('should have a getADOMs function', () => {
    expect(typeof getADOMs).toBe('function');
  });
}); 