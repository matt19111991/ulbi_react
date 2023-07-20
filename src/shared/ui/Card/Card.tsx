import { HTMLAttributes, memo, ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './Card.module.scss';

// расширяем интерфейс, чтобы TS понимал 'props', если мы захотим пробросить данные из 'useHover' и т.п.
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export const Card = memo(({ className, children, ...rest }: CardProps) => (
  <div
    className={classNames(classes.Card, {}, [className])}
    {...rest}
  >
    {children}
  </div>
));

Card.displayName = 'Card';
