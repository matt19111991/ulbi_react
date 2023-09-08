import { ChangeEvent, JSX, useMemo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import { genericMemo } from '@/shared/lib/components/genericMemo/genericMemo';

import classes from './Select.module.scss';

export interface SelectOption<T extends string> {
  content: string;
  value: T;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  onChange?: (value: T) => void;
  options?: SelectOption<T>[];
  readOnly?: boolean;
  value?: T;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
const Select = <T extends string>({
  className,
  label,
  onChange,
  options,
  readOnly,
  value,
}: SelectProps<T>) => {
  const optionsList = useMemo<JSX.Element[] | undefined>(() => {
    return options?.map((option) => (
      <option className={classes.option} key={option.value} value={option.value}>
        {option.content}
      </option>
    ));
  }, [options]);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    onChange?.(e.target.value as T);
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
};

const MemoizedSelect = genericMemo(Select);

export { MemoizedSelect as Select };
