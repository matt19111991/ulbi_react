import { defineConfig } from 'cypress';

/*
  при запуске 'Cypress' в 'Ubuntu' возможны ошибки в консоли вида:
  - 'libva error: vaGetDriverNameByIndex() failed with unknown libva error, driver_name = (null)'
  - 'libva error: /usr/lib/x86_64-linux-gnu/dri/iHD_drv_video.so init failed'

  1. нужно установить зависимости для 'Intel Media Driver': 'https://github.com/intel/media-driver'

  2. нужно установить зависимости для 'LibVA': 'https://github.com/intel/libva' и
     запустить 'autogen' (пример скрипта для запуска есть на этой же странице в документации)
*/

export default defineConfig({
  component: {
    devServer: {
      bundler: 'webpack',
      framework: 'react',
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
  },
});
