import { RouteProps } from 'react-router-dom';

import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { ProfilePage } from 'pages/ProfilePage';
import { NotFoundPage } from 'pages/NotFoundPage';

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

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.ABOUT]: {
        element: <AboutPage />,
        path: RoutePath.about,
    },
    [AppRoutes.MAIN]: {
        element: <MainPage />,
        path: RoutePath.main,
    },
    [AppRoutes.PROFILE]: {
        element: <ProfilePage />,
        path: RoutePath.profile,
    },
    [AppRoutes.NOT_FOUND]: {
      element: <NotFoundPage />,
      path: RoutePath.notFound,
  },
};
