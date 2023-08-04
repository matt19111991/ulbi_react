import { Fragment, memo, ReactNode } from 'react';
import { Menu } from '@headlessui/react';

import { classNames } from 'shared/lib/classNames/classNames';

import { DropdownDirection } from 'shared/types/ui';

import { AppLink } from '../AppLink/AppLink';

import classes from './DropDown.module.scss';

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom-left': classes.optionsBottomLeft,
  'bottom-right': classes.optionsBottomRight,
  'top-left': classes.optionsTopLeft,
  'top-right': classes.optionsTopRight,
};

type DropdownJustify = 'left' | 'center' | 'right';

const mapJustifyClass: Record<DropdownJustify, string> = {
  left: classes.justifyLeft,
  center: classes.justifyCenter,
  right: classes.justifyRight,
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
  justify?: DropdownJustify;
  optionSize?: DropdownOptionSize;
  trigger: ReactNode;
}

export const DropDown = memo(({
  className,
  direction = 'bottom-left',
  items,
  justify = 'left',
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
      {items.map((item) => {
        const content = ({ active }: { active: boolean }) => (
          <button
            className={
              classNames(
                classes.item,
                { [classes.active]: active },
                [mapJustifyClass[justify], mapOptionSizeClass[optionSize]],
              )
            }
            disabled={item.disabled}
            onClick={item.onClick}
          >
            {item.content}
          </button>
        );

        if (item.href) {
          return (
            <Menu.Item
              as={AppLink}
              disabled={item.disabled}
              key={String(item.content)}
              to={item.href}
            >
              {content}
            </Menu.Item>
          );
        }

        return (
          <Menu.Item
            as={Fragment}
            disabled={item.disabled}
            key={String(item.content)}
          >
            {content}
          </Menu.Item>
        );
      })}
    </Menu.Items>
  </Menu>
));

DropDown.displayName = 'DropDown';
