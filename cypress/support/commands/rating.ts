export const setRate = (starsCount = 5, feedback = 'feedback') => {
  cy.getByTestId(`StarRating.${starsCount}`).click();

  cy.getByTestId('RatingCard.Input').type(feedback);

  cy.getByTestId('RatingCard.Send').click();
};

export const removeRate = (rateId: string) => {
  cy.request({
    headers: {
      Authorization: true,
    },
    method: 'DELETE',
    url: `http://localhost:8000/article-ratings/${rateId}`,
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      setRate(starsCount: number, feedback: string): Chainable<void>;
      removeRate(rateId: string): Chainable<void>;
    }
  }
}
