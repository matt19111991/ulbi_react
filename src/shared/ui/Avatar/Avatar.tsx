import { CSSProperties, memo, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import UserIcon from '../../assets/icons/user-filled-32-32.svg';

import { AppImage } from '../AppImage/AppImage';
import { Icon } from '../Icon/Icon';
import { Skeleton } from '../Skeleton/Skeleton';

import classes from './Avatar.module.scss';

interface AvatarProps {
  alt?: string;
  className?: string;
  fallbackInverted?: boolean;
  size?: number;
  src?: string;
}

export const Avatar = memo(({
  alt,
  className,
  fallbackInverted,
  size = 100,
  src,
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(() => ({ // избегаем лишних перерендеров с 'useMemo'
    height: size,
    lineHeight: size || '100px',
    width: size,
  }), [size]);

  const errorFallback = (
    <Icon
      height={size}
      inverted={fallbackInverted}
      Svg={UserIcon}
      width={size}
    />
  );

  const loadingFallback = <Skeleton border='50%' height={size} width={size} />;

  return (
    <AppImage
      alt={alt}
      className={classNames(classes.Avatar, {}, [className])}
      errorFallback={errorFallback}
      loadingFallback={loadingFallback}
      src={src}
      style={styles} /* у 'style' приоритет над 'className' */
    />
  );
});

Avatar.displayName = 'Avatar';
