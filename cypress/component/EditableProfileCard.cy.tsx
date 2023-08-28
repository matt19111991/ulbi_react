import { EditableProfileCard } from '@/features/EditableProfileCard';

import { TestProvider } from '@/shared/lib/tests/componentTestRenderer/componentTestRenderer';

/*
  в Cypress работаем с реальным DOM, в Jest и React Testing Library - с Jest DOM (урезанная версия DOM)

  выборочно пишем изолированные Cypress тесты на компоненты для проверки самого важного функционала
*/
const USER_ID = '1';

describe('EditableProfileCard', () => {
  it('Карточка отрисовывается на стабах (фикстурах)', () => {
    // перехватываем запрос совпадающий с '**/profile/*' и подставляем моковые данные из 'fixtures'
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });

    // обертку <TestProvider /> можно вынести на уровень команд ('Cypress.Commands.overwrite('mount', ...)')

    cy.mount(
      <TestProvider
        options={{
          initialState: {
            user: {
              authData: {
                id: USER_ID,
              },
            },
          },
        }}
      >
        <EditableProfileCard id={USER_ID} />
      </TestProvider>,
    );
  });
});
