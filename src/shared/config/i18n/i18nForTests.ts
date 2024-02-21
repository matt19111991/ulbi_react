import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  debug: false,

  fallbackLng: 'ru',

  lng: 'ru',

  interpolation: {
    // нет необходимости: 'React' экранирует cтроковые переменные в 'UI' автоматически
    escapeValue: false,
  },

  // убираем все логи о ненайденных ключах для переводов
  missingKeyHandler: false,

  resources: {
    ru: {
      translations: {},
    },
  },
});

export default i18n;
