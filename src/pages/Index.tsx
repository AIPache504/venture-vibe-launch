import React from 'react';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Linkedin } from 'lucide-react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-mayGray flex flex-col items-center justify-center p-4">
      <LanguageSwitcher />
      <div className="max-w-4xl w-full mx-auto text-center animate-fadeIn">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
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

        <div className="flex justify-center gap-8 mt-12">
          <a 
            href="https://www.linkedin.com/in/dominik-lohle/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center gap-2 group"
          >
            <Avatar className="w-16 h-16 transition-transform group-hover:scale-105">
              <AvatarImage src="/lovable-uploads/5068b6fb-b75e-4a10-b87e-07a7961bbd79.png" alt="Dominik Lohle" />
            </Avatar>
            <span className="text-sm text-mayNavy group-hover:text-mayPink transition-colors">Dominik Lohle</span>
          </a>

          <a 
            href="https://www.linkedin.com/in/vcmax/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center gap-2 group"
          >
            <Avatar className="w-16 h-16 transition-transform group-hover:scale-105">
              <AvatarImage src="/lovable-uploads/d2e3a4ee-831f-45e5-ab82-9e90de9a5ec0.png" alt="Max Derpa" />
            </Avatar>
            <span className="text-sm text-mayNavy group-hover:text-mayPink transition-colors">Max Derpa</span>
          </a>
        </div>

        <div className="text-sm text-mayNavy/60 text-center mt-8">
          <Link 
            to="/imprint" 
            className="hover:text-mayPink transition-colors"
          >
            {t('imprint')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;