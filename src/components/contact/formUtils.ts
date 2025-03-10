
export const getLocalizedText = (formLanguage: 'de' | 'en', de: string, en: string): string => {
  return formLanguage === 'de' ? de : en;
};
