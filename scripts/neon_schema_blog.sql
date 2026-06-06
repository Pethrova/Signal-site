-- Signal Resolution Blog System — Neon Postgres Schema
-- Run once to set up blog automation tables

CREATE TABLE IF NOT EXISTS blog_briefs (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  title_draft       TEXT NOT NULL,
  buyer_state       TEXT NOT NULL CHECK (buyer_state IN (
                      'chaos_scaler','overwhelmed_founder','timing_blind',
                      'stuck_optimizer','velocity_victim'
                    )),
  tier              TEXT DEFAULT 'A' CHECK (tier IN ('A','B','C')),
  archetype_id      INTEGER,
  primary_keyword   TEXT,
  content_type      TEXT DEFAULT 'standard' CHECK (content_type IN (
                      'standard','comparison','definition','research','case_study'
                    )),
  signal_sources    JSONB DEFAULT '[]',
  status            TEXT DEFAULT 'pending' CHECK (status IN (
                      'pending','ready_to_generate','generating',
                      'generated','needs_review','approved','published','syndicated'
                    )),
  notion_page_id    TEXT,
  retry_count       INTEGER DEFAULT 0,
  quality_notes     TEXT,
  slug              TEXT UNIQUE,
  canonical_url     TEXT,
  published_at      TIMESTAMPTZ,
  syndicated_at     TIMESTAMPTZ,
  word_count        INTEGER,
  cta_type          TEXT
);

ALTER TABLE content_objects
  ADD COLUMN IF NOT EXISTS blog_id UUID,
  ADD COLUMN IF NOT EXISTS asset_tier TEXT CHECK (asset_tier IN ('S','A','B','C')),
  ADD COLUMN IF NOT EXISTS resonance_score FLOAT DEFAULT NULL;

CREATE INDEX IF NOT EXISTS idx_blog_briefs_status ON blog_briefs(status);
CREATE INDEX IF NOT EXISTS idx_blog_briefs_buyer_state ON blog_briefs(buyer_state);
CREATE INDEX IF NOT EXISTS idx_blog_briefs_created_at ON blog_briefs(created_at DESC);
