import { ComponentType } from 'react';

import { useJsonSettings } from '@/entities/User';

import ThemeProvider from '../../ui/ThemeProvider';

// HOC

// принимаем компонент на вход
export const withTheme = (Component: ComponentType) => {
  // на выходе новый компонент (класс в старом 'React' или функциональный компонент, как у нас)

  const ThemedComponent = () => {
    const { theme: jsonSettingsTheme } = useJsonSettings();

    return (
      <ThemeProvider initialTheme={jsonSettingsTheme}>
        <Component />
      </ThemeProvider>
    );
  };

  return ThemedComponent;
};
