import { ChangeEvent, memo, TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import { HStack, VStack } from '../Stack';
import { Text } from '../Text';

import classes from './TextArea.module.scss';

/* без 'Omit' будет конфликт типов: 'onChange' принимает 'event', а не 'string',
   а в TextareaHTMLAttributes<HTMLTextAreaElement есть свое 'readOnly' свойство
*/
type HTMLTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'readOnly' | 'value'
>;

interface TextAreaProps extends HTMLTextAreaProps {
  autoFocus?: boolean;
  className?: string;
  cols?: number;
  fullWidth?: boolean;
  label?: string;
  onChange?: (value: string, name: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  rows?: number;
  value?: string | number;
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
    };

    const textAreaMods: Mods = {
      [classes.fullWidth]: fullWidth,
    };

    const textarea = (
      <div className={classNames(classes.TextAreaWrapper, wrapperMods, [className])}>
        <textarea
          className={classNames(classes.textarea, textAreaMods, [])}
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
        <StackForLabel align={align} gap='8' max>
          <Text text={label} />

          {textarea}
        </StackForLabel>
      );
    }

    return textarea;
  },
);

TextArea.displayName = 'TextArea';
