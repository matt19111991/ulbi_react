import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  /**
   * Что рендерим?
   */
  children: ReactNode;

  /**
   * Куда рендерим?
   */
  element?: HTMLElement;
}

export const Portal = ({ children, element = document.body }: PortalProps) =>
  createPortal(children, element);
