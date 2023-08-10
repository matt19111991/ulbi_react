import { RouteProps } from 'react-router-dom';

import { UserRole } from '@/entities/User';

import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
}

export enum AppRoutes {
  ABOUT = 'about',
  ADMIN_PANEL = 'admin_panel',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_EDIT = 'article_edit',
  ARTICLES = 'articles',
  FORBIDDEN = 'forbidden',
  MAIN = 'main',
  PROFILE = 'profile',
  NOT_FOUND = 'notFound',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.ADMIN_PANEL]: '/admin',
  [AppRoutes.ARTICLE_CREATE]: '/articles/new',
  [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + :id
  [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.FORBIDDEN]: '/forbidden',
  [AppRoutes.PROFILE]: '/profile/', // + :id

  // должен идти последним
  [AppRoutes.NOT_FOUND]: '*', // охватывает все маршруты, кроме указанных выше
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.ABOUT]: {
    element: <AboutPage />,
    path: RoutePath.about,
  },
  [AppRoutes.ADMIN_PANEL]: {
    authOnly: true,
    element: <AdminPanelPage />,
    path: RoutePath.admin_panel,
    roles: [UserRole.ADMIN, UserRole.MANAGER], // каким ролям доступен роут
  },
  [AppRoutes.ARTICLE_CREATE]: {
    authOnly: true,
/*  можно создать отдельно <ArticleCreatePage />,
    но скорее всего она будет не сильно отличаться от <ArticleEditPage />
*/  element: <ArticleEditPage />,
    path: RoutePath.article_create,
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    authOnly: true,
    element: <ArticleDetailsPage />,
    path: `${RoutePath.article_details}:id`,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    authOnly: true,
    element: <ArticleEditPage />,
    path: RoutePath.article_edit,
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
  [AppRoutes.FORBIDDEN]: {
    element: <ForbiddenPage />,
    path: RoutePath.forbidden,
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
