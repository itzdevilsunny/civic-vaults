import { createClient } from '@supabase/supabase-js';
import { 
  INITIAL_USER, 
  KPI_DATA, 
  MOCK_CASES, 
  MOCK_DOCUMENTS, 
  MOCK_ACTIVITIES, 
  MOCK_SECURITY_LOGS 
} from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dnxkbeadfnjeelujynar.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_1fDKaKR3wpwVjHG2VrDSJw_16g8VXJe';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================================================
// LIVE SUPABASE DATABASE QUERIES & CRUD HELPERS
// ==========================================================================

// 1. FETCH LIVE CASES
export async function getLiveCases() {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map(c => ({
      id: c.id,
      title: c.title,
      assignedTo: c.assigned_to,
      assignedRole: c.assigned_role || 'Lead Inspector',
      status: c.status,
      priority: c.priority,
      lastUpdated: 'Just now',
      dateCreated: c.date_created || c.created_at?.split('T')[0],
      documentCount: c.document_count || 0,
      evidenceCount: c.evidence_count || 0,
      legalHold: c.legal_hold,
      summary: c.summary,
      leadOfficerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
    }));
  } catch (err) {
    console.warn('Supabase getLiveCases error:', err);
    return null;
  }
}

// 2. INSERT NEW CASE TO SUPABASE
export async function createLiveCase(caseData) {
  try {
    const payload = {
      id: caseData.id,
      title: caseData.title,
      assigned_to: caseData.assignedTo,
      assigned_role: caseData.assignedRole,
      status: caseData.status,
      priority: caseData.priority,
      summary: caseData.summary,
      legal_hold: caseData.legalHold
    };

    const { data, error } = await supabase.from('cases').insert([payload]).select();
    if (error) throw error;
    return data[0];
  } catch (err) {
    console.warn('Supabase createLiveCase error:', err);
    return null;
  }
}

// 3. FETCH LIVE DOCUMENTS
export async function getLiveDocuments() {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return null;
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
      uploaderRole: d.uploader_role,
      uploadDate: d.upload_date || d.created_at,
      version: d.version,
      classification: d.classification,
      sha256: d.sha256,
      hashVerified: d.hash_verified,
      legalHold: d.legal_hold,
      accessCount: d.access_count || 1,
      chainOfCustody: [],
      versions: [
        { version: d.version, date: 'Uploaded', uploader: d.uploaded_by, notes: 'Original file checksum logged.' }
      ]
    }));
  } catch (err) {
    console.warn('Supabase getLiveDocuments error:', err);
    return null;
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
      legal_hold: docData.legalHold
    };

    const { data, error } = await supabase.from('documents').insert([payload]).select();
    if (error) throw error;
    return data[0];
  } catch (err) {
    console.warn('Supabase uploadLiveDocument error:', err);
    return null;
  }
}

// 5. SEED INITIAL SUPABASE TABLES (1-CLICK INITIALIZER)
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
    console.warn('Seeding error:', err);
    return false;
  }
}
