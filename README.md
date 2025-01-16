## TODO
* `Lighthouse` для всех страниц на всех языках и всех темах 90% для всех характеристик

## Доп. информация

- [Docker](docs/docker.md)
- [Feature Flags](docs/feature_flags.md)
- [Git (модели ветвления)](docs/git_branches.md)
- [PWA](docs/pwa.md)
- [Push уведомления](docs/push.md)
- [Storybook](docs/storybook.md)
- [SEO](docs/seo.md)
- [Webpack](docs/webpack.md)


- [Настройка HTTPS](docs/https.md)
- [Настройка SSL](docs/ssl.md)
- [Создание и настройка доменного имени](docs/domain_name.md)


- [Loki Ui Screenshot testing](docs/loki.md)
- [Тесты](docs/tests.md)

---- 

## Инициализация проекта

Создание `package.json` с настройками по умолчанию:

`npm init -y`

----

## Запуск проекта

Установка зависимостей:
  
  `npm install`

Запуск сервера и клиента в `development` режиме (`Vite` сборщик):

  `npm run start:vite:dev`

Запуск сервера и клиента в `development` режиме (`Webpack` сборщик):

  `npm run start:webpack:dev`

Список устаревших зависимостей:

  `npm outdated`

----

## Deploy проекта
   1. Создаем облачный сервер (можно на [Kamatera](https://console.kamatera.com))

   2. Подключаемся по:
      * SSH: `ssh root@91.223.169.133` (login_on_server@created_server_ip)

        Если `ssh` команды не существует:
          * устанавливаем **SSH client**:

            `sudo apt install openssh-client`

          * генерируем приватный и публичный ключи:

            `ssh-keygen`

      * или через **Remote Console**:
        ```
         https://console.kamatera.com =>
            Servers =>
               Наш сервер =>
                  Connect =>
                     Open Remote Console
        ```

        Вводим пароль от сервера и попадаем в консоль сервера

   3. Обновляем **apt зависимости** на сервере:

      `sudo apt update`

   4. Устанавливаем **Git**:

      `sudo apt install git-all`

   5. Клонируем проект:

      5.1. **Публичный**:
      
          git clone https://github.com/matt19111991/ulbi_react.git

      5.2. **Приватный**:

         ```
         Возможна ошибка 'Authentication failed for https://github.com/matt19111991/ulbi_react.git'

         1. Генерируем приватный и публичный ключи:
            sudo ssh-keygen

         2. Указываем путь:
            /root/.ssh/project

         3. Вводим 'passphrase' (просто жмем 'Enter')

         4. Переходим в папку с .ssh:
            cd .ssh

         5. Создаем конфигурационный файл для 'GitHub':
            cat > config

            Host должен быть точным названием проекта в репозитории:
                ```
                Host ulbi_react
                Hostname github.com
                User git
                IndetityFile ~/.ssh/project
                ```

         6. Берем публичный 'SSH' ключ:
            sudo cat project.pub

         7. Добавляем публичный 'SSH' ключ в 'GitHub':
            Расположение на 'GitHub': 'Settings' / 'Deploy keys' / 'Add deploy key'
         ```
         5.2.1 Клонируем проект:

          git clone git@github.com:matt19111991/ulbi_react.git

   6. Устанавливаем `nvm`:

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

   7. Настраиваем `nvm`:

    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`

   8. Устанавливаем `Node`:

    nvm install 22.13.0

   9. Устанавливаем зависимости:

    npm i

   10. (опционально) Запускаем `development` сборку (`Vite` не работает):

    npm run start:client:webpack

   11. Устанавливаем `nginx`:

    sudo apt install nginx

   12. Идем в папку с конфигом `nginx`:

    cd ../../etc/nginx/

   13. Раскомментируем все пункты с `gzip` ([пример файлов конфига `nginx`](config/nginx)) и 
       сохраняем файл:

    vim nginx.conf

   14. Идем в папку `sites-enabled`:

    cd sites-enabled/

   15. Открываем и редактируем `default` файл конфига `nginx`

       ([пример `default` файлов конфига `nginx`](config/nginx/sites-enabled)):

    vim default

   16. Проверяем целостность `nginx` конфига:

    nginx -t

   17. Останавливаем `Apache` сервис перед обновлением `nginx`:

    sudo service apache2 stop

   18. Перезапускаем `nginx`:

    sudo service nginx restart

   19. http://91.223.169.133 должен выдавать:

    404 Not Found | nginx/1.18.0 (Ubuntu)`

   20. Идем в папку `www`:

    cd ../../../var/www/

   21. Создаем папку с названием проекта:

    mkdir ulbi_react

   22. Переходим в папку с проектом:

    ../../root/ulbi_react/

   23. Делаем билд:

    npm run build:prod

   24. Перемещаем билд в папку для статики:

    mv build/ ../../../var/www/ulbi_react

   25. Переходим в папку со статикой:

    ../../var/www/ulbi_react/

   26. Удаляем папку `html` (если есть):

    rmdir html/

   27. Переименовываем папку с билдом:

     mv build/ html/

   28. Переходим в папку с проектом: 

    ../../../root/ulbi_react/

   29. Устанавливаем `pm2` (process manager для управления процессами):

    npm i -g pm2

   Список запущенных процессов:

    pm2 list

   Остановить процесс по `id = 0`:

    pm2 stop 0

   30. Запускаем сервер в фоне:

    pm2 start json-server/index.js

   31. [Скрипт для деплоя](.deploy/deploy.sh) позволяет автоматизировать деплой на сервере

----

## Скрипты

`npm run start:client:webpack` - запуск клиента на `Webpack` в режиме `dev сервера`

`npm run start:client:vite` - запуск клиента на `Vite`

`npm run start:server:dev` - запуск сервера в `development` режиме

`npm run start:server:prod` - запуск сервера в `production` режиме

`npm run start:vite:dev` - запуск клиента на `Vite` и сервера в `development` режиме

`npm run start:webpack:dev` - запуск клиента на `Webpack` и сервера в `development` режиме

`npm run start:vite:prod` - запуск клиента на `Vite` и сервера в `production` режиме

`npm run start:webpack:prod` - запуск клиента на `Webpack` и сервера в `production` режиме

`npm run build:dev` - сборка клиента в `development` режиме (не минимизирован)

`npm run build:prod` - сборка клиента в `production` режиме (минимизирован)

`npm run add:import:prefix` - скрипт для автоматического перехода от импортов `entities/Article` к `@/entities/Article`

`npm run create:shared:ui:public:api` - скрипт для автоматического создания `Public API` для `UI` в `shared` слое

`npm run generate:slice:template` - скрипт для генерации `FSD` слайсов

`npm run lint:ts` - проверка `.ts` файлов линтером и `tsc`

`npm run lint:ts:fix` - исправление `.ts` файлов линтером

`npm run lint:scss` - проверка `.scss` файлов `style линтером`

`npm run lint:scss:fix` - исправление `.scss` файлов `style линтером`

`npm run postinstall` - очистка кэша после установки новых модулей

`npm run prettify` - выравнивание кода при помощи `Prettier`

`npm run set:feature` - установка состояния `on / off` для `feature flag`

`npm run storybook` - запуск **Storybook**

`npm run storybook:build` - сборка **Storybook** билда

`npm run test:e2e:vite` - запуск интеграционных тестов с `Cypress` и сборщиком `Vite`

`npm run test:e2e:webpack` - запуск интеграционных тестов с `Cypress` и сборщиком `Webpack`

`npm run test:ui` - запуск скриншотных тестов `Loki`

`npm run test:ui:ok` - подтверждение новых скриншотов `Loki`

`npm run test:ui:ci` - запуск скриншотных тестов `Loki` для `CI` (используется билд **Storybook**)

`npm run test:ui:json` - генерация `JSON` с различиями между скриншотами `Loki`

`npm run test:ui:html` - генерация `HTML` страницы на базе `JSON` файла с различиями между скриншотами `Loki`

`npm run test:ui:report` - генерация полного отчета (`JSON` и `HTML`) для скриншотных тестов `Loki`

`npm run test:ui:update` - обновление скриншотных тестов `Loki`

`npm run test:unit` - запуск unit тестов с `Jest`

`npm run types:check` - запуск проверки типов `TypeScript`

----

## Архитектура проекта

Проект написан в соответствии с методологией `Feature Sliced Design`

Скрипт для генерации шаблонной структуры компонентов:
 
`npm run generate:slice:template [slice_name] [component_name]`

[Ссылка на документацию](https://feature-sliced.design/ru/docs/get-started/tutorial)

----

## Работа с переводами

В проекте используется библиотека `i18next` для работы с переводами

Файлы с переводами хранятся в [директории](public/locales)

**Переводы для ошибок в `async thunks`**: 
- нужен импорт `i18n` напрямую:
  
  ```import i18n from '@/shared/config/i18n/i18n';```

- использование переводов:
  
  ```thunkApi.rejectWithValue(i18n.t('Ошибка при попытке входа'));```

Для комфортной работы рекомендуется установить плагин для `Webstorm`

[Документация i18next](https://react.i18next.com)

----

## Тесты

В проекте используются 4 вида тестов:

1) Обычные `unit` тесты на `Jest`:

   `npm run test:unit`

2) Тесты на компоненты с `React Testing Library`:

   `npm run test:unit`

3) Скриншотное тестирование с `Loki`:

   `npm run test:ui`

4) `E2E тестирование` с `Cypress`:

    `npm run test:e2e:vite`

    `npm run test:e2e:webpack`

[Подробнее о тестах](./docs/tests.md)

----

## Линтинг

В проекте используется `Eslint` для проверки `TypeScript` кода и `Stylelint` для проверки файлов со стилями

Для строгого контроля главных архитектурных принципов используется собственный 
`eslint-plugin-path-checker-1911`, который содержит 3 правила:

1) **layer-imports** - проверяет корректность использования слоев с точки зрения `FSD`
   (например: `widgets` нельзя использовать в `features` и `entities`)

2) **path-checker** - запрещает использовать абсолютные импорты в рамках одного модуля. Имеет возможность `auto-fix`

3) **public-api-imports** - разрешает импорт из других модулей только через `Public API`. Имеет возможность `auto-fix`

##### Запуск линтеров

- Проверка `.ts` файлов линтером и компилятором `tsc`:

  `npm run lint:ts`

- Исправление `.ts` файлов линтером:

  `npm run lint:ts:fix`

- Проверка `.scss` файлов `style линтером`:

  `npm run lint:scss`

- Исправление `.scss` файлов `style линтером`:

  `npm run lint:scss:fix`

- Выравнивание кода при помощи `Prettier`:
 
  `npm run prettify`

- Запуск проверки типов `TypeScript`:

  `npm run types:check`

----
## Storybook

В проекте для каждого компонента описываются `story-кейсы`

Запросы на сервер мокаются с помощью функции `queryFn` из `RTK Query` и возвращаются захардкоженные данные

Файлы со `story-кейсами` создаем рядом с компонентом с расширением `.stories.tsx`

Запустить storybook можно командой:

`npm run storybook`

Подробнее о [Storybook](./docs/storybook.md)

----

## Конфигурация проекта

Для разработки проект содержит 2 конфига:
* [Webpack](webpack.config.ts)
* [Vite](vite.config.ts)

Оба сборщика адаптированы под основные фичи приложения

Вся конфигурация хранится в:
- [конфигурация Babel](babel.config.ts)
- [конфигурация Docker](docker-compose.yaml)
- [конфигурация Jest](./config/jest)
- [конфигурация Nginx](./config/nginx)
- [конфигурация Storybook](./config/storybook)
- [конфигурация Webpack](./config/build)

В папке [scripts](scripts) находятся различные скрипты для рефакторинга / упрощения написания кода /
генерации отчетов и т.д.

----

## CI Pipeline и Pre-commit hooks

[Документация по началу работы](https://docs.github.com/ru/actions/quickstart)

Конфигурация `Github Actions` находится [здесь](.github/workflows/main.yaml).

В [main.yaml](.github/workflows/main.yaml) прогоняются все виды тестов, происходит сборка проекта и
storybooka, линтинг и деплой на сервер

В [main_no_deploy.yaml](.github/old/main_no_deploy.yaml) прогоняются все виды тестов, происходит сборка проекта и
storybooka, линтинг. Нет деплоя на сервер

В `Pre-commit hooks` проверяем проект линтерами, [конфигурация здесь](./.husky)

----

## Работа с данными

Взаимодействие с данными осуществляется с помощью `Redux ToolKit`

По возможности переиспользуемые сущности необходимо нормализовать с помощью `EntityAdapter`

Запросы на сервер отправляются с помощью [RTK query](./src/shared/api/rtkApi.ts)

Обработка ошибок осуществляется при помощи
[errorHandlerMiddleware](./src/app/providers/StoreProvider/config/middleware/errorHandlerMiddleware.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используются:
- RTK v.1: [DynamicModuleLoader](./src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)
- RTK v.2: [DynamicModuleLoaderV2](./src/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2.tsx)

----

## Работа с Feature Flags

Разрешено использование `Feature Flags` только при помощи
- функции `toggleFeatures()` или
- компонента `<ToggleFeatures />`

Внутрь функции / компонента передаются опции:

```
{
    name: название Feature Flag,
    on: функция или компонент, которая(-ый) отработает или отрисуется после включения feature,
    off: функция или компонент, которая(-ый) отработает или отрисуется после выключения feature,
}
```

Для автоматического перевода `feature` только в одно определенное состояние (`on` или `off`)
для всего проекта можно использовать [скрипт](scripts/setFeature/index.ts):

`npm run set:feature isAppRedesigned on`

Скрипт принимает 2 аргумента:
1. Название `feature flag`
2. Состояние `on / off`

[Подробнее о Feature Flags](./docs/feature_flags.md)

---

## Работа с хранилищем

[buildSlice](src/shared/lib/store/buildSlice/buildSlice.ts) - аналог `createSlice` из `@reduxjs/toolkit`, 
но без необходимости вызывать `dispatch` каждый раз в компонентах

[buildSelector](src/shared/lib/store/buildSelector/buildSelector.ts) - избавляемся от необходимости использовать `useSelector` 
каждый раз внутри компонентов

----

## Генераторы сущностей (generators)

- [Generators](./src/shared/lib/generators/README.md)

----

## Хуки (hooks)

- [useAppDispatch](./src/shared/lib/hooks/useAppDispatch/README.md)
- [useAppToolbar](./src/app/lib/hooks/useAppToolbar/README.md)
- [useArticleFilters](./src/pages/ArticlesPage/README.md)
- [useCounterActions](./src/entities/Counter/README.md)
- [useDebounce](./src/shared/lib/hooks/useDebounce/README.md)
- [useEscapeKey](src/shared/lib/hooks/useEscapeKey/README.md)
- [useForceUpdate](src/shared/lib/hooks/useForceUpdate/README.md)
- [useHover](./src/shared/lib/hooks/useHover/README.md)
- [useInfiniteScroll](./src/shared/lib/hooks/useInfiniteScroll/README.md)
- [useInitialEffect](./src/shared/lib/hooks/useInitialEffect/README.md)
- [useModal](./src/shared/lib/hooks/useModal/README.md)
- [useRouteChange](src/shared/lib/hooks/useRouteChange/README.md)
- [useServiceWorker](src/app/lib/hooks/useServiceWorker/README.md)
- [useSidebarItems](src/widgets/Sidebar/README.md)
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
- [Subscription](./src/entities/Subscription/README.md)
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
- [Offline](./src/features/Offline/README.md)
- [ProfileRating](./src/features/ProfileRating/README.md)
- [ScrollToTopButton](./src/features/ScrollToTopButton/README.md)
- [SubscriptionList](./src/features/SubscriptionList/README.md)
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
- [AnimationProvider](src/shared/lib/providers/AnimationProvider/README.md)
- [ErrorBoundary](./src/app/providers/ErrorBoundary/README.md)
- [ForceUpdateProvider](src/app/providers/ForceUpdate/README.md)
- [Router](./src/app/providers/Router/README.md)
- [StoreProvider](./src/app/providers/StoreProvider/README.md)
- [ThemeProvider](./src/app/providers/ThemeProvider/README.md)

