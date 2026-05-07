import { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const languages = [
  { code: 'en', native: 'English', label: 'English' },
  { code: 'ta', native: 'தமிழ்', label: 'Tamil' },
  { code: 'hi', native: 'हिन्दी', label: 'Hindi' },
  { code: 'te', native: 'తెలుగు', label: 'Telugu' },
  { code: 'ml', native: 'മലയാളം', label: 'Malayalam' },
  { code: 'kn', native: 'ಕನ್ನಡ', label: 'Kannada' }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useContext(AuthContext);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = async (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);

    if (user) {
      try {
        await api.patch('/users/language', { language: lng });
      } catch (error) {
        console.error("Failed to save language preference", error);
      }
    }
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 hover:bg-white px-3 py-2 rounded-xl shadow-sm transition-all text-slate-700"
      >
        <Globe className="w-4 h-4 text-blue-500" />
        <span className="text-sm font-bold hidden sm:block">{currentLang.native}</span>
        <span className="text-xs font-bold uppercase sm:hidden">{currentLang.code}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl overflow-hidden"
          >
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors ${i18n.language === lang.code ? 'bg-blue-50/50 text-blue-700' : 'text-slate-700'}`}
                >
                  <div>
                    <span className="block text-sm font-bold">{lang.native}</span>
                    <span className="block text-[10px] font-medium text-slate-400">{lang.label}</span>
                  </div>
                  {i18n.language === lang.code && <Check className="w-4 h-4 text-blue-500" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
