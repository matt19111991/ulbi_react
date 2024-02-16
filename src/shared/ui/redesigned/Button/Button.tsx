import { memo } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { Mods } from '@/shared/lib/classNames/classNames';

import classes from './Button.module.scss';

/**
 * Цвет кнопки
 */
export type ButtonColor = 'error' | 'normal' | 'success';

/**
 * Размеры кнопки
 */
export type ButtonSize = 's' | 'm' | 'l' | 'xl';

/**
 * Внешний вид кнопки
 */
export type ButtonVariant = 'clear' | 'filled' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Левый компонент-аддон
   */
  addonLeft?: ReactNode;

  /**
   * Правый компонент-аддон
   */
  addonRight?: ReactNode;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Содержимое кнопки
   */
  children?: ReactNode;

  /**
   * Цвет кнопки
   */
  color?: ButtonColor;

  /**
   * 'ID' для тестов
   */
  'data-testid'?: string;

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
    color = 'normal',
    'data-testid': dataTestId = 'Button',
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

    const additionalClasses = [className, classes[color], classes[size], classes[variant]];

    return (
      <button
        className={classNames(classes.Button, mods, additionalClasses)}
        data-testid={dataTestId}
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
