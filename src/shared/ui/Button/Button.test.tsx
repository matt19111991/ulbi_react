import { render, screen } from '@testing-library/react';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';

describe('Button', () => {
  test('Test render', () => {
    render(<Button>Test</Button>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('Test clear theme', () => {
    render(<Button theme={ButtonTheme.CLEAR}>Test</Button>);

    // screen.debug(); // можно посмотреть, что отрисовано в тестовом DOM

    expect(screen.getByText('Test')).toHaveClass('clear');
  });
});
