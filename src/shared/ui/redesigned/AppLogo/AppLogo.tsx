import { memo } from 'react';

import AppSvg from '@/shared/assets/icons/logo.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../Stack';
import { Icon } from '../Icon';

import classes from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo(({ className, size = 80 }: AppLogoProps) => (
  <HStack className={classes.appLogoWrapper} max>
    <Icon
      className={classNames(classes.logo, {}, [className])}
      color='black'
      height={size}
      Svg={AppSvg}
      width={size}
    />

    <div
      className={classes.gradientBig}
      style={{
        height: size * 3.75,
        left: `-${size * 1.25}px`,
        width: size * 3.75,
      }}
    />

    <div
      className={classes.gradientSmall}
      style={{
        height: size * 2.5,
        left: `-${size * 0.675}px`,
        width: size * 2.5,
      }}
    />
  </HStack>
));

AppLogo.displayName = 'AppLogo';
