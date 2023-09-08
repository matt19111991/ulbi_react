import webpack from 'webpack';

export const buildSvgLoader = (): webpack.RuleSetRule => ({
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack', // обрабатывает только SVG
      options: {
        icon: true, // сами задаем высоту и ширину извне (если не указано, то '1em')
        svgoConfig: {
          plugins: [
            {
              name: 'convertColors', // заменяет в SVG все цвета на 'currentColor'
              params: {
                currentColor: true,
              },
            },
          ],
        },
      },
    },
  ],
});
