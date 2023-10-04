import { ArticleSortField, ArticleType } from '../../../src/entities/Article/testing';

describe('Пользователь сортирует статьи', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('articles');
    });
  });

  it('Пользователь сортирует по убыванию', () => {
    cy.articlesAreReady();

    cy.waitForTheFirstArticle();

    cy.sortArticlesByOrder('desc');

    cy.waitForArticlesUpdates();

    cy.getByTestId('Article.Header').first().contains('Python old news');
  });

  it('Пользователь сортирует по названию статьи', () => {
    cy.articlesAreReady();

    cy.waitForTheFirstArticle();

    cy.sortArticlesByField(ArticleSortField.TITLE);

    cy.waitForArticlesUpdates();

    cy.getByTestId('Article.Header').first().contains('Javascript fresh news');
  });

  it('Пользователь сортирует по типу статьи', () => {
    cy.articlesAreReady();

    cy.waitForTheFirstArticle();

    cy.sortArticlesByType(ArticleType.ECONOMICS);

    cy.waitForArticlesUpdates();

    cy.getByTestId('Article.Header').first().contains('Кредитный рейтинг');
  });
});
