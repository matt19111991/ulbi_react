import { FC, useMemo, useState } from 'react';

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

// localStorage все типы приводит к 'string'. 'as' нужен, чтобы вместо типа 'string' был тип 'Theme'
const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

// В типе FC уже описан 'children' prop
const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const memoizedContext = useMemo(() => ({ setTheme, theme }),  [theme]);

  return (
    <ThemeContext.Provider value={memoizedContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
