import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { DeepPartial } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

import i18nForTests from 'shared/config/i18n/i18nForTests';

export interface ComponentTestRendererOptions {
  initialState?: DeepPartial<StateSchema>;
  route?: string; // путь по умолчанию
}

export const componentTestRenderer = (
  component: ReactNode,
  options: ComponentTestRendererOptions = {},
) => {
  const { initialState, route = '/' } = options;

  // MemoryRouter используется для тестов

  return render(
    <StoreProvider initialState={initialState}>
      <MemoryRouter initialEntries={[route]}>
        <I18nextProvider i18n={i18nForTests}>
          {component}
        </I18nextProvider>
      </MemoryRouter>
    </StoreProvider>,
  );
};