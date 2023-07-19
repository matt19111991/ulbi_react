import { RouteProps } from 'react-router-dom';

import { AboutPage } from 'pages/AboutPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { MainPage } from 'pages/MainPage';
import { ProfilePage } from 'pages/ProfilePage';
import { NotFoundPage } from 'pages/NotFoundPage';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
}

export enum AppRoutes {
  ABOUT = 'about',
  ARTICLE_DETAILS = 'article_details',
  ARTICLES = 'articles',
  MAIN = 'main',
  PROFILE = 'profile',
  NOT_FOUND = 'notFound',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + :id
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.PROFILE]: '/profile/', // + :id

  // должен идти последним
  [AppRoutes.NOT_FOUND]: '*', // охватывает все маршруты, кроме указанных выше
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.ABOUT]: {
    element: <AboutPage />,
    path: RoutePath.about,
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    authOnly: true,
    element: <ArticleDetailsPage />,
    path: `${RoutePath.article_details}:id`,
  },
  [AppRoutes.ARTICLES]: {
    authOnly: true,
    element: <ArticlesPage />,
    path: RoutePath.articles,
  },
  [AppRoutes.MAIN]: {
    element: <MainPage />,
    path: RoutePath.main,
  },
  [AppRoutes.PROFILE]: {
    authOnly: true,
    element: <ProfilePage />,
    path: `${RoutePath.profile}:id`,
  },
  [AppRoutes.NOT_FOUND]: {
    element: <NotFoundPage />,
    path: RoutePath.notFound,
  },
};
