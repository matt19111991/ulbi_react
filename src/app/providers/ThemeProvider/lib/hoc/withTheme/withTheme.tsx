import { ComponentType } from 'react';

import { useJsonSettings } from '@/entities/User';

import ThemeProvider from '../../../ui/ThemeProvider/ThemeProvider';

/**
 * HOC
 *
 * Принимаем компонент на вход
 * На выходе новый компонент (класс в старом 'React' или функциональный компонент, как у нас)
 */
export const withTheme = (Component: ComponentType) => {
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
