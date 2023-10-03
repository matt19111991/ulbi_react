import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import { HStack, VStack } from '../Stack';
import { Text } from '../Text';

import classes from './Input.module.scss';

/**
 *  Без 'Omit' будет конфликт типов: 'onChange' принимает 'event', а не 'string',
 *  а в InputHTMLAttributes<HTMLInputElement есть свое 'readOnly' свойство
 */
type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'readOnly' | 'size' | 'value'
>;

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
   * Label
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
   * Выравнять label и поле ввода по вертикали
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
      onChange?.(e.target.value, e.target.name); // 'onChange?.()' => функция не будет вызвана, если не будет передана
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
          className={classNames(classes.input, inputMods, [])}
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
