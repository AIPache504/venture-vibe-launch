import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Imprint = () => {
  const { currentLanguage } = useLanguage();
  
  return (
    <div className="text-sm text-mayNavy/60 text-center mt-8">
      <button 
        onClick={() => document.getElementById('imprint')?.scrollIntoView({ behavior: 'smooth' })}
        className="hover:text-mayPink transition-colors"
      >
        {currentLanguage === 'de' ? 'Impressum' : 'Imprint'}
      </button>
      
      <div id="imprint" className="mt-8 mb-4">
        <h2 className="font-bold mb-4">{currentLanguage === 'de' ? 'IMPRESSUM' : 'IMPRINT'}</h2>
        <p className="mb-4">Maximilian Derpa<br />
        Stettiner Straße 40<br />
        48147 Münster</p>
        
        <h3 className="font-bold mb-2">{currentLanguage === 'de' ? 'Kontakt' : 'Contact'}</h3>
        <p className="mb-2">
          {currentLanguage === 'de' ? 'Telefon' : 'Phone'}: +49 (0) 1575 5867268
        </p>
        <p>
          E-Mail: <a href="mailto:Max@mayventures.vc" className="hover:text-mayPink transition-colors">Max@mayventures.vc</a>
        </p>
      </div>
    </div>
  );
};