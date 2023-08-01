import { Fragment, ReactNode } from 'react';
import { Listbox as HeadlessListBox } from '@headlessui/react';

import CheckIcon from 'shared/assets/icons/check-16-12.svg';

import { classNames } from 'shared/lib/classNames/classNames';
import { genericMemo } from 'shared/lib/components/genericMemo/genericMemo';

import { DropdownDirection } from 'shared/types/ui';

import { Button } from '../Button/Button';
import { HStack, VStack } from '../Stack';

import classes from './ListBox.module.scss';

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom-left': classes.optionsBottomLeft,
  'bottom-right': classes.optionsBottomRight,
  'top-left': classes.optionsTopLeft,
  'top-right': classes.optionsTopRight,
};

export interface ListBoxItem {
  content: ReactNode;
  disabled?: boolean;
  value: string;
}

interface ListBoxProps {
  className?: string;
  defaultValue?: string;
  direction?: DropdownDirection;
  items?: ListBoxItem[];
  label?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  value?: string;
}

const ListBox =  ({
  className,
  defaultValue,
  direction = 'bottom-left',
  items,
  label,
  onChange,
  readonly,
  value,
}: ListBoxProps) => (
  <VStack gap='4'>
    {label && <span>{`${label} >`}</span>}

    <HeadlessListBox
      as='div'
      className={classNames(classes.ListBox, {}, [className])}
      disabled={readonly}
      onChange={onChange}
      value={value}
    >
      <HeadlessListBox.Button as='div' className={classes.trigger}>
        <Button disabled={readonly}>
          {value ?? defaultValue}
        </Button>
      </HeadlessListBox.Button>

      <HeadlessListBox.Options
        className={
          classNames(
            classes.options,
            {},
            [mapDirectionClass[direction]],
          )
        }
      >
        {items?.map((item) => (
          <HeadlessListBox.Option
            as={Fragment}
            disabled={item.disabled}
            key={item.value}
            value={item.value}
          >
            {({ active, selected }) => (
              <li
                className={
                  classNames(
                    classes.item,
                    {
                      [classes.active]: active,
                      [classes.disabled]: item.disabled,
                    },
                    [],
                  )
                }
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
  </VStack>
);

const MemoizedListBox = genericMemo(ListBox);

export { MemoizedListBox as ListBox };
