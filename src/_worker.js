const N8N_BASE = 'https://data009.app.n8n.cloud/webhook';
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://signalresolution.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Max-Age': '86400',
};
const ROUTE_MAP = {
  '/api/diagnostic/start': N8N_BASE + '/diagnostic-session-start',
  '/api/diagnostic/complete': N8N_BASE + '/diagnostic-session-complete',
  '/api/diagnostic/lead': N8N_BASE + '/diagnostic-lead-capture',
};
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    const target = ROUTE_MAP[path];
    if (!target) {
      return env.ASSETS.fetch(request);
    }
    const body = await request.text();
    const n8nResponse = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    });
    const responseBody = await n8nResponse.text();
    return new Response(responseBody, {
      status: n8nResponse.status,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  },
};
