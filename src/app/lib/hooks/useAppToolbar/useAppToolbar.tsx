import type { ReactElement } from 'react';

import { AppRoutes } from '@/shared/const/router';

import { useRouteChange } from '@/shared/lib/hooks/useRouteChange/useRouteChange';

import { ScrollToolbar } from '@/widgets/ScrollToolbar';

/**
 * Хук для отрисовки компонентов в тулбаре
 */
export const useAppToolbar = () => {
  const appRoute = useRouteChange(); // 'AppRoutes.MAIN' | 'AppRoutes.ARTICLE_DETAILS'

  // используем 'OptionalRecord', т.к. не для всех страниц будет тулбар
  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
  };

  return toolbarByAppRoute[appRoute];
};
