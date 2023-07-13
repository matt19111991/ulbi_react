import {
  ChangeEvent,
  JSX,
  memo,
  useMemo,
} from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';

import classes from './Select.module.scss';

interface SelectOption {
  content: string;
  value: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  readOnly?: boolean;
  value?: string;
}

export const Select = memo(({
  className,
  label,
  onChange,
  options,
  readOnly,
  value,
}: SelectProps) => {
  const optionsList = useMemo<JSX.Element[] | undefined>(() => {
    return options?.map((option) => (
      <option
        className={classes.option}
        key={option.value}
        value={option.value}
      >
        {option.content}
      </option>
    ));
  }, [options]);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    onChange?.(e.target.value);
  };

  const mods: Mods = {
    [classes.readonly]: readOnly,
  };

  return (
    <div className={classNames(classes.Wrapper, mods, [className])}>
      {label && <span className={classes.label}>{`${label}>`}</span>}

      <select
        className={classes.select}
        disabled={readOnly}
        onChange={onChangeHandler}
        value={value}
      >
        {optionsList}
      </select>
    </div>
  );
});

Select.displayName = 'Select';
