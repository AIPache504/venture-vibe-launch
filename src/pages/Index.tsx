import React from 'react';
import { Logo } from '@/components/Logo';
import { EmailSignup } from '@/components/EmailSignup';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Linkedin } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-mayGray flex flex-col items-center justify-center p-4">
      <LanguageSwitcher />
      <div className="max-w-4xl w-full mx-auto text-center animate-fadeIn">
        <Logo />
        
        <h1 className="text-4xl md:text-6xl font-bold text-mayNavy mt-8 mb-4">
          {t('title')}
        </h1>
        
        <p className="text-xl md:text-2xl text-mayNavy/80 mb-8 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        
        <div className="h-px w-24 bg-mayPink mx-auto mb-8" />
        
        <p className="text-lg text-mayNavy/60 mb-6">
          {t('stayTuned')}
        </p>

        <a 
          href="https://www.linkedin.com/company/mayvc/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 text-mayNavy hover:text-mayPink transition-colors mb-8"
        >
          <Linkedin className="w-5 h-5" />
          <span>Follow us on LinkedIn</span>
        </a>
        
        <div className="flex justify-center">
          <EmailSignup />
        </div>
      </div>
    </div>
  );
};

export default Index;