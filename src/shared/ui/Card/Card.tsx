import { HTMLAttributes, memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Card.module.scss';

export enum CardTheme {
  NORMAL =  'normal',
  OUTLINED =  'outlined',
}

// расширяем интерфейс, чтобы TS понимал 'props', если мы захотим пробросить данные из 'useHover' и т.п.
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  max?: boolean;
  theme?: CardTheme;
}

export const Card = memo(({
  className,
  children,
  max,
  theme = CardTheme.NORMAL,
  ...rest
}: CardProps) => (
  <div
    className={
      classNames(
        classes.Card,
        { [classes.max]: max },
        [className, classes[theme]],
      )
    }
    {...rest}
  >
    {children}
  </div>
));

Card.displayName = 'Card';
