import { CSSProperties, memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { getRouteProfile } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';

import UserIcon from '../../../assets/icons/user-filled-32-32.svg';

import { AppImage } from '../AppImage/AppImage';
import { Icon } from '../Icon/Icon';
import { Skeleton } from '../Skeleton/Skeleton';

import classes from './Avatar.module.scss';

interface AvatarProps {
  alt?: string;
  className?: string;
  profileId?: string;
  size?: number;
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
