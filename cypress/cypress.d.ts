import { mount } from 'cypress/react18';

// из документации
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
