import { CSSProperties, memo, useMemo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './Avatar.module.scss';

interface AvatarProps {
  alt?: string;
  className?: string;
  size?: number;
  src?: string;
}

export const Avatar = memo(({
  alt,
  className,
  size,
  src,
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(() => ({ // избегаем лишних перерендеров с 'useMemo'
    height: size || 100,
    lineHeight: size || '100px',
    width: size || 100,
  }), [size]);

  return (
    <img
      alt={alt}
      className={classNames(classes.Avatar, {}, [className])}
      src={src}
      style={styles} /* у 'style' приоритет над 'className' */
    />
  );
});

Avatar.displayName = 'Avatar';
