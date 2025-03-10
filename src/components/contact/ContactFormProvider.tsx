
import React, { createContext, useContext, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { formSchema, FormValues } from './formSchema';
import { useContactFormSubmit } from './useContactFormSubmit';

interface ContactFormContextType {
  formStep: number;
  setFormStep: (step: number) => void;
  formLanguage: 'de' | 'en';
  setFormLanguage: (language: 'de' | 'en') => void;
  isSubmitting: boolean;
  isStartup: boolean;
  isInvestment: boolean;
  isGermany: boolean;
  isNRW: boolean;
  getLocalizedText: (de: string, en: string) => string;
  sendTestEmail: () => Promise<void>;
  isSendingTest: boolean;
}

const ContactFormContext = createContext<ContactFormContextType>({} as ContactFormContextType);

export const useContactForm = () => useContext(ContactFormContext);

interface ContactFormProviderProps {
  children: React.ReactNode;
}

export const ContactFormProvider: React.FC<ContactFormProviderProps> = ({ children }) => {
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

  const { onSubmit, isSubmitting, sendTestEmail, isSendingTest } = useContactFormSubmit(
    formLanguage,
    form.reset,
    setFormStep
  );

  const getLocalizedText = (de: string, en: string): string => {
    return formLanguage === 'de' ? de : en;
  };

  const contextValue = {
    formStep,
    setFormStep,
    formLanguage,
    setFormLanguage,
    isSubmitting,
    isStartup,
    isInvestment,
    isGermany,
    isNRW,
    getLocalizedText,
    sendTestEmail,
    isSendingTest,
  };

  return (
    <ContactFormContext.Provider value={contextValue}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {children}
        </form>
      </FormProvider>
    </ContactFormContext.Provider>
  );
};
