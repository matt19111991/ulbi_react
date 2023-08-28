import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      bundler: 'webpack',
      framework: 'react',
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000/',
  },
});
