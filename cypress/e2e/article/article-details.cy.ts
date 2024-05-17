import type { Article } from '@/entities/Article/testing';

import { FRONT_APP_URL } from '../../const/env';

import defaultArticle from '../../fixtures/article-details.json';

let currentArticleId: Article['id'] = '';

describe('Пользователь заходит на страницу статьи', () => {
  beforeEach(() => {
    // 'cy.log(JSON.stringify(article));' - логирование в 'Cypress'

    cy.login();

    cy.getArticle(defaultArticle.id).then((article) => {
      /*
        если статья еще не создана ('article === {}'), то создаем её

        нужно выставить флаг 'failOnStatusCode: false' для 'cy.getArticle', чтобы отработали
        вложенные условия
      */
      if (Object.keys(article).length === 0) {
        cy.createArticle().then((createdArticle) => {
          currentArticleId = createdArticle.id;

          cy.visit(`${FRONT_APP_URL}/articles/${currentArticleId}`);
        });
        // статья создана
      } else {
        currentArticleId = article.id;

        cy.visit(`${FRONT_APP_URL}/articles/${currentArticleId}`);
      }
    });
  });

  afterEach(() => {
    if (currentArticleId) {
      cy.removeArticle(currentArticleId);
    }
  });

  it('Статья успешно загружена с сервера и отображается', () => {
    cy.getByTestId('ArticleDetails.Info.Header').should('exist');
  });

  it('Список рекомендаций успешно загружен с сервера и отображается', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });

  it('Комментарии добавляются успешно на сервер', () => {
    cy.getByTestId('ArticleDetails.Info.Header').should('exist'); // статья уже загрузилась

    cy.getByTestId('AddCommentForm').scrollIntoView();

    cy.addComment('text');

    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });

  it('Оценка выставляется успешно на стабах (фикстурах)', () => {
    // перехватываем запрос совпадающий с '**/articles/*' и подставляем моковые данные из 'fixtures'
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });

    cy.getByTestId('ArticleDetails.Info.Header').should('exist'); // статья уже загрузилась

    cy.getByTestId('RatingCard').scrollIntoView();

    cy.setRate(4, 'feedback');

    // перехватываем запрос и присваиваем ему 'alias'
    cy.intercept('POST', '**/article-ratings').as('setRating');

    cy.get('[data-selected=true]').should('have.length', 4);

    cy.wait('@setRating').then(({ response }) => {
      cy.removeRate(response?.body.id);
    });
  });
});
