import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { getFeatureFlag, updateFeatureFlags } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/hooks/useForceUpdate/useForceUpdate';

import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

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

  const isAppRedesigned = getFeatureFlag('isAppRedesigned');

  const [isLoading, setIsLoading] = useState(false);

  const items = [
    { content: t('Новый'), value: 'new' },
    { content: t('Старый'), value: 'old' },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);

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
    }
  };

  return (
    <HStack className={classes.stack} gap='16' max>
      <Text className={classes.text} text={t('Вариант интерфейса')} />

      {isLoading ? (
        <Skeleton border='34px' className={classes.skeleton} height={32} width={100} />
      ) : (
        <ListBox
          className={className}
          items={items}
          onChange={onChange}
          stack='horizontal'
          value={isAppRedesigned ? 'new' : 'old'}
        />
      )}
    </HStack>
  );
});

UIDesignSwitcher.displayName = 'UIDesignSwitcher';
