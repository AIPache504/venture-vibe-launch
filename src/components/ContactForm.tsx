
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
  phase: z.enum(['Seed', 'Pre-Seed', 'Series A oder später']).optional(),
  investorType: z.enum([
    'Privatinvestor',
    'Corporate',
    'Institutioneller Investor', 
    'Family Office'
  ]).optional(),
  location: z.enum(['Germany', 'Europe', 'International']),
  shortDescription: z.string().max(500, {
    message: 'Die Beschreibung darf maximal 500 Zeichen lang sein.',
  }),
});

export const ContactForm = () => {
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(1);
  const [formLanguage, setFormLanguage] = useState<'de' | 'en'>(language as 'de' | 'en');
  
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
  });

  const watchInquiryType = form.watch('inquiryType');
  const isStartup = watchInquiryType === 'Startup';
  const isInvestment = watchInquiryType === 'Investment';

  const nextStep = () => {
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Hier später die Logik für das Absenden des Formulars implementieren
    console.log(values);
    
    toast({
      title: formLanguage === 'de' 
        ? 'Vielen Dank für Ihre Anfrage!' 
        : 'Thank you for your inquiry!',
      description: formLanguage === 'de'
        ? 'Wir melden uns typischerweise innerhalb von 10 Tagen zurück.'
        : 'We typically respond within 10 days.',
    });
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
            />
          )}

          {formStep === 2 && (
            <DescriptionStep 
              getLocalizedText={getLocalizedText} 
              prevStep={prevStep}
            />
          )}
        </form>
      </Form>
    </div>
  );
};
