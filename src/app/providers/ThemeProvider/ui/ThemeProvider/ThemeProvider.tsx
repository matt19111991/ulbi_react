import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { THEME_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';

import { ThemeContext } from '@/shared/lib/context/theme';

interface ThemeProviderProps {
  /**
   * Содержимое провайдера
   */
  children?: ReactNode;

  /**
   * Тема по умолчанию
   */
  initialTheme?: Theme;
}

// последняя выбранная тема у пользователя на устройстве
const fallbackTheme = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as Theme;

// В типе 'FC' уже описан 'children prop' для версий 'React v.17-'
const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  const [isThemeInited, setIsThemeInited] = useState(false);

  /*
    по умолчанию устанавливаем либо 'initialTheme' из 'props', либо 'fallbackTheme' из 'localStorage'
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
    // устанавливаем класс темы для 'body' (иначе не будет работать переключение темы)
    document.body.className = theme;

    localStorage.setItem(THEME_LOCALSTORAGE_KEY, theme);
  }, [theme]);

  const memoizedContext = useMemo(() => ({ setTheme, theme }), [theme]);

  return <ThemeContext.Provider value={memoizedContext}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
