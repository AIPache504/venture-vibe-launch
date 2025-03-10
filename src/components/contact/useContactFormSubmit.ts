
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

  const onSubmit = async (values: FormValues) => {
    console.log('Form submitted with values:', values);
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
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
      
      if (error) {
        console.error('Error submitting form:', error);
        throw error;
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

  return { onSubmit, isSubmitting };
};
