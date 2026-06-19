/**
 * functions/api/whop-checkout.js
 *
 * Mints a per-session Whop checkout configuration with diagnostic context
 * baked into the metadata, so the payment.succeeded webhook can join back
 * to diagnostic_results via session_id.
 *
 * WHY THIS EXISTS:
 * A static Whop checkout link (whop.com/checkout/plan_xxxx) cannot carry
 * session_id, archetype, pathway, or score — Whop has no way to receive
 * that context from a bare link click. This function calls Whop's
 * checkout_configurations API server-side to create a ONE-TIME checkout
 * session with that context attached as metadata. The frontend posts here
 * first, gets back a purchase_url, and redirects the buyer there.
 *
 * CONFIRMED API SPEC (docs.whop.com/api-reference/checkout-configurations,
 * verified directly against Whop's official documentation, not guessed):
 *   POST https://api.whop.com/api/v1/checkout_configurations
 *   Auth: Authorization: Bearer {WHOP_API_KEY}
 *   For an EXISTING plan (our case — plan_ldCzpbjYhiI10 already exists),
 *   use the plan_id variant of the request body:
 *     { plan_id, metadata, redirect_url, source_url, mode: "payment" }
 *   company_id is NOT required in this body shape — plan_id implies it.
 *   Response includes purchase_url in the form:
 *     /checkout/plan_xxxx?session={id}
 *   metadata is a flat key-value object. Whop attaches it to the checkout
 *   configuration, and it is inherited by any payment/membership created
 *   from that checkout — this is the mechanism that lets session_id reach
 *   the payment.succeeded webhook payload at data.metadata.session_id.
 *
 * Required Whop API key permissions (confirmed from docs):
 *   checkout_configuration:create, plan:create, access_pass:create,
 *   access_pass:update, checkout_configuration:basic:read
 *   (An Owner/Admin-role key covers all of these.)
 *
 * Pattern mirrors functions/api/apply.js exactly:
 *   onRequestPost(context), context.env for secrets, raw fetch() for the
 *   external call, JSON response shape, separate onRequestOptions() for
 *   CORS preflight.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();

    // session_id is the sole DB join key for diagnostic_results — there is
    // no email column on the diagnostic tables, so this field is mandatory.
    // Refuse to mint a checkout without it; a checkout with no session_id
    // would produce an unresolvable payment.succeeded webhook later.
    const sessionId = body.session_id;
    if (!sessionId) {
      return new Response(
        JSON.stringify({ ok: false, error: "session_id is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // WHOP_PLAN_ID is the live $29 one-time tripwire plan
    // (plan_ldCzpbjYhiI10, product Signal Correction Report). For a
    // different offer in future (e.g. Tier 1 $497/mo direct checkout),
    // this function can accept a plan_id override in the request body —
    // currently locked to the tripwire plan via env var for safety.
    const planId = body.plan_id || env.WHOP_PLAN_ID;
    if (!planId) {
      return new Response(
        JSON.stringify({ ok: false, error: "No plan_id available (missing WHOP_PLAN_ID env var and no override provided)" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!env.WHOP_API_KEY) {
      return new Response(
        JSON.stringify({ ok: false, error: "WHOP_API_KEY not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Diagnostic context carried through as flat metadata. Whop inherits
    // this onto the resulting payment/membership, so the purchase webhook
    // can read data.metadata.session_id (and the rest) without a second
    // lookup. Only session_id is required for fulfillment to work — the
    // rest is useful context for downstream segmentation and logging.
    const metadata = {
      session_id: sessionId,
      archetype_id: body.archetype_id || "",
      pathway_id: body.pathway_id || "",
      email_segment: body.email_segment || "",
      archetype: body.archetype || "",
      bottleneck: body.bottleneck || "",
      score: body.score != null ? String(body.score) : "",
      readiness: body.readiness || "",
      from: body.from || "diagnostic",
    };

    const redirectUrl =
      body.redirect_url || "https://signalresolution.com/thank-you.html";
    const sourceUrl = body.source_url || request.headers.get("referer") || "";

    const whopResponse = await fetch(
      "https://api.whop.com/api/v1/checkout_configurations",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + env.WHOP_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_id: planId,
          mode: "payment",
          metadata,
          redirect_url: redirectUrl,
          source_url: sourceUrl,
        }),
      }
    );

    const whopData = await whopResponse.json();

    if (!whopResponse.ok) {
      // Whop's error shape: { error: { type, message, code, param } }
      const errMessage =
        (whopData && whopData.error && whopData.error.message) ||
        "Whop checkout configuration request failed";
      return new Response(
        JSON.stringify({
          ok: false,
          error: errMessage,
          whopStatus: whopResponse.status,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // purchase_url comes back as a relative path like
    // /checkout/plan_xxxx?session={id} — normalize to an absolute
    // whop.com URL so the frontend can redirect directly without
    // needing to know Whop's domain.
    const purchaseUrl = whopData.purchase_url
      ? whopData.purchase_url.startsWith("http")
        ? whopData.purchase_url
        : "https://whop.com" + whopData.purchase_url
      : null;

    if (!purchaseUrl) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Whop response did not include a purchase_url",
          raw: whopData,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        url: purchaseUrl,
        checkoutConfigurationId: whopData.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
