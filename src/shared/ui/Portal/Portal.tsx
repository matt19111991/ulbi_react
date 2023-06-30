import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode; // что?
  element?: HTMLElement; // куда?
}

export const Portal = ({
  children,
  element = document.body,
}: PortalProps) => createPortal(children, element);
