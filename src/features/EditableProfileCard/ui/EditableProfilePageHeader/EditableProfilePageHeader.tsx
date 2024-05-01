import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import { ToggleFeatures } from '@/shared/lib/features';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { getIsUserCanEditProfile } from '../../model/selectors/getIsUserCanEditProfile/getIsUserCanEditProfile';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';

import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

import { profileActions } from '../../model/slice/profileSlice';

import classes from './EditableProfilePageHeader.module.scss';

interface EditableProfilePageHeaderProps {
  /**
   * Внешний класс
   */
  className?: string;
}

export const EditableProfilePageHeader = memo(({ className }: EditableProfilePageHeaderProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('profile');

  const canEdit = useSelector(getIsUserCanEditProfile);
  const readOnly = useSelector(getProfileReadOnly);

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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card border='partial' max padding='24'>
          <HStack className={classNames(classes.stack, {}, [className])} justify='between' max>
            <TextRedesigned title={t('Профиль')} />

            {canEdit && (
              <div>
                {readOnly ? (
                  <ButtonRedesigned
                    data-testid='EditableProfileCardHeader.EditButton'
                    onClick={onEdit}
                  >
                    {t('Редактировать')}
                  </ButtonRedesigned>
                ) : (
                  <HStack className={classes.buttonsStack} gap='8'>
                    <ButtonRedesigned
                      color='error'
                      data-testid='EditableProfileCardHeader.CancelButton'
                      onClick={onCancelEdit}
                    >
                      {t('Отменить')}
                    </ButtonRedesigned>

                    <ButtonRedesigned
                      color='success'
                      data-testid='EditableProfileCardHeader.SaveButton'
                      onClick={onSave}
                    >
                      {t('Сохранить')}
                    </ButtonRedesigned>
                  </HStack>
                )}
              </div>
            )}
          </HStack>
        </Card>
      }
      off={
        <HStack className={classNames('', {}, [className])} justify='between' max>
          <TextDeprecated title={t('Профиль')} />

          {canEdit && (
            <div>
              {readOnly ? (
                <ButtonDeprecated
                  data-testid='EditableProfileCardHeader.EditButton'
                  onClick={onEdit}
                  theme={ButtonTheme.OUTLINE}
                >
                  {t('Редактировать')}
                </ButtonDeprecated>
              ) : (
                <HStack gap='8'>
                  <ButtonDeprecated
                    data-testid='EditableProfileCardHeader.CancelButton'
                    onClick={onCancelEdit}
                    theme={ButtonTheme.OUTLINE_RED}
                  >
                    {t('Отменить')}
                  </ButtonDeprecated>

                  <ButtonDeprecated
                    data-testid='EditableProfileCardHeader.SaveButton'
                    onClick={onSave}
                    theme={ButtonTheme.OUTLINE}
                  >
                    {t('Сохранить')}
                  </ButtonDeprecated>
                </HStack>
              )}
            </div>
          )}
        </HStack>
      }
    />
  );
});

EditableProfilePageHeader.displayName = 'EditableProfilePageHeader';
