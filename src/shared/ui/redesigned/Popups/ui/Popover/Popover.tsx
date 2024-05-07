import type { ReactNode } from 'react';
import { Popover as HeadlessPopover, PopoverButton, PopoverPanel } from '@headlessui/react';

import { classNames } from '@/shared/lib/classNames/classNames';

import type { DropdownDirection } from '@/shared/types/ui';

import { mapDirectionClass } from '../../styles/consts';

import popupClasses from '../../styles/popup.module.scss';

import classes from './Popover.module.scss';

interface PopoverProps {
  /**
   * Содержимое
   */
  children: ReactNode;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Направление для выпадения содержимого
   */
  direction?: DropdownDirection;

  /**
   * Компонент-триггер открытия всплывающего окна / подсказки
   */
  trigger: ReactNode;
}

export const Popover = ({
  children,
  className,
  direction = 'bottom-left',
  trigger,
}: PopoverProps) => {
  const menuClasses = [mapDirectionClass[direction], popupClasses.menu];

  return (
    <HeadlessPopover className={classNames('', {}, [className, popupClasses.popup])}>
      <PopoverButton as='div' className={popupClasses.trigger} role='button'>
        {trigger}
      </PopoverButton>

      <PopoverPanel className={classNames(classes.panel, {}, menuClasses)} role='menu'>
        {children}
      </PopoverPanel>
    </HeadlessPopover>
  );
};
