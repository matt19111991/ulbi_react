describe('Пользователь заходит на страницу со списком статей', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('articles');
    });
  });

  it.skip('Статьи успешно загружаются с сервера', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });

  it('Статьи успешно загружаются на стабах (фикстурах)', () => {
    // перехватываем запрос совпадающий с '**/articles?*' и подставляем моковые данные из 'fixtures'
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });

    // при запуске dev сборки через 'vite' будет ошибка, т.к. 'vite' не работает корректно с 'react-virtualized'

    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });
});
