import type { Profile } from '@/entities/Profile/testing';

import { getRouteProfile } from '@/shared/const/router';

import { FRONT_APP_URL } from '../../const/env';

let profileId: Profile['id'] = '';

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.login().then((body) => {
      profileId = body.id;

      cy.visit(`${FRONT_APP_URL}${getRouteProfile(profileId)}`);
    });
  });

  afterEach(() => {
    cy.resetProfile(profileId);
  });

  it('Профиль успешно загружается', () => {
    cy.getByTestId('ProfileCard.firstName').should('have.value', 'Jack');
  });

  it('Редактирование успешно', () => {
    const newFirstName = 'New first name';
    const newLastName = 'New last name';

    cy.updateProfile(newFirstName, newLastName);

    cy.getByTestId('ProfileCard.firstName').should('have.value', newFirstName);
    cy.getByTestId('ProfileCard.lastName').should('have.value', newLastName);
  });
});
