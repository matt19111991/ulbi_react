import { ReactNode, useEffect, useMemo, useState } from 'react';

import { useJsonSettings } from '@/entities/User';

import { Theme } from '@/shared/const/theme';

import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';

interface ThemeProviderProps {
  children?: ReactNode;
  initialTheme?: Theme;
}

// В типе FC уже описан 'children' prop для версий React меньше v.18)
const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  const { theme: jsonSettingsTheme } = useJsonSettings();

  const [isThemeInited, setIsThemeInited] = useState(false);

  /*
    по умолчанию устанавливаем либо 'initialTheme' из props или 'jsonSettingsTheme' из user settings
    если нет ни того, ни другого - берем 'Theme.LIGHT'
  */
  const [theme, setTheme] = useState<Theme>(initialTheme || jsonSettingsTheme || Theme.LIGHT);

  // данные о теме, сохраненные в объект с авторизованным пользователем прилетают не сразу
  useEffect(() => {
    // поэтому реагируем на изменение 'jsonSettingsTheme'
    if (!isThemeInited && jsonSettingsTheme) {
      setTheme(jsonSettingsTheme);

      setIsThemeInited(true);
    }
  }, [isThemeInited, jsonSettingsTheme]);

  useEffect(() => {
    // может не меняться цвет скролла при переключении темы, поэтому добавляем класс на 'body'
    document.body.className = theme;
  }, [theme]);

  const memoizedContext = useMemo(() => ({ setTheme, theme }), [theme]);

  return <ThemeContext.Provider value={memoizedContext}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
