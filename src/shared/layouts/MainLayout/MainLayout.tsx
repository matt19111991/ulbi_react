import { memo, ReactElement } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './MainLayout.module.scss';

interface MainLayoutProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Основной контент
   */
  content: ReactElement;

  /**
   * Заголовок
   */
  header: ReactElement;

  /**
   * Левое боковое меню
   */
  sidebar: ReactElement;

  /**
   * Правый тулбар
   */
  toolbar?: ReactElement;
}

export const MainLayout = memo(
  ({ className, content, header, sidebar, toolbar }: MainLayoutProps) => (
    <div className={classNames(classes.MainLayout, {}, [className])}>
      <div className={classes.sidebar}>{sidebar}</div>
      <div className={classes.content}>{content}</div>

      <div className={classes.rightBar}>
        <div className={classes.header}>{header}</div>
        <div className={classes.toolbar}>{toolbar}</div>
      </div>
    </div>
  ),
);

MainLayout.displayName = 'MainLayout';
