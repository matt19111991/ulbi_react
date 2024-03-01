/*
  Поддержка:
    React v.18+ <=> @testing-library/react v.13+
    React v.17- <=> @testing-library/react v.12.1.5-
*/

/*
  Ошибка 'ReferenceError: React is not defined' =>
    в 'babel.config.json' нужно добавить: ["@babel/preset-react", { "runtime": "automatic" }]
*/

/*
  Ошибка 'ReferenceError: regenerator is not defined' => в 'setupTests.ts' нужно добавить:
   import 'regenerator-runtime/runtime';
*/

/*
  '@testing-library/jest-dom' добавит методы для тестов такие, как 'toBeInTheDocument()', 'toHaveStyle()' и т.д:
   expect(screen.getByText('Test')).toBeInTheDocument();
*/
import '@testing-library/jest-dom';

/*
  Добавляем глобально объект 'fetch', чтобы избавиться от предупреждения в 'unit' тестах:
   'Warning: `fetch` is not available.
    Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments.'
*/
global.fetch = require('jest-fetch-mock');

/*
  Добавляем глобально функцию 'scrollTo', чтобы избавиться от ошибки в 'unit' тестах:
    'Error: Not implemented: window.scrollTo'
*/
window.scrollTo = jest.fn();
