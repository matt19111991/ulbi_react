import { memo, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, TextareaHTMLAttributes } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { Mods } from '@/shared/lib/classNames/classNames';

import { HStack, VStack } from '../Stack';
import { Text } from '../Text';

import classes from './TextArea.module.scss';

/*
  без 'Omit' будет конфликт типов для 'TextareaHTMLAttributes':
    'onChange' в этом типе ожидает 'event' в аргументах, а мы передаем '(value: string, name: string)'
*/
type HTMLTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>;

interface TextAreaProps extends HTMLTextAreaProps {
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
   * Высота текстового поля, определяется количеством отображаемых строк
   */
  rows?: number;

  /**
   * Значение поля ввода
   */
  value?: string | number;

  /**
   * Выровнять лэйбл и поле ввода по вертикали
   */
  verticalLabel?: boolean;
}

export const TextArea = memo(
  ({
    autoFocus,
    className,
    fullWidth,
    label,
    onChange,
    placeholder,
    readOnly,
    rows = 3,
    value,
    verticalLabel = false,
    ...rest
  }: TextAreaProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const ref = useRef<HTMLTextAreaElement>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
        onFocus();

        ref.current?.focus();
      }
    }, [autoFocus]);

    const wrapperMods: Mods = {
      [classes.focused]: isFocused,
      [classes.readonly]: readOnly,
    };

    const textAreaMods: Mods = {
      [classes.fullWidth]: fullWidth,
    };

    const textarea = (
      <div className={classNames(classes.TextAreaWrapper, wrapperMods, [className])}>
        <textarea
          className={classNames(classes.textarea, textAreaMods)}
          onBlur={onBlur}
          onChange={onChangeHandler}
          onFocus={onFocus}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={ref}
          rows={rows}
          value={value}
          {...rest}
        />
      </div>
    );

    if (label) {
      const align = verticalLabel ? 'start' : 'center';
      const StackForLabel = verticalLabel ? VStack : HStack;

      return (
        <StackForLabel align={align} gap='8'>
          <Text text={label} />

          {textarea}
        </StackForLabel>
      );
    }

    return textarea;
  },
);

TextArea.displayName = 'TextArea';
