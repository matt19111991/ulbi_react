import { HTMLAttributes, memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Card.module.scss';

export type CardPadding = '0' | '8' | '16' | '24';

export type CardVariant = 'light' | 'normal' | 'outlined';

// расширяем интерфейс, чтобы TS понимал 'props', если мы захотим пробросить данные из 'useHover' и т.п.
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  max?: boolean;
  padding?: CardPadding;
  variant?: CardVariant;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'gap_0',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
};

export const Card = memo(
  ({ className, children, max, padding = '8', variant = 'normal', ...rest }: CardProps) => {
    const paddingClass = mapPaddingToClass[padding];

    return (
      <div
        className={classNames(classes.Card, { [classes.max]: max }, [
          className,
          classes[paddingClass],
          classes[variant],
        ])}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
