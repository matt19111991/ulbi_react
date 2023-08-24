let profileId = '';

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('');

    cy.login().then((data) => { // 'data' возвращается из 'body' ('commands/common.ts')
      profileId = data.id;

      cy.visit(`profile/${profileId}`);
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
