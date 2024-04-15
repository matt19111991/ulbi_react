import { memo } from 'react';
import type { ReactElement } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './StickyContentLayout.module.scss';

interface StickyContentLayoutProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Основной контент
   */
  content: ReactElement;

  /**
   * Левый липкий компонент
   */
  left?: ReactElement;

  /**
   * Правый липкий компонент
   */
  right?: ReactElement;
}

export const StickyContentLayout = memo(
  ({ className, content, left, right }: StickyContentLayoutProps) => (
    <div className={classNames(classes.StickyContentLayout, {}, [className])}>
      {left && <div className={classes.left}>{left}</div>}

      <div className={classes.content}>{content}</div>

      {right && <div className={classes.right}>{right}</div>}
    </div>
  ),
);

StickyContentLayout.displayName = 'StickyContentLayout';
