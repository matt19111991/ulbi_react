import { Fragment, memo } from 'react';

import {
  Listbox as HeadlessListBox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

import CheckIcon from '@/shared/assets/icons/check-16-12.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import type { DropdownDirection, ListBoxItem } from '@/shared/types/ui';

import { Button } from '../../../Button/Button';

import { HStack, VStack } from '../../../../redesigned/Stack';

import { mapDirectionClass } from '../../styles/consts';

import popupClasses from '../../styles/popup.module.scss';

import classes from './ListBox.module.scss';

interface ListBoxProps {
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
   * Лэйбл
   */
  label?: string;

  /**
   * Обработчик для выбора пункта меню
   */
  onChange: (value: string) => void;

  /**
   * Режим только для чтения
   */
  readonly?: boolean;

  /**
   * Выбранное значение
   */
  value?: string;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const ListBox = memo(
  ({
    className,
    defaultValue,
    direction = 'bottom-left',
    items,
    label,
    onChange,
    readonly,
    value,
  }: ListBoxProps) => (
    <VStack align='start' gap='4'>
      {label && <span>{`${label} >`}</span>}

      <HeadlessListBox
        as='div'
        className={classNames(popupClasses.popup, {}, [className])}
        disabled={readonly}
        onChange={onChange}
        value={value}
      >
        <ListboxButton as='div'>
          <Button>{value ?? defaultValue}</Button>
        </ListboxButton>

        <ListboxOptions className={classNames(classes.options, {}, [mapDirectionClass[direction]])}>
          {items?.map((item) => (
            <ListboxOption
              as={Fragment}
              disabled={item.disabled}
              key={item.value}
              value={item.value}
            >
              {/*
                в библиотеке '@headlessui' как альтернативу 'JSX'-компонентам можно использовать
                паттерн 'render props' (функция вместо 'JSX'-компонента)
              */}
              {({ focus, selected }) => (
                <li
                  className={classNames(classes.item, {
                    [popupClasses.active]: focus,
                    [popupClasses.disabled]: item.disabled,
                  })}
                >
                  <HStack gap='4'>
                    {item.content}

                    {selected && <CheckIcon className={classes.check} />}
                  </HStack>
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </HeadlessListBox>
    </VStack>
  ),
);

ListBox.displayName = 'ListBox';
