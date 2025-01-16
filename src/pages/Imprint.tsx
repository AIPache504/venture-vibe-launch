import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ImprintPage = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-mayGray p-8">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-mayNavy hover:text-mayPink transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {language === 'de' ? 'Zurück' : 'Back'}
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-mayNavy">
          {language === 'de' ? 'IMPRESSUM' : 'IMPRINT'}
        </h1>
        
        <div className="space-y-6 text-mayNavy/80">
          <p>Maximilian Derpa<br />
          Stettiner Straße 40<br />
          48147 Münster</p>
          
          <div>
            <h2 className="font-bold mb-2">{language === 'de' ? 'Kontakt' : 'Contact'}</h2>
            <p className="mb-2">
              {language === 'de' ? 'Telefon' : 'Phone'}: +49 (0) 1575 5867268
            </p>
            <p>
              E-Mail: <a href="mailto:Max@mayventures.vc" className="hover:text-mayPink transition-colors">Max@mayventures.vc</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprintPage;