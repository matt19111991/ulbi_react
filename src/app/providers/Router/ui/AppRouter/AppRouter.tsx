import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ToggleFeatures } from '@/shared/lib/features';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';

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
            on={
              <HStack className={classes.loader}>
                <Skeleton border='4px' height={48} width='calc(100% - 16px)' />
              </HStack>
            }
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
