
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ContactForm } from '@/components/ContactForm';
import { Helmet } from 'react-helmet-async';

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
      
      <div className="min-h-screen bg-gradient-to-br from-white to-mayGray p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
