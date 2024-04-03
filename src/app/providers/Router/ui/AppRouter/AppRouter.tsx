import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ToggleFeatures } from '@/shared/lib/features';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { PageLoader } from '@/widgets/PageLoader';

import { routeConfig } from '../../config/routeConfig';

import type { AppRouteProps } from '../../model/types/router';

import { RequireAuth } from '../RequireAuth/RequireAuth';

export const AppRouter = memo(() => {
  const renderRoutes = useCallback((route: AppRouteProps) => {
    // '<Suspense />' для роутинга (используются асинхронные страницы)
    const suspensedElement = (
      <Suspense
        fallback={
          <ToggleFeatures
            feature='isAppRedesigned'
            on={<Skeleton border='4px' height={88} width='100%' />}
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

  return <Routes>{Object.values(routeConfig).map(renderRoutes)}</Routes>;
});

AppRouter.displayName = 'AppRouter';
