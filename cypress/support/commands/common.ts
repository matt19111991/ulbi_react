import { selectByTestId } from '../../helpers/selectByTestId';

import { User } from '../../../src/entities/User';

import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';

export const getByTestId = (testId: string) => cy.get(selectByTestId(testId));

export const login = (username: string = 'Jack', password: string = '12345') => {
  cy.request({
    body: { username, password },
    headers: {
      Authorization: true,
    },
    method: 'POST',
    url: 'https://localhost:8443/login',
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));

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
