import { memo, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { Mods } from '@/shared/lib/classNames/classNames';

import { HStack, VStack } from '../Stack';
import { Text } from '../Text';

import classes from './Input.module.scss';

/*
  без 'Omit' будет конфликт типов для 'InputHTMLAttributes':
    'onChange' в этом типе ожидает 'event' в аргументах, а мы передаем '(value: string, name: string)'
    'size' в этом типе - это 'number | undefined', а мы передаем 'string'
*/
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'>;

/**
 * Размеры поля ввода
 */
type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
  /**
   * Левый компонент-аддон
   */
  addonLeft?: ReactNode;

  /**
   * Правый компонент-аддон
   */
  addonRight?: ReactNode;

  /**
   * Фокус при монтировании
   */
  autoFocus?: boolean;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Растягивать на всю доступную ширину?
   */
  fullWidth?: boolean;

  /**
   * Лэйбл
   */
  label?: string;

  /**
   * Обработчик для изменения значения поля
   */
  onChange?: (value: string, name: string) => void;

  /**
   * Placeholder
   */
  placeholder?: string;

  /**
   * Режим только для чтения
   */
  readOnly?: boolean;

  /**
   * Размер поля ввода
   */
  size?: InputSize;

  /**
   * Тип поля ввода
   */
  type?: HTMLInputTypeAttribute;

  /**
   * Значение поля ввода
   */
  value?: string | number;

  /**
   * Выровнять лэйбл и поле ввода по вертикали
   */
  verticalLabel?: boolean;
}

export const Input = memo(
  ({
    addonLeft,
    addonRight,
    autoFocus,
    className,
    fullWidth,
    label,
    onChange,
    placeholder,
    readOnly,
    size = 'm',
    type = 'text',
    value,
    verticalLabel = false,
    ...rest
  }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const ref = useRef<HTMLInputElement>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      // 'onChange?.()' => функция не будет вызвана, если не будет передана
      onChange?.(e.target.value, e.target.name);
    };

    const onBlur = (): void => {
      setIsFocused(false);
    };

    const onFocus = (): void => {
      setIsFocused(true);
    };

    useEffect(() => {
      if (autoFocus) {
        setIsFocused(true);

        ref.current?.focus();
      }
    }, [autoFocus]);

    const wrapperMods: Mods = {
      [classes.focused]: isFocused,
      [classes.readonly]: readOnly,
      [classes.withAddonLeft]: Boolean(addonLeft),
      [classes.widthAddonLeft]: Boolean(addonRight),
    };

    const inputMods: Mods = {
      [classes.fullWidth]: fullWidth,
    };

    const input = (
      <div className={classNames(classes.InputWrapper, wrapperMods, [className, classes[size]])}>
        <div className={classes.addonLeft}>{addonLeft}</div>

        <input
          className={classNames(classes.input, inputMods)}
          onBlur={onBlur}
          onChange={onChangeHandler}
          onFocus={onFocus}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={ref}
          type={type}
          value={value}
          {...rest}
        />

        <div className={classes.addonRight}>{addonRight}</div>
      </div>
    );

    if (label) {
      const align = verticalLabel ? 'start' : 'center';
      const StackForLabel = verticalLabel ? VStack : HStack;

      return (
        <StackForLabel align={align} gap='8' max>
          <Text text={label} />

          {input}
        </StackForLabel>
      );
    }

    return input;
  },
);

Input.displayName = 'Input';
