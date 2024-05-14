import { ArticleSortField, ArticleType } from '@/entities/Article';
import type { Article } from '@/entities/Article';

import type { SortOrder } from '@/shared/types/sort';

import defaultArticle from '../../fixtures/article-details.json';

export const articlesAreReady = () => {
  cy.getByTestId('ArticleList').should('exist');
};

export const createArticle = (article?: Article) => {
  cy.request({
    body: article ?? (defaultArticle as Article),
    headers: {
      Authorization: true,
    },
    method: 'POST',
    url: '/articles',
  }).then(({ body }) => body);
};

export const searchArticles = (searchValue: string) => {
  cy.getByTestId('Articles.Search').type(searchValue);
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

export const removeArticle = (articleId: Article['id']) => {
  cy.request({
    headers: {
      Authorization: true,
    },
    method: 'DELETE',
    url: `/articles/${articleId}`,
  });
};

export const waitForArticlesUpdates = () => {
  cy.intercept('GET', '/articles*').as('sortArticles');

  cy.wait('@sortArticles');
};

export const waitForTheFirstArticle = () => {
  cy.getByTestId('Article.Paragraph').first().contains('Kotlin not sorted news');
};

declare global {
  namespace Cypress {
    interface Chainable {
      articlesAreReady(): Chainable<void>;
      createArticle(article?: Article): Chainable<Article>;
      searchArticles(searchValue: string): Chainable<void>;
      sortArticlesByField(sortField: ArticleSortField): Chainable<void>;
      sortArticlesByOrder(order: SortOrder): Chainable<void>;
      sortArticlesByType(type: ArticleType): Chainable<void>;
      removeArticle(articleId: Article['id']): Chainable<void>;
      waitForArticlesUpdates(): Chainable<void>;
      waitForTheFirstArticle(): Chainable<void>;
    }
  }
}
