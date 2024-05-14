import type { Rating } from '@/entities/Rating';

import type { ArticleRatingEntity } from '@/features/ArticleRating';

export const setRate = (
  starsCount: Rating['rate'] = 5,
  feedback: Rating['feedback'] = 'feedback',
) => {
  cy.getByTestId(`StarRating.${starsCount}`).click();

  cy.getByTestId('RatingCard.Input').type(feedback);

  cy.getByTestId('RatingCard.Send').click();
};

export const removeRate = (rateId: ArticleRatingEntity['id']) => {
  cy.request({
    headers: {
      Authorization: true,
    },
    method: 'DELETE',
    url: `/article-ratings/${rateId}`,
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      setRate(starsCount: Rating['rate'], feedback: Rating['feedback']): Chainable<void>;
      removeRate(rateId: ArticleRatingEntity['id']): Chainable<void>;
    }
  }
}
