import { memo } from 'react';

import AppSvg from '@/shared/assets/icons/logo.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../../deprecated/Stack';

import { Icon } from '../Icon';

import classes from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo(({ className, size = 80 }: AppLogoProps) => (
  <HStack className={classes.appLogoWrapper} max>
    <div className={classes.gradientBig} />
    <div className={classes.gradientSmall} />

    <Icon
      className={classNames(classes.logo, {}, [className])}
      color='black'
      height={size}
      Svg={AppSvg}
      width={size}
    />
  </HStack>
));

AppLogo.displayName = 'AppLogo';
