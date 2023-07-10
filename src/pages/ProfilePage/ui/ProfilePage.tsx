import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames('', {}, [className])}>
      {t('Profile page')}
    </div>
  );
});

ProfilePage.displayName = 'ProfilePage';

export default ProfilePage;
