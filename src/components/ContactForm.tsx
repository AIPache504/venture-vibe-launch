
import React from 'react';
import { ContactFormProvider } from '@/components/contact/ContactFormProvider';
import { FormIntroduction } from '@/components/contact/FormIntroduction';
import { LanguageSwitcher } from '@/components/contact/LanguageSwitcher';
import { PersonalInfoStep } from '@/components/contact/PersonalInfoStep';
import { DescriptionStep } from '@/components/contact/DescriptionStep';
import { useContactForm } from '@/components/contact/ContactFormProvider';
import { Button } from '@/components/ui/button';

const FormSteps = () => {
  const { formStep, getLocalizedText, isStartup, isInvestment, isGermany, isNRW, sendTestEmail, isSendingTest } = useContactForm();

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
      
      {/* Admin Test Email Button - Only visible in development */}
      {import.meta.env.DEV && (
        <div className="mt-8 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium mb-2 text-gray-700">
            {getLocalizedText('Administrator-Bereich', 'Administrator Area')}
          </h3>
          <Button 
            variant="outline"
            size="sm"
            type="button"
            onClick={sendTestEmail}
            disabled={isSendingTest}
          >
            {isSendingTest
              ? getLocalizedText('Sende Test-Email...', 'Sending Test Email...')
              : getLocalizedText('Test-Email senden', 'Send Test Email')}
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            {getLocalizedText(
              'Diese Funktion ist nur in der Entwicklungsumgebung verfügbar.', 
              'This function is only available in development mode.'
            )}
          </p>
        </div>
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
