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

  it('Статья успешно загружена и отображается', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });

  it('Список рекомендаций успешно загружен и отображается', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });

  it('Комментарии добавляются успешно', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist'); // статья уже загрузилась

    cy.getByTestId('AddCommentForm').scrollIntoView();

    cy.addComment('text');

    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });

  it('Оценка выставляется успешно', () => {
    // перехватываем запрос совпадающий с '**/articles/*' и подставляем моковые данные из 'fixtures'
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });

    cy.getByTestId('ArticleDetails.Info').should('exist'); // статья уже загрузилась

    cy.getByTestId('RatingCard').scrollIntoView();

    cy.setRate(4, 'feedback');

    cy.get('[data-selected=true]').should('have.length', 4);
  });
});
