## TODO
- Добавить функционал создания статьи (widget)
- Добавить функционал редактирования статьи (widget)
- Добавить функционал оценки профиля (feature)
- Добавить unit тесты для всех rtkApi.injectEndpoints 
- Добавить документацию и README.md для всех файлов
- Исправить все закомментированные 'eslint-disable-next-line path-checker-1911' правила

---- 

## Запуск проекта
- `npm install` - устанавливаем зависимости
- `npm run start:vite` - запуск сервера + frontend проекта в development режиме (Vite сборщик)
- `npm run start:webpack` - запуск сервера + frontend проекта в development режиме (Webpack сборщик)

----

## Скрипты

- `npm run start:client:webpack` - Запуск frontend проекта на Webpack dev server
- `npm run start:client:vite` - Запуск frontend проекта на Vite
- `npm run start:server` - Запуск backend сервера
- `npm run build:dev` - Сборка в development режиме (не минимизирован)
- `npm run build:prod` - Сборка в production режиме (минимизирован)
- `npm run generate:template` - Скрипт для генерации FSD слайсов
- `npm run lint:ts` - Проверка TS файлов линтером
- `npm run lint:ts:fix` - Исправление TS файлов линтером
- `npm run lint:scss` - Проверка SCSS файлов style линтером
- `npm run lint:scss:fix` - Исправление SCSS файлов style линтером
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Сборка storybook билда
- `npm run test:ui` - Запуск скриншотных тестов с Loki
- `npm run test:ui:ok` - Подтверждение новых скриншотов Loki
- `npm run test:ui:ci` - Запуск скриншотных тестов Loki в CI
- `npm run test:ui:json` - Генерация json отчета для скриншотных тестов Loki
- `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов Loki
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов Loki
- `npm run test:ui:update` - Обновление скриншотных тестов Loki
- `npm run test:unit` - Запуск unit тестов с Jest

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

----

## Тесты

В проекте используются 4 вида тестов:
1) Обычные unit тесты на Jest - `npm run test:unit`
2) Тесты на компоненты с React Testing Library -`npm run test:unit`
3) Скриншотное тестирование с Loki `npm run test:ui`
4) E2E тестирование с Cypress `npm run test:e2e`

Подробнее о тестах - [документация тестирование](./docs/tests.md)

----

## Линтинг

В проекте используется Eslint для проверки TypeScript кода и StyleLint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов
используется собственный Eslint plugin *eslint-plugin-path-checker-1911*,
который содержит 3 правила:
1) **layer-imports** - проверяет корректность использования слоев с точки зрения 'FSD'
   (например: 'widgets' нельзя использовать в 'features' и 'entities')

2) **path-checker** - запрещает использовать абсолютные импорты в рамках одного модуля

3) **public-api-imports** - разрешает импорт из других модулей только из Public API. Имеет возможность auto-fix

##### Запуск линтеров
- `npm run lint:ts` - Проверка TS файлов линтером
- `npm run lint:ts:fix` - Исправление TS файлов линтером
- `npm run lint:scss` - Проверка SCSS файлов style линтером
- `npm run lint:scss:fix` - Исправление SCSS файлов style линтером

----
## Storybook

В проекте для каждого компонента описываются story-кейсы.
Запросы на сервер мокаются с помощью функции 'queryFn' из 'RTK Query' и возвращаются захардкоженные данные.

Файлы со story-кейсами создаем рядом с компонентом с расширением '.stories.tsx'

Запустить Storybook можно командой:
- `npm run storybook`

Подробнее о [Storybook](./docs/storybook.md)

----

## Конфигурация проекта

Для разработки проект содержит 2 конфига:
1. Webpack - ./config/build
2. Vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в
- babel.config.json - конфигурация Babel
- /config/build - конфигурация Webpack
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация Storybook

В папке `scripts` находятся различные скрипты для рефакторинга / упрощения написания кода / генерации отчетов и т.д.

----

## CI Pipeline и Pre-commit hooks

Конфигурация Github Actions находится в ./github/workflows/main.yaml.
В CI прогоняются все виды тестов, сборка проекта и storybook, линтинг.

В Pre-commit hooks проверяем проект линтерами, конфигурация находится в /.husky

----

### Работа с данными

Взаимодействие с данными осуществляется с помощью 'Redux ToolKit'.
По возможности переиспользуемые сущности необходимо нормализовать с помощью 'EntityAdapter'

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

## Сущности (entities)

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Counter](/src/entities/Counter)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Фичи (features)

- [AddCommentForm](/src/features/AddCommentForm)
- [ArticleRating](/src/features/ArticleRating)
- [ArticleRecommendationsList](/src/features/ArticleRecommendationsList)
- [ArticleTypeTabs](/src/features/ArticleTypeTabs)
- [ArticleViewSelector](/src/features/ArticleViewSelector)
- [AuthByUsername](/src/features/AuthByUsername)
- [AvatarDropdown](/src/features/AvatarDropdown)
- [EditableProfileCard](/src/features/EditableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [NotificationButton](/src/features/NotificationButton)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
