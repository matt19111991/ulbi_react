import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import type { Location } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import type { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';
import type { StateSchema } from '@/app/providers/StoreProvider';

import { ThemeProvider } from '@/app/providers/ThemeProvider';

import '@/app/styles/index.scss';

import i18nForTests from '@/shared/config/i18n/i18nForTests';

import { Theme } from '@/shared/const/theme';

export interface ComponentTestRendererOptions {
  /**
   * Асинхронные редюсеры
   */
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;

  /**
   * Начальное состояние
   */
  initialState?: DeepPartial<StateSchema>;

  /**
   * Путь по умолчанию
   */
  route?: Partial<Location> | string;

  /**
   * Тема
   */
  theme?: Theme;
}

interface TestProviderProps {
  /**
   * Дочерние компоненты
   */
  children: ReactNode;

  /**
   * Дополнительные опции
   */
  options?: ComponentTestRendererOptions;
}

export const TestProvider = ({ children, options = {} }: TestProviderProps) => {
  const { asyncReducers, initialState, route = '/', theme = Theme.LIGHT } = options;

  /*
    Ошибка 'Uncaught Error: useNavigate() may be used only in the context of a <Router> component.',
    если 'StoreProvider' находится в дереве выше чем 'MemoryRouter' и попытаться использовать навигацию в
   'async thunks'
  */

  // 'MemoryRouter' используется для тестов

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app_redesigned ${theme}`}>{children}</div>
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
