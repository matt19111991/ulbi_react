import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ToggleFeatures } from '@/shared/lib/features';
import { AppRoutesProps } from '@/shared/types/router';

import { PageLoader } from '@/widgets/PageLoader';

import { routeConfig } from '../../config/routeConfig';

import { RequireAuth } from '../RequiredAuth/RequireAuth';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    // <Suspense /> для роутинга
    const element = (
      <Suspense
        fallback={<ToggleFeatures feature='isAppRedesigned' on={null} off={<PageLoader />} />}
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
