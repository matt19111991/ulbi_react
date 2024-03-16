import type { ReactNode } from 'react';

export type DropdownDirection = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface TabItem {
  content: ReactNode;
  value: string;
}
