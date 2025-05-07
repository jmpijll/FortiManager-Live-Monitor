import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Disable SSL verification for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.post('/api/fortimanager', async (req, res) => {
  const { apiUrl, apiToken, body } = req.body;
  console.log('[Proxy] Incoming request:', {
    apiUrl,
    apiToken: apiToken ? '***' : undefined,
    body,
  });
  try {
    const targetUrl = `${apiUrl}/jsonrpc?access_token=${apiToken}`;
    console.log('[Proxy] Forwarding to:', targetUrl);
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log('[Proxy] Response from FortiManager:', data);
    res.json(data);
  } catch (err) {
    console.error('[Proxy] Error:', err);
    res.status(500).json({
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
      details: err,
    });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`FortiManager proxy running on port ${PORT}`));
