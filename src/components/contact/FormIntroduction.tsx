
import React from 'react';

interface FormIntroductionProps {
  getLocalizedText: (de: string, en: string) => string;
}

export const FormIntroduction = ({ getLocalizedText }: FormIntroductionProps) => {
  return (
    <div className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-bold text-mayNavy mb-4">
        {getLocalizedText('Kontakt', 'Contact')}
      </h1>
      <p className="text-mayNavy/80 mb-8">
        {getLocalizedText(
          'Du möchtest mit uns Kontakt aufnehmen? Dann lass uns doch ein paar Infos zu dir und deinem Anliegen da, damit wir dir schnell weiterhelfen können.',
          'Would you like to get in touch with us? Please share some information about yourself and your inquiry so we can help you quickly.'
        )}
      </p>
    </div>
  );
};
