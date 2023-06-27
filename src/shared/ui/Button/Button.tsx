import { ButtonHTMLAttributes, FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: string;
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  theme,
  ...rest
}) => (
  <button
    className={classNames(classes.Button, {}, [className, classes[theme]])}
    {...rest}
  >
    {children}
  </button>
);
