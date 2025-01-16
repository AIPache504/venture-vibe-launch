import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'de';

type Translations = {
  [key in Language]: {
    title: string;
    subtitle: string;
    stayTuned: string;
    notifyMe: string;
    emailPlaceholder: string;
    toastTitle: string;
    toastDescription: string;
    imprint: string;
  };
};

const translations: Translations = {
  en: {
    title: "MAY VENTURES",
    subtitle: "We invest in future technology leaders from our home region.",
    stayTuned: "Every business and every project starts small. Something exciting is in the works. Stay tuned for updates.",
    notifyMe: "Notify Me",
    emailPlaceholder: "Enter your email",
    toastTitle: "Thanks for your interest!",
    toastDescription: "We'll keep you updated on our progress.",
    imprint: "Imprint"
  },
  de: {
    title: "MAY VENTURES",
    subtitle: "WIR INVESTIEREN IN ZUKÜNFTIGE TECHNOLOGIEFÜHRER AUS UNSERER HEIMATREGION",
    stayTuned: "Jedes Unternehmen und jedes Projekt fängt klein an. Etwas Aufregendes ist in Arbeit. Stay tuned.",
    notifyMe: "Benachrichtigen",
    emailPlaceholder: "E-Mail eingeben",
    toastTitle: "Danke für Ihr Interesse!",
    toastDescription: "Wir halten Sie über unseren Fortschritt auf dem Laufenden.",
    imprint: "Impressum"
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof typeof translations.en) => translations[language][key];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};