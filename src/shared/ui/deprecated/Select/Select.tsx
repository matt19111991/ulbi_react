import { useMemo } from 'react';
import type { ChangeEvent } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { Mods } from '@/shared/lib/classNames/classNames';

import { genericMemo } from '@/shared/lib/components/genericMemo/genericMemo';

import classes from './Select.module.scss';

export interface SelectOption<T extends string = string> {
  /**
   * Содержимое
   */
  content: string;

  /**
   * Значение пункта меню
   */
  value: T;
}

interface SelectProps<T extends string> {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * 'ID' для тестов
   */
  'data-testid'?: string;

  /**
   * Лэйбл
   */
  label?: string;

  /**
   * Обработчик для выбора пункта меню
   */
  onChange?: (value: T) => void;

  /**
   * Пункты меню
   */
  options?: SelectOption<T>[];

  /**
   * Режим только для чтения
   */
  readOnly?: boolean;

  /**
   * Выбранное значение
   */
  value?: T;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
const Select = <T extends string>({
  className,
  'data-testid': dataTestId = 'Select',
  label,
  onChange,
  options,
  readOnly,
  value,
}: SelectProps<T>) => {
  const optionsList = useMemo<JSX.Element[] | undefined>(
    () =>
      options?.map((option) => (
        <option className={classes.option} key={option.value} value={option.value}>
          {option.content}
        </option>
      )),
    [options],
  );

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    // 'onChange?.()' => функция не будет вызвана, если не будет передана
    onChange?.(e.target.value as T);
  };

  const mods: Mods = {
    [classes.readonly]: readOnly,
  };

  return (
    <div className={classNames('', mods, [className])}>
      {label && <span className={classes.label}>{`${label}>`}</span>}

      <select
        aria-label={label ?? 'select'}
        className={classes.select}
        data-testid={dataTestId}
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
