import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getProfileReadOnly, profileActions, updateProfileData } from 'entities/Profile';

import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';

import { getIsUserCanEditProfile } from '../../model/selectors/getIsUserCanEditProfile';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = memo(({ className }: ProfilePageHeaderProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('profile');

  const readOnly = useSelector(getProfileReadOnly);

  const canEdit = useSelector(getIsUserCanEditProfile);

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <HStack
      className={classNames('', {}, [className])}
      justify='between'
      max
    >
      <Text title={t('Профиль')} />

      {canEdit && (
        <div>
          {readOnly ? (
            <Button onClick={onEdit} theme={ButtonTheme.OUTLINE}>
              {t('Редактировать')}
            </Button>
          ) : (
            <HStack gap='8'>
              <Button onClick={onCancelEdit} theme={ButtonTheme.OUTLINE_RED}>
                {t('Отменить')}
              </Button>

              <Button onClick={onSave} theme={ButtonTheme.OUTLINE}>
                {t('Сохранить')}
              </Button>
            </HStack>
          )}
        </div>
      )}
    </HStack>
  );
});

ProfilePageHeader.displayName = 'ProfilePageHeader';
