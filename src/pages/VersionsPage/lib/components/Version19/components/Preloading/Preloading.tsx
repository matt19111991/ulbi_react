import { preconnect, prefetchDNS, preload, preinit } from 'react-dom';

import { Text } from '@/shared/ui/redesigned/Text';

export const Preloading = () => {
  // загружает и выполняет скрипт жадно
  preinit('https://.../path/to/some/script.js', { as: 'script' });

  // предварительно загружает шрифт
  preload('https://.../path/to/font.woff', { as: 'font' });

  // предварительно загружает стили
  preload('https://.../path/to/stylesheet.css', { as: 'style' });

  // возможно, понадобится подключение к хосту
  prefetchDNS('https://...');

  // будем делать запрос, но пока неизвестно, какой именно
  preconnect('https://...');

  return <Text text='Preloading' />;
};

/*
  Результат:

  <html>
    <head>
      <link rel="prefetch-dns" href="https://...">

      <link rel="preconnect" href="https://...">

      <link rel="preload" as="font" href="https://.../path/to/font.woff">
      <link rel="preload" as="style" href="https://.../path/to/stylesheet.css">

      <script async="" src="https://.../path/to/some/script.js"></script>
    </head>

    <body>
      ...
    </body>
  </html>
*/
