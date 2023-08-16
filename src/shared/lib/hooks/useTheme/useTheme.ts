import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '../../../const/localstorage';
import { Theme } from '../../../const/theme';

import { ThemeContext } from '../../context/ThemeContext';

interface UseThemeResults {
  theme: Theme;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeResults {
  const { setTheme, theme } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme: Theme;

    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;

      case Theme.LIGHT:
        newTheme = Theme.ORANGE;
        break;

      case Theme.ORANGE:
        newTheme = Theme.DARK;
        break;

      default:
        newTheme = Theme.LIGHT;
        break;
    }

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
