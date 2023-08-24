// cy.getByTestId() - кастомная функция ('commands/common.ts')

describe('Роутинг', () => {
  describe('Пользователь не авторизован', () => {
    it('Переход на главную страницу', () => {
      cy.visit('/');

      cy.getByTestId('MainPage').should('exist');
    });

    it('Редирект со страницы профиля на главную', () => {
      cy.visit('/profile/1');

      cy.getByTestId('MainPage').should('exist');
    });

    it('Переход на несуществующий роут', () => {
      cy.visit('/not-exist');

      cy.getByTestId('NotFoundPage').should('exist');
    });
  });

/*
  Best practice: взаимодействие через 'cy.request' и моковые данные,
  а не через UI (заполнение полей формы)
*/
  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login();
    });

    it('Переход на страницу профиля', () => {
      cy.visit('/profile/1');

      cy.getByTestId('ProfilePage').should('exist');
    });

    it('Переход на страницу со списком статей', () => {
      cy.visit('/articles');

      cy.getByTestId('ArticlesPage').should('exist');
    });
  });
});
