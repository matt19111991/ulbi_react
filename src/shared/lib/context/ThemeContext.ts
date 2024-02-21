import { createContext } from 'react';

import { Theme } from '@/shared/const/theme';

export interface ThemeContextProps {
  /**
   * Действие для установки темы
   */
  setTheme?: (theme: Theme) => void;

  /**
   * Значение темы
   */
  theme?: Theme;
}

export const ThemeContext = createContext<ThemeContextProps>({});
