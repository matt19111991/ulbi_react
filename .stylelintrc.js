module.exports = {
  // рекомендуется документацией (покрывает правила 'stylelint-config-recommended-scss')
  extends: ['stylelint-config-standard-scss'],

  plugins: ['stylelint-codeguide'], // для тонкой настройки отдельно от 'Prettier'

  rules: {
    'at-rule-empty-line-before': null, // игнорируем пустые строки
    'custom-property-empty-line-before': null, // игнорируем пустые строки

    'import-notation': 'string', // разрешаем импорты вида "@import 'themes/normal'"

    // в '@media screen and (max-width: 840px)' можно вводить одно значение, а не только диапазон
    'media-feature-range-notation': null,

    'no-invalid-double-slash-comments': null, // разрешить '//' комментарии
    'selector-class-pattern': null, // игнорируем паттерны написания классов
    'value-keyword-case': null, // для корректного написания составных имен шрифтов

    'codeguide/color-hex-case': 'upper', // все значения цветов должны быть в верхнем регистре
    'codeguide/indentation': [2], // количество пробельных отступов
    'codeguide/number-leading-zero': 'never', // не должно быть нуля (0.7 => .7)
    'codeguide/string-quotes': 'single' // только одинарные кавычки
  },
};
