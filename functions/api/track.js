// functions/api/track.js
// Cloudflare Pages Function — receives funnel events and writes to Neon (Clients DB)
// Endpoint: POST /api/track
// Called by sr-tracker.js on diagnostic.html, godfather.html, tripwire.html, thank-you.html
//
// REQUIRES: @neondatabase/serverless installed in the Signal-site repo:
//   npm install @neondatabase/serverless
// REQUIRES: Cloudflare Pages env var CLIENTS_NEON_URL set to the full Neon
//   connection string, e.g. postgresql://user:pass@host.neon.tech/neondb?sslmode=require

import { neon } from '@neondatabase/serverless';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // sendBeacon sends as text/plain, fetch sends application/json — parse text either way
  let body;
  try {
    const raw = await request.text();
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  const { session_id, visitor_id, event_type, page, payload = {} } = body;

  if (!event_type) {
    return json({ ok: false, error: 'event_type required' }, 400);
  }

  if (!env.CLIENTS_NEON_URL) {
    // Surface this one loudly — it's a config error, not a user-path failure
    return json({ ok: false, error: 'CLIENTS_NEON_URL not configured' }, 500);
  }

  const userAgent = (request.headers.get('user-agent') || '').substring(0, 500);

  try {
    const sql = neon(env.CLIENTS_NEON_URL);
    await sql`
      INSERT INTO funnel_events
        (session_id, visitor_id, event_type, page, payload, user_agent)
      VALUES
        (${session_id || null}, ${visitor_id || null}, ${event_type},
         ${page || null}, ${JSON.stringify(payload)}::jsonb, ${userAgent})
    `;
    return json({ ok: true });
  } catch (e) {
    console.error('funnel_events write failed:', e.message);
    return json({ ok: false, error: 'write_failed' }, 200);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
