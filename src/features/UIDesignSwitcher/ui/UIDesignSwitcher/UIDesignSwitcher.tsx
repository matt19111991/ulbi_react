import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { LAST_DESIGN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';

import { classNames } from '@/shared/lib/classNames/classNames';

import { ToggleFeatures, updateFeatureFlags } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/hooks/useForceUpdate/useForceUpdate';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import type { ListBoxItem } from '@/shared/types/ui';

import { Select } from '@/shared/ui/deprecated/Select';
import type { SelectOption } from '@/shared/ui/deprecated/Select';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import classes from './UIDesignSwitcher.module.scss';

enum DesignType {
  NEW = 'new',
  OLD = 'old',
}

interface UIDesignSwitcherProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Состояние загрузки, пробрасываемое из 'storybook'
   */
  storybookLoading?: boolean;
}

export const UIDesignSwitcher = memo(({ className, storybookLoading }: UIDesignSwitcherProps) => {
  const dispatch = useAppDispatch();

  const forceUpdate = useForceUpdate();

  const { theme } = useTheme();

  const { t } = useTranslation();

  const authData = useSelector(getUserAuthData);

  const [isLoading, setIsLoading] = useState(storybookLoading ?? false);

  const items: ListBoxItem[] | SelectOption<DesignType>[] = [
    { content: t('Новый'), value: DesignType.NEW },
    { content: t('Старый'), value: DesignType.OLD },
  ];

  const onChange = async (value: DesignType) => {
    setIsLoading(true);

    if (authData) {
      await dispatch(
        updateFeatureFlags({
          newFeatures: {
            isAppRedesigned: value === DesignType.NEW,
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
    <HStack className={classes.stack} gap='16'>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <>
            <TextRedesigned className={classes.text} text={t('Вариант интерфейса')} />

            {isLoading ? (
              <SkeletonRedesigned
                border='34px'
                className={classes.skeletonRedesigned}
                height={32}
                width={100}
              />
            ) : (
              <ListBox
                className={className}
                items={items as ListBoxItem[]}
                onChange={onChange}
                stack='horizontal'
                value={DesignType.NEW}
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
                className={classNames(classes.skeletonDeprecated, {
                  [classes.shadow]: theme !== Theme.DARK,
                })}
                height={26}
                width={89}
              />
            ) : (
              <Select
                className={className}
                onChange={onChange}
                options={items as SelectOption<DesignType>[]}
                value={DesignType.OLD}
              />
            )}
          </>
        }
      />
    </HStack>
  );
});

UIDesignSwitcher.displayName = 'UIDesignSwitcher';
