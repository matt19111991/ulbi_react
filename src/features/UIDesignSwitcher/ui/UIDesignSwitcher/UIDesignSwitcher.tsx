import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { LAST_DESIGN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import { ToggleFeatures, updateFeatureFlags } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/hooks/useForceUpdate/useForceUpdate';

import { Select } from '@/shared/ui/deprecated/Select';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import classes from './UIDesignSwitcher.module.scss';

interface UIDesignSwitcherProps {
  /**
   * Внешний класс
   */
  className?: string;
}

export const UIDesignSwitcher = memo(({ className }: UIDesignSwitcherProps) => {
  const dispatch = useAppDispatch();
  const forceUpdate = useForceUpdate();
  const { t } = useTranslation();

  const authData = useSelector(getUserAuthData);

  const [isLoading, setIsLoading] = useState(false);

  const items = [
    { content: t('Новый'), value: 'new' },
    { content: t('Старый'), value: 'old' },
  ];

  const onChange = async (value: string) => {
    setIsLoading(true);

    if (authData) {
      await dispatch(
        updateFeatureFlags({
          newFeatures: {
            isAppRedesigned: value === 'new',
          },
          userId: authData.id,
        }),
      );

      setIsLoading(false);

      forceUpdate(); // вызываем принудительную перерисовку всего интерфейса
    } else {
      // задержка для имитации запроса на сервер
      const addDelay = new Promise((resolve) => {
        setTimeout(resolve, 800);
      });

      addDelay.then(() => {
        localStorage.setItem(LAST_DESIGN_LOCALSTORAGE_KEY, value);

        window.location.reload();
      });
    }
  };

  return (
    <HStack className={classes.stack} gap='16' max>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <>
            <TextRedesigned className={classes.text} text={t('Вариант интерфейса')} />

            {isLoading ? (
              <SkeletonRedesigned
                border='34px'
                className={classes.skeleton}
                height={32}
                width={100}
              />
            ) : (
              <ListBox
                className={className}
                items={items}
                onChange={onChange}
                stack='horizontal'
                value='new'
              />
            )}
          </>
        }
        off={
          <>
            <TextDeprecated className={classes.text} text={t('Вариант интерфейса')} />

            {isLoading ? (
              <SkeletonDeprecated
                border='0px'
                className={classes.skeleton}
                height={26}
                width={89}
              />
            ) : (
              <Select className={className} onChange={onChange} options={items} value='old' />
            )}
          </>
        }
      />
    </HStack>
  );
});

UIDesignSwitcher.displayName = 'UIDesignSwitcher';
