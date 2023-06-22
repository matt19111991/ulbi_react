import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  RED = 'red',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  invertedTheme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = ({
  className,
  children,
  invertedTheme = AppLinkTheme.PRIMARY,
  to,
  ...rest
}) => (
  <Link
    className={
      classNames(classes.AppLink, {}, [className, classes[invertedTheme]])
    }
    to={to}
    {...rest}
  >
    {children}
  </Link>
);
