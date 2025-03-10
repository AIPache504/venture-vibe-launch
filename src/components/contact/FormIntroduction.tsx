
import React from 'react';
import { useContactForm } from './ContactFormProvider';

export const FormIntroduction = () => {
  const { getLocalizedText } = useContactForm();
  
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">
        {getLocalizedText('Kontaktformular', 'Contact Form')}
      </h1>
      <p className="mt-2 text-gray-600">
        {getLocalizedText(
          'Füllen Sie das Formular aus, und wir werden uns so schnell wie möglich bei Ihnen melden.',
          'Fill out the form, and we will get back to you as soon as possible.'
        )}
      </p>
    </div>
  );
};
