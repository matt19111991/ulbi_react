import { screen } from '@testing-library/react';

import { UserRole } from '@/entities/User';

import { getRouteAbout, getRouteAdmin, getRouteProfile } from '@/shared/const/router';

import { componentTestRenderer } from '@/shared/lib/tests/componentTestRenderer/componentTestRenderer';

import { AppRouter } from './AppRouter';

describe('AppRouter', () => {
  test('Страница должна отрисовываться', async () => {
    componentTestRenderer(<AppRouter />, { route: getRouteAbout() });

    // используем асинхронный 'findByTestId', т.к. роутер использует 'Suspense'
    const page = await screen.findByTestId('AboutPage');

    /*
      Нужна актуальная версия '@testing-library', которая соответствует 'React v.18', иначе ошибка:
      'Unable to find an element by: [data-testid="AboutPage"]'
    */
    expect(page).toBeInTheDocument();
  });

  test('Страница не найдена', async () => {
    componentTestRenderer(<AppRouter />, { route: '/not_exist' });

    const page = await screen.findByTestId('NotFoundPage');

    expect(page).toBeInTheDocument();
  });

  test('Редирект неавторизованного пользователя на главную страницу', async () => {
    componentTestRenderer(<AppRouter />, {
      initialState: {
        user: {
          mounted: true,
        },
      },
      route: getRouteProfile('1'),
    });

    const page = await screen.findByTestId('MainPage');

    expect(page).toBeInTheDocument();
  });

  test('Доступ к закрытой странице для авторизованного пользователя', async () => {
    componentTestRenderer(<AppRouter />, {
      initialState: {
        user: {
          authData: {},
          mounted: true,
        },
      },
      route: getRouteProfile('1'),
    });

    const page = await screen.findByTestId('ProfilePage');

    expect(page).toBeInTheDocument();
  });

  test('Доступ запрещен (отсутствует роль)', async () => {
    componentTestRenderer(<AppRouter />, {
      initialState: {
        user: {
          authData: {},
          mounted: true,
        },
      },
      route: getRouteAdmin(),
    });

    const page = await screen.findByTestId('ForbiddenPage');

    expect(page).toBeInTheDocument();
  });

  test('Доступ разрешен (присутствует роль)', async () => {
    componentTestRenderer(<AppRouter />, {
      initialState: {
        user: {
          authData: {
            roles: [UserRole.ADMIN],
          },
          mounted: true,
        },
      },
      route: getRouteAdmin(),
    });

    const page = await screen.findByTestId('AdminPanelPage');

    expect(page).toBeInTheDocument();
  });
});
