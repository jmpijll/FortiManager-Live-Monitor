import { useState, useEffect, useRef } from 'react';
import { useConfig } from '../context/ConfigContext';

const FLOWERBED_LOGO = 'https://www.flowerbed.nl/assets/img/logo-basis-wit.svg'; // Example logo URL, update if needed
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80'; // Tech/people/secure theme

export default function ConfigModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { apiUrl, apiToken, login } = useConfig();
  const [url, setUrl] = useState(apiUrl);
  const [token, setToken] = useState(apiToken);
  const [disableSSL, setDisableSSL] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState<string | object | undefined>(undefined);
  const initialFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [open]);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    setDetails(undefined);
    let result;
    try {
      result = await login(url, token, disableSSL);
    } catch (err: unknown) {
      setLoading(false);
      let message = 'Unknown error';
      if (err instanceof Error && typeof err.message === 'string') {
        message = err.message;
      } else if (typeof err === 'string') {
        message = err;
      }
      setError('Unexpected error: ' + message);
      setDetails(err as string | object | undefined);
      return;
    }
    setLoading(false);
    if (result.success) {
      setError('');
      onClose();
    } else {
      // Friendly error for fetch/network/CORS/SSL
      if (result.error && result.error.toLowerCase().includes('failed to fetch')) {
        setError(
          'Network error: Could not connect to the API. This is often caused by SSL certificate issues or CORS restrictions in your browser.'
        );
      } else if (result.error && result.error.toLowerCase().includes('certificate')) {
        setError(
          'SSL certificate error: The API server uses a certificate that your browser does not trust. You can try disabling SSL checks (for development only).'
        );
      } else {
        setError(result.error || 'Login failed.');
      }
      setDetails(result.details as string | object | undefined);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white dark:bg-surface rounded-3xl shadow-3xl w-full max-w-md p-0 relative animate-fade-in border border-border backdrop-blur-md flex flex-col overflow-hidden">
        {/* Hero image */}
        <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
          <img src={HERO_IMAGE} alt="Tech hero" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
          {/* Flowerbed logo */}
          <img
            src={FLOWERBED_LOGO}
            alt="Flowerbed Engineering"
            className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-auto drop-shadow-xl"
            style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '1rem', padding: '0.5rem' }}
          />
        </div>
        <div className="flex flex-col gap-6 px-8 py-8">
          <h2 className="text-2xl font-extrabold text-center text-primary dark:text-primary tracking-tight">
            FortiManager API Login
          </h2>
          <div className="text-center text-foreground/70 text-base mb-2">
            We keep your IT covered:{' '}
            <span className="font-semibold text-primary">Secure, Compliant, Simplified</span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="api-url-input" className="text-base text-foreground/70 font-medium">
                API URL
              </label>
              <input
                id="api-url-input"
                ref={initialFocusRef}
                className="w-full px-4 py-3 border-2 border-input rounded-xl bg-transparent text-lg focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://manager.example.com"
                type="url"
                autoComplete="url"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="api-token-input" className="text-base text-foreground/70 font-medium">
                API Token
              </label>
              <input
                id="api-token-input"
                className="w-full px-4 py-3 border-2 border-input rounded-xl bg-transparent text-lg focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="API Token"
                type="text"
                autoComplete="off"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                id="disable-ssl-checkbox"
                type="checkbox"
                checked={disableSSL}
                onChange={(e) => setDisableSSL(e.target.checked)}
                className="w-5 h-5 rounded border border-input focus:ring-2 focus:ring-primary"
              />
              <label
                htmlFor="disable-ssl-checkbox"
                className="text-sm text-foreground/70 select-none cursor-pointer"
              >
                Disable SSL checks (for development only)
              </label>
            </div>
            {error && (
              <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 animate-shake flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{String(error)}</span>
                  {details && (
                    <button
                      type="button"
                      className="ml-2 text-xs text-primary underline hover:no-underline focus:outline-none"
                      onClick={() => setShowDetails((v) => !v)}
                    >
                      {showDetails ? 'Hide details' : 'More details'}
                    </button>
                  )}
                </div>
                {showDetails && details && (
                  <pre className="mt-2 text-xs bg-surface-foreground/5 p-2 rounded overflow-x-auto max-h-40 border border-border whitespace-pre-wrap break-all">
                    {typeof details === 'object' ? JSON.stringify(details, null, 2) : details}
                  </pre>
                )}
                {error.toLowerCase().includes('network error') && (
                  <div className="mt-2 text-xs text-foreground/70">
                    <b>Troubleshooting tips:</b>
                    <ul className="list-disc ml-5">
                      <li>Check if the API URL is correct and accessible from your browser.</li>
                      <li>
                        If using a self-signed certificate, try disabling SSL checks (for
                        development only).
                      </li>
                      <li>
                        If the error persists, it may be due to CORS restrictions. Consider using a
                        CORS proxy or backend proxy for development.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            <button
              className="w-full px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-lg hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:pointer-events-none relative overflow-hidden group text-lg mt-2"
              onClick={handleLogin}
              type="submit"
              disabled={loading}
            >
              <span className="absolute inset-0 group-active:bg-primary/30 group-hover:bg-primary/10 transition-all pointer-events-none" />
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-primary-foreground"></span>{' '}
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
