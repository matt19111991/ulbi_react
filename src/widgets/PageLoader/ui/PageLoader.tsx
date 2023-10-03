import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Loader } from '@/shared/ui/deprecated/Loader';

import classes from './PageLoader.module.scss';

interface PageLoaderProps {
  /**
   * Внешний класс
   */
  className?: string;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const PageLoader = memo(({ className }: PageLoaderProps) => (
  <div className={classNames(classes.PageLoader, {}, [className])}>
    <Loader />
  </div>
));

PageLoader.displayName = 'PageLoader';
