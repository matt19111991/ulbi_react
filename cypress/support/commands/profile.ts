export const resetProfile = (profileId: string) => {
  cy.request({
    body: {
      id: '1',
      age: 22,
      avatar:
        'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
      city: 'New-York',
      country: 'USA',
      currency: 'USD',
      first: 'Jack',
      lastname: 'Smith',
      username: 'Jack',
    },
    headers: {
      Authorization: true,
    },
    method: 'PUT',
    url: `https://localhost:8443/profile/${profileId}`,
  });
};

export const updateProfile = (firstName: string, lastName: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();

  cy.getByTestId('ProfileCard.firstName').clear().type(firstName);
  cy.getByTestId('ProfileCard.lastName').clear().type(lastName);

  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      resetProfile(profileId: string): Chainable<void>;
      updateProfile(firstName: string, lastName: string): Chainable<void>;
    }
  }
}
