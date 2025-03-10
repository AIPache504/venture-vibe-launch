
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { checkSupabaseConnection } from './lib/supabase';

// Prüfe Supabase-Verbindung beim Start
checkSupabaseConnection()
  .then((isConnected) => {
    console.log(`Supabase connection status: ${isConnected ? 'connected' : 'not connected'}`);
  })
  .catch(err => {
    console.error('Failed to check Supabase connection:', err);
  });

createRoot(document.getElementById("root")!).render(<App />);
