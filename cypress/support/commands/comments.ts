import type { Comment } from '@/entities/Comment';

export const addComment = (text: Comment['text']) => {
  cy.getByTestId('AddCommentForm.Input').type(text);

  cy.getByTestId('AddCommentForm.Button').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      addComment(text: Comment['text']): Chainable<void>;
    }
  }
}
