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
  containerElement?: HTMLElement;
}

export const Portal = ({ children, containerElement = document.body }: PortalProps) =>
  createPortal(children, containerElement);
