import { forwardRef, ForwardedRef, memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  children?: ReactNode;
  className?: string;
  variant?: AppLinkVariant;
}

const ForwardedAppLink = forwardRef(
  (
    { className, children, variant = 'primary', to, ...rest }: AppLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <Link className={classNames('', {}, [className, classes[variant]])} ref={ref} to={to} {...rest}>
      {children}
    </Link>
  ),
);

ForwardedAppLink.displayName = 'ForwardedAppLink';

export const AppLink = memo(ForwardedAppLink);
