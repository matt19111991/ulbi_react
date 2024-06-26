import { Fragment, memo } from 'react';
import type { ReactNode } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { classNames } from '@/shared/lib/classNames/classNames';

import type { DropdownDirection } from '@/shared/types/ui';

import { AppLink } from '../../../AppLink';

import { mapDirectionClass } from '../../styles/consts';

import popupClasses from '../../styles/popup.module.scss';

import classes from './DropDown.module.scss';

/**
 * Выравнивание пунктов меню
 */
type DropdownJustify = 'left' | 'center' | 'right';

/**
 * Классы для выравнивания пунктов меню
 */
const mapJustifyClass: Record<DropdownJustify, string> = {
  left: classes.justifyLeft,
  center: classes.justifyCenter,
  right: classes.justifyRight,
};

/**
 * Размер пунктов меню
 */
type DropdownOptionSize = 'S' | 'M';

/**
 * Классы для размеров пунктов меню
 */
const mapOptionSizeClass: Record<DropdownOptionSize, string> = {
  S: classes.size_s,
  M: classes.size_m,
};

export interface DropDownItem {
  /**
   * Содержимое
   */
  content?: ReactNode;

  /**
   * Элемент меню активен или нет?
   */
  disabled?: boolean;

  /**
   * Ссылка
   */
  href?: string;

  /**
   * Обработчик для клика
   */
  onClick?: () => void;
}

interface DropDownProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Направление для выпадения пунктов меню
   */
  direction?: DropdownDirection;

  /**
   * Элементы меню
   */
  items: DropDownItem[];

  /**
   * Выравнивание пунктов меню
   */
  justify?: DropdownJustify;

  /**
   * Лэйбл
   */
  label?: string;

  /**
   * Размеры пунктов меню
   */
  optionSize?: DropdownOptionSize;

  /**
   * Компонент-триггер открытия меню
   */
  trigger: ReactNode;
}

export const DropDown = memo(
  ({
    className,
    direction = 'bottom-left',
    items,
    justify = 'left',
    label = 'dropdown-button',
    optionSize = 'S',
    trigger,
  }: DropDownProps) => {
    const menuClasses = [mapDirectionClass[direction], popupClasses.menu];

    return (
      <Menu as='div' className={classNames(popupClasses.popup, {}, [className])}>
        <MenuButton aria-label={label} className={popupClasses.trigger}>
          {trigger}
        </MenuButton>

        <MenuItems className={classNames(classes.menu, {}, menuClasses)}>
          {items.map((item) => {
            /*
              в библиотеке '@headlessui' как альтернативу 'JSX'-компонентам можно использовать
              паттерн 'render props' (функция вместо 'JSX'-компонента)
            */
            const content = ({ active }: { active: boolean }) => (
              <button
                className={classNames(
                  classes.item,
                  {
                    [popupClasses.active]: active,
                    [popupClasses.disabled]: item.disabled,
                  },
                  [mapJustifyClass[justify], mapOptionSizeClass[optionSize]],
                )}
                disabled={item.disabled}
                onClick={item.onClick}
              >
                {item.content}
              </button>
            );

            if (item.href) {
              return (
                <MenuItem
                  as={AppLink}
                  disabled={item.disabled}
                  key={String(item.content)}
                  to={item.href}
                >
                  {content}
                </MenuItem>
              );
            }

            return (
              <MenuItem as={Fragment} disabled={item.disabled} key={String(item.content)}>
                {content}
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
    );
  },
);

DropDown.displayName = 'DropDown';
