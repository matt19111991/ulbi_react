/*
  для файла конфигурации '.stylelintrc.mjs' устанавливаем расширение '.mjs', чтобы
  запускать 'stylelint' в режиме 'ESM (ES modules)' и избегать ошибки
  "SyntaxError: Unexpected token 'export'"
*/

export default {
  // рекомендуется документацией (покрывает правила 'stylelint-config-recommended')
  extends: ['stylelint-config-standard'],

  plugins: ['stylelint-codeguide'], // для тонкой настройки отдельно от 'Prettier'

  rules: {
    'at-rule-empty-line-before': null, // игнорируем пустые строки
    'custom-property-empty-line-before': null, // игнорируем пустые строки

    // в '@media screen and (max-width: 840px)' можно вводить одно значение, а не только диапазон
    'media-feature-range-notation': null,

    'no-invalid-double-slash-comments': null, // разрешить '//' комментарии
    'selector-class-pattern': null, // игнорируем паттерны написания классов
    'value-keyword-case': null, // для корректного написания составных имен шрифтов

    'codeguide/color-hex-case': 'upper', // все значения цветов должны быть в верхнем регистре
    'codeguide/indentation': [2], // количество пробельных отступов
    'codeguide/number-leading-zero': 'never', // не должно быть нуля (0.7 => .7)
    'codeguide/string-quotes': 'single' // только одинарные кавычки
  }
}
