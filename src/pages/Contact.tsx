
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ContactForm } from '@/components/ContactForm';
import { Helmet } from 'react-helmet-async';
import { Waves } from '@/components/ui/waves';

const ContactPage = () => {
  const { language } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>
          {language === 'de' ? 'Kontakt | May Ventures' : 'Contact | May Ventures'}
        </title>
        <meta 
          name="description" 
          content={language === 'de' 
            ? 'Kontaktieren Sie May Ventures für Startup-Investments und Partnerschaften in den Bereichen KI und Deep Tech.' 
            : 'Contact May Ventures for startup investments and partnerships in AI and Deep Tech.'}
        />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-white to-mayGray p-4 md:p-8 relative">
        {/* Waves Background */}
        <Waves 
          lineColor="rgba(0, 0, 0, 0.1)"
          backgroundColor="transparent"
          waveSpeedX={0.018}
          waveSpeedY={0.008}
          waveAmpX={35}
          waveAmpY={20}
          friction={0.925}
          tension={0.006}
          maxCursorMove={120}
          xGap={14}
          yGap={36}
        />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
