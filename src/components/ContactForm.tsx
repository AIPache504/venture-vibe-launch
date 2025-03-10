
import React from 'react';
import { ContactFormProvider } from '@/components/contact/ContactFormProvider';
import { FormIntroduction } from '@/components/contact/FormIntroduction';
import { LanguageSwitcher } from '@/components/contact/LanguageSwitcher';
import { PersonalInfoStep } from '@/components/contact/PersonalInfoStep';
import { DescriptionStep } from '@/components/contact/DescriptionStep';
import { useContactForm } from '@/components/contact/ContactFormProvider';

const FormSteps = () => {
  const { formStep, getLocalizedText, isStartup, isInvestment, isGermany, isNRW } = useContactForm();

  return (
    <>
      {formStep === 1 && (
        <PersonalInfoStep 
          getLocalizedText={getLocalizedText} 
          isStartup={isStartup}
          isInvestment={isInvestment}
          isGermany={isGermany}
          isNRW={isNRW}
        />
      )}

      {formStep === 2 && (
        <DescriptionStep 
          getLocalizedText={getLocalizedText}
        />
      )}
    </>
  );
};

export const ContactForm = () => {
  return (
    <div className="space-y-8">
      <ContactFormProvider>
        <FormIntroduction />
        <LanguageSwitcher />
        <FormSteps />
      </ContactFormProvider>
    </div>
  );
};
