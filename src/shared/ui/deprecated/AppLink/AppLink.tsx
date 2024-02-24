import { forwardRef, ForwardedRef, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './AppLink.module.scss';

/**
 * Внешний вид ссылки
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
   * Инвертированная тема
   */
  invertedTheme?: AppLinkTheme;
}

// от 'React.memo' нет смысла, т.к. 'forwardRef()' на каждый ререндер возвращает новую ссылку

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const AppLink = forwardRef(
  (
    { className, children, invertedTheme = AppLinkTheme.PRIMARY, to, ...rest }: AppLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <Link
      className={classNames(classes.AppLink, {}, [className, classes[invertedTheme]])}
      ref={ref}
      to={to}
      {...rest}
    >
      {children}
    </Link>
  ),
);

AppLink.displayName = 'AppLink';
