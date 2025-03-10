
import React from 'react';
import { Button } from '@/components/ui/button';
import { BasicInfoFields } from '@/components/contact/BasicInfoFields';
import { InquiryTypeField } from '@/components/contact/InquiryTypeField';
import { LocationFields } from '@/components/contact/LocationFields';
import { StartupFields } from '@/components/contact/StartupFields';
import { InvestorFields } from '@/components/contact/InvestorFields';

interface PersonalInfoStepProps {
  getLocalizedText: (de: string, en: string) => string;
  nextStep: () => void;
  isStartup: boolean;
  isInvestment: boolean;
  isGermany: boolean;
  isNRW: boolean;
}

export const PersonalInfoStep = ({ 
  getLocalizedText, 
  nextStep, 
  isStartup, 
  isInvestment,
  isGermany,
  isNRW
}: PersonalInfoStepProps) => {
  return (
    <div className="space-y-6">
      <BasicInfoFields getLocalizedText={getLocalizedText} />
      
      <InquiryTypeField getLocalizedText={getLocalizedText} />
      
      <LocationFields 
        getLocalizedText={getLocalizedText}
        isGermany={isGermany}
        isNRW={isNRW}
      />
      
      {isStartup && (
        <StartupFields getLocalizedText={getLocalizedText} />
      )}
      
      {isInvestment && (
        <InvestorFields getLocalizedText={getLocalizedText} />
      )}

      <div className="flex justify-end pt-4">
        <Button 
          type="button" 
          onClick={nextStep}
        >
          {getLocalizedText('Weiter', 'Next')}
        </Button>
      </div>
    </div>
  );
};
