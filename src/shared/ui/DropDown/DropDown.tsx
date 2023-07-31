import { Fragment, memo, ReactNode } from 'react';
import { Menu } from '@headlessui/react';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './DropDown.module.scss';

export interface DropDownItem {
  content?: ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

interface DropDownProps {
  className?: string;
  items: DropDownItem[];
  trigger: ReactNode;
}

export const DropDown = memo(({ className, items, trigger }: DropDownProps) => (
  <Menu
    as='div'
    className={classNames(classes.DropDown, {}, [className])}
  >
    <Menu.Button className={classes.btn}>
      {trigger}
    </Menu.Button>

    <Menu.Items className={classes.menu}>
      {items.map((item) => (
        <Menu.Item
          as={Fragment}
          disabled={item.disabled}
          key={item.href}
        >
          {({ active }) => (
            <button
              className={
                classNames(classes.item, { [classes.active]: active }, [])
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
