import type { Profile } from '@/entities/Profile/testing';

let profileId: Profile['id'] = '';

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.login().then((body) => {
      profileId = body.id;

      cy.visit(`${Cypress.env('FRONT_APP_URL')}/profile/${profileId}`);
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
