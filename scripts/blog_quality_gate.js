/**
 * Signal Resolution Blog Quality Gate
 * Runs in n8n as a Code node after Claude API generation
 * Returns { passed: boolean, score: number, failures: string[], feedback: string }
 */

const PROPRIETARY_TERMS = [
  'false momentum', 'timing debt', 'signal integrity', 'conviction gap',
  'signal cleanup', 'psychographic resolution', 'firmographic gate',
  'buyer state', 'icp resolution', 'signal distortion', 'gtm confusion',
  'velocity victim', 'chaos scaler', 'stuck optimizer', 'timing blind',
  'overwhelmed founder', 'signal clarity', 'resolution score'
];

const BANNED_PHRASES = [
  'genuinely', 'honestly', 'straightforward', 'it\'s important to note',
  'in conclusion', 'in today\'s world', 'paradigm shift', 'game changer',
  'dive deep', 'at the end of the day', 'leverage' 
];

function checkWordCount(blog, tier) {
  const minimum = tier === 'A' ? 1200 : 1000;
  const count = blog.word_count || 0;
  return {
    passed: count >= minimum,
    feedback: count < minimum 
      ? `Word count ${count} below minimum ${minimum}. Expand each section by 30%.`
      : null
  };
}

function checkAEODirectAnswer(blog) {
  const opening = blog.sections?.[0]?.content || '';
  const first150Words = opening.split(' ').slice(0, 150).join(' ');
  const hasKeyword = first150Words.toLowerCase().includes(
    (blog.primary_keyword || '').toLowerCase()
  );
  return {
    passed: hasKeyword && first150Words.length > 100,
    feedback: !hasKeyword 
      ? 'Opening paragraph must contain primary keyword and direct answer in first 150 words.'
      : null
  };
}

function checkFAQ(blog) {
  const hasFAQ = blog.sections?.some(s => 
    s.type === 'faq' || s.heading?.toLowerCase().includes('faq') ||
    s.heading?.toLowerCase().includes('frequently asked')
  );
  const faqCount = blog.faq?.length || 0;
  return {
    passed: hasFAQ && faqCount >= 3,
    feedback: !hasFAQ || faqCount < 3
      ? `FAQ section required with minimum 3 questions. Found ${faqCount}.`
      : null
  };
}

function checkProprietaryVocabulary(blog) {
  const fullText = JSON.stringify(blog).toLowerCase();
  const found = PROPRIETARY_TERMS.filter(term => fullText.includes(term));
  return {
    passed: found.length >= 3,
    feedback: found.length < 3
      ? `Only ${found.length} proprietary terms found. Need 3+. Include: ${PROPRIETARY_TERMS.slice(0,5).join(', ')}`
      : null
  };
}

function checkBannedPhrases(blog) {
  const fullText = JSON.stringify(blog).toLowerCase();
  const found = BANNED_PHRASES.filter(phrase => fullText.includes(phrase));
  return {
    passed: found.length === 0,
    feedback: found.length > 0
      ? `Remove banned phrases: ${found.join(', ')}`
      : null
  };
}

function checkCTARouting(blog) {
  const routing = {
    chaos_scaler: 'diagnostic',
    overwhelmed_founder: 'diagnostic',
    timing_blind: 'diagnostic',
    stuck_optimizer: 'tripwire',
    velocity_victim: 'tripwire'
  };
  const expected = blog.tier === 'C' ? 'deposit' : (routing[blog.buyer_state] || 'diagnostic');
  return {
    passed: blog.cta_type === expected,
    feedback: blog.cta_type !== expected
      ? `CTA type "${blog.cta_type}" wrong for ${blog.buyer_state}. Should be "${expected}".`
      : null
  };
}

function checkInternalLinks(blog) {
  const linkCount = blog.internal_links?.length || 0;
  return {
    passed: linkCount >= 2,
    feedback: linkCount < 2
      ? `Only ${linkCount} internal links. Minimum 2 required including /assessment/.`
      : null
  };
}

// Main gate function — called by n8n Code node
function runQualityGate(blog) {
  const checks = [
    { name: 'word_count', result: checkWordCount(blog, blog.tier) },
    { name: 'aeo_direct_answer', result: checkAEODirectAnswer(blog) },
    { name: 'faq_present', result: checkFAQ(blog) },
    { name: 'proprietary_vocabulary', result: checkProprietaryVocabulary(blog) },
    { name: 'banned_phrases', result: checkBannedPhrases(blog) },
    { name: 'cta_routing', result: checkCTARouting(blog) },
    { name: 'internal_links', result: checkInternalLinks(blog) }
  ];

  const failures = checks
    .filter(c => !c.result.passed)
    .map(c => ({ check: c.name, feedback: c.result.feedback }));

  const score = Math.round((checks.filter(c => c.result.passed).length / checks.length) * 100);

  const feedbackPrompt = failures.length > 0
    ? 'Fix the following issues and regenerate:\n' + failures.map(f => `- ${f.feedback}`).join('\n')
    : null;

  return {
    passed: failures.length === 0,
    score,
    failures,
    feedback: feedbackPrompt,
    checks_run: checks.length,
    checks_passed: checks.length - failures.length
  };
}

// n8n Code node export
return { json: runQualityGate($input.first().json) };
