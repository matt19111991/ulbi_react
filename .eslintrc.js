module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
  ],
  globals: {
    __IS_DEV__: 'readonly',
  },
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
    'react',
  ],

/* rules:
      0 === 'off'
      1 === 'warning'
      2 === 'error'
*/

  rules: {
    indent: 0,
    '@typescript-eslint/no-shadow': 2,
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    'import/extensions': [2, 'ignorePackages', { ts: 'never', tsx: 'never' }],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'jsx-quotes': [2, 'prefer-single'],
    'no-multi-spaces': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': [2, { varsIgnorePattern: '__IS_DEV__' }],
    'react/button-has-type': 0,
    'react/function-component-definition': [1, { namedComponents: 'arrow-function' }],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-indent': 2,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['src', 'node_modules'],
      },
    },
  },
};
