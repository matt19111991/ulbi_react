import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { render } from '@testing-library/react';

import i18nForTests from 'shared/config/i18n/i18nForTests';

export interface ComponentTestRendererOptions {
  route?: string; // путь по умолчанию
}

export const componentTestRenderer = (
  component: ReactNode,
  options: ComponentTestRendererOptions = {},
) => {
  const { route = '/' } = options;

  // MemoryRouter используется для тестов

  return render(
    <MemoryRouter initialEntries={[route]}>
      <I18nextProvider i18n={i18nForTests}>
        {component}
      </I18nextProvider>
    </MemoryRouter>,
  );
};
