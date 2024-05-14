import { ArticleSortField, ArticleType } from '@/entities/Article/testing';

describe('Пользователь сортирует статьи', () => {
  beforeEach(() => {
    cy.login();

    cy.visit(`${Cypress.env('FRONT_APP_URL')}/articles`);
  });

  it('Пользователь сортирует по убыванию', () => {
    cy.articlesAreReady();

    cy.waitForTheFirstKotlinArticle();

    cy.sortArticlesByOrder('desc');

    cy.waitForArticlesUpdates();

    cy.getByTestId('Article.Paragraph').first().contains('Python old news');
  });

  it('Пользователь сортирует по названию статьи', () => {
    cy.articlesAreReady();

    cy.waitForTheFirstKotlinArticle();

    cy.sortArticlesByField(ArticleSortField.TITLE);

    cy.waitForArticlesUpdates();

    cy.getByTestId('Article.Paragraph').first().contains('Javascript fresh news');
  });

  it('Пользователь сортирует по типу статьи', () => {
    cy.articlesAreReady();

    cy.waitForTheFirstKotlinArticle();

    cy.sortArticlesByType(ArticleType.ECONOMICS);

    cy.waitForArticlesUpdates();

    cy.getByTestId('Article.Paragraph').first().contains('Кредитный рейтинг');
  });
});
