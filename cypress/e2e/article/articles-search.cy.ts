import { getRouteArticles } from '@/shared/const/router';

import { FRONT_APP_URL } from '../../const/env';

describe('Пользователь ищет статьи', () => {
  beforeEach(() => {
    cy.login();

    cy.visit(`${FRONT_APP_URL}${getRouteArticles()}`);
  });

  it('Поиск статей успешно работает', () => {
    cy.articlesAreReady();

    cy.getByTestId('ArticleListItem').should('have.length.least', 9); // минимум

    cy.searchArticles('Javascript');

    cy.waitForArticlesUpdates();

    cy.getByTestId('ArticleListItem').should('have.length.most', 4); // меньше или равно
  });
});
