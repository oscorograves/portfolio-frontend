import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        // Prevent multiple re-renders during language detection
        detection: {
            // Simplified detection order - check localStorage first, then navigator
            order: ['localStorage', 'navigator'],
            // Cache the detected language
            caches: ['localStorage'],
            // Don't look at HTML lang attribute (can cause extra detection)
            lookupLocalStorage: 'i18nextLng',
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
            // Cache translations in browser
            requestOptions: {
                cache: 'default',
            },
        },
        // Tell React to use Suspense - prevents flash of untranslated content
        react: {
            useSuspense: true,
        },
        // Load only the detected language, not all
        load: 'languageOnly',
        // Don't reload on route change
        partialBundledLanguages: true,
    });

export default i18n;

