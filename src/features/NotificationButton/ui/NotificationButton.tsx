import { memo } from 'react';

import { NotificationList } from 'entities/Notification';

import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';

import { classNames } from 'shared/lib/classNames/classNames';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popups';

import classes from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo(({
  className,
}: NotificationButtonProps) => (
  <Popover
    className={classNames('', {}, [className])}
    direction='bottom-right'
    trigger={(
      <Button theme={ButtonTheme.CLEAR}>
        <Icon inverted Svg={NotificationIcon} />
      </Button>
    )}
  >
    <NotificationList className={classes.list} />
  </Popover>
));

NotificationButton.displayName = 'NotificationButton';
