## Доп. информация
- [Создание и настройка доменного имени](docs/domain_name.md)
- [Настройка SSL](docs/ssl.md)
- [Настройка HTTPS](docs/https.md)
- [Loki Ui Screenshot testing](docs/loki.md)
- [Модели ветвления Git](docs/git_branches.md)
- [Webpack](docs/webpack.md)

---- 

## Инициализация проекта

- `npm init -y` - создание `package.json` с настройками по умолчанию

---- 

## Запуск проекта
- `npm install` - устанавливаем зависимости
- `npm run start:vite:dev` - запуск сервера и клиента в development режиме (Vite сборщик)
- `npm run start:webpack:dev` - запуск сервера и клиента в development режиме (Webpack сборщик)
- `npm outdated` - вывести список устаревших зависимостей

----

## Deploy проекта
   1. Создаем облачный сервер (можно бесплатно на https://console.kamatera.com)
   2. Подключаемся по SSH: `ssh root@91.223.169.133` или через Remove Console
      (https://console.kamatera.com => Servers => Наш сервер => Connect => 
      Open Remote Console)
  
      Если `ssh` команды не существует, устанавливаем SSH клиент и генерируем приватный и публичный ключи: `ssh-keygen`
      
      2.1. Вводим пароль от сервера и попадаем в консоль сервера

   3. Обновляем apt зависимости на сервере: `sudo apt update`
   4. Устанавливаем Git: `sudo apt install git-all`
   5. Клонируем проект
   
      5.1. Публичный: `git clone https://github.com/matt19111991/ulbi_react.git`
      
      5.2. Приватный (возможна ошибка **Authentication failed for https://github.com/matt19111991/ulbi_react.git**)
          
          5.2.1. Генерируем приватный и публичный ключи: `sudo ssh-keygen`
          
          5.2.2. Указываем путь: `/root/.ssh/project`
          
          5.2.3. Вводим passphrase (просто жмем Enter)
          
          5.2.4. Переходим в папку с .ssh: `cd .ssh`
          
          5.2.5. Создаем конфигурационный файл для GitHub: `cat > config`
                 Host должен быть точным названием проекта в репозитории
                 `Host ulbi_react
                  Hostname github.com
                  User git
                  IndetityFile ~/.ssh/project`

          5.2.6. Берем публичный SSH ключ: `sudo cat project.pub`
          
          5.2.7. Добавляем публичный SSH ключ в GitHub (Settings / Deploy keys / Add deploy key)
          
          5.2.8. Клонируем проект `git clone git@github.com:matt19111991/ulbi_react.git`
   6. Устанавливаем nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
   7. Настраиваем nvm: `export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
                        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`
   8. Устанавливаем Node: `nvm install 21.4.0`
   9. Устанавливаем зависимости: `npm i`
   10?. Запускаем development сборку (vite не работает): `npm run start:client:webpack`
   11. Устанавливаем nginx: `sudo apt install nginx`
   12. Идем в папку с конфигом nginx: `cd ../../etc/nginx/`
   13. Раскомментируем все пункты с gzip и сохраняем файл: `vim nginx.conf`
   14. Идем в папку sites-enabled: `cd sites-enabled/`
   15. Открываем и редактируем файл конфига nginx: `vim default`
   16. Проверяем целостность nginx конфига: `nginx -t`
   17. Останавливаем Apache сервис перед обновлением nginx: `sudo service apache2 stop`
   18. Перезапускаем nginx: `sudo service nginx restart`
   19. http://91.223.169.133 должен выдавать 404 Not Found | nginx/1.18.0 (Ubuntu)
   20. Идем в папку www: `cd ../../../var/www/`
   21. Создаем папку с названием проекта: `mkdir ulbi_react`
   22. Переходим в папку с проектом: `../../root/ulbi_react/`
   23. Делаем билд: `npm run build:prod"`
   24. Перемещаем билд в папку для статики: `mv build/ ../../../var/www/ulbi_react`
   25. Переходим в папку со статикой: `../../var/www/ulbi_react/`
   26. Удаляем папку html (если есть): `rmdir html/`
   27. Переименовываем папку с билдом: `mv build/ html/`
   28. Переходим в папку с проектом: `../../../root/ulbi_react/`
   29. Устанавливаем pm2 (process manager для управления процессами): `npm i -g pm2`
       
       Список запущенных процессов: `pm2 list`
       
       Остановить процесс по id = 0: `pm2 stop 0`
   30. Запускаем сервер в фоне: `pm2 start json-server/index.js`
   31. [Скрипт для деплоя](.deploy/deploy.sh) позволяет автоматизировать деплой на сервере

----

## Скрипты

- `npm run start:client:webpack` - Запуск клиента на Webpack в режиме dev сервера
- `npm run start:client:vite` - Запуск клиента на Vite
- `npm run start:server:dev` - Запуск сервера в development режиме
- `npm run start:server:prod` - Запуск сервера в production режиме
- `npm run start:vite:dev` - Запуск клиента на Vite и сервера в development режиме
- `npm run start:webpack:dev` - Запуск клиента на Webpack и сервера в development режиме
- `npm run start:vite:prod` - Запуск клиента на Vite и сервера в production режиме
- `npm run start:webpack:prod` - Запуск клиента на Webpack и сервера в production режиме
- `npm run build:dev` - Сборка клиента в development режиме (не минимизирован)
- `npm run build:prod` - Сборка клиента в production режиме (минимизирован)
- `npm run generate:template` - Скрипт для генерации FSD слайсов
- `npm run lint:ts` - Проверка TS файлов линтером и tsc
- `npm run lint:ts:fix` - Исправление TS файлов линтером
- `npm run lint:scss` - Проверка SCSS файлов style линтером
- `npm run lint:scss:fix` - Исправление SCSS файлов style линтером
- `npm run postinstall` - Очистка кэша после установки новых модулей
- `npm run prettify` - Выравнивание кода при помощи Prettier
- `npm run set:feature` - Установка feature flag
- `npm run storybook` - Запуск Storybook
- `npm run storybook:build` - Сборка storybook билда
- `npm run test:e2e` - Запуск интеграционных тестов с Cypress
- `npm run test:ui` - Запуск скриншотных тестов Loki
- `npm run test:ui:ok` - Подтверждение новых скриншотов Loki
- `npm run test:ui:ci` - Запуск скриншотных тестов Loki для CI
- `npm run test:ui:json` - Генерация json отчета для скриншотных тестов Loki
- `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов Loki
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов Loki
- `npm run test:ui:update` - Обновление скриншотных тестов Loki
- `npm run test:unit` - Запуск unit тестов с Jest
- `npm run types:check` - Запуск проверки типов TypeScript

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature Sliced Design

Ссылка на документацию - [Feature Sliced Design](https://feature-sliced.design/ru/docs/get-started/tutorial)

----

## Работа с переводами

В проекте используется библиотека 'i18next' для работы с переводами.
Файлы с переводами хранятся в 'public/locales'.

Для комфортной работы рекомендуем установить плагин для WebStorm / VSCode

Документация 'i18next' - [https://react.i18next.com/](https://react.i18next.com/)

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

2) **path-checker** - запрещает использовать абсолютные импорты в рамках одного модуля. Имеет возможность auto-fix

3) **public-api-imports** - разрешает импорт из других модулей только из Public API. Имеет возможность auto-fix

##### Запуск линтеров
- `npm run lint:ts` - Проверка TS файлов линтером и tsc
- `npm run lint:ts:fix` - Исправление TS файлов линтером
- `npm run lint:scss` - Проверка SCSS файлов style линтером
- `npm run lint:scss:fix` - Исправление SCSS файлов style линтером
- `npm run prettify` - Выравнивание кода при помощи Prettier
- `npm run types:check` - Запуск проверки типов TypeScript

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
1. Webpack - ./config/build/
2. Vite - vite.config.mts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в
- babel.config.json (babel.config.ts) - конфигурация Babel
- ./config/build/ - конфигурация Webpack
- ./config/jest/ - конфигурация тестовой среды
- ./config/nginx/ - конфигурация для nginx
- ./config/storybook/ - конфигурация Storybook

В папке `scripts` находятся различные скрипты для рефакторинга / упрощения написания кода / генерации отчетов и т.д.

----

## CI Pipeline и Pre-commit hooks

Конфигурация Github Actions находится в ./github/workflows/main.yaml.

В [main.yaml](.github/workflows/main.yaml) прогоняются все виды тестов, происходит сборка проекта и
storybook, линтинг и деплой на сервер.

В Pre-commit hooks проверяем проект линтерами, [конфигурация здесь](./.husky)

----

## Работа с данными

Взаимодействие с данными осуществляется с помощью 'Redux ToolKit'.

По возможности переиспользуемые сущности необходимо нормализовать с помощью 'EntityAdapter'

Запросы на сервер отправляются с помощью [RTK query](./src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используются:
- RTK v1: [DynamicModuleLoader](./src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)
- RTK v2: [DynamicModuleLoaderV2](./src/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2.tsx)

----

## Работа с Feature Flags

Разрешено использование Feature Flags только при помощи 
- функции `toggleFeatures()` или
- компонента `<ToggleFeatures />`

Внутрь функции / компонента передаются опции:

```
{
    name: название Feature Flag,
    on: функция, которая отрабатывает после включения feature,
    off: функция, которая отрабатывает после выключения feature,
}
```

Для автоматического удаления feature можно использовать [скрипт](scripts/removeFeature/index.ts) 

Скрипт принимает 2 аргумента:
1. Название удаляемого feature flag
2. Состояние (on/off)

Подробнее о Feature Flags - [документация Feature Flags](./docs/feature_flags.md)

---

## Работа с хранилищем

[buildSlice](./src/shared/lib/store/buildSlice.ts) - аналог 'createSlice' из '@reduxjs/toolkit', 
но без необходимости вызывать 'dispatch' каждый раз в компонентах

[buildSelector](./src/shared/lib/store/buildSelector.ts) - избавляемся от необходимости использовать 'useSelector' 
каждый раз внутри компонентов

----

## Генераторы сущностей(generators)

- [Generators](./src/shared/lib/generators/README.md)

----

## Хуки (hooks)

- [useAppDispatch](./src/shared/lib/hooks/useAppDispatch/README.md)
- [useDebounce](./src/shared/lib/hooks/useDebounce/README.md)
- [useForceUpdate](./src/shared/lib/render/README.md)
- [useHover](./src/shared/lib/hooks/useHover/README.md)
- [useInfiniteScroll](./src/shared/lib/hooks/useInfiniteScroll/README.md)
- [useInitialEffect](./src/shared/lib/hooks/useInitialEffect/README.md)
- [useModal](./src/shared/lib/hooks/useModal/README.md)
- [useRouteChange](./src/shared/lib/router/useRouteChange/README.md)
- [useTheme](./src/shared/lib/hooks/useTheme/README.md)
- [useThrottle](./src/shared/lib/hooks/useThrottle/README.md)
- [useWindowWidth](./src/shared/lib/hooks/useWindowWidth/README.md)

----

## Слои (layers)

- [AppLoaderLayout](./src/shared/layouts/AppLoaderLayout/README.md)
- [MainLayout](./src/shared/layouts/MainLayout/README.md)
- [StickyContentLayout](./src/shared/layouts/StickyContentLayout/README.md)

----

## Компоненты (components)

- [deprecated](./src/shared/ui/deprecated/README.md)
- [redesigned](./src/shared/ui/redesigned/README.md)

----

## Сущности (entities)

- [Article](./src/entities/Article/README.md)
- [Comment](./src/entities/Comment/README.md)
- [Counter](./src/entities/Counter/README.md)
- [Country](./src/entities/Country/README.md)
- [Currency](./src/entities/Currency/README.md)
- [Notification](./src/entities/Notification/README.md)
- [Profile](./src/entities/Profile/README.md)
- [Rating](./src/entities/Rating/README.md)
- [User](./src/entities/User/README.md)

----

## Фичи (features)

- [AddCommentForm](./src/features/AddCommentForm/README.md)
- [ArticleCreateForm](./src/features/ArticleCreateForm/README.md)
- [ArticleEditForm](./src/features/ArticleEditForm/README.md)
- [ArticlePageGreeting](./src/features/ArticlePageGreeting/README.md)
- [ArticleRating](./src/features/ArticleRating/README.md)
- [ArticleRecommendationsList](./src/features/ArticleRecommendationsList/README.md)
- [ArticleSortSelector](./src/features/ArticleSortSelector/README.md)
- [ArticleTypeTabs](./src/features/ArticleTypeTabs/README.md)
- [ArticleViewSelector](./src/features/ArticleViewSelector/README.md)
- [AuthByUsername](./src/features/AuthByUsername/README.md)
- [AvatarDropdown](./src/features/AvatarDropdown/README.md)
- [EditableProfileCard](./src/features/EditableProfileCard/README.md)
- [LangSwitcher](./src/features/LangSwitcher/README.md)
- [NotificationButton](./src/features/NotificationButton/README.md)
- [ProfileRating](./src/features/ProfileRating/README.md)
- [ScrollToTopButton](./src/features/ScrollToTopButton/README.md)
- [ThemeSwitcher](./src/features/ThemeSwitcher/README.md)
- [UIDesignSwitcher](./src/features/UIDesignSwitcher/README.md)

----

## Виджеты (widgets)
- [ArticleAdditionalInfo](./src/widgets/ArticleAdditionalInfo/README.md)
- [ArticlesFilters](./src/widgets/ArticlesFilters/README.md)
- [Navbar](./src/widgets/Navbar/README.md)
- [Page](./src/widgets/Page/README.md)
- [PageError](./src/widgets/PageError/README.md)
- [PageLoader](./src/widgets/PageLoader/README.md)
- [ScrollToolbar](./src/widgets/ScrollToolbar/README.md)
- [Sidebar](./src/widgets/Sidebar/README.md)
----

## Страницы (pages)
- [AboutPage](./src/pages/AboutPage/README.md)
- [AdminPanelPage](./src/pages/AdminPanelPage/README.md)
- [ArticleCreatePage](./src/pages/ArticleCreatePage/README.md)
- [ArticleDetailsPage](./src/pages/ArticleDetailsPage/README.md)
- [ArticleEditPage](./src/pages/ArticleEditPage/README.md)
- [ArticlesPage](./src/pages/ArticlesPage/README.md)
- [ForbiddenPage](./src/pages/ForbiddenPage/README.md)
- [MainPage](./src/pages/MainPage/README.md)
- [NotFoundPage](./src/pages/NotFoundPage/README.md)
- [ProfilePage](./src/pages/ProfilePage/README.md)
- [SettingsPage](./src/pages/SettingsPage/README.md)

----

## Провайдеры (providers)
- [AnimationProvider](./src/shared/lib/components/AnimationProvider/README.md)
- [ErrorBoundary](./src/app/providers/ErrorBoundary/README.md)
- [ForceUpdateProvider](./src/shared/lib/render/README.md)
- [Router](./src/app/providers/Router/README.md)
- [StoreProvider](./src/app/providers/StoreProvider/README.md)
- [ThemeProvider](./src/app/providers/ThemeProvider/README.md)

