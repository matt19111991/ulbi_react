import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';

import { getProfileReadOnly, profileActions } from 'entities/Profile';

import classes from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = memo(({ className }: ProfilePageHeaderProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('profile');

  const readOnly = useSelector(getProfileReadOnly);

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  return (
    <div className={classNames(classes.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')} />

      {readOnly ? (
        <Button
          className={classes.editBtn}
          onClick={onEdit}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Редактировать')}
        </Button>
      ) : (
        <>
          <Button
            className={classes.editBtn}
            onClick={onCancelEdit}
            theme={ButtonTheme.OUTLINE_RED}
          >
            {t('Отменить')}
          </Button>

          <Button
            className={classes.saveBtn}
            onClick={onSave}
            theme={ButtonTheme.OUTLINE}
          >
            {t('Сохранить')}
          </Button>
        </>
      )}
    </div>
  );
});

ProfilePageHeader.displayName = 'ProfilePageHeader';
