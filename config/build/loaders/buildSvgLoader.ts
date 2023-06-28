import webpack from 'webpack';

export const buildSvgLoader = (): webpack.RuleSetRule => ({
  test: /\.svg$/,
  use: ['@svgr/webpack'], // обрабатывает только SVG
});
