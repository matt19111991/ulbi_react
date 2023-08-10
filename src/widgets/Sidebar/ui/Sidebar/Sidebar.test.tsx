import { fireEvent, screen } from '@testing-library/react';

import {
  componentTestRenderer,
} from '@/shared/lib/tests/componentTestRenderer/componentTestRenderer';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  test('Test render', () => {
    componentTestRenderer(<Sidebar />);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('Test toggle', () => {
    componentTestRenderer(<Sidebar />);

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toBeInTheDocument();

    const toggleBtn = screen.getByTestId('sidebar-toggle');

    fireEvent.click(toggleBtn);

    expect(sidebar).toHaveClass('collapsed');
  });
});
