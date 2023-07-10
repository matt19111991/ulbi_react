import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { profileReducer } from 'entities/Profile';

import { classNames } from 'shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

interface ProfilePageProps {
  className?: string;
}

const initialReducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = memo(({ className }: ProfilePageProps) => {
  const { t } = useTranslation();

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames('', {}, [className])}>
        {t('Profile page')}
      </div>
    </DynamicModuleLoader>
  );
});

ProfilePage.displayName = 'ProfilePage';

export default ProfilePage;
