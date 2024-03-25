import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Loader.module.scss';

// Анимация для компонента взята здесь: 'https://loading.io/css'

interface LoaderProps {
  /**
   * Внешний класс
   */
  className?: string;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Loader = memo(({ className }: LoaderProps) => (
  <div className={classNames(classes.ellipsis, {}, [className])}>
    <div />
    <div />
    <div />
    <div />
  </div>
));

Loader.displayName = 'Loader';
