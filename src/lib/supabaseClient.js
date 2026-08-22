import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dnxkbeadfnjeelujynar.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_1fDKaKR3wpwVjHG2VrDSJw_16g8VXJe';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchCasesFromSupabase() {
  try {
    const { data, error } = await supabase.from('cases').select('*').order('created_at', { ascending: false });
    if (error) {
      console.warn('Supabase fetch error, using local fallback:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase connection failed:', err);
    return null;
  }
}

export async function insertCaseToSupabase(caseData) {
  try {
    const { data, error } = await supabase.from('cases').insert([caseData]).select();
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Supabase insert case error:', err);
    return null;
  }
}

export async function fetchDocumentsFromSupabase() {
  try {
    const { data, error } = await supabase.from('documents').select('*').order('created_at', { ascending: false });
    if (error) return null;
    return data;
  } catch (err) {
    return null;
  }
}
