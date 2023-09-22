import { ReactNode, useEffect, useMemo, useState } from 'react';

import { THEME_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';

import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';

interface ThemeProviderProps {
  children?: ReactNode;
  initialTheme?: Theme;
}

// последняя выбранная тема у пользователя на устройстве
const fallbackTheme = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as Theme;

// В типе FC уже описан 'children' prop для версий React меньше v.18)
const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  const [isThemeInited, setIsThemeInited] = useState(false);

  /*
    по умолчанию устанавливаем либо 'initialTheme' из props или 'fallbackTheme' из 'localStorage'
    если нет ни того, ни другого - берем 'Theme.LIGHT'
  */
  const [theme, setTheme] = useState<Theme>(initialTheme || fallbackTheme || Theme.LIGHT);

  // данные о теме, сохраненные в объект с авторизованным пользователем прилетают не сразу
  useEffect(() => {
    // поэтому реагируем на изменение 'initialTheme'
    if (!isThemeInited && initialTheme) {
      setTheme(initialTheme);

      setIsThemeInited(true);
    }
  }, [initialTheme, isThemeInited]);

  useEffect(() => {
    // может не меняться цвет скролла при переключении темы, поэтому добавляем класс на 'body'
    document.body.className = theme;

    localStorage.setItem(THEME_LOCALSTORAGE_KEY, theme);
  }, [theme]);

  const memoizedContext = useMemo(() => ({ setTheme, theme }), [theme]);

  return <ThemeContext.Provider value={memoizedContext}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
