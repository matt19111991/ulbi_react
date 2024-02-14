## Тесты

В проекте используются 4 вида тестов:
   1. Обычные `unit тесты` на `Jest`:

      `npm run test:unit`

   2. Тесты на компоненты с `React Testing Library`:

      `npm run test:unit`

   3. Скриншотное тестирование с `Loki`:

      `npm run test:ui`

   4. `E2E` тестирование с `Cypress`:

      `npm run test:e2e`

Использование `localStorage` в тестах `Jest`: [jestLocalStorage](../config/jest/jestLocalStorage.ts)

Функция-обертка для тестирования со всеми необходимыми провайдерами: [componentTestRenderer](../src/shared/lib/tests/componentTestRenderer/componentTestRenderer.tsx)

Класс для тестирования асинхронных запросов: [TestAsyncThunk](../src/shared/lib/tests/TestAsyncThunk/TestAsyncThunk.ts)
