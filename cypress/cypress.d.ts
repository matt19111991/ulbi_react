import { mount } from 'cypress/react';

// из документации
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
