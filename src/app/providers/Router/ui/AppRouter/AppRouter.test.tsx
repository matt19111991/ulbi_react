import { screen } from '@testing-library/react';

/*
  нужна актуальная версия '@testing-library', которая соответствует 'React v.18', иначе ошибка:
 'Unable to find an element by: [data-testid="AboutPage"]'
*/

import type { StateSchema } from '@/app/providers/StoreProvider';

import { UserRole } from '@/entities/User/testing';

import { getRouteAbout, getRouteAdmin, getRouteMain, getRouteProfile } from '@/shared/const/router';

import { componentTestRenderer } from '@/shared/lib/tests';

import { AppRouter } from './AppRouter';

describe('AppRouter', () => {
  test('Страница не должна отрисовываться до монтирования', () => {
    const initialState: DeepPartial<StateSchema> = {
      user: {
        mounted: false,
      },
    };

    componentTestRenderer(<AppRouter />, {
      initialState,
      route: getRouteAbout(),
    });

    const page = screen.queryByTestId('AboutPage');

    expect(page).not.toBeInTheDocument();
  });

  test('Страница должна отрисовываться', async () => {
    const initialState: DeepPartial<StateSchema> = {
      user: {
        mounted: true,
      },
    };

    componentTestRenderer(<AppRouter />, {
      initialState,
      route: getRouteAbout(),
    });

    // используем асинхронный 'findByTestId', т.к. роутер использует 'Suspense'
    const page = await screen.findByTestId('AboutPage');

    expect(page).toBeInTheDocument();
  });

  test('Страница не найдена', async () => {
    const initialState: DeepPartial<StateSchema> = {
      user: {
        mounted: true,
      },
    };

    componentTestRenderer(<AppRouter />, {
      initialState,
      route: '/not_exist',
    });

    // используем асинхронный 'findByTestId', т.к. роутер использует 'Suspense'
    const page = await screen.findByTestId('NotFoundPage');

    expect(page).toBeInTheDocument();
  });

  test('Редирект неавторизованного пользователя на главную страницу', async () => {
    const initialState: DeepPartial<StateSchema> = {
      user: {
        mounted: true,
      },
    };

    componentTestRenderer(<AppRouter />, {
      initialState,
      route: getRouteProfile('1'),
    });

    // используем асинхронный 'findByTestId', т.к. роутер использует 'Suspense'
    const page = await screen.findByTestId('MainPage');

    expect(page).toBeInTheDocument();
  });

  test('Доступ к закрытой странице для авторизованного пользователя', async () => {
    const initialState: DeepPartial<StateSchema> = {
      user: {
        authData: {},
        mounted: true,
      },
    };

    componentTestRenderer(<AppRouter />, {
      initialState,
      route: getRouteProfile('1'),
    });

    // используем асинхронный 'findByTestId', т.к. роутер использует 'Suspense'
    const page = await screen.findByTestId('ProfilePage', {}, { timeout: 3000 });

    expect(page).toBeInTheDocument();
  });

  test('Доступ запрещен (отсутствует роль)', async () => {
    const initialState: DeepPartial<StateSchema> = {
      user: {
        authData: {},
        mounted: true,
      },
    };

    componentTestRenderer(<AppRouter />, {
      initialState,
      route: getRouteAdmin(),
    });

    // используем асинхронный 'findByTestId', т.к. роутер использует 'Suspense'
    const page = await screen.findByTestId('ForbiddenPage');

    expect(page).toBeInTheDocument();
  });

  test('Доступ разрешен (присутствует роль)', async () => {
    const initialState: DeepPartial<StateSchema> = {
      user: {
        authData: {
          roles: [UserRole.ADMIN],
        },
        mounted: true,
      },
    };

    componentTestRenderer(<AppRouter />, {
      initialState,
      route: getRouteAdmin(),
    });

    // используем асинхронный 'findByTestId', т.к. роутер использует 'Suspense'
    const page = await screen.findByTestId('AdminPanelPage');

    expect(page).toBeInTheDocument();
  });

  test('Редирект на предыдущее сохраненное значение приватного роута', async () => {
    const initialState: DeepPartial<StateSchema> = {
      user: {
        authData: {
          roles: [UserRole.ADMIN],
        },
        mounted: true,
      },
    };

    componentTestRenderer(<AppRouter />, {
      initialState,
      route: {
        pathname: getRouteMain(),
        state: {
          from: getRouteAdmin(),
        },
      },
    });

    // используем асинхронный 'findByTestId', т.к. роутер использует 'Suspense'
    const page = await screen.findByTestId('AdminPanelPage');

    expect(page).toBeInTheDocument();
  });
});
