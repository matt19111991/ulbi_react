import { useContext } from 'react';

import { Theme } from '../../../const/theme';

import { ThemeContext } from '../../context/theme';

interface UseThemeResults {
  /**
   * Значение темы
   */
  theme: Theme;

  /**
   * Функция для переключения темы
   */
  toggleTheme: (saveAction?: (themeToSave: Theme) => void) => void;
}

/**
 * Хук для использования темы
 */
export const useTheme = (): UseThemeResults => {
  const { setTheme, theme: currentTheme } = useContext(ThemeContext);

  const toggleTheme = (saveAction?: (themeToSave: Theme) => void) => {
    let newTheme: Theme;

    switch (currentTheme) {
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

    setTheme?.(newTheme); // без '?.' ошибка "Cannot invoke an object which is possibly 'undefined'"

    saveAction?.(newTheme); // сохраняем тему на сервере для текущего пользователя
  };

  return {
    theme: currentTheme || Theme.LIGHT,
    toggleTheme,
  };
};
