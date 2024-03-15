import { memo, useMemo } from 'react';
import type { CSSProperties } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import UserIcon from '../../../assets/icons/user-filled-32-32.svg';

import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

import { AppImage } from '../../redesigned/AppImage';

import classes from './Avatar.module.scss';

interface AvatarProps {
  /**
   * Альтернативный текст для изображения
   */
  alt?: string;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Инвертировать fallback?
   */
  fallbackInverted?: boolean;

  /**
   * Размер аватара
   */
  size?: number;

  /**
   * Ссылка для аватара
   */
  src?: string;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Avatar = memo(({ alt, className, fallbackInverted, size = 100, src }: AvatarProps) => {
  // избегаем лишних перерендеров с 'useMemo'
  const styles = useMemo<CSSProperties>(
    () => ({
      height: size,
      lineHeight: size || '100px',
      width: size,
    }),
    [size],
  );

  const errorFallback = (
    <Icon height={size} inverted={fallbackInverted} Svg={UserIcon} width={size} />
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
