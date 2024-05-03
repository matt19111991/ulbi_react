import { screen } from '@testing-library/react';

// 'userEvent' должен быть асинхронным: 'await userEvent.click(...);'
import userEvent from '@testing-library/user-event';

import { componentTestRenderer } from '@/shared/lib/tests';

import { Counter } from './Counter';

describe('Counter', () => {
  test('test component render', () => {
    componentTestRenderer(<Counter />, {
      initialState: {
        counter: {
          value: 10,
        },
      },
    });

    expect(screen.getByTestId('counter-value.Header')).toHaveTextContent('10');
  });

  test('decrement button click', async () => {
    componentTestRenderer(<Counter />, {
      initialState: {
        counter: {
          value: 10,
        },
      },
    });

    await userEvent.click(screen.getByTestId('decrement-btn'));

    expect(screen.getByTestId('counter-value.Header')).toHaveTextContent('9');
  });

  test('increment button click', async () => {
    componentTestRenderer(<Counter />, {
      initialState: {
        counter: {
          value: 10,
        },
      },
    });

    await userEvent.click(screen.getByTestId('increment-btn'));

    expect(screen.getByTestId('counter-value.Header')).toHaveTextContent('11');
  });
});
