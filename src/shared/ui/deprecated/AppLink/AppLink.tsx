import { forwardRef } from 'react';
import type { ForwardedRef, ReactNode } from 'react';

import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

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

// от 'React.memo' нет смысла, т.к. 'forwardRef()' на каждый ререндер возвращает новую ссылку

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const AppLink = forwardRef(
  (
    { className, children, theme = AppLinkTheme.PRIMARY, to, ...rest }: AppLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    /*
      подготовка к переходу на 'react-router-dom v.7', в 'v.7' версии
      используются пути для ссылок в виде '../articles' вместе '/articles'
    */
    const reactRouterDomV7To = `${(to as string).length === 0 ? '' : '..'}${to}`;

    return (
      <Link
        className={classNames(classes.AppLink, {}, [className, classes[theme]])}
        ref={ref}
        to={reactRouterDomV7To}
        {...rest}
      >
        {children}
      </Link>
    );
  },
);

AppLink.displayName = 'AppLink';
