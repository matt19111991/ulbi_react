import {
  forwardRef,
  ForwardedRef,
  memo,
  ReactNode,
} from 'react';

import { Link, LinkProps } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  RED = 'red',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  children?: ReactNode;
  className?: string;
  invertedTheme?: AppLinkTheme;
}

const ForwardedAppLink = forwardRef(({
  className,
  children,
  invertedTheme = AppLinkTheme.PRIMARY,
  to,
  ...rest
}: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => (
  <Link
    className={
      classNames(classes.AppLink, {}, [className, classes[invertedTheme]])
    }
    ref={ref}
    to={to}
    {...rest}
  >
    {children}
  </Link>
));

ForwardedAppLink.displayName = 'ForwardedAppLink';

export const AppLink = memo(ForwardedAppLink);
