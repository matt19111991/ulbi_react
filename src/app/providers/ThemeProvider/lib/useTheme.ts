import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResults {
  theme: Theme;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeResults {
  const { setTheme, theme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

    setTheme?.(newTheme); // иначе ошибка "Cannot invoke an object which is possibly 'undefined'"

//  чтобы не вешать дополнительные классы `${theme}` для 'App.tsx' и порталов
    document.body.className = newTheme;

    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
}
