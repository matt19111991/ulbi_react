import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps } from '@/shared/types/router';

import { PageLoader } from '@/widgets/PageLoader';

import { routeConfig } from '../config/routeConfig';

import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}> {/* <Suspense /> для роутинга */}
        {route.element}
      </Suspense>
    );

    return (
      <Route
        element={
          route.authOnly
            ? <RequireAuth roles={route.roles}>{element}</RequireAuth>
            : element
        }
        key={route.path}
        path={route.path}
      />
    );
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  );
});

AppRouter.displayName = 'AppRouter';
