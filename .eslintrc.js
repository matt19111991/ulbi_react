module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:i18next/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
  ],
  globals: {
    __IS_DEV__: 'readonly',
  },
  overrides: [
    {
      files: ['**/src/**/*.test.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 0, // отключить правило для тестов
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',

//  проверяет на указание i18next переводов для textNodes (не '<p>test</p>', а '<p>{t('test')}</p>')
    'i18next',

    'react',
    'react-hooks',
  ],
/*
  rules:
    0 === 'off'
    1 === 'warning'
    2 === 'error'
*/
  rules: {
/*  запретить теневое копирование (вкл.)
    (переменная имеет то же имя, что и переменная в содержащей ее области)
*/  '@typescript-eslint/no-shadow': 2,

//   в 'useEffect' должны использоваться стрелочные функции (откл.)
    'arrow-body-style': 0,

//  ключи enum are defined but never used (откл.)
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],

/*   переводы и "t('Главная страница')" должны быть только в JSX (вкл.)
     и должны игнорироваться атрибуты 'data-testid' и 'to' (ссылки) (вкл.)
*/   'i18next/no-literal-string': [2, { ignoreAttribute: ['data-testid', 'to'], markupOnly: true }],

//   в конце импортов нужно указывать расширения файлов .ts(x) (откл.)
    'import/extensions': [2, 'ignorePackages', { ts: 'never', tsx: 'never' }],

//  webpack и плагины должны быть в dependencies (откл.), т.к. их место в devDependencies
    'import/no-extraneous-dependencies': 0,

//  импорты вида 'export const Sidebar' запрещены; нужен export default (откл.)
    'import/prefer-default-export': 0,

//  проверка отступов (откл.)
    indent: 0,

/*
    проверка семантики (div помимо onClick обработчика
    должен иметь хотя бы один keyboard обработчик) (откл.)
*/ 'jsx-a11y/click-events-have-key-events': 0,

//  проверка семантики (div не должен иметь onClick обработчиков или должна быть указана 'role') (откл.)
    'jsx-a11y/no-static-element-interactions': 0,

//  в JSX отдается предпочтение одинарным кавычкам (вкл.)
    'jsx-quotes': [2, 'prefer-single'],

//  проверка на максимально допустимую длину строки (100 символов) (вкл. для всего, кроме комментариев)
    'max-len': [2, { code: 100, ignoreComments: true }],

//  множество пробелов запрещено (откл.)
    'no-multi-spaces': 0,

//  конфликт c TypeScript, поэтому делегируем в сам TypeScript (@typescript-eslint/no-shadow)
    'no-shadow': 0,

//  запрет на нижнее подчеркивание в переменных(вкл.)
    'no-underscore-dangle': [2, { allow: ['__IS_DEV__'] }],

//  нужно явно указывать атрибут 'type' для <button /> (откл.)
    'react/button-has-type': 0,

//  определение функциональных компонентов только через стрелочные функции (вкл.)
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

//  разрешить JSX в файлах .jsx и .tsx (вкл.)
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],

//  базовые отступы в JSX: 2 пробела (2-ой элемент массива)
    'react/jsx-indent': [2, 2],

//  отступы для props в JSX: 2 пробела (2-ой элемент массива)
    'react/jsx-indent-props': [2, 2],

//  нельзя оставить комментарий в JSX (откл.)
    'react/jsx-one-expression-per-line': 0,

//  нельзя прокидывать {...rest} в JSX (откл.)
    'react/jsx-props-no-spreading': 0,

//  необходим 'import React from "react"' в каждом файле с JSX (откл.)
    'react/react-in-jsx-scope': 0,

//  необходимо задавать значения по умолчанию для необязательных props (откл.)
    'react/require-default-props': 0,
  },

  settings: { // без 'settings': ошибка 'Unable to resolve path to module'
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['src', 'node_modules'],
      },
    },
  },
};
