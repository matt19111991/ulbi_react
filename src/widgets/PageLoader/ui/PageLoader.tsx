import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/Loader';

import classes from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = memo(({ className }: PageLoaderProps) => (
  <div className={classNames(classes.PageLoader, {}, [className])}>
    <Loader />
  </div>
));

PageLoader.displayName = 'PageLoader';
