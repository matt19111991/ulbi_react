import { userEvent } from '@storybook/testing-library';
import { screen } from '@testing-library/react';

import { componentTestRenderer } from 'shared/lib/tests/componentTestRenderer/componentTestRenderer';

import { Counter } from './Counter';

describe('Counter', () => {
  test('test render', () => {
    componentTestRenderer(<Counter />, {
      initialState: {
        counter: {
          value: 10,
        },
      },
    });

    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
  });

  test('decrement', () => {
    componentTestRenderer(<Counter />, {
      initialState: {
        counter: {
          value: 10,
        },
      },
    });

    userEvent.click(screen.getByTestId('decrement-btn'));

    expect(screen.getByTestId('value-title')).toHaveTextContent('9');
  });

  test('increment', () => {
    componentTestRenderer(<Counter />, {
      initialState: {
        counter: {
          value: 10,
        },
      },
    });

    userEvent.click(screen.getByTestId('increment-btn'));

    expect(screen.getByTestId('value-title')).toHaveTextContent('11');
  });
});
