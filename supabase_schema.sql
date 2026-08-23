-- ==========================================================================
-- CaseVault Supabase PostgreSQL Schema Setup (BNSS 2023 / BSA 2023)
-- Copy and run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==========================================================================

-- 1. Create Cases Table
CREATE TABLE IF NOT EXISTS public.cases (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  assigned_to TEXT NOT NULL,
  assigned_role TEXT DEFAULT 'Lead Inspector',
  status TEXT DEFAULT 'Under Investigation',
  priority TEXT DEFAULT 'High',
  document_count INT DEFAULT 0,
  evidence_count INT DEFAULT 0,
  summary TEXT,
  legal_hold BOOLEAN DEFAULT true,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Documents Table
CREATE TABLE IF NOT EXISTS public.documents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  case_id TEXT REFERENCES public.cases(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'Evidence',
  size TEXT DEFAULT '2.4 MB',
  pages INT DEFAULT 1,
  uploaded_by TEXT NOT NULL,
  uploader_role TEXT DEFAULT 'Investigation Officer',
  upload_date TEXT,
  version TEXT DEFAULT 'v1.0',
  classification TEXT DEFAULT 'Highly Restricted',
  sha256 TEXT NOT NULL,
  hash_verified BOOLEAN DEFAULT true,
  legal_hold BOOLEAN DEFAULT true,
  access_count INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id TEXT PRIMARY KEY,
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  case_id TEXT,
  ip_address TEXT DEFAULT '10.42.108.15',
  device TEXT DEFAULT 'Workstation #01',
  result TEXT DEFAULT 'Success',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS) & Public Access Policies
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on cases" ON public.cases FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on cases" ON public.cases FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on cases" ON public.cases FOR UPDATE USING (true);

CREATE POLICY "Allow public read access on documents" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on documents" ON public.documents FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on audit_logs" ON public.audit_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on audit_logs" ON public.audit_logs FOR INSERT WITH CHECK (true);

-- 5. Enable Real-Time Replication
ALTER PUBLICATION supabase_realtime ADD TABLE public.cases;
ALTER PUBLICATION supabase_realtime ADD TABLE public.documents;
ALTER PUBLICATION supabase_realtime ADD TABLE public.audit_logs;
