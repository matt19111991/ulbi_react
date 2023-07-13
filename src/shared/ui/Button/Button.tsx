import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';

import classes from './Button.module.scss';

export enum ButtonTheme {
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  square?: boolean;
  theme?: string;
}

export const Button = memo(({
  className,
  children,
  disabled,
  size = ButtonSize.M,
  square,
  theme = ButtonTheme.OUTLINE,
  ...rest
}: ButtonProps) => {
  const mods: Mods = {
    [classes.disabled]: disabled,
    [classes[size]]: true,
    [classes.square]: square,
    [classes[theme]]: true,
  };

  return (
    <button
      className={classNames(classes.Button, mods, [className])}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
