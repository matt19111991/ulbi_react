import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import classes from './Button.module.scss';

export type ButtonVariant = 'clear' | 'filled' | 'outline';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  addonLeft?: ReactNode;

  addonRight?: ReactNode;

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
   * Размер кнопки в соответствии с дизайн системой
   */
  size?: ButtonSize;

  /**
   * Флаг, делающий кнопку квадратной
   */
  square?: boolean;

  /**
   * Тема кнопки. Отвечает за визуал
   */
  variant?: ButtonVariant;
}

export const Button = memo(
  ({
    addonLeft,
    addonRight,
    className,
    children,
    disabled,
    fullWidth,
    size = 'm',
    square,
    variant = 'outline',
    ...rest
  }: ButtonProps) => {
    const mods: Mods = {
      [classes.disabled]: disabled,
      [classes.fullWidth]: fullWidth,
      [classes.square]: square,
      [classes.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
      <button
        className={classNames(classes.Button, mods, [className, classes[size], classes[variant]])}
        disabled={disabled}
        {...rest}
      >
        <div className={classes.addonLeft}>{addonLeft}</div>

        {children}

        <div className={classes.addonRight}>{addonRight}</div>
      </button>
    );
  },
);

Button.displayName = 'Button';
