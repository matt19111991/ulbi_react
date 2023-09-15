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

import classes from './Input.module.scss';

/* без 'Omit' будет конфликт типов: 'onChange' принимает 'event', а не 'string',
   а в InputHTMLAttributes<HTMLInputElement есть свое 'readOnly' свойство
*/
type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'readOnly' | 'value'
>;

interface InputProps extends HTMLInputProps {
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  autoFocus?: boolean;
  className?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  type?: HTMLInputTypeAttribute;
  value?: string | number;
}

export const Input = memo(
  ({
    addonLeft,
    addonRight,
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
    const [isFocused, setIsFocused] = useState(false);

    const ref = useRef<HTMLInputElement>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value); // 'onChange?.()' => функция не будет вызвана, если не будет передана
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

    return (
      <div className={classNames(classes.InputWrapper, wrapperMods, [className])}>
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
  },
);

Input.displayName = 'Input';
