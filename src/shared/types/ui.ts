import type { ReactNode } from 'react';

export type DropdownDirection = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface ListBoxItem {
  /**
   * Содержимое
   */
  content: ReactNode;

  /**
   * Элемент меню активен или нет?
   */
  disabled?: boolean;

  /**
   * Значение пункта меню
   */
  value: string;
}

export interface TabItem {
  content: ReactNode;
  value: string;
}
