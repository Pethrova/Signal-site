export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid email" }), {
      status: 400,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  const apiKey = env.BREVO_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ ok: false, error: "Server config error" }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  const contactPayload = {
    email: email,
    attributes: {
      FIRSTNAME:          body.name      || "",
      COMPANY:            body.company   || "",
      ARR_RANGE:          body.arr       || "",
      BOTTLENECK_NOTES:   body.bottleneck || "",
      TRIED_BEFORE:       body.whatTried || "",
      RIGHT_MOMENT:       body.whyNow    || "",
      APPLICATION_STATUS: "pending"
    },
    listIds: [17],
    updateEnabled: true
  };

  try {
    const contactResp = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json"
      },
      body: JSON.stringify(contactPayload)
    });

    if (!contactResp.ok && contactResp.status !== 204) {
      const errText = await contactResp.text();
      console.error("Brevo contact error:", contactResp.status, errText);
      return new Response(JSON.stringify({ ok: false, error: "Contact creation failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }
  } catch (err) {
    console.error("Brevo contact fetch error:", err);
    return new Response(JSON.stringify({ ok: false, error: "Contact creation network error" }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  const notificationBody =
    (body.name || "Unknown") + " | " + (body.company || "(no company)") + "\n" +
    email + " | ARR: " + (body.arr || "(unspecified)") + "\n" +
    "\n" +
    "PRIMARY BOTTLENECK:\n" +
    (body.bottleneck || "(none provided)") + "\n" +
    "\n" +
    "WHAT THEY HAVE TRIED:\n" +
    (body.tried || "(none provided)") + "\n" +
    "\n" +
    "WHY NOW:\n" +
    (body.moment || "(none provided)") + "\n" +
    "\n" +
    "---\n" +
    "Apply page submission · " + new Date().toISOString() + "\n" +
    "Review in Brevo: https://app.brevo.com/contact/index/" + encodeURIComponent(email);

  const notificationPayload = {
    sender: { name: "Signal Resolution Apply", email: "rome@signalresolution.com" },
    to: [{ email: "rome@signalresolution.com", name: "Rome" }],
    subject: "New T2 application - " + (body.name || "Unknown") + " from " + (body.company || "Unknown"),
    textContent: notificationBody
  };

  try {
    const notifyResp = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json"
      },
      body: JSON.stringify(notificationPayload)
    });

    if (!notifyResp.ok) {
      const errText = await notifyResp.text();
      console.error("Notification email error:", notifyResp.status, errText);
    }
  } catch (err) {
    console.error("Notification fetch error:", err);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }});
}
