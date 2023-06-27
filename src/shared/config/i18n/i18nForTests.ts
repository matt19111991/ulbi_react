import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: false,

    fallbackLng: 'ru',
    lng: 'ru',

    interpolation: {
      escapeValue: false, // не нужно для React
    },

    resources: {
      ru: {
        translations: {},
      },
    },
  });

export default i18n;
