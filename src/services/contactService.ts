
import { supabase } from '@/lib/supabase';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  website?: string;
  inquiryType: string;
  phase?: string;
  location: string;
  germanState?: string;
  nrwRegion?: string;
  techFocus?: string;
  fundingNeed?: string;
  investorType?: string;
  shortDescription: string;
  createdAt?: string;
}

export async function submitContactForm(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Submitting contact form with data:', formData);
    
    // Add timestamp
    const dataWithTimestamp = {
      ...formData,
      createdAt: new Date().toISOString(),
    };

    // Insert data into Supabase
    const { error } = await supabase
      .from('contact_submissions')
      .insert([dataWithTimestamp]);

    if (error) {
      console.error('Supabase insertion error:', error);
      return { success: false, error: error.message };
    }

    console.log('Form data successfully inserted into Supabase');

    // Nur Edge Function aufrufen, wenn im Production-Modus
    if (import.meta.env.PROD) {
      try {
        // Trigger email notification via edge function
        const { error: emailError } = await supabase.functions.invoke('send-contact-notification', {
          body: JSON.stringify({
            formData: dataWithTimestamp,
            recipients: ['dominik@mayventures.vc', 'janne@mayventures.vc']
          })
        });

        if (emailError) {
          console.error('Email notification error:', emailError);
          return { success: true, error: 'Form submitted but email notification failed' };
        }
        
        console.log('Email notification sent successfully');
      } catch (emailErr) {
        console.error('Failed to send email notification:', emailErr);
        return { success: true, error: 'Form submitted but failed to send email notification' };
      }
    } else {
      console.log('Skipping email notification in development mode');
    }

    return { success: true };
  } catch (err) {
    console.error('Contact submission error:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
