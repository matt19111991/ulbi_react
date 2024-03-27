import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { AppRouteByPathMap, AppRoutes } from '@/shared/const/router';

/**
 * Хук для отслеживания изменения роута
 */
export const useRouteChange = () => {
  const location = useLocation();

  // 'AppRoutes.MAIN' | 'AppRoutes.ARTICLE_DETAILS'
  const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

  useEffect(() => {
    /*
      здесь результат работы 'Object.entries' приводим к типам явно, т.к 'Object.entries' возвращает
      свою типизацию, которая нам не подходит
    */
    (Object.entries(AppRouteByPathMap) as Array<[string, AppRoutes]>).forEach(
      ([routePath, route]) => {
        // если текущая страница совпала с 'routePath' ('/about' | '/articles/:id/edit')
        if (matchPath(routePath, location.pathname)) {
          setAppRoute(route);
        }
      },
    );
  }, [location.pathname]);

  return appRoute;
};
