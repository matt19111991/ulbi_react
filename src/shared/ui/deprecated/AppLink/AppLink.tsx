import { forwardRef } from 'react';
import type { ForwardedRef, ReactNode } from 'react';
import { Link } from 'react-router';
import type { LinkProps } from 'react-router';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './AppLink.module.scss';

/**
 * Тема для ссылки
 */
export enum AppLinkTheme {
  PRIMARY = 'primary',
  RED = 'red',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  /**
   * Содержимое ссылки
   */
  children?: ReactNode;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Тема для ссылки
   */
  theme?: AppLinkTheme;
}

// 'forwardRef()' устарел, здесь для примера, в 'React v.19' 'ref' можно доставать из 'props'

// от 'React.memo' нет смысла, т.к. 'forwardRef()' на каждый ререндер возвращает новую ссылку

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const AppLink = forwardRef(
  (
    { className, children, theme = AppLinkTheme.PRIMARY, to, ...rest }: AppLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <Link
      className={classNames(classes.AppLink, {}, [className, classes[theme]])}
      ref={ref}
      to={to}
      {...rest}
    >
      {children}
    </Link>
  ),
);

AppLink.displayName = 'AppLink';
