import { CSSProperties, memo, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Skeleton.module.scss';

interface SkeletonProps {
  border?: string;
  className?: string;
  height?: string | number;
  width?: string | number;
}

export const Skeleton = memo(({ border, className, height, width }: SkeletonProps) => {
  const styles: CSSProperties = useMemo(
    () => ({
      borderRadius: border,
      height,
      width,
    }),
    [border, height, width],
  );

  return <div className={classNames(classes.Skeleton, {}, [className])} style={styles} />;
});

Skeleton.displayName = 'Skeleton';
