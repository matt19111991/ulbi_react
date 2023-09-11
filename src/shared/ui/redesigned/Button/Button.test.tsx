import { render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  test('Test render', () => {
    render(<Button>Test</Button>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('Test clear theme', () => {
    render(<Button variant='clear'>Test</Button>);

    // screen.debug(); // можно посмотреть, что отрисовано в тестовом DOM

    expect(screen.getByText('Test')).toHaveClass('clear');
  });
});
