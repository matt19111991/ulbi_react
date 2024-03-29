import { memo } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { Mods } from '@/shared/lib/classNames/classNames';

import classes from './Button.module.scss';

/**
 * Внешний вид кнопки
 */
export enum ButtonTheme {
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
}

/**
 * Размеры кнопки
 */
export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Содержимое кнопки
   */
  children?: ReactNode;

  /**
   * Флаг, отвечающий за работу кнопки
   */
  disabled?: boolean;

  /**
   * Увеличивает кнопку на всю свободную ширину
   */
  fullWidth?: boolean;

  /**
   * Размер кнопки в соответствии с дизайн-системой
   */
  size?: ButtonSize;

  /**
   * Флаг, делающий кнопку квадратной
   */
  square?: boolean;

  /**
   * Тема кнопки. Отвечает за визуал (в рамке / без стилей / противоположный теме цвет и т.д.)
   */
  theme?: ButtonTheme;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Button = memo(
  ({
    className,
    children,
    disabled,
    fullWidth,
    size = ButtonSize.M,
    square,
    theme = ButtonTheme.OUTLINE,
    ...rest
  }: ButtonProps) => {
    const mods: Mods = {
      [classes.disabled]: disabled,
      [classes.fullWidth]: fullWidth,
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
  },
);

Button.displayName = 'Button';
