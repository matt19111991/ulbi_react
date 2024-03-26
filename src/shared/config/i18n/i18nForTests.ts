import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// '.use()' => подключение различных плагинов

// прокидываем 'i18n' инстанс в 'react-i18next'
i18n.use(initReactI18next).init({
  debug: false,

  fallbackLng: 'ru',

  interpolation: {
    // нет необходимости: 'React' экранирует cтроковые переменные в 'UI' автоматически
    escapeValue: false,
  },

  lng: 'ru',

  // убираем все логи о ненайденных ключах для переводов при 'production' сборке
  missingKeyHandler: false,

  /*
    иначе ошибки вида: 'TestingLibraryElementError: Unable to find an element by:
    [data-testid="EditableProfileCardHeader.EditButton"]' в 'unit' тестах
  */
  resources: {
    ru: {
      translations: {},
    },
  },
});

export default i18n;
