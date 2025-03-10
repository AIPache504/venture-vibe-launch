
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verbesserte Fehlerbehandlung
if (!supabaseUrl) {
  console.error('FEHLER: VITE_SUPABASE_URL ist nicht gesetzt. Bitte setzen Sie diese Variable in den Umgebungsvariablen.');
}

if (!supabaseKey) {
  console.error('FEHLER: VITE_SUPABASE_ANON_KEY ist nicht gesetzt. Bitte setzen Sie diese Variable in den Umgebungsvariablen.');
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

// Verbesserte Verbindungsprüfung mit detailliertem Logging
export const checkSupabaseConnection = async () => {
  console.log('Überprüfe Supabase-Verbindung...');
  console.log('Supabase URL:', supabaseUrl ? 'Gesetzt' : 'NICHT GESETZT');
  console.log('Supabase Anon Key:', supabaseKey ? 'Gesetzt' : 'NICHT GESETZT');
  
  try {
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase-Verbindungsprüfung abgebrochen: Fehlende Anmeldedaten');
      return false;
    }
    
    console.log('Versuche Verbindung zur Datenbank herzustellen...');
    const { data, error } = await supabase.from('contact_submissions').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase-Verbindungsfehler:', error);
      return false;
    }
    
    console.log('Supabase-Verbindung erfolgreich hergestellt');
    return true;
  } catch (err) {
    console.error('Supabase-Verbindungsprüfung fehlgeschlagen:', err);
    return false;
  }
};
