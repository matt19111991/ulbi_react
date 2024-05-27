// конфиг для 'ESLint v.9+'

/*
  т.к. у 'eslint.config.js' расширение '.js', то используем 'CommonJS' формат модулей,
  чтобы перейти к 'ES6 modules' ('import' / 'export'), можно в 'package.json' указать 'type: module'
  или поменять расширение на 'eslint.config.cjs' или eslint.config.mjs'
*/

/*
  библиотека для совместимости плагинов у которых еще нет поддержки 'ESLint v.9+', решение для возможных ошибок:
 'https://eslint.org/blog/2024/05/eslint-compatibility-utilities/#how-to-know-if-the-compatibility-utilities-will-help'
*/
const { fixupPluginRules } = require('@eslint/compat');

const eslintJs = require('@eslint/js');
const i18nextPlugin = require('eslint-plugin-i18next');
const importPlugin = require('eslint-plugin-import');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const pathChecker1911Plugin = require('eslint-plugin-path-checker-1911');
const prettierPlugin = require('eslint-plugin-prettier');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const storybookPlugin = require('eslint-plugin-storybook');
const globals = require('globals');
const typescriptEslint = require('typescript-eslint');

/*
  'eslint-plugin-unused-imports v.4+' требует установки несуществующей версии библиотеки
  '@typescript-eslint/eslint-plugin@8.0.0', поэтому ставим предыдущую '3.2.0' версию в режиме
   совместимости с 'ESLint v.9+'
  '{
    overrides: {
      "@typescript-eslint/eslint-plugin": {
        "eslint": "^9.3.0"
      },
      "eslint-plugin-unused-imports": {
        "eslint": "^9.3.0"
      },
  }' в 'package.json'
*/
const unusedImportsPlugin = require('eslint-plugin-unused-imports');

/*
  несовместимые плагины с 'ESLint v.9+' =>
    '@typescript-eslint/eslint-plugin'  => обе библиотеки ведут на 'typescript-eslint' библиотеку,
    '@typescript-eslint/parser'         => можно использовать только её
    'eslint-plugin-import'
    'eslint-plugin-jsx-a11y'
    'eslint-import-resolver-alias'
    'eslint-plugin-react'
    'eslint-plugin-react-hooks'
    'eslint-plugin-unused-imports'

  новый плагин '@eslint/js' нужен для работы 'typescript-eslint'

  для установки несовместимых плагинов с 'ESLint v.9+' нужно добавить:
 '{
    overrides: {
      "eslint-plugin-import": {
        "eslint": "^9.3.0"
      },
      ...
      "typescript-eslint": {
        "eslint": "^9.3.0"
      }
    }
  }' в 'package.json'

  текущая используемая версия 'ESLint' в 'typescript-eslint':
 'https://github.com/typescript-eslint/typescript-eslint/blob/main/package.json'

  текущая используемая версия 'ESLint' в 'eslint-plugin-import':
 'https://github.com/import-js/eslint-plugin-import/blob/main/package.json'

  текущая используемая версия 'ESLint' в 'eslint-plugin-jsx-a11y':
 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/package.json'

  текущая используемая версия 'ESLint' в 'eslint-plugin-react':
 'https://github.com/jsx-eslint/eslint-plugin-react/blob/master/package.json'

  обсуждение проблем 'ESLint v.9+' в 'eslint-plugin-react-hooks':
 'https://github.com/facebook/react/pulls?q=28773'

  текущая используемая версия 'ESLint' в 'eslint-plugin-storybook':
 'https://github.com/storybookjs/eslint-plugin-storybook/blob/main/package.json'
*/

module.exports = typescriptEslint.config(
  eslintJs.configs.recommended, // из документации 'typescript-eslint'
  ...typescriptEslint.configs.recommended, // из документации 'typescript-eslint'
  {
    files: ["**/*.ts", "**/*.tsx"],

    /*
      rules:
        0 === 'off'
        1 === 'warning'
        2 === 'error'
    */
    rules: {
      ...i18nextPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules, // ошибки 'Prettier' передаются 'ESLinty' и подчеркиваются
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

      /*
        запретить теневое копирование (вкл.): переменная имеет то же имя, что и переменная в содержащей ее области
          let a = 3;

          function b() {
            let a = 10;
          }
      */
      '@typescript-eslint/no-shadow': 2,

      // переменная объявлена, но не используется (откл. для параметров в функциях)
      '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],

      // при возврате значения из функции избегаем использования 'return'; значение возвращаем сразу без '{}' (откл.)
      'arrow-body-style': 0,

      // переводы "t('Главная страница')" должны быть только в 'JSX' (вкл.)
      // должны игнорироваться атрибуты 'data-testid' и 'to' (ссылки) (вкл.)
      'i18next/no-literal-string': [2, { ignoreAttribute: ['data-testid', 'to'], markupOnly: true }],

      // избегать импортов / экспортов по умолчанию (откл.)
      'import/default': 0,
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,

      // в конце импортов нужно указывать расширения файлов (откл. для 'node_modules' и '.ts(x)' файлов)
      'import/extensions': [2, 'ignorePackages', { ts: 'never', tsx: 'never' }],

      // избегать импортов 'import * as foo from 'foo';' (откл.)
      'import/namespace': 0,

      // импорты вида 'export const Sidebar' запрещены, нужен 'export default' (откл.)
      'import/prefer-default-export': 0,

      // проверка отступов (откл.)
      indent: 0,

      // проверка семантики ('div' помимо 'onClick' обработчика должен иметь хотя бы один 'keyboard' обработчик) (откл.)
      'jsx-a11y/click-events-have-key-events': 0,

      // проверка семантики (пропс 'autoFocus' не должен использоваться) (откл.)
      'jsx-a11y/no-autofocus': 0,

      // проверка семантики ('div' не должен иметь 'onClick' обработчиков или должна быть указана 'role') (откл.)
      'jsx-a11y/no-static-element-interactions': 0,

      // в 'JSX' отдается предпочтение одинарным кавычкам (вкл.)
      'jsx-quotes': [2, 'prefer-single'],

      /*
        проверка на корректность символов перевода строки (откл.):
          - 'LF' в файловой системе 'Unix': символ перевода строки
          - 'CRLF' в файловой системе 'Windows': символы возврата каретки и перевода строки
      */
      'linebreak-style': 0,

      // должна быть пустая строка между свойствами объекта в классах (откл.)
      'lines-between-class-members': 0,

      /*
         проверка на максимально допустимую длину строки (100 символов) (вкл. для всего, кроме комментариев)
        'max-len': [2, { code: 100, ignoreComments: true }],
      */

      // множество пробелов запрещено (откл.)
      'no-multi-spaces': 0,

      // запрещена мутация данных (переназначение параметров функции, изменение 'state' в слайсах) (откл.)
      'no-param-reassign': 2,

      // запрещен инкремент (i++) (откл.)
      'no-plusplus': 0,

      // конфликт c 'TypeScript', поэтому делегируем в сам 'TypeScript' (@typescript-eslint/no-shadow) (откл.)
      'no-shadow': 0,

      /*
        чтобы была возможность использовать кастомный 'DeepPartial' и 'TypeScript' не ругался на
        объявление глобальных переменных, 'var' и т.д.
      */
      'no-undef': 0,

      // запрет на нижнее подчеркивание в переменных (вкл.)
      'no-underscore-dangle': [2, { allow: ['__API__', '__IS_DEV__', '__PROJECT__'] }],

      // запрещаем обращения вида '1 in obj?.foo;', если 'const obj = undefined;' (вкл.)
      'no-unsafe-optional-chaining': 2,

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
          testFilesPatterns: [ // игнорируем правило для тестовых файлов, файлов 'storybook' и 'StoreDecorator'
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

      /*
        задаем максимально допустимое количество пропсов в одну строку в 'JSX' (вкл.),
        если пропсов больше => каждый 'prop' будет на новой строке
      */
      'react/jsx-max-props-per-line': [2, { maximum: 5 }],

      // нельзя оставить комментарий в 'JSX' (откл.)
      'react/jsx-one-expression-per-line': 0,

      // нельзя прокидывать '{...rest}' в 'JSX' (откл.)
      'react/jsx-props-no-spreading': 0,

      // нельзя использовать индексы как ключи при переборе массивов в 'JSX' (вкл.)
      'react/no-array-index-key': 2,

      // необходимо задавать значения по умолчанию для необязательных 'props' (откл.)
      'react/require-default-props': 0,

      // необходим 'import React from "react"' в каждом файле с 'JSX' (откл.)
      'react/react-in-jsx-scope': 0,

      /*
        в массиве зависимостей хука должны быть указаны все переменные и функции,
        которые используются в текущем хуке (вкл.)
      */
      'react-hooks/exhaustive-deps': 2,

      // проверка главных правил использования hooks (вкл.)
      'react-hooks/rules-of-hooks': 2,

      // ошибка при нахождении неиспользуемых импортов (вкл.)
      'unused-imports/no-unused-imports': 2,
    }
  },
  {
    files: ['**/cypress/**/*.ts'],
    rules: {
      // запретить использование 'namespaces' (откл.), для 'cypress' используются 'namespaces'
      '@typescript-eslint/no-namespace': 0,
    },
  },
  {
    files: ['**/json-server/*.js', 'eslint.config.js'],
    rules: {
      /*
        запретить импорты вида "require('path')" (откл.), т.к. такие импорты используются для
        содержимого папки 'json-server' и текущего файла конфигурации
      */
      '@typescript-eslint/no-var-requires': 0,
    },
  },
  {
    ...storybookPlugin.configs.recommended.rules,
    files: ['**/src/**/*.stories.{ts,tsx}'],
    rules: { // отключить правила для 'stories'
      'i18next/no-literal-string': 0,
      'max-len': 0,

      // в каждой 'story' должен быть экспорт по умолчанию (вкл.)
      'storybook/default-exports': 2,
    },
  },
  {
    files: ['**/src/**/*.test.{ts,tsx}'],
    rules: { // отключить правила для тестов
      'i18next/no-literal-string': 0,
      'max-len': 0,
    },
  },
  {
    ignores: ['node_modules'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { // каждая среда содержит набор предопределенных глобальных переменных,
        ...globals.browser, // предоставляем доступ к ним для 'ESLint'
        ...globals.es2021,
        ...globals.jest,
        ...globals.node, // чтобы не ругалось на 'CommonJS' модули

        __API__: 'readonly',
        __IS_DEV__: 'readonly',
        __PROJECT__: 'readonly',
      },
      parser: typescriptEslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
      },
      sourceType: 'module', // т.к. используем 'ES6' модули
    },
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslint.plugin,

      // проверяет на указание 'i18next' переводов для 'textNodes': не '<p>test</p>', а '<p>{t('test')}</p>')
      'i18next': fixupPluginRules(i18nextPlugin),

      'import': fixupPluginRules(importPlugin),
      'jsx-a11y': jsxA11yPlugin,
      'path-checker-1911': pathChecker1911Plugin, // кастомный плагин для проверки относительных путей
      'prettier': prettierPlugin,
      'react': fixupPluginRules(reactPlugin),
      'react-hooks': fixupPluginRules(reactHooksPlugin),
      'storybook': fixupPluginRules(storybookPlugin),
      'unused-imports': unusedImportsPlugin, // проверяет неиспользуемые импорты
    },
  },
  {
    settings: {
      /*
        для работы абсолютных импортов вида '@/*' и чтобы не указывать расширения для файлов,
        нужно установить 'eslint-import-resolver-alias', иначе ошибки:
          - 'Missing file extension for "@/shared/lib/..." (import/extensions)'
          - 'Unable to resolve path to module "@/shared/lib/..." (import/no-unresolved)'
      */
      'import/resolver': {
        alias: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          map: [['@', './src']],
        },
      },
      react: { // иначе предупреждение при запуске линтинга:
        version: 'detect', // 'Warning: React version not specified in eslint-plugin-react settings.'
      },
    },
  },
);
