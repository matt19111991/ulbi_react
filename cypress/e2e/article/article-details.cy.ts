let currentArticleId = '';

describe('Пользователь заходит на страницу статьи', () => {
  beforeEach(() => {
    cy.login();

    cy.createArticle().then((article) => {
      currentArticleId = article.id;

      // cy.log(JSON.stringify(article)); - логирование в Cypress

      cy.visit(`articles/${currentArticleId}`);
    });
  });

  afterEach(() => {
    cy.removeArticle(currentArticleId);
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

    cy.get('[data-selected=true]').should('have.length', 4);
  });
});
