import { memo } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Card.module.scss';

/**
 * Закругления углов карточки
 */
export type CardBorder = 'keen' | 'partial' | 'round';

/**
 * Отступы между контентом и границами карточки
 */
export type CardPadding = '0' | '8' | '16' | '24';

/**
 * Внешний вид карточки
 */
export type CardVariant = 'light' | 'normal' | 'outlined';

/*
  расширяем интерфейс, чтобы 'TS' понимал 'props', если мы захотим пробросить
  данные из 'useHover' и т.п.
*/
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Закругления углов карточки
   */
  border?: CardBorder;

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
   * Отступы между контентом и границами карточки
   */
  padding?: CardPadding;

  /**
   * Внешний вид карточки
   */
  variant?: CardVariant;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'gap_0',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
};

export const Card = memo(
  ({
    border = 'keen',
    className,
    children,
    'data-testid': dataTestId = 'Card',
    max,
    padding = '8',
    variant = 'normal',
    ...rest
  }: CardProps) => {
    const paddingClass = mapPaddingToClass[padding];

    const additionalClasses = [className, classes[border], classes[paddingClass], classes[variant]];

    return (
      <div
        className={classNames(classes.Card, { [classes.max]: max }, additionalClasses)}
        data-testid={dataTestId}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
