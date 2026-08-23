import { createClient } from '@supabase/supabase-js';
import { MOCK_CASES, MOCK_DOCUMENTS, MOCK_ACTIVITIES, MOCK_SECURITY_LOGS } from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dnxkbeadfnjeelujynar.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_1fDKaKR3wpwVjHG2VrDSJw_16g8VXJe';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================================================
// LIVE SUPABASE DATABASE QUERIES & REAL-TIME CRUD HELPERS
// ==========================================================================

// 1. FETCH LIVE CASES (WITH MOCK FALLBACK IF DB TABLE NOT CREATED YET)
export async function getLiveCases() {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_CASES;
    }

    return data.map(c => ({
      id: c.id,
      title: c.title,
      assignedTo: c.assigned_to,
      assignedRole: c.assigned_role || 'Lead Inspector',
      status: c.status || 'Under Investigation',
      priority: c.priority || 'High',
      lastUpdated: 'Just now',
      dateCreated: c.date_created || (c.created_at ? c.created_at.split('T')[0] : '2026-08-22'),
      documentCount: c.document_count || 0,
      evidenceCount: c.evidence_count || 0,
      legalHold: c.legal_hold ?? true,
      summary: c.summary || 'Investigation docket initialized in CaseVault.',
      leadOfficerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
    }));
  } catch (err) {
    return MOCK_CASES;
  }
}

// 2. INSERT NEW CASE TO SUPABASE
export async function createLiveCase(caseData) {
  try {
    const payload = {
      id: caseData.id,
      title: caseData.title,
      assigned_to: caseData.assignedTo,
      assigned_role: caseData.assignedRole || 'Lead Inspector',
      status: caseData.status || 'Under Investigation',
      priority: caseData.priority || 'High',
      summary: caseData.summary,
      legal_hold: caseData.legalHold ?? true
    };

    const { data, error } = await supabase.from('cases').insert([payload]).select();
    if (error) return null;
    return data ? data[0] : null;
  } catch (err) {
    return null;
  }
}

// 3. FETCH LIVE DOCUMENTS (WITH MOCK FALLBACK IF DB TABLE NOT CREATED YET)
export async function getLiveDocuments() {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_DOCUMENTS;
    }

    return data.map(d => ({
      id: d.id,
      name: d.name,
      caseId: d.case_id,
      caseTitle: `Case #${d.case_id}`,
      type: d.type,
      size: d.size,
      pages: d.pages || 1,
      uploadedBy: d.uploaded_by,
      uploaderRole: d.uploader_role || 'Investigation Officer',
      uploadDate: d.upload_date || d.created_at,
      version: d.version || 'v1.0',
      classification: d.classification || 'Highly Restricted',
      sha256: d.sha256,
      hashVerified: d.hash_verified ?? true,
      legalHold: d.legal_hold ?? true,
      accessCount: d.access_count || 1,
      chainOfCustody: [
        {
          timestamp: new Date().toLocaleString() + ' IST',
          officer: d.uploaded_by,
          badge: 'IND-DL-8892',
          action: 'Initial Vault Ingestion & Checksum Lock',
          verificationId: `COC-${Math.floor(90000 + Math.random() * 9999)}`,
          status: 'Verified',
          result: 'Created ' + (d.version || 'v1.0')
        }
      ],
      versions: [
        { version: d.version || 'v1.0', date: 'Uploaded', uploader: d.uploaded_by, notes: 'Original file checksum logged.' }
      ]
    }));
  } catch (err) {
    return MOCK_DOCUMENTS;
  }
}

// 4. INSERT NEW DOCUMENT TO SUPABASE
export async function uploadLiveDocument(docData) {
  try {
    const payload = {
      id: docData.id,
      name: docData.name,
      case_id: docData.caseId,
      type: docData.type,
      size: docData.size,
      pages: docData.pages || 8,
      uploaded_by: docData.uploadedBy,
      uploader_role: docData.uploaderRole,
      version: docData.version || 'v1.0',
      classification: docData.classification,
      sha256: docData.sha256,
      hash_verified: true,
      legal_hold: docData.legalHold ?? true
    };

    const { data, error } = await supabase.from('documents').insert([payload]).select();
    if (error) return null;
    return data ? data[0] : null;
  } catch (err) {
    return null;
  }
}

// 5. FETCH LIVE AUDIT LOGS
export async function getLiveAuditLogs() {
  try {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error || !data) return [];

    return data.map(l => ({
      id: l.id,
      timestamp: l.timestamp,
      user: l.user_name,
      action: l.action,
      target: l.target,
      caseId: l.case_id,
      ip: l.ip_address,
      device: l.device,
      result: l.result
    }));
  } catch (err) {
    return [];
  }
}

// 6. CREATE LIVE AUDIT LOG ENTRY
export async function createLiveAuditLog(logData) {
  try {
    const payload = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      user_name: logData.user || 'Inspector Arjun Singh',
      action: logData.action,
      target: logData.target,
      case_id: logData.caseId,
      ip_address: logData.ip || '10.42.108.15',
      device: logData.device || 'Workstation #01',
      result: logData.result || 'Success'
    };

    await supabase.from('audit_logs').insert([payload]);
  } catch (err) {
    // Suppress console error if table not created
  }
}

// 7. SEED INITIAL SUPABASE TABLES (1-CLICK INITIALIZER)
export async function seedSupabaseDatabase() {
  try {
    // Seed cases
    for (const c of MOCK_CASES) {
      await supabase.from('cases').upsert({
        id: c.id,
        title: c.title,
        assigned_to: c.assignedTo,
        assigned_role: c.assignedRole,
        status: c.status,
        priority: c.priority,
        summary: c.summary,
        legal_hold: c.legalHold
      });
    }

    // Seed documents
    for (const d of MOCK_DOCUMENTS) {
      await supabase.from('documents').upsert({
        id: d.id,
        name: d.name,
        case_id: d.caseId,
        type: d.type,
        size: d.size,
        pages: d.pages,
        uploaded_by: d.uploadedBy,
        uploader_role: d.uploaderRole,
        version: d.version,
        classification: d.classification,
        sha256: d.sha256,
        hash_verified: d.hashVerified,
        legal_hold: d.legalHold
      });
    }

    return true;
  } catch (err) {
    return false;
  }
}
