const isDev = process.env.NODE_ENV !== 'production';

export const log = (...args: unknown[]) => {
  if (isDev) console.log('[LOG]', ...args);
};
export const warn = (...args: unknown[]) => {
  if (isDev) console.warn('[WARN]', ...args);
};
export const error = (...args: unknown[]) => {
  if (isDev) console.error('[ERROR]', ...args);
};
export const info = (...args: unknown[]) => {
  if (isDev) console.info('[INFO]', ...args);
};

// In production, swap these for a remote logger or analytics as needed.
