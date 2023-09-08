import { memo } from 'react';

import AppSvg from '@/shared/assets/icons/logo.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Icon } from '../Icon';
import { HStack } from '../Stack';

import classes from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const AppLogo = memo(({ className }: AppLogoProps) => (
  <HStack className={classNames(classes.appLogoWrapper, {}, [className])} justify='center' max>
    <div className={classes.gradientBig} />
    <div className={classes.gradientSmall} />

    <Icon className={classes.logo} height={80} Svg={AppSvg} width={80} />
  </HStack>
));

AppLogo.displayName = 'AppLogo';
