import { ButtonHTMLAttributes, FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './Button.module.scss';

export enum ButtonTheme {
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
  CLEAR = 'clear',
  OUTLINE = 'outline',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: ButtonSize;
  square?: boolean;
  theme?: string;
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  size = ButtonSize.M,
  square,
  theme,
  ...rest
}) => {
  const mods: Record<string, boolean> = {
    [classes[size]]: true,
    [classes.square]: square,
    [classes[theme]]: true,
  };

  return (
    <button
      className={classNames(classes.Button, mods, [className])}
      {...rest}
    >
      {children}
    </button>
  );
};
