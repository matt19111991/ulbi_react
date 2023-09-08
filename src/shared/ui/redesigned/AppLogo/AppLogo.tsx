import { memo } from 'react';

import AppSvg from '@/shared/assets/icons/logo.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Icon } from '../../deprecated/Icon';
import { HStack } from '../../deprecated/Stack';

import classes from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo(({ className, size = 80 }: AppLogoProps) => (
  <HStack className={classNames(classes.appLogoWrapper, {}, [className])} justify='center' max>
    <div className={classes.gradientBig} />
    <div className={classes.gradientSmall} />

    <Icon className={classes.logo} color='black' height={size} Svg={AppSvg} width={size} />
  </HStack>
));

AppLogo.displayName = 'AppLogo';
