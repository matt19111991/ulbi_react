let profileId = '';

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    cy.visit('');

    // 'data' возвращается из 'body' ('commands/common.ts')
    cy.login().then((data) => {
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
