import { useTranslation } from 'react-i18next';

/**
 * useLanguage Hook
 * Manages internationalization (i18n) state and language switching.
 * Wraps react-i18next to provide a clean interface for the UI.
 */
const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const language = i18n.resolvedLanguage || 'en';
  
  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return { t, language, setLanguage };
};

export default useLanguage;
