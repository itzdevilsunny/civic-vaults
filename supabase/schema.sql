-- ==========================================================================
-- CASEVAULT SUPABASE DATABASE SCHEMA
-- Project Reference: dnxkbeadfnjeelujynar
-- ==========================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CASES TABLE
CREATE TABLE IF NOT EXISTS public.cases (
    id VARCHAR(50) PRIMARY KEY,
    title TEXT NOT NULL,
    assigned_to TEXT NOT NULL,
    assigned_role TEXT,
    status VARCHAR(50) DEFAULT 'Under Investigation',
    priority VARCHAR(20) DEFAULT 'High',
    date_created DATE DEFAULT CURRENT_DATE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    document_count INT DEFAULT 0,
    evidence_count INT DEFAULT 0,
    legal_hold BOOLEAN DEFAULT TRUE,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. DOCUMENTS & EVIDENCE TABLE
CREATE TABLE IF NOT EXISTS public.documents (
    id VARCHAR(50) PRIMARY KEY,
    name TEXT NOT NULL,
    case_id VARCHAR(50) REFERENCES public.cases(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    size VARCHAR(20),
    pages INT DEFAULT 1,
    uploaded_by TEXT NOT NULL,
    uploader_role TEXT,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    version VARCHAR(10) DEFAULT 'v1.0',
    classification VARCHAR(50) DEFAULT 'Highly Restricted',
    sha256 TEXT NOT NULL,
    hash_verified BOOLEAN DEFAULT TRUE,
    legal_hold BOOLEAN DEFAULT TRUE,
    access_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. EVIDENCE CHAIN OF CUSTODY TABLE (USP 🥇)
CREATE TABLE IF NOT EXISTS public.chain_of_custody (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id VARCHAR(50) REFERENCES public.documents(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    officer TEXT NOT NULL,
    badge TEXT NOT NULL,
    action TEXT NOT NULL,
    verification_id VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'Verified',
    result TEXT
);

-- 4. SYSTEM AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id VARCHAR(50) PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_name TEXT NOT NULL,
    action TEXT NOT NULL,
    target TEXT,
    case_id VARCHAR(50),
    ip_address VARCHAR(45),
    device TEXT,
    result TEXT
);

-- 5. SECURITY EVENTS & ALERTS TABLE
CREATE TABLE IF NOT EXISTS public.security_events (
    id VARCHAR(50) PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    event TEXT NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    user_name TEXT,
    ip_address VARCHAR(45),
    device TEXT,
    action_taken TEXT,
    target TEXT,
    details TEXT
);

-- RLS (Row Level Security) Policies Setup
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chain_of_custody ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Default Read/Write Policies for authenticated/anon keys
CREATE POLICY "Allow public read access to cases" ON public.cases FOR SELECT USING (true);
CREATE POLICY "Allow public insert to cases" ON public.cases FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to documents" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Allow public insert to documents" ON public.documents FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read chain of custody" ON public.chain_of_custody FOR SELECT USING (true);
CREATE POLICY "Allow public insert chain of custody" ON public.chain_of_custody FOR INSERT WITH CHECK (true);
