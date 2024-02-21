import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// позволяет асинхронно чанками подгружать необходимый язык, а не грузить все переводы сразу
import Backend from 'i18next-http-backend';

// определяем язык пользователя в браузере
import LanguageDetector from 'i18next-browser-languagedetector';

// '.use()' => подключение различных плагинов

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // прокидываем 'i18n' инстанс в 'react-i18next'

  .init({
    /*
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
    */

    fallbackLng: 'ru',

    // убираем все логи о ненайденных ключах для переводов при 'production' сборке
    missingKeyHandler: false,

    /*
      Необходимо глобальное объявление переменной '__IS_DEV__' в 'global.d.ts', чтобы избежать ошибок 'TS'

      В логи пишется подгрузка переводов, отсутствующие ключи и т.д.
      debug: __IS_DEV__ ? true : false
    */

    interpolation: {
      // нет необходимости: 'React' экранирует cтроковые переменные в 'UI' автоматически
      escapeValue: false,
    },
  });

export default i18n;
