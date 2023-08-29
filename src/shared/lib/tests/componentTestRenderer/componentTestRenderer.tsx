import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line path-checker-1911/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
// eslint-disable-next-line path-checker-1911/layer-imports
import '@/app/styles/index.scss';

import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { Theme } from '@/shared/const/theme';

export interface ComponentTestRendererOptions {
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  initialState?: DeepPartial<StateSchema>;
  route?: string; // путь по умолчанию
  theme?: Theme;
}

export interface TestProviderProps {
  children: ReactNode;
  options?: ComponentTestRendererOptions;
}

export const TestProvider = ({ children, options = {} }: TestProviderProps) => {
  const { asyncReducers, initialState, route = '/', theme = Theme.LIGHT } = options;

  /* Ошибка 'Uncaught Error: useNavigate() may be used only in the context of a <Router> component.',
     если 'StoreProvider' находится в дереве выше чем 'MemoryRouter' и попытаться использовать навигацию в
     'async thunks'
  */

  // MemoryRouter используется для тестов

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>{children}</div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
};

export const componentTestRenderer = (
  component: ReactNode,
  options?: ComponentTestRendererOptions,
) => render(<TestProvider options={options}>{component}</TestProvider>);
