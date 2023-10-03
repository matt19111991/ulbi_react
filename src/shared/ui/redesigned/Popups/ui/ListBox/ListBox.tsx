import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HeadlessListBox } from '@headlessui/react';

import ArrowIcon from '@/shared/assets/icons/arrow-redesigned.svg';
import CheckIcon from '@/shared/assets/icons/check-16-12.svg';

import { classNames } from '@/shared/lib/classNames/classNames';
import { genericMemo } from '@/shared/lib/components/genericMemo/genericMemo';

import { DropdownDirection } from '@/shared/types/ui';

import { Button } from '../../../Button/Button';
import { Icon } from '../../../Icon/Icon';
import { HStack, VStack } from '../../../Stack';

import { mapDirectionClass } from '../../styles/consts';

import popupClasses from '../../styles/popup.module.scss';
import classes from './ListBox.module.scss';

export interface ListBoxItem {
  /**
   * Содержимое
   */
  content: ReactNode;

  /**
   * Элемент меню активен или нет?
   */
  disabled?: boolean;

  /**
   * Значение пункта меню
   */
  value: string;
}

interface ListBoxProps<T> {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Значение по умолчанию
   */
  defaultValue?: string;

  /**
   * Направление для выпадения пунктов меню
   */
  direction?: DropdownDirection;

  /**
   * Элементы меню
   */
  items?: ListBoxItem[];

  /**
   * Label
   */
  label?: string;

  /**
   * Обработчик выбора пункта меню
   */
  onChange: (value: T) => void;

  /**
   * Режим только для чтения
   */
  readonly?: boolean;

  /**
   * Выравнивание по горизонтали или по вертикали
   */
  stack?: 'horizontal' | 'vertical';

  /**
   * Выбранное значение
   */
  value?: T;
}

const ListBox = <T extends string>({
  className,
  defaultValue,
  direction = 'bottom-left',
  items,
  label,
  onChange,
  readonly,
  stack = 'vertical',
  value,
}: ListBoxProps<T>) => {
  const optionsClasses = [mapDirectionClass[direction], popupClasses.menu];

  const selectedItem = useMemo(() => items?.find((item) => item.value === value), [items, value]);

  const horizontally = stack === 'horizontal';

  const Stack = horizontally ? HStack : VStack;

  return (
    <Stack
      align={horizontally ? 'center' : 'start'}
      gap={horizontally ? '8' : '4'}
      max={horizontally}
    >
      {label && <span>{label}</span>}

      <HeadlessListBox
        as='div'
        className={classNames(popupClasses.popup, {}, [className])}
        disabled={readonly}
        onChange={onChange}
        value={value}
      >
        <HeadlessListBox.Button as='div' className={classes.trigger}>
          <Button addonRight={<Icon Svg={ArrowIcon} />} disabled={readonly} variant='filled'>
            {selectedItem?.content ?? defaultValue}
          </Button>
        </HeadlessListBox.Button>

        <HeadlessListBox.Options className={classNames(classes.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <HeadlessListBox.Option
              as={Fragment}
              disabled={item.disabled}
              key={item.value}
              value={item.value}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    classes.item,
                    {
                      [popupClasses.active]: active,
                      [popupClasses.disabled]: item.disabled,
                      [popupClasses.selected]: selected,
                    },
                    [],
                  )}
                >
                  <HStack gap='4'>
                    {item.content}

                    {selected && <CheckIcon className={classes.check} />}
                  </HStack>
                </li>
              )}
            </HeadlessListBox.Option>
          ))}
        </HeadlessListBox.Options>
      </HeadlessListBox>
    </Stack>
  );
};

const MemoizedListBox = genericMemo(ListBox);

export { MemoizedListBox as ListBox };
