import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { componentTestRenderer } from '@/shared/lib/tests';

import { Counter } from './Counter';

describe.skip('Counter', () => {
  test('test render', () => {
    componentTestRenderer(<Counter />, {
      initialState: {
        counter: {
          value: 10,
        },
      },
    });

    expect(screen.getByTestId('counter-value')).toHaveTextContent('10');
  });

  test('decrement', () => {
    componentTestRenderer(<Counter />, {
      initialState: {
        counter: {
          value: 10,
        },
      },
    });

    waitFor(() => {
      userEvent.click(screen.getByTestId('decrement-btn'));

      expect(screen.getByTestId('counter-value')).toHaveTextContent('9');
    });
  });

  test('increment', () => {
    componentTestRenderer(<Counter />, {
      initialState: {
        counter: {
          value: 10,
        },
      },
    });

    waitFor(() => {
      userEvent.click(screen.getByTestId('increment-btn'));

      expect(screen.getByTestId('counter-value')).toHaveTextContent('11');
    });
  });
});
