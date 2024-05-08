import { selectByTestId } from '../../helpers/selectByTestId';

import { User } from '../../../src/entities/User';

import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';

export const getByTestId = (testId: string) => cy.get(selectByTestId(testId), { timeout: 10000 });

export const login = (username: string = 'Jack', password: string = '12345') => {
  cy.request({
    body: { username, password },
    headers: {
      Authorization: true,
    },
    method: 'POST',
    url: 'http://localhost:8000/login',
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, body.id);

    return body;
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      login(username?: string, password?: string): Chainable<User>;
    }
  }
}
