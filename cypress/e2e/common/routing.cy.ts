import { LAST_DESIGN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import { FRONT_APP_URL } from '../../const/env';

import profile from '../../fixtures/profile.json';

// 'cy.getByTestId()' - кастомная функция ('commands/common.ts')

describe('Роутинг', () => {
  beforeEach(() => {
    window.localStorage.setItem(LAST_DESIGN_LOCALSTORAGE_KEY, 'new');
  });

  afterEach(() => {
    window.localStorage.removeItem(LAST_DESIGN_LOCALSTORAGE_KEY);
  });

  describe('Пользователь не авторизован', () => {
    it('Переход на главную страницу', () => {
      cy.visit(FRONT_APP_URL);

      cy.getByTestId('MainPage').should('exist');
    });

    it('Редирект со страницы профиля на главную', () => {
      cy.visit(`${FRONT_APP_URL}/profile/${profile.id}`);

      cy.getByTestId('MainPage').should('exist');
    });

    it('Переход на несуществующий роут', () => {
      cy.visit(`${FRONT_APP_URL}/not-exist`);

      cy.getByTestId('NotFoundPage').should('exist');
    });
  });

  /*
   'Best practice': взаимодействие через 'cy.request' и моковые данные,
    а не через 'UI' (заполнение полей формы)
  */

  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login();
    });

    it('Переход на страницу профиля', () => {
      cy.visit(`${FRONT_APP_URL}/profile/${profile.id}`);

      cy.getByTestId('ProfilePage').should('exist');
    });

    it('Переход на страницу со списком статей', () => {
      cy.visit(`${FRONT_APP_URL}/articles`);

      cy.articlesAreReady();
    });
  });
});
