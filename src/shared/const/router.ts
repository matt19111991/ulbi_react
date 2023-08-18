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

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteAdmin = () => '/admin';
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteArticles = () => '/articles';
export const getRouteForbidden = () => '/forbidden';
export const getRouteProfile = (id: string) => `/profile/${id}`;
