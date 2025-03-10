
import React from 'react';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  formLanguage: 'de' | 'en';
  setFormLanguage: (language: 'de' | 'en') => void;
}

export const LanguageSwitcher = ({ formLanguage, setFormLanguage }: LanguageSwitcherProps) => {
  return (
    <div className="flex space-x-4 mb-8">
      <Button 
        variant={formLanguage === 'de' ? 'default' : 'outline'} 
        onClick={() => setFormLanguage('de')}
        type="button"
      >
        Deutsch
      </Button>
      <Button 
        variant={formLanguage === 'en' ? 'default' : 'outline'} 
        onClick={() => setFormLanguage('en')}
        type="button"
      >
        English
      </Button>
    </div>
  );
};
