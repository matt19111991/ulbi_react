import { FRONT_APP_URL } from '../../const/env';

describe('Пользователь заходит на страницу со списком статей', () => {
  beforeEach(() => {
    cy.login();

    cy.visit(`${FRONT_APP_URL}/articles`);
  });

  it('Статьи успешно загружаются с сервера', () => {
    cy.articlesAreReady();

    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 6);
  });

  it('Статьи успешно загружаются на стабах (фикстурах)', () => {
    // перехватываем запрос совпадающий с '/articles*' и подставляем моковые данные из 'fixtures'
    cy.intercept('GET', '/articles*', { fixture: 'articles.json' });

    cy.articlesAreReady();

    cy.getByTestId('ArticleListItem').should('have.length', 5);
  });
});
