import { memo, useMemo } from 'react';
import type { CSSProperties } from 'react';

import AppSvg from '@/shared/assets/icons/logo.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../Stack';
import { Icon } from '../Icon';

import classes from './AppLogo.module.scss';

interface AppLogoProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Размер изображения
   */
  size?: number;
}

export const AppLogo = memo(({ className, size = 80 }: AppLogoProps) => {
  const gradientSmallStyles = useMemo<CSSProperties>(
    () => ({
      height: size * 2.5,
      left: `-${size * 0.675}px`,
      width: size * 2.5,
    }),
    [size],
  );

  const gradientBigStyles = useMemo<CSSProperties>(
    () => ({
      height: size * 3.75,
      left: `-${size * 1.25}px`,
      width: size * 3.75,
    }),
    [size],
  );

  return (
    <HStack className={classes.appLogoWrapper} max>
      <Icon
        className={classNames(classes.logo, {}, [className])}
        height={size}
        Svg={AppSvg}
        width={size}
      />

      <div className={classes.gradientSmall} style={gradientSmallStyles} />

      <div className={classes.gradientBig} style={gradientBigStyles} />
    </HStack>
  );
});

AppLogo.displayName = 'AppLogo';
