import type { RuleSetRule } from 'webpack';

export const buildSvgLoader = (): RuleSetRule => ({
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack', // обрабатывает только 'SVG'
      options: {
        icon: true, // сами задаем высоту и ширину извне (если не указано, то '1em')
        svgoConfig: {
          plugins: [
            {
              name: 'convertColors', // заменяет в 'SVG' все цвета на 'currentColor', после чего
              params: {              // в 'JSX' можно задавать цвет для 'SVG' через 'color' ('CSS')
                currentColor: true,
              },                     // в '.svg' файле на корневом '<svg></svg>' компоненте
            },                       // должно быть выставлено любое значение fill="...",
          ],                         // иначе установка через 'CSS' не сработает
        },
      },
    },
  ],
});
