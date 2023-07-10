import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

interface ProfilePageProps {
  className?: string;
}

const Profile = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames('', {}, [className])}>
      {t('Profile page')}
    </div>
  );
};

export default Profile;
