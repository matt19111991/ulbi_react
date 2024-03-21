import type { ReactNode } from 'react';
import { Popover as HeadlessPopover } from '@headlessui/react';

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
   * Направление для выпадения пунктов меню
   */
  direction?: DropdownDirection;

  /**
   * Компонент-триггер открытия меню
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
    <HeadlessPopover.Button as='div' className={popupClasses.trigger}>
      {trigger}
    </HeadlessPopover.Button>

    <HeadlessPopover.Panel
      className={classNames(classes.panel, {}, [mapDirectionClass[direction]])}
    >
      {children}
    </HeadlessPopover.Panel>
  </HeadlessPopover>
);
