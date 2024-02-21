/*
  Файл представляет собой 'publicApi':

  Все импорты (абсолютные) для приложения идут из таких 'index' файлов
  Все функции и компоненты выставляются наружу из таких 'index' файлов

  Внутри модулей лучше использовать относительные пути
*/

import { withTheme } from './lib/hoc/withTheme/withTheme';

import ThemeProvider from './ui/ThemeProvider/ThemeProvider';

export { ThemeProvider, withTheme };
