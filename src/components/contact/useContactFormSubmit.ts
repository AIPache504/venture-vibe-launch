
import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { FormValues } from './formSchema';
import { useToast } from '@/components/ui/use-toast';

export const useContactFormSubmit = (
  formLanguage: 'de' | 'en',
  reset: UseFormReset<FormValues>,
  setFormStep: (step: number) => void
) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);

  const onSubmit = async (values: FormValues) => {
    console.log('Form submitted with values:', values);
    setIsSubmitting(true);
    
    try {
      // Insert data into Supabase
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: values.name,
          email: values.email,
          company: values.company,
          website: values.website || null,
          inquiryType: values.inquiryType,
          phase: values.phase || null,
          location: values.location,
          germanState: values.germanState || null,
          nrwRegion: values.nrwRegion || null,
          techFocus: values.techFocus || null,
          fundingNeed: values.fundingNeed || null,
          investorType: values.investorType || null,
          shortDescription: values.shortDescription
        }]);
      
      if (dbError) {
        console.error('Error submitting form to database:', dbError);
        throw dbError;
      }

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-contact-notification', {
        body: values
      });

      if (emailError) {
        console.error('Error sending email notification:', emailError);
        // We don't throw here as the form data was already saved
      }
      
      // Reset form and show success message
      reset();
      setFormStep(1);
      
      toast({
        title: formLanguage === 'de' 
          ? 'Vielen Dank für Ihre Anfrage!' 
          : 'Thank you for your inquiry!',
        description: formLanguage === 'de'
          ? 'Wir melden uns typischerweise innerhalb von 10 Tagen zurück.'
          : 'We typically respond within 10 days.',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: formLanguage === 'de' 
          ? 'Ein Fehler ist aufgetreten' 
          : 'An error occurred',
        description: formLanguage === 'de'
          ? 'Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.'
          : 'Please try again later or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendTestEmail = async () => {
    setIsSendingTest(true);
    
    try {
      // Prepare test data with corrected enum values
      const testData: FormValues = {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        website: 'https://test-website.com',
        inquiryType: 'Startup',
        phase: 'Seed',
        location: 'Germany',
        germanState: 'NRW',
        nrwRegion: 'Ruhrgebiet',
        techFocus: 'Künstliche Intelligenz (KI)',
        fundingNeed: '500k–2M EUR',
        shortDescription: 'This is a test email to verify the email notification system.'
      };

      console.log('Sending test email with data:', testData);

      // Send test email notification
      const { data, error } = await supabase.functions.invoke('send-contact-notification', {
        body: testData
      });

      if (error) {
        console.error('Error sending test email:', error);
        throw error;
      }
      
      console.log('Test email response:', data);
      
      toast({
        title: formLanguage === 'de' 
          ? 'Test-Email gesendet!' 
          : 'Test email sent!',
        description: formLanguage === 'de'
          ? 'Eine Test-Email wurde an die verifizierte Absender-Email gesendet.'
          : 'A test email has been sent to the verified sender email.',
      });
    } catch (error) {
      console.error('Test email error:', error);
      toast({
        title: formLanguage === 'de' 
          ? 'Fehler beim Senden der Test-Email' 
          : 'Error sending test email',
        description: formLanguage === 'de'
          ? 'Bitte überprüfen Sie die Konsolenlogs für weitere Details.'
          : 'Please check the console logs for more details.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingTest(false);
    }
  };

  return { onSubmit, isSubmitting, sendTestEmail, isSendingTest };
};
