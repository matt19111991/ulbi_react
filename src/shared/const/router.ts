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
  SETTINGS = 'settings',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteAdmin = () => '/admin';
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteArticles = () => '/articles';
export const getRouteForbidden = () => '/forbidden';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteSettings = () => '/settings';

// { '/about': 'about' }
// { '/articles/:id/edit': 'article_edit' }

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
  [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
  [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
  [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
  [getRouteArticles()]: AppRoutes.ARTICLES,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
  [getRouteProfile(':id')]: AppRoutes.PROFILE,
  [getRouteSettings()]: AppRoutes.SETTINGS,
};
