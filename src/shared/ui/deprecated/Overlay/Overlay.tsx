import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Overlay = memo(({ className, onClick }: OverlayProps) => (
  <div className={classNames(classes.Overlay, {}, [className])} onClick={onClick} />
));

Overlay.displayName = 'Overlay';
