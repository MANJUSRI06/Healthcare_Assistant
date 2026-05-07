import { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export const useTranslate = (text) => {
  const { selectedLanguage, translate } = useContext(LanguageContext);
  const [translatedText, setTranslatedText] = useState(text || '');

  useEffect(() => {
    let isMounted = true;

    const translateAsync = async () => {
      if (!text) return;
      if (selectedLanguage === 'en') {
        setTranslatedText(text);
        return;
      }
      const result = await translate(text);
      if (isMounted) setTranslatedText(result);
    };

    translateAsync();

    return () => { isMounted = false; };
  }, [text, selectedLanguage, translate]);

  // t is a function that returns the translated state if passing dynamic text isn't possible,
  // but since hooks run on render, it's better to expose the context's async translate 
  // or return the state directly. For a synchronous-like feel, we return the translated state.
  return { t: translatedText, selectedLanguage, translate };
};

// Alternative generic hook for wrapping multiple strings
export const useTranslation = () => {
  const { selectedLanguage, translate, setSelectedLanguage } = useContext(LanguageContext);
  
  // Custom t function that needs to be awaited if used outside render, 
  // but for React rendering we usually need a synchronous return.
  // Because actual Google Translate API is async, a pure sync 't' function requires pre-fetching or suspense.
  // We'll use the static dictionary for instant sync translation, and fallback to english if async is needed.
  
  const { staticTranslations } = require('../utils/staticTranslations');

  const t = (text) => {
    if (selectedLanguage === 'en' || !text) return text;
    if (staticTranslations[selectedLanguage] && staticTranslations[selectedLanguage][text]) {
      return staticTranslations[selectedLanguage][text];
    }
    // If not in static dict, return English temporarily (it will be updated by an async wrapper if implemented)
    return text; 
  };

  return { t, translate, selectedLanguage, setSelectedLanguage };
};
