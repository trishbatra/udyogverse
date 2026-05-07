import { createContext, useContext, useState } from 'react';
import { translations, LANGUAGES } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = (key, ...args) => {
    const val = translations[lang]?.[key] ?? translations.en[key] ?? key;
    return typeof val === 'function' ? val(...args) : val;
  };

  // kept for any legacy callers
  const toggleLang = () => setLang(l => l === 'en' ? 'te' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
