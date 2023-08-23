import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';

export const login = (username: string = 'Jack', password: string = '12345') => {
  cy.request({
    body: { username, password },
    headers: {
      Authorization: true,
    },
    method: 'POST',
    url: 'http://localhost:8000/login',
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
  });
};
