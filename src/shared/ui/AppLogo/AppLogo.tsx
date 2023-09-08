import { memo } from 'react';

import AppSvg from '@/shared/assets/icons/logo.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../Stack';

import classes from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
}

export const AppLogo = memo(({ className }: AppLogoProps) => (
  <HStack className={classNames(classes.appLogoWrapper, {}, [className])} justify='center' max>
    <div className={classes.gradientBig} />
    <div className={classes.gradientSmall} />

    <AppSvg className={classes.logo} />
  </HStack>
));

AppLogo.displayName = 'AppLogo';
