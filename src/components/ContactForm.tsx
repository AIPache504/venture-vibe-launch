
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { Form } from '@/components/ui/form';
import { LanguageSwitcher } from '@/components/contact/LanguageSwitcher';
import { FormIntroduction } from '@/components/contact/FormIntroduction';
import { PersonalInfoStep } from '@/components/contact/PersonalInfoStep';
import { DescriptionStep } from '@/components/contact/DescriptionStep';
import { formSchema, FormValues } from '@/components/contact/formSchema';
import { getLocalizedText } from '@/components/contact/formUtils';
import { useContactFormSubmit } from '@/components/contact/useContactFormSubmit';

export const ContactForm = () => {
  const { language } = useLanguage();
  const [formStep, setFormStep] = useState(1);
  const [formLanguage, setFormLanguage] = useState<'de' | 'en'>(language as 'de' | 'en');
  
  const form = useForm<FormValues>({
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

  const { onSubmit, isSubmitting } = useContactFormSubmit(
    formLanguage,
    form.reset,
    setFormStep
  );

  const nextStep = () => {
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const localizedTextHelper = (de: string, en: string) => {
    return getLocalizedText(formLanguage, de, en);
  };

  return (
    <div className="space-y-8">
      <FormIntroduction getLocalizedText={localizedTextHelper} />
      
      <LanguageSwitcher 
        formLanguage={formLanguage} 
        setFormLanguage={setFormLanguage} 
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {formStep === 1 && (
            <PersonalInfoStep 
              getLocalizedText={localizedTextHelper} 
              nextStep={nextStep}
              isStartup={isStartup}
              isInvestment={isInvestment}
              isGermany={isGermany}
              isNRW={isNRW}
            />
          )}

          {formStep === 2 && (
            <DescriptionStep 
              getLocalizedText={localizedTextHelper} 
              prevStep={prevStep}
              isSubmitting={isSubmitting}
            />
          )}
        </form>
      </Form>
    </div>
  );
};
