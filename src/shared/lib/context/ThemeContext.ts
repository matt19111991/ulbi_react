import { createContext } from 'react';

import { Theme } from '../../const/theme';

export interface ThemeContextProps {
  setTheme?: (theme: Theme) => void;
  theme?: Theme;
}

export const ThemeContext = createContext<ThemeContextProps>({});
