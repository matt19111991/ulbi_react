describe('Пользователь ищет статьи', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('articles');
    });
  });

  it('Поиск статей успешно работает', () => {
    cy.articlesAreReady();

    cy.getByTestId('ArticleListItem').should('have.length.least', 9);

    cy.searchArticles('Javascript');

    cy.waitForArticlesUpdates();

    cy.getByTestId('ArticleListItem').should('have.length.most', 4); // меньше или равно
  });
});
