import { forwardRef, ForwardedRef, ReactNode } from 'react';
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

// от 'React.memo' нет смысла, т.к. 'forwardRef()' на каждый ререндер возвращает новую ссылку
export const AppLink = forwardRef(
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

AppLink.displayName = 'AppLink';
