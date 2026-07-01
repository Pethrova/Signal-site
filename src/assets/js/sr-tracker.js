/**
 * Signal Resolution Funnel Tracker
 * Paste this into src/assets/js/sr-tracker.js
 * 
 * Tracks: page views, diagnostic question timing, answer changes,
 * tab switches, hesitation, abandonment, lead capture, ebook claims
 * 
 * All data goes to /api/track → Cloudflare Function → Neon (Clients DB)
 * Tracking is silent — no errors shown to user, never blocks the page
 */

(function() {
  'use strict';

  // ── Config ────────────────────────────────────────────────
  var TRACK_URL = '/api/track';
  var PAGE = (function() {
    var p = window.location.pathname;
    if (p.includes('diagnostic')) return 'diagnostic';
    if (p.includes('godfather')) return 'godfather';
    if (p.includes('tripwire')) return 'tripwire';
    if (p.includes('thank-you')) return 'thank-you';
    if (p.includes('pricing')) return 'pricing';
    if (p.includes('apply')) return 'apply';
    return p;
  })();

  // ── Anonymous visitor ID (no PII) ─────────────────────────
  var VISITOR_ID = (function() {
    var key = 'sr_vid';
    var id = localStorage.getItem(key);
    if (!id) {
      id = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      try { localStorage.setItem(key, id); } catch(e) {}
    }
    return id;
  })();

  // ── Session ID (from URL param or diagnostic state) ───────
  var SESSION_ID = (function() {
    var params = new URLSearchParams(window.location.search);
    return params.get('session_id') || 
           (window.state && window.state.sessionId) || 
           null;
  })();

  // ── Page entry time ───────────────────────────────────────
  var PAGE_ENTER_TIME = Date.now();

  // ── Core fire function ────────────────────────────────────
  function fire(eventType, payload) {
    var data = {
      session_id:  SESSION_ID,
      visitor_id:  VISITOR_ID,
      event_type:  eventType,
      page:        PAGE,
      payload:     payload || {}
    };
    // Use sendBeacon for exit events, fetch for others
    // Note: sendBeacon sends as text/plain but our Function accepts it
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(TRACK_URL, JSON.stringify(data));
      } else {
        fetch(TRACK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          keepalive: true
        }).catch(function() {});
      }
    } catch(e) {}
  }

  // ── Page view ─────────────────────────────────────────────
  fire('page_view', {
    referrer: document.referrer || '',
    params: window.location.search,
    archetype: new URLSearchParams(window.location.search).get('archetype') || '',
    from: new URLSearchParams(window.location.search).get('from') || ''
  });

  // ── Tab visibility (did they switch away?) ────────────────
  var tabHideTime = null;
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      tabHideTime = Date.now();
      fire('tab_hidden', {
        time_on_page_ms: Date.now() - PAGE_ENTER_TIME
      });
    } else {
      fire('tab_visible', {
        away_duration_ms: tabHideTime ? Date.now() - tabHideTime : 0
      });
      tabHideTime = null;
    }
  });

  // ── Page exit ─────────────────────────────────────────────
  window.addEventListener('beforeunload', function() {
    fire('page_exit', {
      time_on_page_ms: Date.now() - PAGE_ENTER_TIME
    });
  });

  // ── Expose tracker for diagnostic.html to call ────────────
  window.SRTracker = {

    // Called when diagnostic starts
    diagnosticStarted: function(sessionId, entryFrame) {
      SESSION_ID = sessionId;
      fire('diagnostic_started', {
        session_id: sessionId,
        entry_frame: entryFrame
      });
    },

    // Called each time a question is shown
    questionShown: function(questionId, questionNumber, questionText) {
      window._srQShownAt = Date.now();
      window._srCurrentQ = questionId;
      fire('question_shown', {
        question_id:     questionId,
        question_number: questionNumber,
        question_text:   (questionText || '').substring(0, 120)
      });
    },

    // Called when user selects an answer
    questionAnswered: function(questionId, questionNumber, answerId, answerText, changeCount) {
      var timeToAnswer = window._srQShownAt ? Date.now() - window._srQShownAt : null;
      fire('question_answered', {
        question_id:       questionId,
        question_number:   questionNumber,
        answer_id:         answerId,
        answer_text:       (answerText || '').substring(0, 80),
        time_to_answer_ms: timeToAnswer,
        change_count:      changeCount || 0
      });
    },

    // Called when user changes a previously-selected answer
    answerChanged: function(questionId, oldAnswerId, newAnswerId, changeCount) {
      fire('answer_changed', {
        question_id:    questionId,
        old_answer_id:  oldAnswerId,
        new_answer_id:  newAnswerId,
        change_count:   changeCount
      });
    },

    // Called if user exits mid-diagnostic
    diagnosticAbandoned: function(sessionId, lastQuestionOrder, entryFrameId, timeElapsed) {
      fire('diagnostic_abandoned', {
        session_id:          sessionId,
        last_question_order: lastQuestionOrder,
        entry_frame_id:      entryFrameId,
        time_elapsed_ms:     timeElapsed
      });
    },

    // Called when diagnostic completes
    diagnosticCompleted: function(sessionId, pathway, totalTimeMs) {
      fire('diagnostic_completed', {
        session_id:    sessionId,
        pathway:       pathway,
        total_time_ms: totalTimeMs
      });
    },

    // Called when lead gate appears
    leadGateShown: function(pathway) {
      fire('lead_gate_shown', { pathway: pathway });
    },

    // Called when email submitted
    leadSubmitted: function() {
      fire('lead_submitted', {
        time_on_page_ms: Date.now() - PAGE_ENTER_TIME
      });
    },

    // Called when ebook button clicked
    ebookClaimed: function() {
      fire('ebook_claimed', {
        time_on_page_ms: Date.now() - PAGE_ENTER_TIME
      });
    },

    // Called on tripwire page when checkout clicked
    checkoutStarted: function(tier, planId) {
      fire('checkout_started', {
        tier:    tier,
        plan_id: planId
      });
    },

    // Update session ID after it's assigned
    setSession: function(id) {
      SESSION_ID = id;
    }
  };

})();
