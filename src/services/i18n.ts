import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const language =
  typeof window !== 'undefined' ? localStorage.getItem('locale') || 'en' : 'en';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr', 'zh'],
    fallbackLng: 'en',
    lng: language,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['common'],
    defaultNS: 'common',
    // Language detection config
    detection: {
      // Key to store language in localStorage
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    // Store the language in localStorage when it changes
    react: {
      useSuspense: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  typeof window !== 'undefined' && localStorage.setItem('locale', lng);
});

export default i18n;
