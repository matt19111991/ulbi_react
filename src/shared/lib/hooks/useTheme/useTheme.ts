import { useContext } from 'react';

import { Theme } from '../../../const/theme';

import { ThemeContext } from '../../context/theme';

/**
 * Хук для использования темы
 */

interface UseThemeResults {
  /**
   * Значение темы
   */
  theme: Theme;

  /**
   * Функция для переключения темы
   */
  toggleTheme: (saveAction?: (theme: Theme) => void) => void;
}

export const useTheme = (): UseThemeResults => {
  const { setTheme, theme } = useContext(ThemeContext);

  const toggleTheme = (saveAction?: (theme: Theme) => void) => {
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

    saveAction?.(newTheme); // сохраняем тему на сервере для текущего пользователя

    // чтобы не вешать дополнительные классы `${theme}` для 'App.tsx' и порталов
    document.body.className = newTheme;
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
};
