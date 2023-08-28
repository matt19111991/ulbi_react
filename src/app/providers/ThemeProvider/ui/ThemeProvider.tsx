import { ReactNode, useMemo, useState } from 'react';

import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';

// localStorage все типы приводит к 'string'. 'as' нужен, чтобы вместо типа 'string' был тип 'Theme'
const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

interface ThemeProviderProps {
  children?: ReactNode;
  initialTheme?: Theme;
}

// В типе FC уже описан 'children' prop для версий React меньше v.18)
const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  // по умолчанию устанавливаем либо 'initialTheme' из props или 'defaultTheme' из localStorage
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  const memoizedContext = useMemo(() => ({ setTheme, theme }), [theme]);

  return (
    <ThemeContext.Provider value={memoizedContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
