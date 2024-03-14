import { memo, useEffect, useRef, useState } from 'react';

import type {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  MutableRefObject,
  UIEvent,
} from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { Mods } from '@/shared/lib/classNames/classNames';

import classes from './Input.module.scss';

/*
  без 'Omit' будет конфликт типов: 'onChange' в 'InputHTMLAttributes' ждет
 'event' в аргументах, а мы передаем 'string'
*/
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

interface InputProps extends HTMLInputProps {
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
   * Обработчик для изменения значения поля
   */
  onChange?: (value: string) => void;

  /**
   * Лэйбл для поля ввода
   */
  placeholder?: string;

  /**
   * Режим только для чтения
   */
  readOnly?: boolean;

  /**
   * Тип поля ввода
   */
  type?: HTMLInputTypeAttribute;

  /**
   * Значение поля ввода
   */
  value?: string | number;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Input = memo(
  ({
    autoFocus,
    className,
    fullWidth,
    onChange,
    placeholder,
    readOnly,
    type = 'text',
    value,
    ...rest
  }: InputProps) => {
    const [caretPosition, setCaretPosition] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    const ref: MutableRefObject<HTMLInputElement | null> = useRef(null);

    const isCaretVisible = isFocused && !readOnly && !rest.disabled;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      const inputValue = e.target.value;

      // 'onChange?.()' => функция не будет вызвана, если не будет передана
      onChange?.(inputValue);

      setCaretPosition(inputValue.length);
    };

    const onBlur = (): void => {
      setIsFocused(false);
    };

    const onFocus = (): void => {
      setIsFocused(true);
    };

    // 'onSelect()' срабатывает при выделении текста или фокусировании (тип события: 'UIEvent')
    const onSelect = (e: UIEvent<HTMLInputElement>): void => {
      /*
        перемещаем каретку вслед за курсором, тем самым исправляя кейс, когда каретка
        всегда стоит в начале, а мы переместили курсор в середину введенного текста

       'e.target' и 'e.currentTarget' ссылаются на один и тот же элемент, но у 'e.target' нет
        свойства 'selectionStart'
      */
      setCaretPosition(e.currentTarget.selectionStart || 0);
    };

    useEffect(() => {
      if (autoFocus) {
        setIsFocused(true);

        ref.current?.focus();
      }
    }, [autoFocus]);

    const wrapperMods: Mods = {
      [classes.readonly]: readOnly,
    };

    const inputMods: Mods = {
      [classes.fullWidth]: fullWidth,
    };

    return (
      <div className={classNames(classes.InputWrapper, wrapperMods, [className])}>
        {placeholder && <div className={classes.placeholder}>{`${placeholder}>`}</div>}

        <div className={classes.caretWrapper}>
          <input
            className={classNames(classes.input, inputMods)}
            onBlur={onBlur}
            onChange={onChangeHandler}
            onFocus={onFocus}
            onSelect={onSelect}
            readOnly={readOnly}
            ref={ref}
            type={type}
            value={value}
            {...rest}
          />

          {isCaretVisible && (
            <span
              className={classes.caret}
              style={{
                left: `${caretPosition * 8}px`,
              }}
            />
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
