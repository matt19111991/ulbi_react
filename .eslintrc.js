// конфиг для 'ESLint v.8+'

/*
 'ESLint v.8+' работает с 'WebStorm 2022.2.2+'

 'ESLint' сообщает только об ошибках своих собственных линтеров, но не сообщает об ошибках компиляции 'TS',
  при использовании 'Babel' для более быстрой транспиляции 'TS' кода, типы не проверяются - 'Babel' просто удаляет их
*/

module.exports = {
  // каждая среда содержит набор предопределенных глобальных переменных, предоставляем доступ к ним для 'ESLint'
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  // расширяем конфигурацию
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:i18next/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended', // ошибки 'Prettier' передаются 'ESLinty' и подчеркиваются
    'plugin:react/recommended',
    "plugin:react-hooks/recommended-legacy",
    'plugin:storybook/recommended',
  ],
  globals: {
    __API__: 'readonly',
    __IS_DEV__: 'readonly',
    __PROJECT__: 'readonly',
    __VAPID_KEY__: 'readonly',
  },
  overrides: [
    {
      files: ['**/cypress/**/*.ts'],
      rules: {
        // запретить использование 'namespaces' (откл.), для 'cypress' используются 'namespaces'
        '@typescript-eslint/no-namespace': 0,
      },
    },
    {
      files: ['**/json-server/*.js'],
      rules: {
        // запретить импорты вида "require('path')" (откл.), т.к.
        // такие импорты используются для содержимого папки 'json-server'
        '@typescript-eslint/no-var-requires': 0,
      },
    },
    {
      files: ['**/scripts/**/*.ts'],
      rules: {
        'import/extensions': 0, // отключить правило для папки 'scripts'
      },
    },
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 0, // отключить правило для тестов и stories
        'max-len': 0, // отключить правило для тестов и stories
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module', // т.к. используем 'ES6' модули
  },
  plugins: [
    '@typescript-eslint',

    // проверяет на указание 'i18next' переводов для textNodes:
    // не '<p>test</p>', а '<p>{t('test')}</p>')
    'i18next',

    'react',
    'react-hooks',

    // кастомный плагин для проверки относительных путей (указываем без префикса 'eslint-plugin')
    'path-checker-1911',

    'unused-imports', // проверяет неиспользуемые импорты
  ],

  /*
    rules:
      0 === 'off'
      1 === 'warning'
      2 === 'error'
  */

  rules: {
    // запретить теневое копирование (вкл.): переменная имеет то же имя, что и переменная в содержащей ее области
    // let a = 3;
    // function b() {
    //   let a = 10;
    // }
    '@typescript-eslint/no-shadow': 2,

    // переменная объявлена, но не используется (откл. для параметров в функциях)
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],

    // при возврате значения из функции избегаем использования 'return'; значение возвращаем сразу без '{}' (откл.)
    'arrow-body-style': 0,

    // переводы "t('Главная страница')" должны быть только в 'JSX' (вкл.)
    // должны игнорироваться атрибуты 'data-testid' и 'to' (ссылки) (вкл.)
    'i18next/no-literal-string': [2, { ignoreAttribute: ['data-testid', 'to'], markupOnly: true }],

    // в конце импортов нужно указывать расширения файлов (откл. для 'node_modules' и '.ts(x)' файлов)
    'import/extensions': [2, 'ignorePackages', { ts: 'never', tsx: 'never' }],

    // 'Webpack' и плагины должны быть в 'dependencies' (откл.), т.к. их место в 'devDependencies'
    'import/no-extraneous-dependencies': 0,

    // относительные импорты запрещены (откл.)
    'import/no-relative-packages': 0,

    // импорты вида 'export const Sidebar' запрещены; нужен 'export default' (откл.)
    'import/prefer-default-export': 0,

    // проверка отступов (откл.)
    indent: 0,

    // проверка семантики ('div' помимо 'onClick' обработчика
    // должен иметь хотя бы один 'keyboard' обработчик) (откл.)
    'jsx-a11y/click-events-have-key-events': 0,

    // проверка семантики ('div' не должен иметь 'onClick' обработчиков или должна быть указана 'role') (откл.)
    'jsx-a11y/no-static-element-interactions': 0,

    // в 'JSX' отдается предпочтение одинарным кавычкам (вкл.)
    'jsx-quotes': [2, 'prefer-single'],

    // проверка на корректность символов перевода строки (откл.):
    // - 'LF' в файловой системе 'Unix': символ перевода строки
    // - 'CRLF' в файловой системе 'Windows': символы возврата каретки и перевода строки
    'linebreak-style': 0,

    // должна быть пустая строка между свойствами объекта в классах (откл.)
    'lines-between-class-members': 0,

    // проверка на максимально допустимую длину строки (100 символов) (вкл. для всего, кроме комментариев)
    // 'max-len': [2, { code: 100, ignoreComments: true }],

    // множество пробелов запрещено (откл.)
    'no-multi-spaces': 0,

    // запрещена мутация данных (переназначение параметров функции, изменение 'state' в слайсах) (откл.)
    'no-param-reassign': 0,

    // запрещен инкремент (i++) (откл.)
    'no-plusplus': 0,

    // конфликт c 'TypeScript', поэтому делегируем в сам 'TypeScript' (@typescript-eslint/no-shadow) (откл.)
    'no-shadow': 0,

    // чтобы была возможность использовать кастомный 'DeepPartial' и
    // 'TypeScript' не ругался на объявление глобальных переменных, 'var' и т.д.
    'no-undef': 0,

    // запрет на нижнее подчеркивание в переменных (вкл.)
    'no-underscore-dangle': [2, { allow: ['__API__', '__IS_DEV__', '__PROJECT__', '__VAPID_KEY__'] }],

    // запрещаем конструкции 'obj?.foo' (откл.)
    // отключаем для корректной работы с ESLint v.7, т.к. сыпет ошибками по всем файлам
    // 'no-unsafe-optional-chaining': 0,

    // кастомное правило для проверки вложенности импортов (вкл.)
    'path-checker-1911/layer-imports': [
      2,
      {
        alias: '@',

        // игнорируем правило для путей внутри генераторов, декораторов, роутера и тестовой среды
        ignoreFilePathPatterns: [
          '**/generators/**',
          '**/lib/tests/**',
          '**/router.ts',
          '**/GlobalStyleDecorator.tsx',
          '**/StoreDecorator.tsx',
          '**/ThemeDecorator.tsx',
        ],

        // игнорируем правило для: 'StateSchema' (внутри 'StoreProvider') и 'Testing Public API'
        ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
      },
    ],

    // кастомное правило для проверки относительных путей (вкл.)
    'path-checker-1911/path-checker': [2, { alias: '@' }],

    // кастомное правило для проверки импортов из 'publicApi' (вкл.)
    'path-checker-1911/public-api-imports': [
      2,
      {
        alias: '@',

        // игнорируем правило для тестовых файлов, файлов 'storybook' и 'StoreDecorator'
        testFilesPatterns: [
          '**/cypress/**',
          '**/*.stories.*',
          '**/*.test.*',
          '**/StoreDecorator.tsx',
        ],
      },
    ],

    // нужно явно указывать атрибут 'type' для '<button />' (откл.)
    'react/button-has-type': 0,

    // определение функциональных компонентов только через стрелочные функции (вкл.)
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    // разрешить 'JSX' в файлах '.jsx' и '.tsx' (вкл.)
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],

    // базовые отступы в 'JSX': 2 пробела (2-ой элемент массива) (вкл.)
    'react/jsx-indent': [2, 2],

    // отступы для 'props' в 'JSX': 2 пробела (2-ой элемент массива) (вкл.)
    'react/jsx-indent-props': [2, 2],

    // задаем максимально допустимое количество пропсов в одну строку в 'JSX' (вкл.),
    // если пропсов больше => каждый 'prop' будет на новой строке
    'react/jsx-max-props-per-line': [2, { maximum: 5 }],

    // нельзя оставить комментарий в 'JSX' (откл.)
    'react/jsx-one-expression-per-line': 0,

    // нельзя прокидывать '{...rest}' в 'JSX' (откл.)
    'react/jsx-props-no-spreading': 0,

    // необходим 'import React from "react"' в каждом файле с 'JSX' (откл.)
    'react/react-in-jsx-scope': 0,

    // необходимо задавать значения по умолчанию для необязательных 'props' (откл.)
    'react/require-default-props': 0,

    // в массиве зависимостей хука должны быть указаны все переменные и функции,
    // которые используются в текущем хуке (вкл.)
    'react-hooks/exhaustive-deps': 2,

    // проверка главных правил использования hooks (вкл.)
    'react-hooks/rules-of-hooks': 2,

    // ошибка при нахождении неиспользуемых импортов (вкл.)
    'unused-imports/no-unused-imports': 2,
  },
  /*
    для работы абсолютных импортов вида '@/*' и чтобы не указывать расширения для файлов,
    нужно установить 'eslint-import-resolver-alias' и добавить 'settings', иначе ошибки:
      - 'Missing file extension for "@/shared/lib/..." (import/extensions)'
      - 'Unable to resolve path to module "@/shared/lib/..." (import/no-unresolved)'
  */
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        map: [['@', './src']],
      },
    },
  },
};
