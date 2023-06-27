import { fireEvent, screen } from '@testing-library/react';

import {
  renderWithTranslation,
} from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';

import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';

describe('Sidebar', () => {
  test('Test render', () => {
    renderWithTranslation(<Sidebar />);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('Test toggle', () => {
    renderWithTranslation(<Sidebar />);

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toBeInTheDocument();

    const toggleBtn = screen.getByTestId('sidebar-toggle');

    fireEvent.click(toggleBtn);

    expect(sidebar).toHaveClass('collapsed');
  });
});
