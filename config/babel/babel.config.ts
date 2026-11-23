import type { ConfigAPI, TransformOptions } from '@babel/core';

// для работы 'babel-loader' нужно установить '@babel/core' библиотеку

/*
  'babel.config.json' или 'babel.config.ts' файлы vs 'buildBabelLoader' для 'Webpack':
    - используем что-то одно, нет смысла дублировать настройки
    - если в проекте не используется 'Webpack', то все настройки для 'babel-loader' задаются в
      'babel.config.json' или в 'babel.config.ts'
    - для 'Jest' среды настройки 'babel-loader' выносятся в 'babel.config.json' или 'babel.config.ts'
*/

export default function (api: ConfigAPI): TransformOptions {
  /*
    по умолчанию 'Babel' будет пересчитывать конфигурацию каждый раз при обработке нового файла.
    включаем кэширование, аналог 'api.cache(true);'
  */
  api.cache.forever();

  return {
    plugins: [
      /*
        смотрит код на наличие 'ES6' фич и, если они есть, трансформирует код так,
        чтобы эти фичи брались не из глобального скоупа, а импортировались из 'babel-runtime'

        плагин позволяет повторно использовать внедренный вспомогательный код 'Babel' для экономии размера кода
      */
      '@babel/plugin-transform-runtime',

      '@babel/plugin-transform-typescript', // отвечает за парсинг '.tsx'

      /*
        'babel-plugin-i18next-extract':
          - извлекает все ключи переводов при сборке и сохраняет их в виде 'JSON' по пути:
            '<root>/extractedTranslations/'
          - обновляет переводы новыми значениями в 'runtime' (во время запущенной сборки)
      */
      [
        'i18next-extract',
        {
          /*
            'value' в переводах ("key": "value") по умолчанию будет равно 'key':
            value = key
          */
          keyAsDefaultValue: true,
          locales: ['ru', 'en'], // i18next-extract options
        },
      ],
    ],
    presets: [
      // настройки для преобразования новых стандартов в старые (поддержка старых браузеров)
      '@babel/preset-env', // позволяет использовать новейшие функции 'JS'

      '@babel/preset-typescript', // для поддержки 'TS'
      [
        '@babel/preset-react', // для 'React'/'JSX' (без 'ts-loader')
        {
          /*
            без этой опции получаем ошибку: 'ReferenceError: React is not defined',
            для 'production' сборки также оставляем 'automatic' режим, иначе получим ошибку выше
          */
          runtime: 'automatic',
        },
      ],
    ],
  };
}
