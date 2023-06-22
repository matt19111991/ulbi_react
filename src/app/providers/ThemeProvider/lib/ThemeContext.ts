import { createContext } from 'react';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface ThemeContextProps {
  setTheme?: (theme: Theme) => void;
  theme?: Theme;
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
