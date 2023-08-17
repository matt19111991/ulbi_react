import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { NotificationList } from '@/entities/Notification';

import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';
import { Popover } from '@/shared/ui/Popups';

import classes from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
  storybookMobile?: boolean;
}

export const NotificationButton = memo(({
  className,
  storybookMobile,
}: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onCloseDrawer = useCallback(() => setIsOpen(false), []);

  const onOpenDrawer = useCallback(() => setIsOpen(true), []);

  const trigger = (
    <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
      <Icon inverted Svg={NotificationIcon} />
    </Button>
  );

  const browserContent = (
    <Popover
      className={classNames('', {}, [className])}
      direction='bottom-right'
      trigger={trigger}
    >
      <NotificationList className={classes.list} />
    </Popover>
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
});

NotificationButton.displayName = 'NotificationButton';
