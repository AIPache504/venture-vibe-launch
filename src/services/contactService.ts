
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

    return { success: true };
  } catch (err) {
    console.error('Contact submission error:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
