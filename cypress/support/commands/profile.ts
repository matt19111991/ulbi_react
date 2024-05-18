import type { Profile } from '@/entities/Profile/testing';

import profile from '../../fixtures/profile.json';

export const resetProfile = (profileId: Profile['id']) => {
  cy.request({
    body: profile as Profile,
    headers: {
      Authorization: true,
    },
    method: 'PUT',
    url: `/profile/${profileId}`,
  });
};

export const updateProfile = (
  firstName: Profile['first'] = 'New first name',
  lastName: Profile['lastname'] = 'New last name',
) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();

  // 'force: true' - для корректной работы в 'Windows'
  cy.getByTestId('ProfileCard.firstName').clear({ force: true }).type(firstName);
  cy.getByTestId('ProfileCard.lastName').clear({ force: true }).type(lastName);

  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      resetProfile(profileId: Profile['id']): Chainable<void>;
      updateProfile(firstName: Profile['first'], lastName: Profile['lastname']): Chainable<void>;
    }
  }
}
