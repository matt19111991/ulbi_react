import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
// import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
// import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';

import classes from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard = memo(({ className }: ProfileCardProps) => {
  const { t } = useTranslation('profile');

  const data = useSelector(getProfileData);
  // const error = useSelector(getProfileError);
  // const isLoading = useSelector(getProfileIsLoading);

  return (
    <div className={classNames(classes.ProfileCard, {}, [className])}>
      <div className={classes.header}>
        <Text title={t('Профиль')} />

        <Button className={classes.editBtn} theme={ButtonTheme.OUTLINE}>
          {t('Редактировать')}
        </Button>
      </div>

      <div className={classes.data}>
        <Input
          className={classes.input}
          placeholder={t('Ваше имя')}
          value={data?.first}
        />

        <Input
          className={classes.input}
          placeholder={t('Ваша фамилия')}
          value={data?.lastname}
        />
      </div>
    </div>
  );
});

ProfileCard.displayName = 'ProfileCard';
