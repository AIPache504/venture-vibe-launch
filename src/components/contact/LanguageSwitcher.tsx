
import React from 'react';
import { useContactForm } from './ContactFormProvider';
import { Button } from '@/components/ui/button';

export const LanguageSwitcher = () => {
  const { formLanguage, setFormLanguage } = useContactForm();
  
  return (
    <div className="flex justify-center space-x-4">
      <Button
        type="button"
        variant={formLanguage === 'de' ? 'default' : 'outline'}
        onClick={() => setFormLanguage('de')}
      >
        Deutsch
      </Button>
      <Button
        type="button"
        variant={formLanguage === 'en' ? 'default' : 'outline'}
        onClick={() => setFormLanguage('en')}
      >
        English
      </Button>
    </div>
  );
};
