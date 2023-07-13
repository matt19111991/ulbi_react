import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';

import classes from './Input.module.scss';

/* без 'Omit' будет конфликт типов: 'onChange' принимает 'event', а не 'string',
   а в InputHTMLAttributes<HTMLInputElement есть свое 'readOnly' свойство
*/
type HTMLInputProps =
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'readOnly' | 'value'>;

interface InputProps extends HTMLInputProps {
  autoFocus?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  type?: HTMLInputTypeAttribute;
  value?: string | number;
}

export const Input = memo(({
  autoFocus,
  className,
  onChange,
  placeholder,
  readOnly,
  type = 'text',
  value,
  ...rest
}: InputProps) => {
  const [caretPosition, setCaretPosition] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const isCaretVisible = isFocused && !readOnly;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value); // 'onChange?.()' => функция не будет вызвана, если не будет передана

    setCaretPosition(e.target.value.length);
  };

  const onBlur = (): void => {
    setIsFocused(false);
  };

  const onFocus = (): void => {
    setIsFocused(true);
  };

  // лайфхак для onSelect события и TypeScript
  const onSelect = (e: SyntheticEvent<HTMLInputElement, Event>): void => {
    const target = e.target as HTMLInputElement;

/*  перемещаем каретку вслед за курсором. исправляем кейс, когда каретка
    всегда стоит в конце, а мы переместили курсор в середину введенного текста
*/  setCaretPosition(target.selectionStart || 0);
  };

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);

      ref.current?.focus();
    }
  }, [autoFocus]);

  const mods: Mods = {
    [classes.readonly]: readOnly,
  };

  return (
    <div className={classNames(classes.InputWrapper, mods, [className])}>
      {placeholder && (
        <div className={classes.placeholder}>
          {`${placeholder}>`}
        </div>
      )}

      <div className={classes.caretWrapper}>
        <input
          className={classes.input}
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
              left: `${caretPosition * 9}px`,
            }}
          />
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';
