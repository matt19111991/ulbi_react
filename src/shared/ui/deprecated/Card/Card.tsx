import { memo } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Card.module.scss';

/**
 * Внешний вид карточки
 */
export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

/*
  расширяем интерфейс, чтобы 'TS' понимал 'props', если мы захотим пробросить
  данные из 'useHover()' и т.п.
*/
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Содержимое карточки
   */
  children?: ReactNode;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * 'ID' для тестов
   */
  'data-testid'?: string;

  /**
   * Растягивать на всю доступную ширину?
   */
  max?: boolean;

  /**
   * Тема карточки
   */
  theme?: CardTheme;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Card = memo(
  ({
    className,
    children,
    'data-testid': dataTestId = 'Card',
    max,
    theme = CardTheme.NORMAL,
    ...rest
  }: CardProps) => (
    <div
      className={classNames(classes.Card, { [classes.max]: max }, [className, classes[theme]])}
      data-testid={dataTestId}
      {...rest}
    >
      {children}
    </div>
  ),
);

Card.displayName = 'Card';
