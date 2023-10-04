import { Article, ArticleSortField, ArticleType } from '../../../src/entities/Article';

import { SortOrder } from '../../../src/shared/types/sort';

const defaultArticle = {
  blocks: [],
  createdAt: '26.02.2023',
  id: 'cy_test',
  img: 'https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png',
  subtitle: 'Testing article description',
  title: 'Testing article',
  type: ['IT'],
  userId: '1',
  views: 1022,
};

export const articlesAreReady = () => {
  cy.getByTestId('ArticleList').should('exist');

  // режим плитки не работает по умолчанию, поэтому сразу переключаемся на режим 'списка'
  cy.setListArticlesView();
};

export const createArticle = (article?: Article) => {
  cy.request({
    body: article ?? defaultArticle,
    headers: {
      Authorization: true,
    },
    method: 'POST',
    url: 'http://localhost:8000/articles',
  }).then(({ body }) => body);
};

export const searchArticles = (searchValue: string) => {
  cy.getByTestId('Articles.Search').type(searchValue);
};

export const setListArticlesView = () => {
  cy.getByTestId('ArticleView.list').click();
};

export const sortArticlesByField = (sortField: ArticleSortField) => {
  cy.getByTestId('Articles.SortField.Button').click();

  cy.getByTestId(`Articles.SortField.Option.${sortField}`).click();
};

export const sortArticlesByOrder = (order: SortOrder) => {
  cy.getByTestId('Articles.Order.Button').click();

  cy.getByTestId(`Articles.Order.Option.${order}`).click();
};

export const sortArticlesByType = (type: ArticleType) => {
  cy.getByTestId(`Articles.Type.${type}`).click();
};

export const removeArticle = (articleId: string) => {
  cy.request({
    headers: {
      Authorization: true,
    },
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
  });
};

export const waitForArticlesUpdates = () => {
  cy.intercept('GET', '**/articles?*').as('sortArticles');

  cy.wait('@sortArticles');
};

export const waitForTheFirstArticle = () => {
  cy.getByTestId('Article.Header').first().contains('Kotlin not sorted news');
};

declare global {
  namespace Cypress {
    interface Chainable {
      articlesAreReady(): Chainable<void>;
      createArticle(article?: Article): Chainable<Article>;
      searchArticles(searchValue: string): Chainable<void>;
      setListArticlesView(): Chainable<void>;
      sortArticlesByField(sortField: ArticleSortField): Chainable<void>;
      sortArticlesByOrder(order: SortOrder): Chainable<void>;
      sortArticlesByType(type: ArticleType): Chainable<void>;
      removeArticle(articleId: string): Chainable<void>;
      waitForArticlesUpdates(): Chainable<void>;
      waitForTheFirstArticle(): Chainable<void>;
    }
  }
}
