import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ToggleFeatures } from '@/shared/lib/features';

import { AppRoutesProps } from '@/shared/types/router';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { PageLoader } from '@/widgets/PageLoader';

import { routeConfig } from '../../config/routeConfig';

import { RequireAuth } from '../RequiredAuth/RequireAuth';

import classes from './AppRouter.module.scss';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    // <Suspense /> для роутинга
    const element = (
      <Suspense
        fallback={
          <ToggleFeatures
            feature='isAppRedesigned'
            on={
              <HStack align='start' className={classes.content} gap='16'>
                <Skeleton border='4px' height={88} width='100%' />
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
          route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element
        }
        key={route.path}
        path={route.path}
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});

AppRouter.displayName = 'AppRouter';
