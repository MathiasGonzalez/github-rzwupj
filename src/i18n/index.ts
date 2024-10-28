import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as en from './locales/en/index';
import * as es from './locales/es/index';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...en.auth,
          ...en.calendar,
          ...en.documents,
          ...en.employees,
          ...en.errors,
          ...en.common
        }
      },
      es: {
        translation: {
          ...es.auth,
          ...es.calendar,
          ...es.documents,
          ...es.employees,
          ...es.errors,
          ...es.common
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;