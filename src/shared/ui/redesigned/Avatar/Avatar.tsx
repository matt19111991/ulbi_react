import { memo, useCallback, useMemo } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router';

import UserIcon from '@/shared/assets/icons/user-filled-32-32.svg';

import { getRouteProfile } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';

import { AppImage } from '../AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

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
   * 'ID' профиля
   */
  profileId?: string;

  /**
   * Размер аватара
   */
  size?: number;

  /**
   * Ссылка для аватара
   */
  src?: string;
}

export const Avatar = memo(({ alt, className, profileId, size = 100, src }: AvatarProps) => {
  const navigate = useNavigate();

  // избегаем лишних перерендеров с 'useMemo'
  const styles = useMemo<CSSProperties>(
    () => ({
      height: size,
      lineHeight: size || '100px',
      width: size,
    }),
    [size],
  );

  const onRedirectToProfile = useCallback(() => {
    if (profileId) {
      navigate(getRouteProfile(profileId));
    }
  }, [navigate, profileId]);

  const errorFallback = <Icon height={size} Svg={UserIcon} width={size} />;

  const loadingFallback = <Skeleton border='50%' height={size} width={size} />;

  return (
    <AppImage
      alt={alt}
      className={classNames(classes.Avatar, { [classes.clickable]: profileId }, [className])}
      errorFallback={errorFallback}
      loadingFallback={loadingFallback}
      onClick={onRedirectToProfile}
      src={src}
      style={styles} /* у 'style' приоритет над 'className' */
    />
  );
});

Avatar.displayName = 'Avatar';
