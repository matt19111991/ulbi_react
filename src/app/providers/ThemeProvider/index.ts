/*
    Файл представляет собой publicApi:

    Все импорты для приложения идут из таких файлов (абсолютные),
    Все функции/компоненты/др. выставляются наружу в таких файлах

    Внутри модулей лучше использовать относительные пути
*/

import { useTheme } from './lib/useTheme';

import ThemeProvider from './ui/ThemeProvider';

export { ThemeProvider, useTheme };
