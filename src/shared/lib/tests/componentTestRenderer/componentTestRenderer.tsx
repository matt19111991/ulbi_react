import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';

import i18nForTests from '@/shared/config/i18n/i18nForTests';

export interface ComponentTestRendererOptions {
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  initialState?: DeepPartial<StateSchema>;
  route?: string; // путь по умолчанию
}

export const componentTestRenderer = (
  component: ReactNode,
  options: ComponentTestRendererOptions = {},
) => {
  const { asyncReducers, initialState, route = '/' } = options;

  // MemoryRouter используется для тестов

/* Ошибка 'Uncaught Error: useNavigate() may be used only in the context of a <Router> component.',
   если 'StoreProvider' находится в дереве выше чем 'MemoryRouter' и попытаться использовать навигацию в
   'async thunks'
*/
  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          {component}
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>,
  );
};
