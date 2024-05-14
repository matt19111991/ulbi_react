import { EditableProfileCard } from '@/features/EditableProfileCard/testing';

import { LAST_DESIGN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import { TestProvider } from '@/shared/lib/tests';
import type { ComponentTestRendererOptions } from '@/shared/lib/tests';

/*
  в 'Cypress' работаем с реальным 'DOM',
  в 'Jest' и 'React Testing Library' - с 'Jest DOM' (урезанная версия 'DOM')

  выборочно пишем изолированные 'Cypress'-тесты на компоненты для проверки самого важного функционала
*/

const USER_ID = '1';

describe('EditableProfileCard', () => {
  it('Карточка отрисовывается на стабах (фикстурах)', () => {
    window.localStorage.setItem(LAST_DESIGN_LOCALSTORAGE_KEY, 'new');

    // перехватываем запрос совпадающий с '**/profile/*' и подставляем моковые данные из 'fixtures'
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });

    const options: ComponentTestRendererOptions = {
      initialState: {
        user: {
          authData: {
            id: USER_ID,
          },
        },
      },
    };

    // обертку '<TestProvider />' можно вынести на уровень команд ('Cypress.Commands.overwrite('mount', ...)')
    cy.mount(
      <TestProvider options={options}>
        <EditableProfileCard id={USER_ID} />
      </TestProvider>,
    );
  });
});
