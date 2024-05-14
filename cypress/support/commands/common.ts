import type { User } from '@/entities/User';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import { getDataTestIdSelector } from '../../helpers/getDataTestIdSelector';

export const getByTestId = (testId: string) =>
  cy.get(getDataTestIdSelector(testId), { timeout: 10000 });

export const login = (username: User['username'] = 'Jack', password: string = '12345') => {
  cy.request({
    body: { username, password },
    headers: {
      Authorization: true,
    },
    method: 'POST',
    url: '/login',
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, body.id);

    return body;
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      login(username?: User['username'], password?: string): Chainable<User>;
    }
  }
}
