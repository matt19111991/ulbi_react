import { forwardRef } from 'react';
import type { ForwardedRef, ReactNode } from 'react';

import { NavLink } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './AppLink.module.scss';

type AppLinkVariant = 'primary' | 'red';

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
    { activeClassName = '', className, children, to, variant = 'primary', ...rest }: AppLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    /*
      подготовка к переходу на 'react-router-dom v.7', в 'v.7' версии
      используются пути для ссылок в виде '../articles' вместе '/articles'
    */
    const reactRouterDomV7To = `${(to as string).length === 0 ? '' : '..'}${to}`;

    return (
      // у 'NavLink' есть свойство 'isActive', 'className' используем в этом случае как функцию
      <NavLink
        className={({ isActive }) =>
          classNames('', { [activeClassName]: isActive }, [className, classes[variant]])
        }
        ref={ref}
        to={reactRouterDomV7To}
        {...rest}
      >
        {children}
      </NavLink>
    );
  },
);

AppLink.displayName = 'AppLink';
