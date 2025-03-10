import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { LanguageSwitcher } from '@/components/contact/LanguageSwitcher';
import { FormIntroduction } from '@/components/contact/FormIntroduction';
import { PersonalInfoStep } from '@/components/contact/PersonalInfoStep';
import { DescriptionStep } from '@/components/contact/DescriptionStep';
import { submitContactForm } from '@/services/contactService';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name muss mindestens 2 Zeichen lang sein.',
  }),
  email: z.string().email({
    message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  }),
  company: z.string().min(1, {
    message: 'Bitte geben Sie einen Firmennamen ein.',
  }),
  website: z.union([
    z.string().url({
      message: 'Bitte geben Sie eine gültige URL ein.',
    }),
    z.string().length(0) // Allow empty string
  ]).optional(),
  inquiryType: z.enum([
    'Startup',
    'Investment',
    'Zusammenarbeit / Partnerschaft',
    'Presseanfrage',
    'Sonstiges'
  ]),
  // Startup fields
  phase: z.enum(['Pre-Seed', 'Seed', 'Series A oder später']).optional(),
  location: z.enum(['Germany', 'Europe', 'International']),
  germanState: z.enum(['NRW', 'Andere Bundesländer']).optional(),
  nrwRegion: z.enum(['MS/OS', 'OWL', 'Ruhrgebiet', 'Andere Regionen in NRW']).optional(),
  techFocus: z.enum([
    'Künstliche Intelligenz',
    'Industrieinnovation (Robotik, Automatisierung, Digitalisierung)',
    'Nachhaltigkeit & Klimawandel',
    'KI-getriebene Transformation',
    'Hyperpersonalisierung durch KI',
    'Agentenökonomie (KI-Agenten)',
    'Sichere KI (Governance & Compliance)',
    'Technologiekonvergenz (Biotech, Blockchain, Quantum)',
    'KI Infrastruktur & Energie'
  ]).optional(),
  fundingNeed: z.enum(['<500k EUR', '500k–2M EUR', '2M–5M EUR', '>5M EUR']).optional(),
  // Investor fields
  investorType: z.enum([
    'Privatinvestor',
    'Corporate',
    'Institutioneller Investor', 
    'Family Office'
  ]).optional(),
  shortDescription: z.string().max(500, {
    message: 'Die Beschreibung darf maximal 500 Zeichen lang sein.',
  }),
});

export const ContactForm = () => {
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(1);
  const [formLanguage, setFormLanguage] = useState<'de' | 'en'>(language as 'de' | 'en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      website: '',
      inquiryType: 'Startup',
      location: 'Germany',
      shortDescription: '',
    },
    mode: 'onChange',
  });

  const watchInquiryType = form.watch('inquiryType');
  const watchLocation = form.watch('location');
  const watchGermanState = form.watch('germanState');
  
  const isStartup = watchInquiryType === 'Startup';
  const isInvestment = watchInquiryType === 'Investment';
  const isGermany = watchLocation === 'Germany';
  const isNRW = watchGermanState === 'NRW';

  const nextStep = () => {
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(values);
      
      if (result.success) {
        toast({
          title: formLanguage === 'de' 
            ? 'Vielen Dank für Ihre Anfrage!' 
            : 'Thank you for your inquiry!',
          description: formLanguage === 'de'
            ? 'Wir melden uns typischerweise innerhalb von 10 Tagen zurück.'
            : 'We typically respond within 10 days.',
        });
        
        form.reset();
        setFormStep(1);
      } else {
        toast({
          variant: 'destructive',
          title: formLanguage === 'de' 
            ? 'Fehler bei der Übermittlung' 
            : 'Submission Error',
          description: result.error || (formLanguage === 'de'
            ? 'Bitte versuchen Sie es später erneut.'
            : 'Please try again later.'),
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: 'destructive',
        title: formLanguage === 'de' 
          ? 'Ein Fehler ist aufgetreten' 
          : 'An error occurred',
        description: formLanguage === 'de'
          ? 'Bitte versuchen Sie es später erneut.'
          : 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLocalizedText = (de: string, en: string) => {
    return formLanguage === 'de' ? de : en;
  };

  return (
    <div className="space-y-8">
      <FormIntroduction getLocalizedText={getLocalizedText} />
      
      <LanguageSwitcher 
        formLanguage={formLanguage} 
        setFormLanguage={setFormLanguage} 
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {formStep === 1 && (
            <PersonalInfoStep 
              getLocalizedText={getLocalizedText} 
              nextStep={nextStep}
              isStartup={isStartup}
              isInvestment={isInvestment}
              isGermany={isGermany}
              isNRW={isNRW}
            />
          )}

          {formStep === 2 && (
            <DescriptionStep 
              getLocalizedText={getLocalizedText} 
              prevStep={prevStep}
              isSubmitting={isSubmitting}
            />
          )}
        </form>
      </Form>
    </div>
  );
};
