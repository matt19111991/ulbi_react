import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { NotificationList } from '@/entities/Notification';

import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';

import { Icon } from '@/shared/ui/redesigned/Icon';

import classes from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
  storybookMobile?: boolean;
}

export const NotificationButton = memo(
  ({ className, storybookMobile }: NotificationButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onCloseDrawer = useCallback(() => setIsOpen(false), []);

    const onOpenDrawer = useCallback(() => setIsOpen(true), []);

    const trigger = (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<Icon clickable onClick={onOpenDrawer} Svg={NotificationIcon} />}
        off={
          <ButtonDeprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <IconDeprecated inverted Svg={NotificationIconDeprecated} />
          </ButtonDeprecated>
        }
      />
    );

    const browserContent = (
      <PopoverDeprecated
        className={classNames('', {}, [className])}
        direction='bottom-right'
        trigger={trigger}
      >
        <NotificationList className={classes.list} />
      </PopoverDeprecated>
    );

    const mobileContent = (
      <>
        {trigger}

        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </>
    );

    if (storybookMobile) {
      return mobileContent;
    }

    return (
      <>
        <BrowserView>{browserContent}</BrowserView>

        <MobileView>{mobileContent}</MobileView>
      </>
    );
  },
);

NotificationButton.displayName = 'NotificationButton';
