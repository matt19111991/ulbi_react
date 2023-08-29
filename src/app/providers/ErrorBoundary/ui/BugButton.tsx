import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/Button';

// BugButton - компонент для тестирования ErrorBoundary

export const BugButton = memo(() => {
  const { t } = useTranslation();

  const [error, setError] = useState(false);

  const onThrow = () => {
    setError(true);
  };

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  return <Button onClick={onThrow}>{t('Выбросить ошибку')}</Button>;
});

BugButton.displayName = 'BugButton';
