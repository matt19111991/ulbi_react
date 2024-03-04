import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { AppRouteByPathPattern, AppRoutes } from '@/shared/const/router';

/**
 * Хук для отслеживания изменения роута
 */
export const useRouteChange = () => {
  const location = useLocation();

  // AppRoutes.MAIN | AppRoutes.ARTICLE_DETAILS
  const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

  useEffect(() => {
    Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
      // если текущая страница совпала с паттерном ('/about' | '/articles/:id/edit')
      if (matchPath(pattern, location.pathname)) {
        setAppRoute(route);
      }
    });
  }, [location.pathname]);

  return appRoute;
};
