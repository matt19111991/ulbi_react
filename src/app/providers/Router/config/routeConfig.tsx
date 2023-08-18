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
} from '@/shared/const/router';

import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
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
/*  можно создать отдельно <ArticleCreatePage />,
    но скорее всего она будет не сильно отличаться от <ArticleEditPage />
*/  element: <ArticleEditPage />,
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

  // должен идти последним
  [AppRoutes.NOT_FOUND]: { // охватывает все маршруты, кроме указанных выше
    element: <NotFoundPage />,
    path: '*',
  },
};
