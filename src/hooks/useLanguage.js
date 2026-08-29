import { useEffect, useState } from 'react';
import { getTranslation } from '../data/translations';

const LANGUAGE_EVENT = 'agrova-language-change';

export function getStoredLanguage() {
  if (typeof window === 'undefined') return 'hi';
  return localStorage.getItem('selectedLanguage') || 'hi';
}

export function setStoredLanguage(languageId) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('selectedLanguage', languageId);
  window.dispatchEvent(new Event(LANGUAGE_EVENT));
}

export function useLanguage() {
  const [languageId, setLanguageId] = useState(() => getStoredLanguage());

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageId(getStoredLanguage());
    };

    window.addEventListener(LANGUAGE_EVENT, handleLanguageChange);
    window.addEventListener('storage', handleLanguageChange);

    return () => {
      window.removeEventListener(LANGUAGE_EVENT, handleLanguageChange);
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  const setLanguage = (nextLang) => {
    setStoredLanguage(nextLang);
    setLanguageId(nextLang);
  };

  return {
    languageId,
    setLanguage,
    t: getTranslation(languageId),
  };
}

export default useLanguage;
