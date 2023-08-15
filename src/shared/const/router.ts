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
