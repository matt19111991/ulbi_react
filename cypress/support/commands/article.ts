import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  blocks: [],
  createdAt: '26.02.2023',
  // eslint-disable-next-line max-len
  img: 'https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png',
  subtitle: 'Testing article description',
  title: 'Testing article',
  type: ['IT'],
  userId: '1',
  views: 1022,
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

export const removeArticle = (articleId: string) => {
  cy.request({
    headers: {
      Authorization: true,
    },
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
