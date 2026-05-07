import { createContext, useState, useEffect } from 'react';
import { translateTextApi } from '../api/translationApi';
import { staticTranslations } from '../utils/staticTranslations';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('app_language') || 'en';
  });

  const [translationCache, setTranslationCache] = useState({});

  useEffect(() => {
    localStorage.setItem('app_language', selectedLanguage);
  }, [selectedLanguage]);

  const translate = async (text) => {
    if (selectedLanguage === 'en' || !text) return text;

    // Check static translations first
    if (staticTranslations[selectedLanguage] && staticTranslations[selectedLanguage][text]) {
      return staticTranslations[selectedLanguage][text];
    }

    // Check dynamic cache
    const cacheKey = `${selectedLanguage}_${text}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    // Call API
    try {
      const translatedText = await translateTextApi(text, selectedLanguage);
      setTranslationCache(prev => ({ ...prev, [cacheKey]: translatedText }));
      return translatedText;
    } catch (error) {
      return text;
    }
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
