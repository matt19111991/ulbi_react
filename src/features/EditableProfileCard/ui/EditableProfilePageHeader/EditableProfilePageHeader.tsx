import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';

import {
  getIsUserCanEditProfile,
} from '../../model/selectors/getIsUserCanEditProfile/getIsUserCanEditProfile';

import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';

import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

import { profileActions } from '../../model/slice/profileSlice';

interface EditableProfilePageHeaderProps {
  className?: string;
}

export const EditableProfilePageHeader = memo(({
  className,
}: EditableProfilePageHeaderProps) => {
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

EditableProfilePageHeader.displayName = 'EditableProfilePageHeader';
