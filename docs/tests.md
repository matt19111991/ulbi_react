## Тесты

### Запуск

`cross-env NODE_OPTIONS=--no-warnings='DEP0040'` добавляется в команду перед запуском `unit`-тестов,
чтобы избежать предупреждения в `Node v22.x`: '(node:87409) [DEP0040] DeprecationWarning:
The `punycode` module is deprecated. Please use a userland alternative instead.'

В проекте используются 4 вида тестов:
   1. Обычные `unit тесты` на `Jest`:

      `npm run test:unit`

   2. Тесты на компоненты с `React Testing Library`:

      `npm run test:unit`

   3. Скриншотное тестирование с `Loki`:

      `npm run test:ui`

   4. `E2E` тестирование с `Cypress`:

      `npm run test:e2e:vite`
      
      `npm run test:e2e:webpack`

Функция-обертка для тестирования со всеми необходимыми провайдерами: [componentTestRenderer](../src/shared/lib/tests/componentTestRenderer/componentTestRenderer.tsx)

Класс для тестирования асинхронных запросов: [TestAsyncThunk](../src/shared/lib/tests/TestAsyncThunk/TestAsyncThunk.ts)
