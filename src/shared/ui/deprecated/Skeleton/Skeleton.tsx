import { memo, useMemo } from 'react';
import type { CSSProperties } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Skeleton.module.scss';

interface SkeletonProps {
  /**
   * Закругление границ
   */
  border?: string;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Высота
   */
  height?: string | number;

  /**
   * Ширина
   */
  width?: string | number;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
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
