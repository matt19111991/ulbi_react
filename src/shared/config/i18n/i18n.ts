import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 'i18next-http-backend' позволяет асинхронно чанками подгружать необходимый язык, а не грузить все переводы сразу
import Backend from 'i18next-http-backend';

// detect user language
import LanguageDetector from 'i18next-browser-languagedetector';

// .use() => подключение различных плагинов

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // pass the i18next instance to react-i18next

  .init({
    /*
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
    */

    fallbackLng: 'ru',

    // убираем все логи о ненайденных ключах для переводов при production сборке
    missingKeyHandler: false,

    /*
      Необходимо глобальное объявление переменной __IS_DEV__, чтобы избежать ошибок TS (в global.d.ts)

      В логи пишется подгрузка переводов, отсутствующие ключи и т.д.
      debug: __IS_DEV__ ? true : false
    */

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
