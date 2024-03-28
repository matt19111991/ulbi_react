import { UserRole } from '@/entities/User';

import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleCreatePage } from '@/pages/ArticleCreatePage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';

import {
  AppRoutes,
  getRouteAbout,
  getRouteAdmin,
  getRouteArticleCreate,
  getRouteArticleDetails,
  getRouteArticleEdit,
  getRouteArticles,
  getRouteForbidden,
  getRouteMain,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/const/router';

import type { AppRouteProps } from '../model/types/router';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.ABOUT]: {
    element: <AboutPage />,
    path: getRouteAbout(),
  },
  [AppRoutes.ADMIN_PANEL]: {
    authOnly: true,
    element: <AdminPanelPage />,
    path: getRouteAdmin(),
    roles: [UserRole.ADMIN, UserRole.MANAGER], // каким ролям доступен роут
  },
  [AppRoutes.ARTICLE_CREATE]: {
    authOnly: true,
    element: <ArticleCreatePage />,
    path: getRouteArticleCreate(),
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    authOnly: true,
    element: <ArticleDetailsPage />,
    path: getRouteArticleDetails(':id'),
  },
  [AppRoutes.ARTICLE_EDIT]: {
    authOnly: true,
    element: <ArticleEditPage />,
    path: getRouteArticleEdit(':id'),
  },
  [AppRoutes.ARTICLES]: {
    authOnly: true,
    element: <ArticlesPage />,
    path: getRouteArticles(),
  },
  [AppRoutes.MAIN]: {
    element: <MainPage />,
    path: getRouteMain(),
  },
  [AppRoutes.FORBIDDEN]: {
    element: <ForbiddenPage />,
    path: getRouteForbidden(),
  },
  [AppRoutes.PROFILE]: {
    authOnly: true,
    element: <ProfilePage />,
    path: getRouteProfile(':id'),
  },
  [AppRoutes.SETTINGS]: {
    element: <SettingsPage />,
    path: getRouteSettings(),
  },

  // должен идти последним; охватывает все маршруты, кроме указанных выше
  [AppRoutes.NOT_FOUND]: {
    element: <NotFoundPage />,
    path: '*',
  },
};
