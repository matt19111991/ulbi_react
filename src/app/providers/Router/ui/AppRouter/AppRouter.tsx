import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ToggleFeatures } from '@/shared/lib/features';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

/*
  импортируем '<OutletPage />' и дочерние компоненты напрямую для демонстрация работы
  компонента '<Outlet />' из 'react-router-dom'
*/
import { OutletFirst, OutletLast, OutletPage } from '@/pages/OutletPage';

import { PageLoader } from '@/widgets/PageLoader';

import { routeConfig } from '../../config/routeConfig';

import type { AppRouteProps } from '../../model/types/router';

import { RequireAuth } from '../RequireAuth/RequireAuth';

import classes from './AppRouter.module.scss';

export const AppRouter = memo(() => {
  const renderRoutes = useCallback((route: AppRouteProps) => {
    // '<Suspense />' для роутинга (используются асинхронные страницы)
    const suspensedElement = (
      <Suspense
        fallback={
          <ToggleFeatures
            feature='isAppRedesigned'
            on={<Skeleton className={classes.loader} />}
            off={<PageLoader />}
          />
        }
      >
        {route.element}
      </Suspense>
    );

    return (
      <Route
        element={
          <RequireAuth authOnly={route.authOnly} requiredRoles={route.roles}>
            {suspensedElement}
          </RequireAuth>
        }
        key={route.path}
        path={route.path}
      />
    );
  }, []);

  return (
    <Routes>
      {/*
        вместо '<Routes>' и '<BrowserRouter />' можно использовать 'createBrowserRouter()' и
       '<RouterProvider />' - это позволяет описывать роуты в виде объектов, а не 'JSX'-компонентов

        const router = createBrowserRouter([
          {
            path: '/',
            element: <App />,
            children: [
              {
                element: <AboutPage />,
                path: '/about',
              },
              {
                element: <SettingsPage />,
                path: '/settings',
              },
            ],
          },
        ]);

        root.render(<RouterProvider router={router} />);
      */}

      {Object.values(routeConfig).map(renderRoutes)}

      {/*
        демонстрация работы компонента '<Outlet />' из 'react-router-dom' отдельно от 'routeConfig':
         '<OutletPage />'  => родительский компонент ('/outlet' роут), здесь определяется положение
                              дочерних компонентов, отрисовываемых по вложенным роутам
         '<OutletFirst />' => дочерний роут, отрисовываем по урлу '/outlet/first'
         '<OutletLast />'  => дочерний роут, отрисовываем по урлу '/outlet/last'
         'null'            => ничего не будет отрисовано по всем неуказанным вложенным урлам
      */}
      <Route
        element={
          <RequireAuth authOnly>
            <OutletPage />
          </RequireAuth>
        }
        path='outlet'
      >
        <Route element={<OutletFirst />} path='first' />
        <Route element={<OutletLast />} path='last' />
      </Route>
    </Routes>
  );
});

AppRouter.displayName = 'AppRouter';
