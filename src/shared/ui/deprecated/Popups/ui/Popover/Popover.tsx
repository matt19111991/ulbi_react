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

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Popover = ({
  children,
  className,
  direction = 'bottom-left',
  trigger,
}: PopoverProps) => (
  <HeadlessPopover className={classNames('', {}, [className, popupClasses.popup])}>
    <PopoverButton
      aria-label='notification popover button'
      as='div'
      className={popupClasses.trigger}
      role='button'
    >
      {trigger}
    </PopoverButton>

    <PopoverPanel className={classNames(classes.panel, {}, [mapDirectionClass[direction]])}>
      {children}
    </PopoverPanel>
  </HeadlessPopover>
);
