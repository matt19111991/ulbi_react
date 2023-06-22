import { RouteProps } from 'react-router-dom';

import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';

export enum AppRoutes {
    ABOUT = 'about',
    MAIN = 'main',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.MAIN]: '/',
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
};
