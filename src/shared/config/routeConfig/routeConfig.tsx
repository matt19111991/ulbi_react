import { RouteProps } from 'react-router-dom';

import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { ProfilePage } from 'pages/ProfilePage';
import { NotFoundPage } from 'pages/NotFoundPage';

type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
}

export enum AppRoutes {
  ABOUT = 'about',
  MAIN = 'main',
  PROFILE = 'profile',
  NOT_FOUND = 'notFound',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile',

  // должен идти последним
  [AppRoutes.NOT_FOUND]: '*', // охватывает все маршруты, кроме указанных выше
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.ABOUT]: {
    element: <AboutPage />,
    path: RoutePath.about,
  },
  [AppRoutes.MAIN]: {
    element: <MainPage />,
    path: RoutePath.main,
  },
  [AppRoutes.PROFILE]: {
    authOnly: true,
    element: <ProfilePage />,
    path: RoutePath.profile,
  },
  [AppRoutes.NOT_FOUND]: {
    element: <NotFoundPage />,
    path: RoutePath.notFound,
  },
};
