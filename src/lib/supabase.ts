
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials - please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || '',
  {
    auth: {
      persistSession: false // Da wir keine Authentifizierung benötigen, können wir dies deaktivieren
    }
  }
);

// Hilfsfunction zur Überprüfung der Supabase-Verbindung
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('contact_submissions').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('Supabase connection successful');
    return true;
  } catch (err) {
    console.error('Supabase connection check failed:', err);
    return false;
  }
};
