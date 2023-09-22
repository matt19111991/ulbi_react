import { ReactElement } from 'react';

import { AppRoutes } from '@/shared/const/router';

import { useRouteChange } from '@/shared/lib/router/useRouteChange/useRouteChange';

import { ScrollToolbar } from '@/widgets/ScrollToolbar';

export const useAppToolbar = () => {
  const appRoute = useRouteChange(); // AppRoutes.MAIN | AppRoutes.ARTICLE_DETAILS

  // используем 'OptionalRecord', т.к. не для всех страниц будет тул бар
  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
    [AppRoutes.ARTICLES]: <ScrollToolbar />,

    // [AppRoutes.ABOUT]: <div>About</div>,
    // [AppRoutes.MAIN]: <div>Main</div>,
  };

  return toolbarByAppRoute[appRoute];
};
