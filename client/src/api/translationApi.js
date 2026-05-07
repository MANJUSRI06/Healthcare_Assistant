import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const translateTextApi = async (text, targetLanguage) => {
  if (targetLanguage === 'en' || !text) return text;
  try {
    const res = await axios.post(`${API_URL}/api/translate/text`, { text, targetLanguage });
    return res.data.translatedText;
  } catch (error) {
    console.error("Translation Error:", error);
    return text;
  }
};

export const translateBatchApi = async (texts, targetLanguage) => {
  if (targetLanguage === 'en' || !texts || texts.length === 0) return texts.map(t => ({ original: t, translated: t }));
  try {
    const res = await axios.post(`${API_URL}/api/translate/batch`, { texts, targetLanguage });
    return res.data.translations;
  } catch (error) {
    console.error("Batch Translation Error:", error);
    return texts.map(t => ({ original: t, translated: t }));
  }
};
