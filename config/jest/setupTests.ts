/*
  поддержка:
   'React v.18+' <=> '@testing-library/react v.13+'
   'React v.17-' <=> '@testing-library/react v.12.1.5-'
*/

/*
  ошибка 'ReferenceError: React is not defined' =>
    в 'babel.config.json' нужно добавить: ["@babel/preset-react", { "runtime": "automatic" }]
*/

/*
  ошибка 'ReferenceError: regenerator is not defined' => в 'setupTests.ts' нужно добавить:
    "import 'regenerator-runtime/runtime';"
*/

/*
  '@testing-library/jest-dom' добавит методы для тестов такие, как 'toBeInTheDocument()', 'toHaveStyle()' и т.д:
  'expect(screen.getByText('Test')).toBeInTheDocument();'
*/
import '@testing-library/jest-dom';

/*
  добавляем глобально объект 'fetch', чтобы избавиться от предупреждения в 'unit' тестах:
   'Warning: `fetch` is not available.
    Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments.'
*/
global.fetch = require('jest-fetch-mock');

// добавляем глобально заглушку для 'IntersectionObserver'
window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
}));

// добавляем глобально заглушку для 'ResizeObserver', иначе ошибки при использовании '@headlessui/react v.2+'
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
}));

/*
  добавляем глобально функцию 'scrollTo', чтобы избавиться от ошибки в 'unit' тестах:
 'Error: Not implemented: window.scrollTo'
*/
window.scrollTo = jest.fn();
