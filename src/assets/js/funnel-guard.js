/**
 * Signal Resolution funnel guard.
 *
 * Redirects buyers to the diagnostic if they reach a commercial page
 * without a valid pre-diagnostic context. Loaded synchronously in
 * <head> so it fires before render — no flash of commercial content.
 *
 * Valid context (any one is sufficient):
 *   - URL param archetype  (from diagnostic result routing)
 *   - URL param recTier    (from diagnostic result routing)
 *   - URL param ref=...    (prefix: tripwire-, case-, email-, nurture-)
 *   - document.referrer is signalresolution.com or localhost
 *
 * Anything else (cold organic, shared external links, direct typed URLs)
 * → soft redirect to /diagnostic.html?from=<page>.
 */
(function () {
  'use strict';
  try {
    var params = new URLSearchParams(window.location.search);
    var hasArchetype = !!params.get('archetype');
    var hasRecTier = !!params.get('recTier');
    var ref = (params.get('ref') || '').trim();
    var validRef = /^(tripwire-|case-|email-|nurture-)/.test(ref);
    var docRef = document.referrer || '';
    var internalReferrer =
      docRef.indexOf('signalresolution.com') > -1 ||
      docRef.indexOf('localhost') > -1 ||
      docRef.indexOf('127.0.0.1') > -1;

    var hasContext = hasArchetype || hasRecTier || validRef || internalReferrer;

    if (!hasContext) {
      var from = window.location.pathname
        .replace(/^\//, '')
        .replace(/\.html$/, '');
      window.location.replace('/diagnostic.html?from=' + encodeURIComponent(from));
    }
  } catch (e) {
    window.location.replace('/diagnostic.html?from=guard-error');
  }
})();
