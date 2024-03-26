import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// позволяет асинхронно чанками подгружать необходимый язык, а не грузить все переводы сразу
import Backend from 'i18next-http-backend';

// '.use()' => подключение различных плагинов

i18n
  .use(Backend)
  .use(initReactI18next) // прокидываем 'i18n' инстанс в 'react-i18next'

  .init({
    debug: false,

    fallbackLng: 'ru',

    interpolation: {
      // нет необходимости: 'React' экранирует cтроковые переменные в 'UI' автоматически
      escapeValue: false,
    },

    // иначе ошибки вида '1 request failed to load; http://192.168.1.165:6006/locales/en-US/translation.json'
    load: 'languageOnly',

    // убираем все логи о ненайденных ключах для переводов при 'production' сборке
    missingKeyHandler: false,
  });

export default i18n;
