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

import { AppRoutes, RoutePath } from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

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
