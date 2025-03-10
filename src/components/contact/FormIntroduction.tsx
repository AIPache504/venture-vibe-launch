
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
          'Dieses Kontaktformular dient der effizienten Einordnung eingehender Anfragen von Startups und anderen Stakeholdern unseres Fonds. Ziel ist es, die Bearbeitung zu beschleunigen und relevante Anfragen direkt priorisieren zu können.',
          'This contact form serves to efficiently categorize incoming inquiries from startups and other stakeholders of our fund. The goal is to accelerate processing and prioritize relevant inquiries directly.'
        )}
      </p>
    </div>
  );
};
