import { Fragment, memo, ReactNode } from 'react';
import { Menu } from '@headlessui/react';

import { classNames } from 'shared/lib/classNames/classNames';

import { DropdownDirection } from 'shared/types/ui';

import classes from './DropDown.module.scss';

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom-left': classes.optionsBottomLeft,
  'bottom-right': classes.optionsBottomRight,
  'top-left': classes.optionsTopLeft,
  'top-right': classes.optionsTopRight,
};

type DropdownOptionSize = 'S' | 'M';

const mapOptionSizeClass: Record<DropdownOptionSize, string> = {
  S: classes.size_s,
  M: classes.size_m,
};

export interface DropDownItem {
  content?: ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

interface DropDownProps {
  className?: string;
  direction?: DropdownDirection;
  items: DropDownItem[];
  optionSize?: DropdownOptionSize;
  trigger: ReactNode;
}

export const DropDown = memo(({
  className,
  direction = 'bottom-left',
  items,
  optionSize = 'S',
  trigger,
}: DropDownProps) => (
  <Menu
    as='div'
    className={classNames(classes.DropDown, {}, [className])}
  >
    <Menu.Button className={classes.btn}>
      {trigger}
    </Menu.Button>

    <Menu.Items
      className={
        classNames(classes.menu, {}, [mapDirectionClass[direction]])
      }
    >
      {items.map((item) => (
        <Menu.Item
          as={Fragment}
          disabled={item.disabled}
          key={String(item.content)}
        >
          {({ active }) => (
            <button
              className={
                classNames(
                  classes.item,
                  { [classes.active]: active },
                  [mapOptionSizeClass[optionSize]],
                )
              }
              onClick={item.onClick}
            >
              {item.content}
            </button>
          )}
        </Menu.Item>
      ))}
    </Menu.Items>
  </Menu>
));

DropDown.displayName = 'DropDown';
