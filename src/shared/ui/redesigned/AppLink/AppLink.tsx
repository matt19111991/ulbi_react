import { forwardRef, ForwardedRef, memo, ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  /**
   * Класс для активной ссылки
   */
  activeClassName?: string;

  /**
   * Содержимое ссылки
   */
  children?: ReactNode;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Внешний вид ссылки
   */
  variant?: AppLinkVariant;
}

const ForwardedAppLink = forwardRef(
  (
    { activeClassName = '', className, children, variant = 'primary', to, ...rest }: AppLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    // у 'NavLink' есть свойство 'isActive'
    <NavLink
      className={({ isActive }) =>
        classNames('', { [activeClassName]: isActive }, [className, classes[variant]])
      }
      ref={ref}
      to={to}
      {...rest}
    >
      {children}
    </NavLink>
  ),
);

ForwardedAppLink.displayName = 'ForwardedAppLink';

export const AppLink = memo(ForwardedAppLink);
