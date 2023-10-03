import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Overlay.module.scss';

interface OverlayProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Обработчик клика по наложению
   */
  onClick?: () => void;
}

export const Overlay = memo(({ className, onClick }: OverlayProps) => (
  <div className={classNames(classes.Overlay, {}, [className])} onClick={onClick} />
));

Overlay.displayName = 'Overlay';
