// Здесь можем создавать различные пользовательские команды и перезаписывать существующие

import { login } from './commands/login';

Cypress.Commands.add('login', login);

/* Child command
   Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... });
*/

/* Dual command
   Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... });
*/

/* This will overwrite an existing command
   Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... });
*/

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>
    }
  }
}

export {}; // нужно хоть что-то экспортировать, чтобы не ругался TS
