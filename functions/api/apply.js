export async function onRequestPost(context) {
  const body = await context.request.json();
  const BREVO_KEY = context.env.BREVO_KEY;

  const payload = {
    email: body.email,
    attributes: {
      FIRSTNAME:          body.name || '',
      LASTNAME:           '',
      COMPANY:            body.company || '',
      ARR_RANGE:          body.arr || '',
      BOTTLENECK_NOTES:   body.bottleneck || '',
      APPLICATION_STATUS: 'pending'
    },
    listIds: [12],
    updateEnabled: true
  };

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': BREVO_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }});
}
